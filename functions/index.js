const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");

admin.initializeApp();

const adminDC = getDataConnect({
    serviceId: 'learning-management-syst-3cc3a-service',
    location: 'europe-west8' // Make sure this matches your Data Connect region!
});

exports.syncClaims = functions.region('europe-west3').auth.user().onCreate(async (user) => {
    console.log(`🚀 [START] Triggered for UID: ${user.uid}`);

    try {
        // Note: If your schema uses UUID instead of String, change $uid: String! to $uid: UUID!
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

        console.log(`📡 [NETWORK] Sending GraphQL query to Data Connect...`);
        const response = await adminDC.executeGraphql(query, {
            variables: { uid: user.uid }
        });

        console.log(`📦 [DB RESPONSE]`, JSON.stringify(response));

        const userData = response.data?.user;

        if (!userData) {
            console.warn(`⚠️ [WARNING] No user found in Production Database for UID: ${user.uid}. Did you insert this into the local emulator instead of production?`);
            return;
        }

        // Safely extract roles, defaulting to an empty array if no roles are assigned yet
        const roles = userData.userRoles_on_user ? userData.userRoles_on_user.map(ur => ur.role.name) : [];
        const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

        const claims = { roles, companyId };
        console.log(`✅ [CLAIMS READY] Preparing to attach:`, claims);

        await admin.auth().setCustomUserClaims(user.uid, claims);
        console.log(`🎉 [SUCCESS] Claims attached to Auth successfully!`);

    } catch (error) {
        console.error("❌ [CRITICAL ERROR]", error);
    }
});