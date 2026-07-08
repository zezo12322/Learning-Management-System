"use strict";
/**
 * @fileoverview Hardcoded UUIDs for User Roles matching the Data Connect database.
 *
 * IMPORTANT: These UUIDs MUST exactly match the `id` column of the `roles`
 * table in PostgreSQL. If the database schema is seeded differently, these
 * will need to be updated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_IDS = void 0;
exports.ROLE_IDS = {
    "admin": "00000000-0000-0000-0000-000000000004",
    "instructor": "00000000-0000-0000-0000-000000000005",
    "student": "00000000-0000-0000-0000-000000000006",
};
//# sourceMappingURL=roles.js.map