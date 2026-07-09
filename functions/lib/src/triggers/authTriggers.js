"use strict";
/**
 * @fileoverview Firebase Authentication Background Triggers.
 *
 * These functions run automatically in the background when specific Auth
 * events occur (e.g., a user signing up or deleting their account).
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupUserData = exports.syncClaims = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const firebase_functions_1 = require("firebase-functions");
const firebase_1 = require("../config/firebase");
// Import the strongly-typed generated Admin SDK instead of executing raw queries
const admin_generated_1 = require("@dataconnect/admin-generated");
/**
 * TRIGGER: onCreate
 *
 * Syncs the user's roles from the PostgreSQL database into their Firebase
 * ID Token via Custom Claims. If a user logs in via OAuth (e.g. Google)
 * and doesn't exist in the database yet, this creates a default 'student'
 * profile for them automatically.
 */
exports.syncClaims = functions.region("europe-west3").auth.user().onCreate(async (user) => {
    firebase_functions_1.logger.info(`🚀 [START] syncClaims triggered for UID: ${user.uid}`);
    try {
        // 1. Check if the user exists in PostgreSQL (Data Connect) via typed SDK
        const response = await (0, admin_generated_1.getUserClaimsFn)(firebase_1.adminDC, { uid: user.uid });
        const userData = response.data?.user;
        // If the user does not exist in Postgres (e.g., first time Google Login)
        if (!userData) {
            firebase_functions_1.logger.warn(`⚠️ [NEW OAUTH USER] UID: ${user.uid} absent from relational storage. Executing creation...`);
            const userEmail = user.email || `no-email-${user.uid}@example.com`;
            const userName = user.displayName || "New Student";
            // 2. Execute strongly-typed SDK mutation to provision the user row
            try {
                await (0, admin_generated_1.createDefaultUserAndProfileFn)(firebase_1.adminDC, { uid: user.uid, email: userEmail, name: userName });
            }
            catch (dbError) {
                firebase_functions_1.logger.error(`❌ [ROLLBACK] Failed to insert relational data for OAuth user ${user.uid}. Cleaning up Firebase Auth...`, dbError);
                // Implement Saga/Rollback: Delete the newly created Auth user if DB creation fails
                await firebase_1.admin.auth().deleteUser(user.uid);
                throw dbError; // Rethrow to mark the function execution as failed
            }
            // Assign the default claims manually since the DB trigger is catching up
            const defaultClaims = { roles: ["student"], companyId: null };
            await firebase_1.admin.auth().setCustomUserClaims(user.uid, defaultClaims);
            firebase_functions_1.logger.info(`🎉 [SUCCESS] Relational record created, profile setup, and roles attached.`);
            return;
        }
        // Normal scenario: Extract roles and sync them to Firebase Auth
        // Add type safety for mapping
        const roles = userData.userRoles_on_user
            ? userData.userRoles_on_user.map((ur) => ur.role.name)
            : [];
        const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;
        const claims = { roles, companyId };
        await firebase_1.admin.auth().setCustomUserClaims(user.uid, claims);
        firebase_functions_1.logger.info(`🎉 [SUCCESS] Custom verification claims synced to token.`);
    }
    catch (error) {
        // Structured error logging
        firebase_functions_1.logger.error("❌ [CRITICAL ERROR inside syncClaims]", { error: error.message, stack: error.stack, uid: user.uid });
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
    firebase_functions_1.logger.info(`🗑️ [START] Purge cascade execution initialized for UID: ${user.uid}`);
    try {
        // 1. Delete relational data via typed SDK
        await (0, admin_generated_1.deleteUserRecordFn)(firebase_1.adminDC, { uid: user.uid });
        firebase_functions_1.logger.info(`✅ [SUCCESS] Relational row data wiped.`);
        // 2. Wipe Storage files associated with the user
        const bucket = firebase_1.admin.storage().bucket();
        await bucket.deleteFiles({
            prefix: `users/${user.uid}/`,
        });
        firebase_functions_1.logger.info(`✅ [SUCCESS] System environment space reclaimed completely.`);
    }
    catch (error) {
        firebase_functions_1.logger.error("❌ [CRITICAL ERROR inside cleanupUserData]", { error: error.message, stack: error.stack, uid: user.uid });
    }
});
//# sourceMappingURL=authTriggers.js.map