const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");

// ==========================================
// INITIALIZATION
// ==========================================
admin.initializeApp();

const adminDC = getDataConnect({
  serviceId: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
});

// ==========================================
// FUNCTION 1: THE OAUTH SAFETY NET
// Automatically handles users who sign up via Google
// ==========================================
exports.syncClaims = functions.region('europe-west3').auth.user().onCreate(async (user) => {
  console.log(`🚀 [START] Triggered for UID: ${user.uid}`);

  try {
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
      variables: { uid: user.uid }
    });

    const userData = response.data?.user;

    // The Automation Block for missing users
    if (!userData) {
      console.log(`⚠️ [NEW USER] UID: ${user.uid} not in DB. Executing creation mutation...`);

      const userEmail = user.email || `no-email-${user.uid}@example.com`;
      const userName = user.displayName || "New Student";

      const insertMutation = `
          mutation createDefaultUser($uid: String!, $email: String!, $name: String!) {
            user_insert(data: { id: $uid, email: $email, name: $name })
          }
        `;

      await adminDC.executeGraphql(insertMutation, {
        variables: { uid: user.uid, email: userEmail, name: userName }
      });

      const defaultClaims = { roles: ['student'], companyId: null };
      await admin.auth().setCustomUserClaims(user.uid, defaultClaims);

      console.log(`🎉 [SUCCESS] Default Student claims attached via syncClaims!`);
      return;
    }

    // Standard Claims Mapping for existing users
    const roles = userData.userRoles_on_user ? userData.userRoles_on_user.map(ur => ur.role.name) : [];
    const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

    const claims = { roles, companyId };
    await admin.auth().setCustomUserClaims(user.uid, claims);
    console.log(`🎉 [SUCCESS] Custom claims attached to Auth successfully!`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR in syncClaims]", error);
  }
});


// ==========================================
// FUNCTION 2: THE EMAIL/PASSWORD API
// The endpoint your frontend will call to register users with a real name
// ==========================================
exports.registerStudent = functions.region('europe-west3').https.onCall(async (data, context) => {
  const { email, password, name } = data;

  // Strict backend validation
  if (!email || !password || !name) {
    throw new functions.https.HttpsError('invalid-argument', 'Email, password, and name are strictly required.');
  }

  console.log(`🚀 [START] API Registration for: ${email}`);

  try {
    // 1. Create the Auth account WITH the name attached instantly
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    const uid = userRecord.uid;
    console.log(`✅ [AUTH] Account created: ${uid}`);

    // 2. Insert the exact data into PostgreSQL
    const insertMutation = `
          mutation createDefaultUser($uid: String!, $email: String!, $name: String!) {
            user_insert(data: { id: $uid, email: $email, name: $name })
          }
        `;

    await adminDC.executeGraphql(insertMutation, {
      variables: { uid, email, name }
    });
    console.log(`✅ [DB INSERT] PostgreSQL record created for ${name}`);

    // 3. Attach the default student claims
    const defaultClaims = { roles: ['student'], companyId: null };
    await admin.auth().setCustomUserClaims(uid, defaultClaims);

    console.log(`🎉 [SUCCESS] Registration complete via registerStudent API!`);

    // 4. Return a success signal to the frontend
    return {
      success: true,
      uid: uid
    };

  } catch (error) {
    console.error("❌ [API ERROR in registerStudent]", error);

    if (error.code) {
      throw new functions.https.HttpsError('already-exists', error.message);
    }
    throw new functions.https.HttpsError('internal', 'Backend registration failed.');
  }
});