"use strict";
/**
 * @fileoverview Callable APIs for User Management.
 *
 * These functions can be called directly from the client apps via the
 * Firebase Client SDKs (`httpsCallable`). They are protected by rate limiting
 * and strict payload validation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRole = exports.registerStudent = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const firebase_functions_1 = require("firebase-functions");
const firebase_1 = require("../config/firebase");
const rateLimiter_1 = require("../utils/rateLimiter");
const authUtils_1 = require("../utils/authUtils");
const encryptionService_1 = require("../utils/encryptionService");
const userSchemas_1 = require("../schemas/userSchemas");
const roles_1 = require("../constants/roles");
// Define Secrets for v2 injection
const UPSTASH_REDIS_REST_URL = (0, params_1.defineSecret)("UPSTASH_REDIS_REST_URL");
const UPSTASH_REDIS_REST_TOKEN = (0, params_1.defineSecret)("UPSTASH_REDIS_REST_TOKEN");
const APP_ENCRYPTION_KEY = (0, params_1.defineSecret)("APP_ENCRYPTION_KEY");
// Import the strongly-typed generated Admin SDK
const admin_generated_1 = require("@dataconnect/admin-generated");
/**
 * CALLABLE: registerStudent
 *
 * Registers a new student securely. It handles Firebase Auth creation,
 * National ID encryption, and PostgreSQL database insertion all at once.
 */
exports.registerStudent = (0, https_1.onCall)({
    region: "europe-west3",
    secrets: [UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, APP_ENCRYPTION_KEY],
}, async (request) => {
    // 1. Rate Limiting Protection (Prevent DDoS/Brute-forcing)
    // In v2, request object encapsulates both data and context.
    const rawIp = request.rawRequest?.ip || "unknown-ip";
    try {
        await rateLimiter_1.RateLimiter.checkLimit(`ip_${rawIp}`, 10, "1 m");
    }
    catch (error) {
        if (error.message === "RATE_LIMIT_EXCEEDED") {
            firebase_functions_1.logger.warn(`🚨 [SECURITY] Execution rate exceeded for IP: ${rawIp}`);
            throw new https_1.HttpsError("resource-exhausted", "Too many attempts. Please slow down.");
        }
        firebase_functions_1.logger.warn("⚠️ [WARNING] Rate Limiter failure:", error);
    }
    // 2. Validate incoming data via Zod schema
    let validatedData;
    try {
        validatedData = userSchemas_1.registrationSchema.parse(request.data);
    }
    catch (error) {
        firebase_functions_1.logger.warn(`🚨 [VALIDATION FAILED] ${error.errors[0].message}`);
        throw new https_1.HttpsError("invalid-argument", error.errors[0].message);
    }
    const { email, password, name, nationalId } = validatedData;
    firebase_functions_1.logger.info(`🚀 [START] Structured registration handling for: ${email}`);
    let uid = null;
    try {
        // 3. Create user in Firebase Auth
        const userRecord = await firebase_1.admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
        });
        uid = userRecord.uid;
        firebase_functions_1.logger.info(`✅ [AUTH] Base account identity instantiated: ${uid}`);
        // 4. Encrypt sensitive PII using AES-256-GCM
        // In v2, secrets can be accessed via process.env OR through the .value() method of the defined secret.
        const encryptionKey = process.env.APP_ENCRYPTION_KEY || APP_ENCRYPTION_KEY.value();
        const safeNationalId = encryptionService_1.EncryptionService.encrypt(nationalId, encryptionKey);
        // 5. Save everything to PostgreSQL via Data Connect SDK
        try {
            await (0, admin_generated_1.createDefaultUserFn)(firebase_1.adminDC, { uid, email, name, nid: safeNationalId });
            firebase_functions_1.logger.info(`✅ [DB INSERT] Relational database persistence mapped.`);
        }
        catch (dbError) {
            firebase_functions_1.logger.error(`❌ [ROLLBACK] Failed to insert relational data for user ${uid}. Cleaning up Firebase Auth...`, dbError);
            // Rollback: Delete the Firebase Auth user if the DB insert fails to maintain atomicity
            await firebase_1.admin.auth().deleteUser(uid);
            throw dbError;
        }
        // 6. Set custom claims right away (to avoid waiting for the trigger)
        const defaultClaims = { roles: ["student"], companyId: null };
        await firebase_1.admin.auth().setCustomUserClaims(uid, defaultClaims);
        firebase_functions_1.logger.info(`🎉 [SUCCESS] Pipeline transaction resolved successfully.`);
        return { success: true, uid: uid };
    }
    catch (error) {
        // Structured error logging
        firebase_functions_1.logger.error("❌ [API ERROR inside registerStudent]", { error: error.message, stack: error.stack, email });
        if (error.code) {
            throw new https_1.HttpsError("already-exists", error.message);
        }
        throw new https_1.HttpsError("internal", "Backend transaction failure during execution.");
    }
});
/**
 * CALLABLE: changeUserRole
 *
 * Allows an administrator to promote/demote users (e.g., student -> instructor).
 * This manages both the PostgreSQL `userRole` table and the Firebase Auth Token.
 */
exports.changeUserRole = (0, https_1.onCall)({
    region: "europe-west3",
    secrets: [UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN],
}, async (request) => {
    const callerUid = request.auth?.uid;
    // 1. Rate Limiting Protection per UID
    try {
        await rateLimiter_1.RateLimiter.checkLimit(`uid_${callerUid}`, 20, "1 m");
    }
    catch (error) {
        if (error.message === "RATE_LIMIT_EXCEEDED") {
            throw new https_1.HttpsError("resource-exhausted", "Too many attempts.");
        }
    }
    // 2. Role-based Access Control: Only admins can perform this action
    // We pass `request` because in v2, it contains the `auth` object natively just like the old `context` did.
    (0, authUtils_1.requireRole)(request, ["admin"]);
    // 3. Validate incoming data
    let validatedData;
    try {
        validatedData = userSchemas_1.roleChangeSchema.parse(request.data);
    }
    catch (error) {
        throw new https_1.HttpsError("invalid-argument", error.errors[0].message);
    }
    const { targetUid, newRole } = validatedData;
    const newRoleId = roles_1.ROLE_IDS[newRole];
    // Safety measure to prevent an admin from demoting themselves by accident
    if (callerUid === targetUid) {
        throw new https_1.HttpsError("permission-denied", "Administrators cannot change their own roles.");
    }
    firebase_functions_1.logger.info(`🛡️ [ADMIN ACTION] UID ${callerUid} is changing UID ${targetUid} to ${newRole}`);
    try {
        // 4. Retrieve current roles to cleanly replace them using typed SDK
        const userRes = await (0, admin_generated_1.getTargetUserRolesFn)(firebase_1.adminDC, { uid: targetUid });
        const currentRoles = userRes.data?.user?.userRoles_on_user || [];
        // Wipe old roles
        for (const currentRole of currentRoles) {
            await (0, admin_generated_1.removeRoleFn)(firebase_1.adminDC, { uid: targetUid, roleId: currentRole.roleId });
        }
        // Assign the new role in Data Connect
        await (0, admin_generated_1.assignNewRoleFn)(firebase_1.adminDC, { uid: targetUid, roleId: newRoleId });
        // 5. Update Firebase Auth Custom Claims
        const userRecord = await firebase_1.admin.auth().getUser(targetUid);
        const newClaims = Object.assign({}, userRecord.customClaims);
        // Strip legacy claims to avoid conflicts during demotion
        delete newClaims.role;
        delete newClaims.admin;
        // The `roles` array is the single source of truth across Data Connect and backend
        newClaims.roles = [newRole];
        await firebase_1.admin.auth().setCustomUserClaims(targetUid, newClaims);
        firebase_functions_1.logger.info(`🎉 [SUCCESS] Role fully synchronized across Database and Token.`);
        return { success: true, message: `User successfully updated to ${newRole}.` };
    }
    catch (error) {
        firebase_functions_1.logger.error("❌ [API ERROR inside changeUserRole]", { error: error.message, stack: error.stack, targetUid, callerUid });
        if (error.code === "auth/user-not-found") {
            throw new https_1.HttpsError("not-found", "The requested user does not exist.");
        }
        throw new https_1.HttpsError("internal", "Backend transaction failure during role update.");
    }
});
//# sourceMappingURL=userMgmt.js.map