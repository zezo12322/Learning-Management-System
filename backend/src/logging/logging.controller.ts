import { Controller, Get, Query, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { AuditLoggingService, AuditLog } from './logging.service';
import type { Response } from 'express';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin/logs')
export class AuditLoggingController {
  constructor(private readonly auditLoggingService: AuditLoggingService) {}

  /**
   * Get audit logs (SUPER_ADMIN only)
   * Protected by RoleGuard that checks for 'super_admin' role claim
   */
  @Get()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('super_admin')
  async getAuditLogs(@Query() query: AuditLogQuery, @Res() res: Response) {
    try {
      const logs: AuditLog[] = await this.auditLoggingService.getLogs({
        limit: query.limit ? Number(query.limit) : 50,
        before: query.before ? new Date(query.before) : undefined,
        after: query.after ? new Date(query.after) : undefined,
        actionFilter: query.action,
        adminUidFilter: query.adminUid,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        count: logs.length,
        logs,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }

  /**
   * Download audit logs as a formatted .txt file (SUPER_ADMIN only)
   * Supports filtering with ?before=ISO_DATE & ?after=ISO_DATE
   */
  @Get('download')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('super_admin')
  async downloadAuditLogs(@Query() query: AuditLogQuery, @Res() res: Response) {
    try {
      const logs: AuditLog[] = await this.auditLoggingService.getLogs({
        limit: query.limit ? Number(query.limit) : 1000, // higher limit for downloads
        before: query.before ? new Date(query.before) : undefined,
        after: query.after ? new Date(query.after) : undefined,
        actionFilter: query.action,
        adminUidFilter: query.adminUid,
      });

      let textContent = `System Audit Logs Report\n`;
      textContent += `Generated At: ${new Date().toISOString()}\n`;
      textContent += `Filters Applied: ${JSON.stringify(query)}\n`;
      textContent += `Total Logs: ${logs.length}\n`;
      textContent += `========================================================================\n\n`;

      if (logs.length === 0) {
        textContent += 'No logs found for the given time range or criteria.\n';
      }

      for (const log of logs) {
        let dateStr = 'Unknown Date';
        // Handle Firestore Timestamp formatting
        if (log.timestamp && typeof log.timestamp.toDate === 'function') {
          dateStr = log.timestamp.toDate().toISOString();
        } else if (log.timestamp && (log.timestamp as any)._seconds) {
          dateStr = new Date((log.timestamp as any)._seconds * 1000).toISOString();
        }
        
        textContent += `[${dateStr}] ACTION: ${log.action}\n`;
        textContent += `  Admin UID:  ${log.adminUid}\n`;
        if (log.targetUid) {
          textContent += `  Target UID: ${log.targetUid}\n`;
        }
        if (log.ipAddress) {
          textContent += `  IP Address: ${log.ipAddress}\n`;
        }
        if (log.details && Object.keys(log.details).length > 0) {
          textContent += `  Details:    ${JSON.stringify(log.details)}\n`;
        }
        textContent += `------------------------------------------------------------------------\n`;
      }

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="system_audit_logs.txt"',
      );
      
      return res.status(HttpStatus.OK).send(textContent);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}

interface AuditLogQuery {
  limit?: string;
  before?: string; // ISO date string
  after?: string; // ISO date string
  action?: string;
  adminUid?: string;
}
