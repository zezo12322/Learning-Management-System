/**
 * @fileoverview Callable APIs for User Management.
 *
 * These functions can be called directly from the client apps via the
 * Firebase Client SDKs (`httpsCallable`). They are protected by rate limiting
 * and strict payload validation.
 */

import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { admin, adminDC } from "../config/firebase";
import { RateLimiter } from "../utils/rateLimiter";
import { requireRole } from "../utils/authUtils";
import { EncryptionService } from "../utils/encryptionService";
import { registrationSchema, roleChangeSchema } from "../schemas/userSchemas";
import { ROLE_IDS } from "../constants/roles";

// Define Secrets for v2 injection
const UPSTASH_REDIS_REST_URL = defineSecret("UPSTASH_REDIS_REST_URL");
const UPSTASH_REDIS_REST_TOKEN = defineSecret("UPSTASH_REDIS_REST_TOKEN");
const APP_ENCRYPTION_KEY = defineSecret("APP_ENCRYPTION_KEY");

// Import the strongly-typed generated Admin SDK
import { 
  createDefaultUserFn, 
  getTargetUserRolesFn, 
  removeRoleFn, 
  assignNewRoleFn 
} from "@dataconnect/admin-generated";

/**
 * CALLABLE: registerStudent
 *
 * Registers a new student securely. It handles Firebase Auth creation,
 * National ID encryption, and PostgreSQL database insertion all at once.
 */
export const registerStudent = onCall(
  {
    region: "europe-west3",
    secrets: [UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, APP_ENCRYPTION_KEY],
  },
  async (request: CallableRequest) => {
    // 1. Rate Limiting Protection (Prevent DDoS/Brute-forcing)
    // In v2, request object encapsulates both data and context.
    const rawIp = request.rawRequest?.ip || "unknown-ip";
    try {
      await RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
    } catch (error: any) {
      if (error.message === "RATE_LIMIT_EXCEEDED") {
        logger.warn(`🚨 [SECURITY] Execution rate exceeded for IP: ${rawIp}`);
        throw new HttpsError("resource-exhausted", "Too many attempts. Please slow down.");
      }
      logger.warn("⚠️ [WARNING] Rate Limiter failure:", error);
    }

    // 2. Validate incoming data via Zod schema
    let validatedData;
    try {
      validatedData = registrationSchema.parse(request.data);
    } catch (error: any) {
      logger.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
      throw new HttpsError("invalid-argument", error.errors[0].message);
    }

    const {email, password, name, nationalId} = validatedData;
    logger.info(`🚀 [START] Structured registration handling for: ${email}`);

    let uid: string | null = null;
    try {
      // 3. Create user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
      });
      uid = userRecord.uid;
      logger.info(`✅ [AUTH] Base account identity instantiated: ${uid}`);

      // 4. Encrypt sensitive PII using AES-256-GCM
      // In v2, secrets can be accessed via process.env OR through the .value() method of the defined secret.
      const encryptionKey = process.env.APP_ENCRYPTION_KEY || APP_ENCRYPTION_KEY.value();
      const safeNationalId = EncryptionService.encrypt(nationalId, encryptionKey) as string;

      // 5. Save everything to PostgreSQL via Data Connect SDK
      try {
        await createDefaultUserFn(adminDC, { uid: uid as string, email, name, nid: safeNationalId });
        logger.info(`✅ [DB INSERT] Relational database persistence mapped.`);
      } catch (dbError) {
        logger.error(`❌ [ROLLBACK] Failed to insert relational data for user ${uid}. Cleaning up Firebase Auth...`, dbError);
        // Rollback: Delete the Firebase Auth user if the DB insert fails to maintain atomicity
        await admin.auth().deleteUser(uid);
        throw dbError; 
      }

      // 6. Set custom claims right away (to avoid waiting for the trigger)
      const defaultClaims = {roles: ["student"], companyId: null};
      await admin.auth().setCustomUserClaims(uid, defaultClaims);

      logger.info(`🎉 [SUCCESS] Pipeline transaction resolved successfully.`);
      return {success: true, uid: uid};
    } catch (error: any) {
      // Structured error logging
      logger.error("❌ [API ERROR inside registerStudent]", { error: error.message, stack: error.stack, email });
      if (error.code) {
        throw new HttpsError("already-exists", error.message);
      }
      throw new HttpsError("internal", "Backend transaction failure during execution.");
    }
  }
);

/**
 * CALLABLE: changeUserRole
 *
 * Allows an administrator to promote/demote users (e.g., student -> instructor).
 * This manages both the PostgreSQL `userRole` table and the Firebase Auth Token.
 */
export const changeUserRole = onCall(
  {
    region: "europe-west3",
    secrets: [UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN],
  },
  async (request: CallableRequest) => {
    const callerUid = request.auth?.uid;
    // 1. Rate Limiting Protection per UID
    try {
      await RateLimiter.checkLimit(`uid_${callerUid}`, 20, "1 m");
    } catch (error: any) {
      if (error.message === "RATE_LIMIT_EXCEEDED") {
        throw new HttpsError("resource-exhausted", "Too many attempts.");
      }
    }

    // 2. Role-based Access Control: Only admins can perform this action
    // We pass `request` because in v2, it contains the `auth` object natively just like the old `context` did.
    requireRole(request, ["admin"]);

    // 3. Validate incoming data
    let validatedData;
    try {
      validatedData = roleChangeSchema.parse(request.data);
    } catch (error: any) {
      throw new HttpsError("invalid-argument", error.errors[0].message);
    }

    const {targetUid, newRole} = validatedData;
    const newRoleId = ROLE_IDS[newRole];

    // Safety measure to prevent an admin from demoting themselves by accident
    if (callerUid === targetUid) {
      throw new HttpsError("permission-denied", "Administrators cannot change their own roles.");
    }

    logger.info(`🛡️ [ADMIN ACTION] UID ${callerUid} is changing UID ${targetUid} to ${newRole}`);

    try {
      // 4. Retrieve current roles to cleanly replace them using typed SDK
      const userRes = await getTargetUserRolesFn(adminDC, { uid: targetUid });
      const currentRoles = userRes.data?.user?.userRoles_on_user || [];

      // Wipe old roles
      for (const currentRole of currentRoles) {
        await removeRoleFn(adminDC, { uid: targetUid, roleId: currentRole.roleId });
      }

      // Assign the new role in Data Connect
      await assignNewRoleFn(adminDC, { uid: targetUid, roleId: newRoleId });

      // 5. Update Firebase Auth Custom Claims
      const userRecord = await admin.auth().getUser(targetUid);
      const newClaims = Object.assign({}, userRecord.customClaims);

      // Strip legacy claims to avoid conflicts during demotion
      delete newClaims.role;
      delete newClaims.admin;

      // The `roles` array is the single source of truth across Data Connect and backend
      newClaims.roles = [newRole];
      await admin.auth().setCustomUserClaims(targetUid, newClaims);

      // Revoke all existing refresh tokens so the user must re-authenticate.
      // Without this, a demoted admin's stale ID token (minted before the role
      // change) would keep granting admin access until it expires naturally
      // (up to 1 hour). Forcing a re-auth ensures the new claims take effect
      // immediately on the next session.
      await admin.auth().revokeRefreshTokens(targetUid);

      logger.info(`🎉 [SUCCESS] Role fully synchronized across Database and Token. Refresh tokens revoked.`);
      return {success: true, message: `User successfully updated to ${newRole}.`};
    } catch (error: any) {
      logger.error("❌ [API ERROR inside changeUserRole]", { error: error.message, stack: error.stack, targetUid, callerUid });
      if (error.code === "auth/user-not-found") {
        throw new HttpsError("not-found", "The requested user does not exist.");
      }
      throw new HttpsError("internal", "Backend transaction failure during role update.");
    }
  }
);
