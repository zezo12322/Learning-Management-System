"use strict";
/**
 * @fileoverview Centralized configuration for Firebase Admin and Data Connect.
 * All Firebase-related initializations should happen here so they are
 * reused across different function invocations (prevents memory leaks).
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
exports.admin = exports.adminDC = void 0;
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
const data_connect_1 = require("firebase-admin/data-connect");
// Initialize Firebase Admin SDK using the default service account credentials
// This allows the backend to access Firebase services (Auth, Storage) safely.
admin.initializeApp();
// Target connection for PostgreSQL via Data Connect.
// This acts as a GraphQL gateway to the underlying Cloud SQL database.
exports.adminDC = (0, data_connect_1.getDataConnect)({
    serviceId: "learning-management-syst-3cc3a-service",
    location: "europe-west8",
});
//# sourceMappingURL=firebase.js.map