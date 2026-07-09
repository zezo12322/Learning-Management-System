"use strict";
/**
 * @fileoverview Authentication utilities for Cloud Functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
/**
 * Ensures the caller has the required role(s) to execute a function.
 * It checks the decoded Firebase Auth Token (`request.auth.token.roles`).
 *
 * @param {CallableRequest} request - The request object provided by Firebase Callable functions.
 * @param {Array<string>} allowedRoles - Array of roles allowed (e.g., ['admin', 'instructor']).
 * @throws {HttpsError} If the user is unauthenticated or unauthorized.
 */
function requireRole(request, allowedRoles) {
    if (!request.auth) {
        throw new https_1.HttpsError("unauthenticated", "You must be logged in.");
    }
    // Roles are stored as an array in the token's custom claims.
    const userRoles = request.auth.token.roles || [];
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));
    if (!hasPermission) {
        firebase_functions_1.logger.warn(`🚨 [RBAC] Access denied for UID: ${request.auth.uid}. Required: ${allowedRoles}`);
        throw new https_1.HttpsError("permission-denied", "You do not have the required permissions.");
    }
}
//# sourceMappingURL=authUtils.js.map