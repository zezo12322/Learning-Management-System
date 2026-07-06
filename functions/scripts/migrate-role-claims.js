/**
 * ONE-OFF MIGRATION — normalize role custom claims to the `roles` array.
 *
 * Background: roles used to be represented three ways in custom claims
 * (`roles` array + legacy `role` string + `admin` bool). The backend guards
 * honored all three, so a stale legacy claim left after a demotion could keep
 * granting admin. We now treat the `roles` array as the single source of truth
 * (Data Connect already did). This script rewrites every user's claims to match
 * their authoritative DB roles (UserRole table) and STRIPS the legacy fields.
 *
 * Safe to re-run (idempotent). Users get the new token on their next refresh.
 *
 * Usage (from functions/):
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json node scripts/migrate-role-claims.js [--dry-run]
 */
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");

const DRY_RUN = process.argv.includes("--dry-run");

admin.initializeApp();

const adminDC = getDataConnect({
  serviceId: "learning-management-syst-3cc3a-service",
  location: "europe-west8",
});

const ROLES_QUERY = /* GraphQL */ `
  query getUserRoles($uid: String!) {
    user(id: $uid) {
      userRoles_on_user { role { name } }
    }
  }
`;

/** Resolve a user's authoritative roles from the relational UserRole table. */
async function dbRolesFor(uid) {
  const res = await adminDC.executeGraphql(ROLES_QUERY, { variables: { uid } });
  const rows = res.data?.user?.userRoles_on_user ?? [];
  const roles = rows
    .map((r) => r?.role?.name)
    .filter((n) => typeof n === "string" && n.trim())
    .map((n) => n.trim().toLowerCase());
  // Every principal is at least a student; de-dup.
  return Array.from(new Set(roles.length ? roles : ["student"]));
}

async function migrateUser(user) {
  const roles = await dbRolesFor(user.uid);
  const existing = user.customClaims || {};
  // Strip legacy single-role claims; preserve everything else (e.g. companyId).
  const newClaims = Object.assign({}, existing);
  delete newClaims.role;
  delete newClaims.admin;
  newClaims.roles = roles;

  const before = JSON.stringify({ roles: existing.roles, role: existing.role, admin: existing.admin });
  const after = JSON.stringify({ roles });
  const changed = before !== JSON.stringify({ roles }) ||
    existing.role !== undefined || existing.admin !== undefined;

  if (!changed) {
    console.log(`• ${user.uid} (${user.email || "no-email"}) — already normalized (${after})`);
    return { changed: false };
  }

  console.log(`→ ${user.uid} (${user.email || "no-email"}): ${before}  ⇒  ${after}`);
  if (!DRY_RUN) {
    await admin.auth().setCustomUserClaims(user.uid, newClaims);
  }
  return { changed: true };
}

async function main() {
  console.log(`\n🔧 Role-claim migration ${DRY_RUN ? "(DRY RUN — no writes)" : "(LIVE)"}\n`);
  let nextPageToken;
  let total = 0;
  let changed = 0;

  do {
    const page = await admin.auth().listUsers(1000, nextPageToken);
    for (const user of page.users) {
      total += 1;
      try {
        const res = await migrateUser(user);
        if (res.changed) changed += 1;
      } catch (err) {
        console.error(`❌ ${user.uid}: ${err.message}`);
      }
    }
    nextPageToken = page.pageToken;
  } while (nextPageToken);

  console.log(`\n✅ Done. Scanned ${total} users, ${changed} ${DRY_RUN ? "would be updated" : "updated"}.\n`);
}

main().then(() => process.exit(0)).catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
