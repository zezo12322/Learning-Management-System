/**
 * One-time script: set custom claims (role) on Firebase Auth users
 * so DataConnect @auth rules recognise them.
 *
 * Usage:  node test/streaming-e2e/set-claims.mjs
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));

// Load service account
const saPath = join(HERE, '../../firebase-service-account.json');
const sa = JSON.parse(await readFile(saPath, 'utf8'));

initializeApp({ credential: cert(sa) });
const auth = getAuth();

// Load .env for the emails
const envRaw = await readFile(join(HERE, '../../.env'), 'utf8');
const env = {};
for (const line of envRaw.split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (m) env[m[1]] = m[2];
}

const instructorEmail = env.SMOKE_INSTRUCTOR_EMAIL;
const studentEmail = env.SMOKE_STUDENT_EMAIL;

async function setClaim(email, role) {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { role });
  console.log(`✓ ${email} (uid: ${user.uid}) → role: ${role}`);
}

await setClaim(instructorEmail, 'instructor');
await setClaim(studentEmail, 'student');

console.log('\nDone! Users must sign in again to pick up new claims.');
console.log('Re-run:  npm run test:e2e:stream');
