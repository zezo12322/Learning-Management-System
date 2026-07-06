const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");
const { z } = require("zod");

// Internal Modular Dependencies
const RateLimiter = require("./rateLimiter");
const { requireRole } = require("./authUtils");
const EncryptionService = require("./encryptionService");

// ============================================================================
// INITIALIZATION
// ============================================================================
admin.initializeApp();

// Target connection for PostgreSQL via Data Connect
const adminDC = getDataConnect({
  serviceId: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
});

// ============================================================================
// SCHEMAS & DATA VALIDATION (Zod)
// ============================================================================
const registrationSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name cannot exceed 50 characters.")
    .trim(),

  email: z.string()
    .email("Please provide a valid email address.")
    .toLowerCase()
    .trim(),

  password: z.string()
    .min(8, "Password must be at least 8 characters long.")
    .max(64, "Password cannot exceed 64 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, "Password must contain at least one special character."),

  nationalId: z.string().length(14, "National ID must be exactly 14 digits.")
});

const roleChangeSchema = z.object({
  targetUid: z.string().min(1, "Target UID is required."),
  newRole: z.enum(['student', 'instructor', 'admin'], {
    errorMap: () => ({ message: "Invalid role specified." })
  })
});

// Database UUID Mapping
const ROLE_IDS = {
  'admin': '00000000-0000-0000-0000-000000000004',
  'instructor': '00000000-0000-0000-0000-000000000005',
  'student': '00000000-0000-0000-0000-000000000006'
};

// ============================================================================
// BACKGROUND HANDLER 1: THE OAUTH CLAIM SYNC & AUTO-PROVISIONER
// ============================================================================
exports.syncClaims = functions.region('europe-west3').auth.user().onCreate(async (user) => {
  console.log(`🚀 [START] syncClaims triggered for UID: ${user.uid}`);

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

    if (!userData) {
      console.log(`⚠️ [NEW OAUTH USER] UID: ${user.uid} absent from relational storage. Executing creation...`);

      const userEmail = user.email || `no-email-${user.uid}@example.com`;
      const userName = user.displayName || "New Student";

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
        variables: { uid: user.uid, email: userEmail, name: userName }
      });

      const defaultClaims = { roles: ['student'], companyId: null };
      await admin.auth().setCustomUserClaims(user.uid, defaultClaims);

      console.log(`🎉 [SUCCESS] Relational record created, profile setup, and roles attached.`);
      return;
    }

    const roles = userData.userRoles_on_user ? userData.userRoles_on_user.map(ur => ur.role.name) : [];
    const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

    const claims = { roles, companyId };
    await admin.auth().setCustomUserClaims(user.uid, claims);
    console.log(`🎉 [SUCCESS] Custom verification claims synced to token.`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR inside syncClaims]", error);
  }
});

// ============================================================================
// CALLABLE ENDPOINT 1: STUDENT REGISTRATION PIPELINE
// ============================================================================
exports.registerStudent = functions
  .region('europe-west3')
  .runWith({ secrets: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "APP_ENCRYPTION_KEY"] })
  .https.onCall(async (data, context) => {

    const rawIp = context.rawRequest.ip || "unknown-ip";
    try {
      await RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
    } catch (error) {
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        console.warn(`🚨 [SECURITY] Execution rate exceeded for IP: ${rawIp}`);
        throw new functions.https.HttpsError('resource-exhausted', 'Too many attempts. Please slow down.');
      }
      console.error("⚠️ [WARNING] Rate Limiter failure:", error);
    }

    let validatedData;
    try {
      validatedData = registrationSchema.parse(data);
    } catch (error) {
      console.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
      throw new functions.https.HttpsError('invalid-argument', error.errors[0].message);
    }

    const { email, password, name, nationalId } = validatedData;
    console.log(`🚀 [START] Structured registration handling for: ${email}`);

    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
      });
      const uid = userRecord.uid;
      console.log(`✅ [AUTH] Base account identity instantiated: ${uid}`);

      const safeNationalId = EncryptionService.encrypt(nationalId, process.env.APP_ENCRYPTION_KEY);

      const insertMutation = `
              mutation createDefaultUser($uid: String!, $email: String!, $name: String!, $nid: String!) {
                user_insert(data: { 
                    id: $uid, 
                    email: $email, 
                    name: $name,
                    encryptedNationalId: $nid
                })

                userRole_insert(data: { 
                    userId: $uid, 
                    roleId: "00000000-0000-0000-0000-000000000006" 
                })
              }
            `;
      await adminDC.executeGraphql(insertMutation, {
        variables: { uid, email, name, nid: safeNationalId }
      });
      console.log(`✅ [DB INSERT] Relational database persistence mapped.`);

      const defaultClaims = { roles: ['student'], companyId: null };
      await admin.auth().setCustomUserClaims(uid, defaultClaims);

      console.log(`🎉 [SUCCESS] Pipeline transaction resolved successfully.`);
      return { success: true, uid: uid };

    } catch (error) {
      console.error("❌ [API ERROR inside registerStudent]", error);
      if (error.code) {
        throw new functions.https.HttpsError('already-exists', error.message);
      }
      throw new functions.https.HttpsError('internal', 'Backend transaction failure during execution.');
    }
  });

// ============================================================================
// CALLABLE ENDPOINT 2: ROLE MANAGEMENT PIPELINE (ADMIN ONLY)
// ============================================================================
exports.changeUserRole = functions
  .region('europe-west3')
  .runWith({ secrets: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"] })
  .https.onCall(async (data, context) => {

    const callerUid = context.auth?.uid;
    try {
      await RateLimiter.checkLimit(`uid_${callerUid}`, 20, "1 m");
    } catch (error) {
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        throw new functions.https.HttpsError('resource-exhausted', 'Too many attempts.');
      }
    }

    requireRole(context, ['admin']);

    let validatedData;
    try {
      validatedData = roleChangeSchema.parse(data);
    } catch (error) {
      throw new functions.https.HttpsError('invalid-argument', error.errors[0].message);
    }

    const { targetUid, newRole } = validatedData;
    const newRoleId = ROLE_IDS[newRole];

    if (callerUid === targetUid) {
      throw new functions.https.HttpsError('permission-denied', 'Administrators cannot change their own roles.');
    }

    console.log(`🛡️ [ADMIN ACTION] UID ${callerUid} is changing UID ${targetUid} to ${newRole}`);

    try {
      const fetchQuery = `
                query getTargetUserRoles($uid: String!) {
                    user(id: $uid) {
                        userRoles_on_user {
                            roleId
                        }
                    }
                }
            `;
      const userRes = await adminDC.executeGraphql(fetchQuery, { variables: { uid: targetUid } });
      const currentRoles = userRes.data?.user?.userRoles_on_user || [];

      for (const currentRole of currentRoles) {
        const deleteMutation = `
                    mutation removeRole($uid: String!, $roleId: UUID!) {
                        userRole_delete(key: { userId: $uid, roleId: $roleId })
                    }
                `;
        await adminDC.executeGraphql(deleteMutation, {
          variables: { uid: targetUid, roleId: currentRole.roleId }
        });
      }

      const insertMutation = `
                mutation assignNewRole($uid: String!, $roleId: UUID!) {
                    userRole_insert(data: { userId: $uid, roleId: $roleId })
                }
            `;
      await adminDC.executeGraphql(insertMutation, {
        variables: { uid: targetUid, roleId: newRoleId }
      });

      const userRecord = await admin.auth().getUser(targetUid);
      const currentClaims = userRecord.customClaims || {};

      const newClaims = {
        ...currentClaims,
        roles: [newRole]
      };
      await admin.auth().setCustomUserClaims(targetUid, newClaims);

      console.log(`🎉 [SUCCESS] Role fully synchronized across Database and Token.`);
      return { success: true, message: `User successfully updated to ${newRole}.` };

    } catch (error) {
      console.error("❌ [API ERROR inside changeUserRole]", error);
      if (error.code === 'auth/user-not-found') {
        throw new functions.https.HttpsError('not-found', 'The requested user does not exist.');
      }
      throw new functions.https.HttpsError('internal', 'Backend transaction failure during role update.');
    }
  });

// ============================================================================
// BACKGROUND HANDLER 2: CASCADING SYSTEM DELETION WIPE
// ============================================================================
exports.cleanupUserData = functions.region('europe-west3').auth.user().onDelete(async (user) => {
  console.log(`🗑️ [START] Purge cascade execution initialized for UID: ${user.uid}`);

  try {
    const deleteMutation = `
          mutation deleteUserRecord($uid: String!) {
            user_delete(id: $uid)
          }
        `;

    await adminDC.executeGraphql(deleteMutation, {
      variables: { uid: user.uid }
    });
    console.log(`✅ [SUCCESS] Relational row data wiped.`);

    const bucket = admin.storage().bucket();
    await bucket.deleteFiles({
      prefix: `users/${user.uid}/`
    });
    console.log(`✅ [SUCCESS] System environment space reclaimed completely.`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR inside cleanupUserData]", error);
  }
});