/**
 * @fileoverview Callable APIs for User Management.
 *
 * These functions can be called directly from the client apps via the
 * Firebase Client SDKs (`httpsCallable`). They are protected by rate limiting
 * and strict payload validation.
 */

const functions = require("firebase-functions/v1");
const {admin, adminDC} = require("../config/firebase");
const RateLimiter = require("../utils/rateLimiter");
const {requireRole} = require("../utils/authUtils");
const EncryptionService = require("../utils/encryptionService");
const {registrationSchema, roleChangeSchema} = require("../schemas/userSchemas");
const {ROLE_IDS} = require("../constants/roles");

/**
 * CALLABLE: registerStudent
 *
 * Registers a new student securely. It handles Firebase Auth creation,
 * National ID encryption, and PostgreSQL database insertion all at once.
 */
exports.registerStudent = functions
    .region("europe-west3")
// Inject environment secrets required during execution
    .runWith({secrets: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "APP_ENCRYPTION_KEY"]})
    .https.onCall(async (data, context) => {
    // 1. Rate Limiting Protection (Prevent DDoS/Brute-forcing)
      const rawIp = context.rawRequest.ip || "unknown-ip";
      try {
        await RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
      } catch (error) {
        if (error.message === "RATE_LIMIT_EXCEEDED") {
          console.warn(`🚨 [SECURITY] Execution rate exceeded for IP: ${rawIp}`);
          throw new functions.https.HttpsError("resource-exhausted", "Too many attempts. Please slow down.");
        }
        console.error("⚠️ [WARNING] Rate Limiter failure:", error);
      }

      // 2. Validate incoming data via Zod schema
      let validatedData;
      try {
        validatedData = registrationSchema.parse(data);
      } catch (error) {
        console.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
        throw new functions.https.HttpsError("invalid-argument", error.errors[0].message);
      }

      const {email, password, name, nationalId} = validatedData;
      console.log(`🚀 [START] Structured registration handling for: ${email}`);

      try {
      // 3. Create user in Firebase Auth
        const userRecord = await admin.auth().createUser({
          email: email,
          password: password,
          displayName: name,
        });
        const uid = userRecord.uid;
        console.log(`✅ [AUTH] Base account identity instantiated: ${uid}`);

        // 4. Encrypt sensitive PII using AES-256-GCM
        const safeNationalId = EncryptionService.encrypt(nationalId, process.env.APP_ENCRYPTION_KEY);

        // 5. Save everything to PostgreSQL via Data Connect
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
          variables: {uid, email, name, nid: safeNationalId},
        });
        console.log(`✅ [DB INSERT] Relational database persistence mapped.`);

        // 6. Set custom claims right away (to avoid waiting for the trigger)
        const defaultClaims = {roles: ["student"], companyId: null};
        await admin.auth().setCustomUserClaims(uid, defaultClaims);

        console.log(`🎉 [SUCCESS] Pipeline transaction resolved successfully.`);
        return {success: true, uid: uid};
      } catch (error) {
        console.error("❌ [API ERROR inside registerStudent]", error);
        if (error.code) {
          throw new functions.https.HttpsError("already-exists", error.message);
        }
        throw new functions.https.HttpsError("internal", "Backend transaction failure during execution.");
      }
    });

/**
 * CALLABLE: changeUserRole
 *
 * Allows an administrator to promote/demote users (e.g., student -> instructor).
 * This manages both the PostgreSQL `userRole` table and the Firebase Auth Token.
 */
exports.changeUserRole = functions
    .region("europe-west3")
    .runWith({secrets: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"]})
    .https.onCall(async (data, context) => {
      const callerUid = context.auth?.uid;
      // 1. Rate Limiting Protection per UID
      try {
        await RateLimiter.checkLimit(`uid_${callerUid}`, 20, "1 m");
      } catch (error) {
        if (error.message === "RATE_LIMIT_EXCEEDED") {
          throw new functions.https.HttpsError("resource-exhausted", "Too many attempts.");
        }
      }

      // 2. Role-based Access Control: Only admins can perform this action
      requireRole(context, ["admin"]);

      // 3. Validate incoming data
      let validatedData;
      try {
        validatedData = roleChangeSchema.parse(data);
      } catch (error) {
        throw new functions.https.HttpsError("invalid-argument", error.errors[0].message);
      }

      const {targetUid, newRole} = validatedData;
      const newRoleId = ROLE_IDS[newRole];

      // Safety measure to prevent an admin from demoting themselves by accident
      if (callerUid === targetUid) {
        throw new functions.https.HttpsError("permission-denied", "Administrators cannot change their own roles.");
      }

      console.log(`🛡️ [ADMIN ACTION] UID ${callerUid} is changing UID ${targetUid} to ${newRole}`);

      try {
      // 4. Retrieve current roles to cleanly replace them
        const fetchQuery = `
                query getTargetUserRoles($uid: String!) {
                    user(id: $uid) {
                        userRoles_on_user {
                            roleId
                        }
                    }
                }
            `;
        const userRes = await adminDC.executeGraphql(fetchQuery, {variables: {uid: targetUid}});
        const currentRoles = userRes.data?.user?.userRoles_on_user || [];

        // Wipe old roles
        for (const currentRole of currentRoles) {
          const deleteMutation = `
                    mutation removeRole($uid: String!, $roleId: UUID!) {
                        userRole_delete(key: { userId: $uid, roleId: $roleId })
                    }
                `;
          await adminDC.executeGraphql(deleteMutation, {
            variables: {uid: targetUid, roleId: currentRole.roleId},
          });
        }

        // Assign the new role in Data Connect
        const insertMutation = `
                mutation assignNewRole($uid: String!, $roleId: UUID!) {
                    userRole_insert(data: { userId: $uid, roleId: $roleId })
                }
            `;
        await adminDC.executeGraphql(insertMutation, {
          variables: {uid: targetUid, roleId: newRoleId},
        });

        // 5. Update Firebase Auth Custom Claims
        const userRecord = await admin.auth().getUser(targetUid);
        const newClaims = Object.assign({}, userRecord.customClaims);

        // Strip legacy claims to avoid conflicts during demotion
        delete newClaims.role;
        delete newClaims.admin;

        // The `roles` array is the single source of truth across Data Connect and backend
        newClaims.roles = [newRole];
        await admin.auth().setCustomUserClaims(targetUid, newClaims);

        console.log(`🎉 [SUCCESS] Role fully synchronized across Database and Token.`);
        return {success: true, message: `User successfully updated to ${newRole}.`};
      } catch (error) {
        console.error("❌ [API ERROR inside changeUserRole]", error);
        if (error.code === "auth/user-not-found") {
          throw new functions.https.HttpsError("not-found", "The requested user does not exist.");
        }
        throw new functions.https.HttpsError("internal", "Backend transaction failure during role update.");
      }
    });
