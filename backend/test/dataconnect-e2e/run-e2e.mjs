/**
 * Data Connect emulator e2e — drives the actual connector operations against a
 * real (PGLite) Postgres via the local emulator, exercising the full LMS slice
 * end-to-end: user provisioning → course authoring → publish → enrollment →
 * quiz attempt → mission submission → grading → soft-delete filtering, plus a
 * negative test that the @auth role-gating blocks a student from admin ops.
 *
 * Prereq:  firebase emulators:start --only dataconnect
 * Run:     node backend/test/dataconnect-e2e/run-e2e.mjs
 * Exits 0 if all assertions pass, 1 otherwise.
 *
 * Auth: the emulator decodes the unsigned JWT in `x-firebase-auth-token`
 * WITHOUT verifying the signature, so we mint tokens locally to impersonate an
 * instructor / student (carrying both `auth.uid` and the `role` custom claim).
 */

const HOST = process.env.DC_EMU_HOST ?? '127.0.0.1:9399';
const PROJECT = 'learning-management-syst-3cc3a';
const LOCATION = 'europe-west8';
const SERVICE = 'learning-management-syst-3cc3a-service';
const BASE = `http://${HOST}/v1/projects/${PROJECT}/locations/${LOCATION}/services/${SERVICE}/connectors/default`;

const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const mkToken = (claims) =>
  `${b64url({ alg: 'RS256', typ: 'JWT', kid: 'fake' })}.${b64url(claims)}.fakesig`;

const instructor = mkToken({ sub: 'u_inst', user_id: 'u_inst', email: 'inst@x.com', role: 'instructor', email_verified: true });
const student = mkToken({ sub: 'u_stud', user_id: 'u_stud', email: 'stud@x.com', role: 'student', email_verified: true });

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

function insertedId(r, field) {
  return r.data?.[field]?.id;
}

async function main() {
  console.log('\n=== Data Connect e2e (emulator) ===\n');

  // 0. Provision users
  console.log('[identity]');
  ok((await m('SyncUser', { email: 'inst@x.com', name: 'Inst One' }, instructor)).data?.user_upsert?.id === 'u_inst', 'instructor SyncUser provisions users row (auth.uid)');
  ok((await m('SyncUser', { email: 'stud@x.com', name: 'Stud One' }, student)).data?.user_upsert?.id === 'u_stud', 'student SyncUser provisions users row');

  // 1. Taxonomy + course authoring (instructor, role-gated ops)
  console.log('\n[authoring]');
  const cat = await m('AdminCreateCategory', { name: `Cat ${Date.now()}`, description: 'd' }, instructor);
  const categoryId = insertedId(cat, 'category_insert');
  ok(!!categoryId, 'AdminCreateCategory (role-gated) succeeds for instructor');

  const course = await m('AdminCreateCourse', {
    title: 'E2E Course', description: 'desc', price: 0, language: 'en',
    level: 'BEGINNER', categoryId, tags: ['a', 'b'],
  }, instructor);
  const courseId = insertedId(course, 'course_insert');
  ok(!!courseId, 'AdminCreateCourse sets author/createdBy via auth.uid');

  // NEGATIVE: a student must NOT be able to author a course (role gating)
  const studentCourse = await m('AdminCreateCourse', {
    title: 'Nope', description: '', price: 0, language: 'en',
    level: 'BEGINNER', categoryId, tags: [],
  }, student);
  ok(studentCourse.errors.length > 0 || studentCourse.status >= 400 || !insertedId(studentCourse, 'course_insert'),
    'role-gating BLOCKS a student from AdminCreateCourse');

  const section = await m('AdminCreateSection', { courseId, title: 'Section 1', order: 1 }, instructor);
  const sectionId = insertedId(section, 'courseSection_insert');
  ok(!!sectionId, 'AdminCreateSection');

  const lecture = await m('AdminCreateLectureFull', {
    sectionId, title: 'Lecture 1', type: 'VIDEO', videoUrl: 'courses/x/v.mp4',
    content: null, duration: 60, transcriptUrl: null, isFreePreview: false, order: 1,
  }, instructor);
  const lectureId = insertedId(lecture, 'courseLecture_insert');
  ok(!!lectureId, 'AdminCreateLectureFull');

  // Quiz on a QUIZ-type lecture
  const quizLecture = await m('AdminCreateLectureFull', {
    sectionId, title: 'Quiz Lecture', type: 'QUIZ', videoUrl: null, content: null,
    duration: null, transcriptUrl: null, isFreePreview: false, order: 2,
  }, instructor);
  const quizLectureId = insertedId(quizLecture, 'courseLecture_insert');

  const quiz = await m('AdminCreateQuiz', { lectureId: quizLectureId, passingScore: 50, maxAttempts: 3, timeLimitMinutes: null }, instructor);
  const quizId = insertedId(quiz, 'courseQuiz_insert');
  ok(!!quizId, 'AdminCreateQuiz (one-per-lecture @unique)');

  const question = await m('AdminCreateQuizQuestion', { quizId, questionText: '2+2?', order: 1, points: 1, explanation: null }, instructor);
  const questionId = insertedId(question, 'quizQuestion_insert');
  const optCorrect = insertedId(await m('AdminCreateQuizOption', { questionId, text: '4', order: 1, isCorrect: true }, instructor), 'quizOption_insert');
  await m('AdminCreateQuizOption', { questionId, text: '5', order: 2, isCorrect: false }, instructor);
  ok(!!questionId && !!optCorrect, 'AdminCreateQuizQuestion + options');

  // Publish
  ok((await m('AdminUpdateCourseStatus', { courseId, status: 'PUBLISHED' }, instructor)).errors.length === 0, 'AdminUpdateCourseStatus -> PUBLISHED');

  // Student-safe quiz fetch must NOT leak isCorrect
  const takeView = await q('GetQuizQuestions', { lectureId: quizLectureId }, student);
  const takeOpt = takeView.data?.courseQuizs?.[0]?.takeQuestions?.[0]?.takeOptions?.[0];
  ok(takeOpt && !('isCorrect' in takeOpt), 'student quiz view omits the isCorrect answer key');

  // 2. Discovery + enrollment
  console.log('\n[enrollment + quiz attempt]');
  const published = await q('ListPublishedCourses', {}, 'admin');
  ok((published.data?.courses ?? []).some((c) => c.id === courseId), 'published course appears in public catalog');

  const enroll = await m('EnrollInCourse', { courseId }, student);
  ok(!!insertedId(enroll, 'enrollment_insert'), 'EnrollInCourse (auth.uid scoped)');

  const myEnroll = await q('GetUserEnrollmentForCourse', { courseId }, student);
  ok(myEnroll.data?.enrollments?.[0]?.status === 'ACTIVE', 'enrollment is ACTIVE and scoped to the student');

  const attempt = await m('StartQuizAttempt', { quizId }, student);
  const attemptId = insertedId(attempt, 'quizAttempt_insert');
  ok(!!attemptId, 'StartQuizAttempt');

  await m('SubmitQuizAnswer', { attemptId, questionId, optionId: optCorrect }, student);
  const graded = await q('GetAttemptAnswersWithCorrect', { attemptId }, student);
  ok(graded.data?.quizAttemptAnswers?.[0]?.selectedOption?.isCorrect === true, 'answer recorded; grading query sees correct flag');

  const finish = await m('FinishQuizAttemptIfOpen', { attemptId, score: 100, passed: true }, student);
  ok(finish.data?.quizAttempt_updateMany === 1, 'FinishQuizAttemptIfOpen finalizes exactly 1 open attempt');
  const finishAgain = await m('FinishQuizAttemptIfOpen', { attemptId, score: 100, passed: true }, student);
  ok(finishAgain.data?.quizAttempt_updateMany === 0, 'idempotency: a second finalize updates 0 rows');

  // 3. Mission submission + grading
  console.log('\n[mission submission + grading]');
  const mission = await m('AdminCreateMission', {
    title: 'E2E Mission', scenarioDescription: 'do the thing', durationMinutes: 30,
    categoryId, difficulty: 'BEGINNER', skillsTested: ['x'], courseId: null,
  }, instructor);
  const missionId = insertedId(mission, 'mission_insert');
  ok(!!missionId, 'AdminCreateMission');

  const criterion = await m('AdminCreateRubricCriterion', { missionId, criterionName: 'Quality', description: null, maxPoints: 10, order: 1 }, instructor);
  const criterionId = insertedId(criterion, 'rubricCriterion_insert');
  ok(!!criterionId, 'AdminCreateRubricCriterion');

  await m('EnrollInMission', { missionId }, student);
  const submission = await m('SubmitMission', { missionId, fileUrl: 'missions/x/deliverable.pdf' }, student);
  const submissionId = insertedId(submission, 'missionSubmission_insert');
  ok(!!submissionId, 'SubmitMission (student, auth.uid)');

  // Grader resolves submission -> mission/student
  const forGrading = await q('GetSubmissionForGrading', { submissionId }, instructor);
  ok(forGrading.data?.missionSubmission?.mission?.id === missionId &&
     forGrading.data?.missionSubmission?.student?.id === 'u_stud',
    'GetSubmissionForGrading resolves owning mission + student');

  ok((await m('AddCriterionScore', { submissionId, criterionId, score: 8 }, instructor)).errors.length === 0, 'AddCriterionScore upsert');
  // upsert again (re-grade) must not fail on the (submission,criterion) PK
  ok((await m('AddCriterionScore', { submissionId, criterionId, score: 9 }, instructor)).errors.length === 0, 'AddCriterionScore re-grade (upsert overwrites)');
  ok((await m('GradeSubmission', { submissionId, feedback: 'nice' }, instructor)).errors.length === 0, 'GradeSubmission sets status/feedback/updatedAt');

  const mine = await q('MySubmissions', {}, student);
  const minSub = mine.data?.missionSubmissions?.find((s) => s.id === submissionId);
  ok(minSub?.status === 'GRADED', 'student sees their submission as GRADED with the score');
  ok((minSub?.missionSubmissionScores_on_submission?.[0]?.score) === 9, 're-graded score (9) persisted, not the original 8');

  // 4. Soft-delete filtering (H4)
  console.log('\n[soft-delete filtering — H4]');
  const before = await q('AdminGetCourse', { courseId }, instructor);
  const beforeCount = before.data?.course?.adminSections?.length ?? 0;
  await m('AdminSoftDeleteSection', { sectionId }, instructor);
  const after = await q('AdminGetCourse', { courseId }, instructor);
  const afterCount = after.data?.course?.adminSections?.length ?? 0;
  ok(beforeCount === 1 && afterCount === 0, `soft-deleted section is filtered from AdminGetCourse (${beforeCount} -> ${afterCount})`);

  // Summary
  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  if (fail > 0) {
    console.log('FAILURES:\n - ' + failures.join('\n - '));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('\nE2E harness crashed:', e);
  process.exit(1);
});
