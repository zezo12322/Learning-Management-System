/**
 * Course ratings e2e — drives the ratings connector operations against a real
 * (PGLite) Postgres via the local Data Connect emulator. Confirms the slice we
 * just added end-to-end: the new avg_rating/rating_count columns resolve, a
 * rating upserts idempotently on the (user, course) composite key, reads are
 * auth-scoped, the public list paginates, and a delete only removes the caller's
 * own row.
 *
 * Prereq:  firebase emulators:start --only dataconnect
 * Run:     node backend/test/ratings-e2e/run-ratings.mjs   (or: npm run test:e2e:ratings)
 * Exits 0 if all assertions pass, 1 otherwise.
 *
 * Scope note: the "must be enrolled to rate" gate lives in RatingsService (NestJS
 * layer) and is covered by ratings.service.spec.ts — it is NOT a connector @auth
 * rule, so it is intentionally out of scope here. Likewise the denormalised
 * aggregate WRITE runs as the service account via executeMutationAsAdmin (a
 * NO_ACCESS op) and is unit-tested; here we only assert the aggregate COLUMNS
 * deployed and default to 0.
 */

const HOST = process.env.DC_EMU_HOST ?? '127.0.0.1:9399';
const PROJECT = 'learning-management-syst-3cc3a';
const LOCATION = 'europe-west8';
const SERVICE = 'learning-management-syst-3cc3a-service';
const BASE = `http://${HOST}/v1/projects/${PROJECT}/locations/${LOCATION}/services/${SERVICE}/connectors/default`;

const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const mkToken = (claims) =>
  `${b64url({ alg: 'RS256', typ: 'JWT', kid: 'fake' })}.${b64url(claims)}.fakesig`;

// The connector @auth rules read `auth.token.roles` (an array), so tokens must
// carry a `roles` claim. The setup identity is admin+instructor (category/course
// authoring is admin/instructor-gated); the raters are plain students.
const instructor = mkToken({ sub: 'u_inst', user_id: 'u_inst', email: 'inst@x.com', role: 'admin', roles: ['admin', 'instructor'], email_verified: true });
const studentA = mkToken({ sub: 'u_stuA', user_id: 'u_stuA', email: 'a@x.com', role: 'student', roles: ['student'], email_verified: true });
const studentB = mkToken({ sub: 'u_stuB', user_id: 'u_stuB', email: 'b@x.com', role: 'student', roles: ['student'], email_verified: true });

let pass = 0;
let fail = 0;
const failures = [];

function ok(cond, label) {
  if (cond) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; failures.push(label); console.log(`  ✗ ${label}`); }
}

async function call(action, operationName, variables, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token === 'admin') headers['Authorization'] = 'Bearer owner';
  else if (token) headers['x-firebase-auth-token'] = token;
  const res = await fetch(`${BASE}:${action}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ operationName, variables: variables ?? {} }),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, data: json.data, errors: json.errors ?? [] };
}
const q = (op, v, t) => call('executeQuery', op, v, t);
const m = (op, v, t) => call('executeMutation', op, v, t);
const insertedId = (r, field) => r.data?.[field]?.id;

async function main() {
  console.log('\n=== Course ratings e2e (emulator) ===\n');

  // 0. Provision users + a published course to rate.
  console.log('[setup]');
  await m('SyncUser', { email: 'inst@x.com', name: 'Inst' }, instructor);
  await m('SyncUser', { email: 'a@x.com', name: 'Alice' }, studentA);
  await m('SyncUser', { email: 'b@x.com', name: 'Bob' }, studentB);

  const categoryId = insertedId(
    await m('AdminCreateCategory', { name: `Cat ${Date.now()}`, description: 'd' }, instructor),
    'category_insert',
  );
  const courseId = insertedId(
    await m('AdminCreateCourse', {
      title: 'Ratings Course', description: 'd', price: 0, language: 'en',
      level: 'BEGINNER', categoryId, tags: ['a'],
    }, instructor),
    'course_insert',
  );
  ok(!!courseId, 'course created for rating');
  await m('AdminUpdateCourseStatus', { courseId, status: 'PUBLISHED' }, instructor);

  // 1. New denormalised columns deployed and default to 0 (proves the migration).
  console.log('\n[schema: aggregate columns]');
  const listed = await q('ListPublishedCourses', {}, undefined);
  const listedCourse = (listed.data?.courses ?? []).find((c) => c.id === courseId);
  ok(!!listedCourse, 'published course appears in public catalog');
  ok(listedCourse?.avgRating === 0 && listedCourse?.ratingCount === 0,
    'ListPublishedCourses returns avgRating/ratingCount defaulting to 0');

  // 2. Upsert + auth-scoped read.
  console.log('\n[upsert + read]');
  ok((await m('UpsertCourseRating', { courseId, rating: 3, review: null }, studentA)).errors.length === 0,
    'UpsertCourseRating inserts (auth.uid scoped)');
  const mineA = await q('GetMyCourseRating', { courseId }, studentA);
  ok(mineA.data?.courseRatings?.[0]?.rating === 3, 'GetMyCourseRating returns the caller\'s rating');
  const mineB = await q('GetMyCourseRating', { courseId }, studentB);
  ok((mineB.data?.courseRatings ?? []).length === 0, 'a different user sees no rating (scoped to auth.uid)');

  // 3. Composite-key idempotency: re-rating overwrites, never duplicates.
  console.log('\n[idempotent overwrite]');
  await m('UpsertCourseRating', { courseId, rating: 5, review: 'Great' }, studentA);
  const mineA2 = await q('GetMyCourseRating', { courseId }, studentA);
  ok(mineA2.data?.courseRatings?.[0]?.rating === 5, 're-upsert overwrites rating (3 -> 5)');
  ok(mineA2.data?.courseRatings?.[0]?.review === 'Great', 're-upsert updates the review text');
  const afterOneUser = await q('GetCourseRatingsForSummary', { courseId }, undefined);
  ok((afterOneUser.data?.courseRatings ?? []).length === 1,
    '(user, course) key prevents duplicate rows for the same rater');

  // 4. Second rater + public paginated list.
  console.log('\n[public list + pagination]');
  await m('UpsertCourseRating', { courseId, rating: 4, review: 'Good' }, studentB);
  const all = await q('ListCourseRatings', { courseId, limit: 20, offset: 0 }, undefined);
  const allRows = all.data?.courseRatings ?? [];
  ok(allRows.length === 2, 'ListCourseRatings returns both ratings (public, no token)');
  ok(allRows.every((r) => typeof r.user?.name === 'string'),
    'each review carries the reviewer\'s name');
  ok(new Set(allRows.map((r) => r.rating)).size === 2 && allRows.some((r) => r.rating === 4) && allRows.some((r) => r.rating === 5),
    'both distinct ratings (4 and 5) are present');

  const page1 = (await q('ListCourseRatings', { courseId, limit: 1, offset: 0 }, undefined)).data?.courseRatings ?? [];
  const page2 = (await q('ListCourseRatings', { courseId, limit: 1, offset: 1 }, undefined)).data?.courseRatings ?? [];
  ok(page1.length === 1 && page2.length === 1, 'limit/offset return one row per page');
  ok(page1[0]?.rating !== page2[0]?.rating, 'the two pages return different rows (offset advances)');

  // 5. Summary source data (avg/count/distribution are derived from this in-service).
  const summarySrc = (await q('GetCourseRatingsForSummary', { courseId }, undefined)).data?.courseRatings ?? [];
  const avg = summarySrc.reduce((s, r) => s + r.rating, 0) / summarySrc.length;
  ok(summarySrc.length === 2 && avg === 4.5, 'summary source yields 2 ratings averaging 4.5');

  // 6. Delete is self-scoped: Bob's delete removes only Bob's row.
  console.log('\n[self-scoped delete]');
  const del = await m('DeleteCourseRating', { courseId }, studentB);
  ok(del.data?.courseRating_deleteMany === 1, 'DeleteCourseRating removes exactly the caller\'s one row');
  const remaining = (await q('GetCourseRatingsForSummary', { courseId }, undefined)).data?.courseRatings ?? [];
  ok(remaining.length === 1, "the other rater's row is untouched by a different user's delete");
  const aliceStill = await q('GetMyCourseRating', { courseId }, studentA);
  ok(aliceStill.data?.courseRatings?.[0]?.rating === 5, "Alice's rating survives Bob's delete");

  // Summary
  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  if (fail > 0) {
    console.log('FAILURES:\n - ' + failures.join('\n - '));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('\nRatings e2e harness crashed:', e);
  process.exit(1);
});
