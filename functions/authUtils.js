const functions = require("firebase-functions/v1");

function requireRole(context, allowedRoles) {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
    }

    const userRoles = context.auth.token.roles || [];
    const hasPermission = allowedRoles.some(role => userRoles.includes(role));

    if (!hasPermission) {
        console.warn(`🚨 [RBAC] Access denied for UID: ${context.auth.uid}. Required: ${allowedRoles}`);
        throw new functions.https.HttpsError('permission-denied', 'You do not have the required permissions.');
    }
}

// Export it so index.js can grab it
module.exports = { requireRole };