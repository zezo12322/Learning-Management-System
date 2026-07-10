import { registrationSchema, roleChangeSchema } from "../schemas/userSchemas";

describe("userSchemas", () => {
  describe("registrationSchema", () => {
    it("should validate a correct registration payload", () => {
      const validData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "StrongPassword123!",
        nationalId: "12345678901234",
      };

      const result = registrationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject an invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "not-an-email",
        password: "StrongPassword123!",
        nationalId: "12345678901234",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid email address");
      }
    });

    it("should reject a weak password", () => {
      const invalidData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "weak", // too short, no uppercase, no numbers, no special char
        nationalId: "12345678901234",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject an incorrectly sized national ID", () => {
      const invalidData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "StrongPassword123!",
        nationalId: "12345", // must be exactly 14
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("exactly 14 digits");
      }
    });
  });

  describe("roleChangeSchema", () => {
    it("should validate a correct role change payload", () => {
      const validData = {
        targetUid: "uid123",
        newRole: "instructor",
      };

      const result = roleChangeSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject an invalid role", () => {
      const invalidData = {
        targetUid: "uid123",
        newRole: "superadmin", // not in the enum
      };

      const result = roleChangeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Invalid role specified");
      }
    });

    it("should reject empty targetUid", () => {
      const invalidData = {
        targetUid: "",
        newRole: "admin",
      };

      const result = roleChangeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
