const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");
const { z } = require("zod");

// Internal Modular Dependencies
const RateLimiter = require("./rateLimiter");
const { requireRole } = require("./authUtils");

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
    // Explicit OWASP defined special character matrix
    .regex(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, "Password must contain at least one special character.")
});

// ============================================================================
// BACKGROUND HANDLER 1: THE OAUTH CLAIM SYNC & AUTO-PROVISIONER
// Triggers when a user authenticates via third-party providers (Google, GitHub, etc.)
// Reconciles token claims with database persistence states.
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

    // Provision row if account bypasses the application registration endpoint
    if (!userData) {
      console.log(`⚠️ [NEW OAUTH USER] UID: ${user.uid} absent from relational storage. Executing creation...`);

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

      console.log(`🎉 [SUCCESS] Relational record created and default student claims attached.`);
      return;
    }

    // Map existing identities back down into the authorization token
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
// Validates parameters via Zod schema, checks IP rate constraints, provisions 
// identity inside Auth and inserts target entity inside PostgreSQL.
// ============================================================================
exports.registerStudent = functions.region('europe-west3').https.onCall(async (data, context) => {
  // 1. IP-Based Rate Limiter Verification
  const rawIp = context.rawRequest.ip || "unknown-ip";
  try {
    // Upper threshold limit: Max 10 executions per minute per source IP
    await RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
  } catch (error) {
    if (error.message === 'RATE_LIMIT_EXCEEDED') {
      console.warn(`🚨 [SECURITY] Execution rate exceeded for IP: ${rawIp}`);
      throw new functions.https.HttpsError('resource-exhausted', 'Too many attempts. Please slow down.');
    }
    console.error("⚠️ [WARNING] Rate Limiter failure:", error);
  }

  // 2. Schema Structure Verification
  let validatedData;
  try {
    validatedData = registrationSchema.parse(data);
  } catch (error) {
    console.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
    throw new functions.https.HttpsError('invalid-argument', error.errors[0].message);
  }

  const { email, password, name } = validatedData;
  console.log(`🚀 [START] Structured registration handling for: ${email}`);

  try {
    // 3. Provision Core Identity Object
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    const uid = userRecord.uid;
    console.log(`✅ [AUTH] Base account identity instantiated: ${uid}`);

    // 4. Provision Related Persistent State Records
    const insertMutation = `
          mutation createDefaultUser($uid: String!, $email: String!, $name: String!) {
            user_insert(data: { id: $uid, email: $email, name: $name })
          }
        `;
    await adminDC.executeGraphql(insertMutation, {
      variables: { uid, email, name }
    });
    console.log(`✅ [DB INSERT] Relational database persistence mapped.`);

    // 5. Append Explicit Scopes
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
// BACKGROUND HANDLER 2: CASCADING SYSTEM DELETION WIPE
// Fires asynchronously when a user entity is purged from Firebase Auth.
// Removes corresponding relational tuples and binary object files from storage.
// ============================================================================
exports.cleanupUserData = functions.region('europe-west3').auth.user().onDelete(async (user) => {
  console.log(`🗑️ [START] Purge cascade execution initialized for UID: ${user.uid}`);

  try {
    // 1. Database Row Level Extraction
    const deleteMutation = `
          mutation deleteUserRecord($uid: String!) {
            user_delete(id: $uid)
          }
        `;

    console.log(`📡 [DB PURGE] Removing primary records matching identifier...`);
    await adminDC.executeGraphql(deleteMutation, {
      variables: { uid: user.uid }
    });
    console.log(`✅ [SUCCESS] Relational row data wiped.`);

    // 2. Binary Object Blob Subtree Removal
    console.log(`🧹 [STORAGE PURGE] Purging structural objects inside users/${user.uid}/...`);
    const bucket = admin.storage().bucket();

    await bucket.deleteFiles({
      prefix: `users/${user.uid}/`
    });
    console.log(`✅ [SUCCESS] System environment space reclaimed completely.`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR inside cleanupUserData]", error);
  }
});

// ============================================================================
// CALLABLE ENDPOINT 2: SECURE CONTENT INGESTION PIPELINE (PUBLISH COURSE)
// Gatekept via token verification middleware. Restricts usage to elevated
// administrative and instructor level custom scopes.
// ============================================================================
exports.publishCourse = functions.region('europe-west3').https.onCall(async (data, context) => {

  // 1. RBAC Token Enforcement Layer
  requireRole(context, ['admin', 'instructor']);

  console.log(`✅ [RBAC VALIDATED] Client execution context approved for UID: ${context.auth.uid}`);

  // 2. Payload Schema Processing 
  // (Integrate additional course verification schema definitions here)

  // 3. Data Connect Mutation Target Handling
  // ...

  return { success: true };
});