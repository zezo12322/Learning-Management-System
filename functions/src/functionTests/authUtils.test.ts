import { requireRole } from "../utils/authUtils";
import { CallableRequest } from "firebase-functions/v2/https";

describe("authUtils", () => {
  describe("requireRole", () => {
    it("should throw an error if the request is unauthenticated", () => {
      const request = {
        auth: undefined,
      } as unknown as CallableRequest;

      expect(() => requireRole(request, ["admin"])).toThrow("You must be logged in.");
    });

    it("should throw an error if the user lacks the required role", () => {
      const request = {
        auth: {
          uid: "test-uid",
          token: {
            roles: ["student"],
          },
        },
      } as unknown as CallableRequest;

      expect(() => requireRole(request, ["admin"])).toThrow("You do not have the required permissions.");
    });

    it("should pass if the user has the exact required role", () => {
      const request = {
        auth: {
          uid: "test-uid",
          token: {
            roles: ["admin"],
          },
        },
      } as unknown as CallableRequest;

      expect(() => requireRole(request, ["admin"])).not.toThrow();
    });

    it("should pass if the user has one of the allowed roles", () => {
      const request = {
        auth: {
          uid: "test-uid",
          token: {
            roles: ["instructor"],
          },
        },
      } as unknown as CallableRequest;

      expect(() => requireRole(request, ["admin", "instructor"])).not.toThrow();
    });

    it("should throw an error if roles array is missing from token", () => {
      const request = {
        auth: {
          uid: "test-uid",
          token: {},
        },
      } as unknown as CallableRequest;

      expect(() => requireRole(request, ["student"])).toThrow("You do not have the required permissions.");
    });
  });
});
