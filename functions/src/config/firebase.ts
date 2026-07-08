/**
 * @fileoverview Centralized configuration for Firebase Admin and Data Connect.
 * All Firebase-related initializations should happen here so they are
 * reused across different function invocations (prevents memory leaks).
 */

import * as admin from "firebase-admin";
import { getDataConnect } from "firebase-admin/data-connect";

// Initialize Firebase Admin SDK using the default service account credentials
// This allows the backend to access Firebase services (Auth, Storage) safely.
admin.initializeApp();

// Target connection for PostgreSQL via Data Connect.
// This acts as a GraphQL gateway to the underlying Cloud SQL database.
export const adminDC = getDataConnect({
  serviceId: "learning-management-syst-3cc3a-service",
  location: "europe-west8",
});

export { admin };
