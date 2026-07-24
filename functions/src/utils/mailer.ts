/**
 * @fileoverview Transactional email sender (welcome email — KAN-40).
 *
 * Sends mail over SMTP via nodemailer, configured entirely through environment
 * variables so no provider credentials ever live in the repo. When SMTP is not
 * configured, the sender logs a warning and no-ops: registration must never
 * fail because email delivery is unavailable (same graceful-degradation stance
 * used for other optional integrations in this codebase).
 *
 * Required env (set in `functions/.env` — NOT committed — or the deploy env):
 *   SMTP_HOST, SMTP_USER, SMTP_PASS
 * Optional env:
 *   SMTP_PORT   (default 587)
 *   SMTP_SECURE ("true" to force TLS; auto-on for port 465)
 *   MAIL_FROM   (default: "OptimaTech LMS <SMTP_USER>")
 *   APP_URL     (login link base; default: the deployed web app)
 */

import { logger } from "firebase-functions";
import * as nodemailer from "nodemailer";

let cachedTransport: nodemailer.Transporter | null = null;

/**
 * Builds (and memoises) the SMTP transport from env. Returns null when the
 * required SMTP_* variables are absent, signalling the caller to skip sending.
 */
function getTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  if (cachedTransport) return cachedTransport;

  const port = Number(process.env.SMTP_PORT || 587);
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
  return cachedTransport;
}

/**
 * Sends a bilingual (Arabic + English) welcome email to a newly registered
 * student. Safe to call unconditionally: it never throws and never blocks
 * registration — any failure (missing config, SMTP error) is logged and
 * swallowed.
 *
 * @param to   Recipient email address.
 * @param name Student display name (falls back to a friendly default).
 */
export async function sendWelcomeEmail(
  to: string | undefined | null,
  name: string | undefined | null
): Promise<void> {
  try {
    // Skip empty addresses and the synthetic fallback the auth trigger uses
    // for OAuth users that arrive without an email.
    if (!to || to.startsWith("no-email-")) return;

    const transport = getTransport();
    if (!transport) {
      logger.warn(
        "✉️ [MAIL] SMTP not configured (SMTP_HOST/USER/PASS missing) — skipping welcome email."
      );
      return;
    }

    const displayName = (name && name.trim()) || "طالبنا العزيز";
    const appUrl = (process.env.APP_URL || "https://optima-lms-web.it-e0e.workers.dev").replace(/\/$/, "");
    const loginUrl = `${appUrl}/login`;
    const from = process.env.MAIL_FROM || `OptimaTech LMS <${process.env.SMTP_USER}>`;

    const text =
      `مرحباً ${displayName}،\n\n` +
      `تم إنشاء حسابك بنجاح على منصة OptimaTech للتعلّم. ` +
      `سجّل دخولك وابدأ رحلتك التعليمية من هنا:\n${loginUrl}\n\n` +
      `بالتوفيق،\nفريق OptimaTech\n\n` +
      `----------------------------------------\n\n` +
      `Hi ${displayName},\n\n` +
      `Your OptimaTech LMS account is ready. Sign in and start learning:\n${loginUrl}\n\n` +
      `Happy learning,\nThe OptimaTech Team`;

    const html = `
      <div style="margin:0;padding:24px;background:#f4f5fa;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e1e4f0;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(90deg,#4f46e5,#312e81);padding:24px 28px;">
            <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:.3px;">OptimaTech&nbsp;LMS</div>
          </div>
          <div style="padding:28px;direction:rtl;text-align:right;color:#191b2c;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;">أهلاً بك يا ${displayName} 🎓</h1>
            <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#474b66;">
              تم إنشاء حسابك بنجاح على منصة <b>OptimaTech</b> للتعلّم. اضغط الزر تحت عشان تسجّل دخولك وتبدأ رحلتك التعليمية.
            </p>
            <a href="${loginUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 26px;border-radius:12px;">تسجيل الدخول</a>
          </div>
          <div style="padding:22px 28px;border-top:1px solid #e1e4f0;direction:ltr;text-align:left;color:#191b2c;">
            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#474b66;">
              Hi ${displayName}, your OptimaTech LMS account is ready. Sign in and start learning:
            </p>
            <a href="${loginUrl}" style="display:inline-block;background:#eef0f7;color:#312e81;text-decoration:none;font-weight:700;font-size:14px;padding:10px 22px;border-radius:12px;">Sign in</a>
          </div>
          <div style="padding:16px 28px;background:#f4f5fa;color:#797e9b;font-size:12px;text-align:center;">
            OptimaTech LMS &middot; هذه رسالة تلقائية / automated message
          </div>
        </div>
      </div>`;

    await transport.sendMail({
      from,
      to,
      subject: "أهلاً بك في OptimaTech LMS 🎓 | Welcome to OptimaTech LMS",
      text,
      html,
    });
    logger.info(`✉️ [MAIL] Welcome email sent to ${to}`);
  } catch (error: any) {
    // Never rethrow — a failed welcome email must not break the signup pipeline.
    logger.error("✉️ [MAIL ERROR] Failed to send welcome email", {
      error: error?.message,
      to,
    });
  }
}
