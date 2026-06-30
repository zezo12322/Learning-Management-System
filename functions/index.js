const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getDataConnect } = require("firebase-admin/data-connect");
const { z } = require("zod");

// Import our custom Rate Limiter service (Adapter Pattern)
const RateLimiter = require("./rateLimiter");

// ============================================================================
// INITIALIZATION
// ============================================================================
admin.initializeApp();

// Initialize Firebase Data Connect (PostgreSQL connection)
const adminDC = getDataConnect({
  serviceId: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
});

// ============================================================================
// SCHEMAS & VALIDATION (Zod)
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
    // The officially defined OWASP special character set
    .regex(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, "Password must contain at least one special character.")
});

// ============================================================================
// FUNCTION 1: THE OAUTH SAFETY NET (Background Trigger)
// Catches users who bypass the frontend form by using Google/GitHub/Apple login.
// Ensures they are added to the database and given the default 'student' role.
// ============================================================================
exports.syncClaims = functions.region('europe-west3').auth.user().onCreate(async (user) => {
  console.log(`🚀 [START] syncClaims triggered for UID: ${user.uid}`);

  try {
    // 1. Check if the user already exists in PostgreSQL
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

    // 2. If missing (OAuth signup), create their DB record and assign 'student'
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

    // 3. If they exist (e.g., an Admin logged in), sync their existing DB roles to their Auth Token
    const roles = userData.userRoles_on_user ? userData.userRoles_on_user.map(ur => ur.role.name) : [];
    const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

    const claims = { roles, companyId };
    await admin.auth().setCustomUserClaims(user.uid, claims);
    console.log(`🎉 [SUCCESS] Custom claims synced to Auth successfully!`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR in syncClaims]", error);
  }
});


// ============================================================================
// FUNCTION 2: REGISTRATION API (Callable HTTPS)
// The endpoint your frontend calls to register a user with Email/Password.
// Protected by IP-based Rate Limiting and strict Zod input validation.
// ============================================================================
exports.registerStudent = functions.region('europe-west3').https.onCall(async (data, context) => {
  // 1. RATE LIMITING CHECK
  const rawIp = context.rawRequest.ip || "unknown-ip";
  try {
    // Enforce: Max 10 requests per 1 minute (60,000 ms) per IP address
    await RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
  } catch (error) {
    if (error.message === 'RATE_LIMIT_EXCEEDED') {
      console.warn(`🚨 [SECURITY] Registration IP limit exceeded: ${rawIp}`);
      throw new functions.https.HttpsError('resource-exhausted', 'Too many attempts. Please slow down.');
    }
    console.error("⚠️ [WARNING] Rate limiter service failure:", error);
  }

  // 2. STRICT DATA VALIDATION (Zod)
  let validatedData;
  try {
    console.log(`🛡️ [VALIDATION] Checking input schema...`);
    validatedData = registrationSchema.parse(data);
  } catch (error) {
    console.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
    // Throw the specific Zod error message back to the frontend UI
    throw new functions.https.HttpsError('invalid-argument', error.errors[0].message);
  }

  const { email, password, name } = validatedData;
  console.log(`🚀 [START] API Registration for: ${email}`);

  try {
    // 3. CREATE FIREBASE AUTH ACCOUNT
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    const uid = userRecord.uid;
    console.log(`✅ [AUTH] Account created: ${uid}`);

    // 4. CREATE POSTGRESQL RECORD
    const insertMutation = `
          mutation createDefaultUser($uid: String!, $email: String!, $name: String!) {
            user_insert(data: { id: $uid, email: $email, name: $name })
          }
        `;
    await adminDC.executeGraphql(insertMutation, {
      variables: { uid, email, name }
    });
    console.log(`✅ [DB INSERT] PostgreSQL record created for ${name}`);

    // 5. ATTACH DEFAULT ROLES
    const defaultClaims = { roles: ['student'], companyId: null };
    await admin.auth().setCustomUserClaims(uid, defaultClaims);

    console.log(`🎉 [SUCCESS] Registration complete via registerStudent API!`);

    return { success: true, uid: uid };

  } catch (error) {
    console.error("❌ [API ERROR in registerStudent]", error);
    if (error.code) {
      throw new functions.https.HttpsError('already-exists', error.message);
    }
    throw new functions.https.HttpsError('internal', 'Backend registration failed.');
  }
});


// ============================================================================
// FUNCTION 3: DELETION CASCADE (Background Trigger)
// Automatically fires when a user clicks "Delete Account" or an Admin removes them.
// Keeps the system perfectly clean by wiping orphaned data and ghost files.
// ============================================================================
exports.cleanupUserData = functions.region('europe-west3').auth.user().onDelete(async (user) => {
  console.log(`🗑️ [START] Deletion cascade triggered for UID: ${user.uid}`);

  try {
    // 1. WIPE POSTGRESQL DATABASE
    const deleteMutation = `
          mutation deleteUserRecord($uid: String!) {
            user_delete(id: $uid)
          }
        `;

    console.log(`📡 [DB DELETE] Removing PostgreSQL records for ${user.email}...`);
    await adminDC.executeGraphql(deleteMutation, {
      variables: { uid: user.uid }
    });
    console.log(`✅ [SUCCESS] PostgreSQL records wiped for ${user.uid}`);

    // 2. WIPE CLOUD STORAGE FILES
    console.log(`🧹 [STORAGE] Searching for physical files under users/${user.uid}/...`);
    const bucket = admin.storage().bucket();

    // This recursively deletes the user's folder and every avatar/PDF inside it
    await bucket.deleteFiles({
      prefix: `users/${user.uid}/`
    });
    console.log(`✅ [SUCCESS] All physical storage files vaporized for ${user.uid}`);

  } catch (error) {
    console.error("❌ [CRITICAL ERROR in cleanupUserData]", error);
  }
});