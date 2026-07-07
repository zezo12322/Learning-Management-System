/**
 * @fileoverview Firebase Authentication Background Triggers.
 *
 * These functions run automatically in the background when specific Auth
 * events occur (e.g., a user signing up or deleting their account).
 */

const functions = require("firebase-functions/v1");
const {admin, adminDC} = require("../config/firebase");

/**
 * TRIGGER: onCreate
 *
 * Syncs the user's roles from the PostgreSQL database into their Firebase
 * ID Token via Custom Claims. If a user logs in via OAuth (e.g. Google)
 * and doesn't exist in the database yet, this creates a default 'student'
 * profile for them automatically.
 */
exports.syncClaims = functions.region("europe-west3").auth.user().onCreate(async (user) => {
  console.log(`🚀 [START] syncClaims triggered for UID: ${user.uid}`);

  try {
    // Check if the user exists in PostgreSQL (Data Connect)
    const query = `
      query getUserClaims($uid: String!) {
        user(id: $uid) {
          userRoles_on_user {
            role {
              name
            }
          }
          profile_on_user {
            company
          }
        }
      }
    `;

    const response = await adminDC.executeGraphql(query, {
      variables: {uid: user.uid},
    });

    const userData = response.data?.user;

    // If the user does not exist in Postgres (e.g., first time Google Login)
    if (!userData) {
      console.log(`⚠️ [NEW OAUTH USER] UID: ${user.uid} absent from relational storage. Executing creation...`);

      const userEmail = user.email || `no-email-${user.uid}@example.com`;
      const userName = user.displayName || "New Student";

      // Execute a GraphQL mutation to provision the user row, profile row, and student role row.
      const insertMutation = `
          mutation createDefaultUserAndProfile($uid: String!, $email: String!, $name: String!) {
            user_insert(data: { id: $uid, email: $email, name: $name })
            profile_insert(data: { userId: $uid, bio: "", company: "", phone: "" })
            
            userRole_insert(data: { 
                userId: $uid, 
                roleId: "00000000-0000-0000-0000-000000000006" 
            })
          }
        `;

      await adminDC.executeGraphql(insertMutation, {
        variables: {uid: user.uid, email: userEmail, name: userName},
      });

      // Assign the default claims manually since the DB trigger is catching up
      const defaultClaims = {roles: ["student"], companyId: null};
      await admin.auth().setCustomUserClaims(user.uid, defaultClaims);

      console.log(`🎉 [SUCCESS] Relational record created, profile setup, and roles attached.`);
      return;
    }

    // Normal scenario: Extract roles and sync them to Firebase Auth
    const roles = userData.userRoles_on_user ? userData.userRoles_on_user.map((ur) => ur.role.name) : [];
    const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

    const claims = {roles, companyId};
    await admin.auth().setCustomUserClaims(user.uid, claims);
    console.log(`🎉 [SUCCESS] Custom verification claims synced to token.`);
  } catch (error) {
    console.error("❌ [CRITICAL ERROR inside syncClaims]", error);
  }
});

/**
 * TRIGGER: onDelete
 *
 * A cascading deletion script. When a user is deleted from Firebase Auth,
 * this function securely wipes their corresponding PostgreSQL record and
 * purges all their files from Firebase Cloud Storage.
 */
exports.cleanupUserData = functions.region("europe-west3").auth.user().onDelete(async (user) => {
  console.log(`🗑️ [START] Purge cascade execution initialized for UID: ${user.uid}`);

  try {
    // 1. Delete relational data
    const deleteMutation = `
          mutation deleteUserRecord($uid: String!) {
            user_delete(id: $uid)
          }
        `;

    await adminDC.executeGraphql(deleteMutation, {
      variables: {uid: user.uid},
    });
    console.log(`✅ [SUCCESS] Relational row data wiped.`);

    // 2. Wipe Storage files associated with the user
    const bucket = admin.storage().bucket();
    await bucket.deleteFiles({
      prefix: `users/${user.uid}/`,
    });
    console.log(`✅ [SUCCESS] System environment space reclaimed completely.`);
  } catch (error) {
    console.error("❌ [CRITICAL ERROR inside cleanupUserData]", error);
  }
});
