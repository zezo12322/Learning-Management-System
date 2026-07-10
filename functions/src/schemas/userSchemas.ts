/**
 * @fileoverview Zod validation schemas for incoming user payloads.
 * By strictly validating inputs at the edge, we prevent malicious data
 * from reaching the database or causing internal errors.
 */

import { z } from "zod";

/**
 * Schema for validating new student registrations.
 * Enforces strong passwords, valid emails, and exact National ID formatting.
 */
export const registrationSchema = z.object({
  name: z.string()
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot exceed 50 characters.")
      .trim(),

  email: z.string()
      .email("Please provide a valid email address.")
      .toLowerCase()
      .trim(),

  password: z.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password cannot exceed 64 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, "Password must contain at least one special character."),

  nationalId: z.string().length(14, "National ID must be exactly 14 digits."),
});

/**
 * Schema for validating role changes by an admin.
 */
export const roleChangeSchema = z.object({
  targetUid: z.string().min(1, "Target UID is required."),
  newRole: z.enum(["student", "instructor", "admin"], {
    error: "Invalid role specified.",
  }),
});
