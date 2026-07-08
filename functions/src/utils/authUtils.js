/**
 * @fileoverview Authentication utilities for Cloud Functions.
 */

const { HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");

/**
 * Ensures the caller has the required role(s) to execute a function.
 * It checks the decoded Firebase Auth Token (`context.auth.token.roles`).
 *
 * @param {Object} context - The context object provided by Firebase Callable functions.
 * @param {Array<string>} allowedRoles - Array of roles allowed (e.g., ['admin', 'instructor']).
 * @throws {HttpsError} If the user is unauthenticated or unauthorized.
 */
function requireRole(context, allowedRoles) {
  if (!context.auth) {
    throw new HttpsError("unauthenticated", "You must be logged in.");
  }

  // Roles are stored as an array in the token's custom claims.
  const userRoles = context.auth.token.roles || [];
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    logger.warn(`🚨 [RBAC] Access denied for UID: ${context.auth.uid}. Required: ${allowedRoles}`);
    throw new HttpsError("permission-denied", "You do not have the required permissions.");
  }
}

module.exports = {requireRole};
