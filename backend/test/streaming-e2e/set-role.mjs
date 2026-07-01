/**
 * One-shot helper: grant a Firebase user a role custom claim, using the backend
 * service account directly (no pre-existing admin required).
 *
 *   node test/streaming-e2e/set-role.mjs <email> [role]
 *   node test/streaming-e2e/set-role.mjs inst@you.com instructor
 *   node test/streaming-e2e/set-role.mjs me@you.com admin
 *
 * The user must already exist in Firebase Authentication. After running, the
 * user must obtain a FRESH token for the claim to take effect — the smoke test
 * signs in fresh each run, so that's automatic there.
 */
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const HERE = dirname(fileURLToPath(import.meta.url));
const email = process.argv[2];
const role = process.argv[3] ?? 'instructor';

if (!email) {
  console.error('Usage: node test/streaming-e2e/set-role.mjs <email> [role]');
  process.exit(2);
}

const saPath = join(HERE, '../../firebase-service-account.json');
const sa = JSON.parse(await readFile(saPath, 'utf8'));
initializeApp({ credential: cert(sa) });

const user = await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid, { role, admin: role === 'admin' });
console.log(`✓ Set role="${role}" (admin=${role === 'admin'}) on ${email} — uid ${user.uid}`);
console.log('  The user must sign in again to pick up the new claim.');
