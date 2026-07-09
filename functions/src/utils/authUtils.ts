/**
 * @fileoverview Authentication utilities for Cloud Functions.
 */

import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

/**
 * Ensures the caller has the required role(s) to execute a function.
 * It checks the decoded Firebase Auth Token (`request.auth.token.roles`).
 *
 * @param {CallableRequest} request - The request object provided by Firebase Callable functions.
 * @param {Array<string>} allowedRoles - Array of roles allowed (e.g., ['admin', 'instructor']).
 * @throws {HttpsError} If the user is unauthenticated or unauthorized.
 */
export function requireRole(request: CallableRequest, allowedRoles: string[]): void {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be logged in.");
  }

  // Roles are stored as an array in the token's custom claims.
  const userRoles = (request.auth.token.roles as string[]) || [];
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    logger.warn(`🚨 [RBAC] Access denied for UID: ${request.auth.uid}. Required: ${allowedRoles}`);
    throw new HttpsError("permission-denied", "You do not have the required permissions.");
  }
}
