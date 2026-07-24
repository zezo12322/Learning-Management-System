/**
 * @fileoverview Firebase Authentication Background Triggers.
 *
 * These functions run automatically in the background when specific Auth
 * events occur (e.g., a user signing up or deleting their account).
 */

import * as functions from "firebase-functions/v1";
import { logger } from "firebase-functions";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { admin, adminDC } from "../config/firebase";
// Import the strongly-typed generated Admin SDK instead of executing raw queries
import {
  getUserClaimsFn,
  createDefaultUserAndProfileFn,
  deleteUserRecordFn
} from "@dataconnect/admin-generated";
import { sendWelcomeEmail } from "../utils/mailer";

/**
 * TRIGGER: onCreate
 *
 * Syncs the user's roles from the PostgreSQL database into their Firebase
 * ID Token via Custom Claims. If a user logs in via OAuth (e.g. Google)
 * and doesn't exist in the database yet, this creates a default 'student'
 * profile for them automatically.
 */
export const syncClaims = functions.region("europe-west3").auth.user().onCreate(async (user) => {
  logger.info(`🚀 [START] syncClaims triggered for UID: ${user.uid}`);

  try {
    // 1. Check if the user exists in PostgreSQL (Data Connect) via typed SDK
    const response = await getUserClaimsFn(adminDC, { uid: user.uid });
    const userData = response.data?.user;

    // If the user does not exist in Postgres (e.g., first time Google Login)
    if (!userData) {
      logger.warn(`⚠️ [NEW OAUTH USER] UID: ${user.uid} absent from relational storage. Executing creation...`);

      const userEmail = user.email || `no-email-${user.uid}@example.com`;
      const userName = user.displayName || "New Student";

      // 2. Execute strongly-typed SDK mutation to provision the user row
      try {
        await createDefaultUserAndProfileFn(adminDC, { uid: user.uid, email: userEmail, name: userName });
      } catch (dbError) {
        logger.error(`❌ [ROLLBACK] Failed to insert relational data for OAuth user ${user.uid}. Cleaning up Firebase Auth...`, dbError);
        // Implement Saga/Rollback: Delete the newly created Auth user if DB creation fails
        await getAuth().deleteUser(user.uid);
        throw dbError; // Rethrow to mark the function execution as failed
      }

      // Assign the default claims manually since the DB trigger is catching up
      const defaultClaims = {roles: ["student"], companyId: null};
      await getAuth().setCustomUserClaims(user.uid, defaultClaims);

      // Welcome the freshly-provisioned student (KAN-40). Never throws.
      await sendWelcomeEmail(userEmail, userName);

      logger.info(`🎉 [SUCCESS] Relational record created, profile setup, and roles attached.`);
      return;
    }

    // Normal scenario: Extract roles and sync them to Firebase Auth
    // Add type safety for mapping
    const roles: string[] = userData.userRoles_on_user 
      ? userData.userRoles_on_user.map((ur: any) => ur.role.name) 
      : [];
    const companyId = userData.profile_on_user ? userData.profile_on_user.company : null;

    const claims = {roles, companyId};
    await getAuth().setCustomUserClaims(user.uid, claims);
    logger.info(`🎉 [SUCCESS] Custom verification claims synced to token.`);

    // Welcome the newly registered student (KAN-40). Covers the email/password
    // signup path — registerStudent has already provisioned the DB row above,
    // so this branch runs for a brand-new self-service registration.
    await sendWelcomeEmail(user.email, user.displayName);
  } catch (error: any) {
    // Structured error logging
    logger.error("❌ [CRITICAL ERROR inside syncClaims]", { error: error.message, stack: error.stack, uid: user.uid });
  }
});

/**
 * TRIGGER: onDelete
 *
 * A cascading deletion script. When a user is deleted from Firebase Auth,
 * this function securely wipes their corresponding PostgreSQL record and
 * purges all their files from Firebase Cloud Storage.
 */
export const cleanupUserData = functions.region("europe-west3").auth.user().onDelete(async (user) => {
  logger.info(`🗑️ [START] Purge cascade execution initialized for UID: ${user.uid}`);

  try {
    // 1. Delete relational data via typed SDK
    await deleteUserRecordFn(adminDC, { uid: user.uid });
    logger.info(`✅ [SUCCESS] Relational row data wiped.`);

    // 2. Wipe Storage files associated with the user
    const bucket = getStorage().bucket();
    await bucket.deleteFiles({
      prefix: `users/${user.uid}/`,
    });
    logger.info(`✅ [SUCCESS] System environment space reclaimed completely.`);
  } catch (error: any) {
    logger.error("❌ [CRITICAL ERROR inside cleanupUserData]", { error: error.message, stack: error.stack, uid: user.uid });
  }
});
