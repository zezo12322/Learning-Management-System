/**
 * Streaming + progress end-to-end smoke test (HTTP API).
 *
 * Drives the full instructor → student workflow against a RUNNING backend:
 *   create course → section → lecture
 *   → upload MP4 → (auto) transcode to AES-128 HLS
 *   → publish → enroll student
 *   → watermark → manifest → key → segment
 *   → POST progress (202) → worker writes → GET progress shows completion
 *
 * Unlike the Data Connect emulator runner, this hits the NestJS HTTP API, whose
 * FirebaseAuthGuard VERIFIES tokens — so we sign in REAL Firebase users via the
 * Identity Toolkit REST API to obtain valid ID tokens.
 *
 * Prerequisites (see test/streaming-e2e/README.md):
 *   - Redis running:   docker compose -f backend/docker-compose.yml up -d
 *   - Backend running: npm run start:dev   (with STREAM_KEY_SECRET set)
 *   - Data Connect deployed: firebase deploy --only dataconnect,storage
 *   - Two Firebase users: an instructor (role=instructor|admin) and a student
 *   - One existing category id (CATEGORY_ID)
 *
 * Run:  npm run test:e2e:stream
 * Exits 0 if all assertions pass, 1 otherwise.
 */

import { readFile, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const HERE = dirname(fileURLToPath(import.meta.url));

// --- config (env, with .env fallback for FIREBASE_API_KEY) ---
const dotenv = await loadEnv(join(HERE, '../../.env'));
const cfg = (k, d) => process.env[k] ?? dotenv[k] ?? d;

const API_BASE = cfg('SMOKE_API_BASE', 'http://localhost:3000/api/v1');
const API_KEY = cfg('FIREBASE_API_KEY');
const INSTRUCTOR_EMAIL = cfg('SMOKE_INSTRUCTOR_EMAIL');
const INSTRUCTOR_PASSWORD = cfg('SMOKE_INSTRUCTOR_PASSWORD');
const STUDENT_EMAIL = cfg('SMOKE_STUDENT_EMAIL');
const STUDENT_PASSWORD = cfg('SMOKE_STUDENT_PASSWORD');
const CATEGORY_ID = cfg('SMOKE_CATEGORY_ID');
const SAMPLE_VIDEO = cfg('SMOKE_SAMPLE_VIDEO'); // optional; generated if absent
const TRANSCODE_TIMEOUT_MS = Number(cfg('SMOKE_TRANSCODE_TIMEOUT_MS', '240000'));

let pass = 0;
let fail = 0;
const failures = [];
function ok(cond, label) {
  if (cond) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; failures.push(label); console.log(`  ✗ ${label}`); }
  return cond;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));



function requireConfig() {
  // SMOKE_CATEGORY_ID is optional — auto-created via the instructor if absent.
  const missing = Object.entries({
    FIREBASE_API_KEY: API_KEY,
    SMOKE_INSTRUCTOR_EMAIL: INSTRUCTOR_EMAIL,
    SMOKE_INSTRUCTOR_PASSWORD: INSTRUCTOR_PASSWORD,
    SMOKE_STUDENT_EMAIL: STUDENT_EMAIL,
    SMOKE_STUDENT_PASSWORD: STUDENT_PASSWORD,
  }).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error(`Missing required config: ${missing.join(', ')}\nSee test/streaming-e2e/README.md`);
    process.exit(2);
  }
}

/**
 * Call a Data Connect connector mutation directly (used only to auto-create a
 * throwaway category when SMOKE_CATEGORY_ID isn't supplied). Forwards the
 * instructor's real ID token, exactly like the app does.
 */
async function fdcMutation(operationName, variables, idToken) {
  const project = cfg('FIREBASE_PROJECT_ID', 'learning-management-syst-3cc3a');
  const location = cfg('FDC_LOCATION', 'europe-west8');
  const service = cfg('FDC_SERVICE_ID', `${project}-service`);
  const url =
    `https://firebasedataconnect.googleapis.com/v1beta/projects/${project}` +
    `/locations/${location}/services/${service}/connectors/default:executeMutation`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-firebase-auth-token': idToken,
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({ operationName, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json.errors && json.errors.length)) {
    throw new Error(`FDC ${operationName} failed: ${res.status} ${JSON.stringify(json.errors ?? json)}`);
  }
  return json.data;
}

async function loadEnv(path) {
  try {
    const raw = await readFile(path, 'utf8');
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) out[m[1]] = m[2];
    }
    return out;
  } catch {
    return {};
  }
}

async function signIn(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.idToken) {
    throw new Error(`Sign-in failed for ${email}: ${res.status} ${JSON.stringify(json.error ?? json)}`);
  }
  return json.idToken;
}

async function api(method, path, { token, json, expect } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(json ? { 'Content-Type': 'application/json' } : {}),
    },
    body: json ? JSON.stringify(json) : undefined,
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (expect && res.status !== expect) {
    console.log(`    [${method} ${path}] expected ${expect}, got ${res.status}: ${text.slice(0, 300)}`);
  }
  return { status: res.status, body, text };
}

async function generateSampleVideo() {
  const { default: ffmpegPath } = await import('ffmpeg-static');
  const dir = await mkdtemp(join(tmpdir(), 'smoke-vid-'));
  const out = join(dir, 'sample.mp4');
  await new Promise((resolve, reject) => {
    const p = spawn(ffmpegPath, [
      '-y',
      '-f', 'lavfi', '-i', 'testsrc=duration=6:size=320x240:rate=15',
      '-f', 'lavfi', '-i', 'sine=frequency=440:duration=6',
      '-c:v', 'libx264', '-c:a', 'aac', '-shortest', out,
    ]);
    p.on('error', reject);
    p.on('close', (c) => (c === 0 ? resolve() : reject(new Error(`ffmpeg exited ${c}`))));
  });
  return out;
}

async function main() {
  requireConfig();
  console.log('\n=== Streaming + progress E2E smoke ===');
  console.log(`API: ${API_BASE}\n`);

  // 0. Auth
  console.log('[auth]');
  const inst = await signIn(INSTRUCTOR_EMAIL, INSTRUCTOR_PASSWORD);
  const stud = await signIn(STUDENT_EMAIL, STUDENT_PASSWORD);
  ok(!!inst && !!stud, 'signed in instructor + student (real Firebase tokens)');

  // 1. Authoring
  console.log('\n[authoring]');

  // Resolve a category: use the supplied one, else auto-create a throwaway via
  // the instructor (AdminCreateCategory is instructor/admin role-gated).
  let categoryId = CATEGORY_ID;
  if (categoryId) {
    console.log(`  • using provided category ${categoryId}`);
  } else {
    const data = await fdcMutation(
      'AdminCreateCategory',
      { name: `Smoke Cat ${Date.now()}`, description: 'e2e smoke' },
      inst,
    );
    categoryId = data?.category_insert?.id;
    ok(!!categoryId, `auto-created category (${categoryId})`);
    if (!categoryId) return finish();
  }

  const course = await api('POST', '/courses', {
    token: inst,
    json: {
      title: `Smoke Course ${Date.now()}`, description: 'e2e', price: 0,
      language: 'en', level: 'BEGINNER', categoryId, tags: ['smoke'],
    },
  });
  const courseId = course.body?.course_insert?.id;
  ok(!!courseId, `created course (${courseId ?? course.status})`);
  if (!courseId) return finish();

  const section = await api('POST', `/courses/${courseId}/sections`, {
    token: inst, json: { title: 'Section 1' },
  });
  const sectionId = section.body?.courseSection_insert?.id;
  ok(!!sectionId, `created section (${sectionId ?? section.status})`);
  if (!sectionId) return finish();

  const lecture = await api('POST', `/courses/${courseId}/sections/${sectionId}/lectures`, {
    token: inst,
    json: { title: 'Lecture 1', type: 'VIDEO', videoUrl: 'pending-upload' },
  });
  const lectureId = lecture.body?.courseLecture_insert?.id;
  ok(!!lectureId, `created lecture (${lectureId ?? lecture.status})`);
  if (!lectureId) return finish();

  // 2. Upload the source MP4
  console.log('\n[upload]');
  const videoPath = SAMPLE_VIDEO ?? (await generateSampleVideo());
  const videoBytes = await readFile(videoPath);
  const signed = await api('POST', '/uploads/signed-url', {
    token: inst,
    json: {
      entityType: 'LECTURE_VIDEO', courseId, lectureId,
      filename: 'sample.mp4', contentType: 'video/mp4',
    },
  });
  const { uploadUrl, storagePath } = signed.body ?? {};
  ok(!!uploadUrl && !!storagePath, 'got signed upload URL');
  if (!uploadUrl) return finish();

  const put = await fetch(uploadUrl, {
    method: 'PUT', headers: { 'Content-Type': 'video/mp4' }, body: videoBytes,
  });
  ok(put.ok, `PUT video bytes to storage (${put.status})`);

  // 3. Confirm → auto-enqueue transcode
  console.log('\n[transcode]');
  const confirm = await api('POST', '/uploads/confirm', {
    token: inst,
    json: { entityType: 'LECTURE_VIDEO', courseId, lectureId, storagePath },
  });
  ok(!!confirm.body?.transcode?.jobId, `confirm auto-enqueued transcode (${confirm.body?.transcode?.status ?? 'undefined — full body: ' + JSON.stringify(confirm.body).slice(0, 500)})`);

  // 4. Poll transcode status
  const deadline = Date.now() + TRANSCODE_TIMEOUT_MS;
  let state = '';
  while (Date.now() < deadline) {
    const st = await api('GET', `/courses/${courseId}/lectures/${lectureId}/video/transcode/status`, { token: inst });
    state = st.body?.status;
    if (state === 'completed' || state === 'failed') break;
    await sleep(3000);
  }
  if (!ok(state === 'completed', `transcode completed (final state: ${state})`)) return finish();

  // 5. Publish
  console.log('\n[publish]');
  const pub = await api('PATCH', `/courses/${courseId}/status`, { token: inst, json: { status: 'PUBLISHED' } });
  ok(pub.status < 300, `published course (${pub.status})`);

  // 5b. NEGATIVE: a not-yet-enrolled student must be denied the manifest.
  console.log('\n[negative access]');
  const denied = await api('GET', `/lectures/${lectureId}/stream/manifest`, { token: stud });
  ok(denied.status === 403, `non-enrolled student blocked from manifest (got ${denied.status}, want 403)`);

  // 5c. Enroll
  const enroll = await api('POST', `/courses/${courseId}/enroll`, { token: stud });
  ok(enroll.status < 300, `student enrolled (${enroll.status})`);

  // 6. Secure streaming (as student)
  console.log('\n[streaming]');
  const wm = await api('GET', `/lectures/${lectureId}/stream/watermark`, { token: stud });
  ok(!!wm.body?.signature && !!wm.body?.text, 'watermark payload issued (signed)');

  const manifest = await api('GET', `/lectures/${lectureId}/stream/manifest`, { token: stud });
  const m3u8 = manifest.text ?? '';
  ok(m3u8.includes('#EXTM3U'), 'manifest is a valid HLS playlist');
  const ktMatch = m3u8.match(/[?&]kt=([^"'\s&]+)/);
  ok(!!ktMatch, 'manifest embeds a key token (kt)');
  const segMatch = m3u8.split(/\r?\n/).find((l) => /^https?:\/\//.test(l) && !l.includes('/stream/'));
  ok(!!segMatch, 'manifest segments rewritten to signed URLs');

  if (ktMatch) {
    const key = await fetch(`${API_BASE}/lectures/${lectureId}/stream/key?kt=${ktMatch[1]}`, {
      headers: { Authorization: `Bearer ${stud}` },
    });
    const keyBytes = Buffer.from(await key.arrayBuffer());
    ok(key.ok && keyBytes.length === 16, `key endpoint returns 16-byte AES key (${keyBytes.length} bytes)`);

    // NEGATIVE: the key token is bound to the student's uid — presenting it with
    // a DIFFERENT caller's token (here the instructor, who even owns the course)
    // must be rejected by the binding check before any access check runs.
    const crossUser = await fetch(`${API_BASE}/lectures/${lectureId}/stream/key?kt=${ktMatch[1]}`, {
      headers: { Authorization: `Bearer ${inst}` },
    });
    ok(crossUser.status === 403, `key token rejected for a different caller (got ${crossUser.status}, want 403)`);
  }
  if (segMatch) {
    const seg = await fetch(segMatch);
    ok(seg.ok, `signed segment URL is fetchable (${seg.status})`);
  }

  // 7. Progress (async 202 → worker → completion)
  console.log('\n[progress]');
  const prog = await api('POST', `/lectures/${lectureId}/progress`, {
    token: stud, json: { lastWatchedSecond: 100000, watchedSeconds: 30 },
  });
  ok(prog.status === 202, `POST progress returns 202 Accepted (${prog.status})`);

  // give the worker time to drain
  let progressRow;
  for (let i = 0; i < 10; i++) {
    await sleep(1500);
    const got = await api('GET', `/lectures/${lectureId}/progress`, { token: stud });
    progressRow = got.body;
    if (progressRow?.completedAt) break;
  }
  ok((progressRow?.lastWatchedSecond ?? 0) > 0, `worker persisted progress (lastWatchedSecond=${progressRow?.lastWatchedSecond})`);
  ok(!!progressRow?.completedAt, `lecture auto-marked complete (>=90% rule) — completedAt=${progressRow?.completedAt}`);

  const courseProg = await api('GET', `/courses/${courseId}/progress`, { token: stud });
  ok(typeof courseProg.body?.overallPercentage === 'number', `course progress aggregated (${courseProg.body?.overallPercentage}%)`);

  finish();
}

function finish() {
  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  if (fail > 0) {
    console.log('FAILURES:\n - ' + failures.join('\n - '));
    process.exit(1);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('\nSmoke harness crashed:', e);
  process.exit(1);
});
