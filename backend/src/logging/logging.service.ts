import { Injectable, Logger } from '@nestjs/common';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuditLoggingService {
  private readonly logger = new Logger(AuditLoggingService.name);
  private readonly collectionName = 'system_audit_logs';
  // The (default) database doesn't exist — the project uses a named database.
  // The Firestore database ID, e.g. "(default)" or a custom name like "optimatech-lms".
  private readonly databaseId = 'optimatech-lms';

  /**
   * NOTE: A TTL (Time-to-Live) Policy must be set in Google Cloud Console for this collection.
   * Set it to automatically delete documents 90 days after their 'timestamp' field
   * to comply with Phase 2 requirements and GDPR data minimization.
   */
  constructor(private readonly firebaseService: FirebaseService) {}

  private get firestore(): FirebaseFirestore.Firestore {
    // Access the private firebaseApp via type assertion — needed for Firestore init.
    // Pass the named database ID so writes/reads hit "optimatech-lms" instead of "(default)".
    return getFirestore(
      (this.firebaseService as any).firebaseApp,
      this.databaseId,
    );
  }

  /**
   * Create an audit log entry in Firestore
   */
  async createLog({
    action,
    adminUid,
    targetUid,
    details = {},
    ipAddress,
  }: {
    action: string;
    adminUid: string;
    targetUid: string | null;
    details?: object;
    ipAddress?: string;
  }): Promise<void> {
    try {
      const docRef = this.firestore.collection(this.collectionName).doc();

      // Convert details to plain JSON to avoid serialization errors
      // (DTOs and other objects with custom prototypes can't be serialized by Firestore)
      let serializableDetails: Record<string, unknown>;
      if (typeof details === 'object' && details !== null) {
        serializableDetails = JSON.parse(JSON.stringify(details));
      } else {
        serializableDetails = {} as Record<string, unknown>;
      }

      await docRef.set({
        action,
        admin_uid: adminUid,
        target_uid: targetUid,
        timestamp: Timestamp.now(),
        ip_address: ipAddress || null,
        details: serializableDetails,
      });

      this.logger.log(
        `Audit log created: action="${action}", admin="${adminUid}"`,
      );
    } catch (error) {
      // Logging must NEVER break the actual API call — swallow the error and warn.
      this.logger.error('Failed to create audit log (non-fatal)', error);
    }
  }

  /**
   * Get audit logs with pagination (super admin only)
   */
  async getLogs({
    limit = 50,
    before,
    after,
    actionFilter,
    adminUidFilter,
  }: {
    limit?: number;
    before?: Date;
    after?: Date;
    actionFilter?: string;
    adminUidFilter?: string;
  } = {}): Promise<AuditLog[]> {
    try {
      let query = this.firestore
        .collection(this.collectionName)
        .orderBy('timestamp', 'desc')
        .limit(limit);

      if (before) {
        query = query.where('timestamp', '<', Timestamp.fromDate(before));
      }

      if (after) {
        query = query.where('timestamp', '>', Timestamp.fromDate(after));
      }

      if (actionFilter) {
        query = query.where('action', '==', actionFilter);
      }

      if (adminUidFilter) {
        query = query.where('admin_uid', '==', adminUidFilter);
      }

      const snapshot = await query.get();

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          action: data.action,
          adminUid: data.admin_uid,
          targetUid: data.target_uid,
          timestamp: data.timestamp,
          ipAddress: data.ip_address,
          details: data.details,
        };
      });
    } catch (error) {
      this.logger.error('Failed to fetch audit logs', error);
      throw error;
    }
  }

  /**
   * Export logs for compliance (GDPR Right to Data Portability)
   */
  async exportLogsForUser(uid: string): Promise<AuditLog[]> {
    try {
      const snapshot = await this.firestore
        .collection(this.collectionName)
        .where('target_uid', '==', uid)
        .orderBy('timestamp', 'desc')
        .get();

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          action: data.action,
          adminUid: data.admin_uid,
          targetUid: data.target_uid,
          timestamp: data.timestamp,
          ipAddress: data.ip_address,
          details: data.details,
        };
      });
    } catch (error) {
      this.logger.error('Failed to export logs for user', error);
      throw error;
    }
  }
}

// TypeScript interfaces for type safety
export interface AuditLog {
  id: string;
  action: string;
  adminUid: string;
  targetUid: string | null;
  timestamp: Timestamp;
  ipAddress?: string;
  details?: Record<string, unknown>;
}
