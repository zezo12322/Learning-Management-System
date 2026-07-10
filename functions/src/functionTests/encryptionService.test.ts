import { EncryptionService } from "../utils/encryptionService";

describe("EncryptionService", () => {
  const mockSecretKey = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; // 64 hex chars = 32 bytes

  it("should encrypt and decrypt a valid string", () => {
    const originalText = "my-super-secret-national-id";
    const encrypted = EncryptionService.encrypt(originalText, mockSecretKey);

    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe("string");
    expect(encrypted).toContain(":");

    const decrypted = EncryptionService.decrypt(encrypted, mockSecretKey);
    expect(decrypted).toBe(originalText);
  });

  it("should return null when encrypting null or empty string", () => {
    expect(EncryptionService.encrypt(null, mockSecretKey)).toBeNull();
    expect(EncryptionService.encrypt("", mockSecretKey)).toBeNull();
    expect(EncryptionService.encrypt(undefined, mockSecretKey)).toBeNull();
  });

  it("should return null when decrypting null or empty string", () => {
    expect(EncryptionService.decrypt(null, mockSecretKey)).toBeNull();
    expect(EncryptionService.decrypt("", mockSecretKey)).toBeNull();
    expect(EncryptionService.decrypt(undefined, mockSecretKey)).toBeNull();
  });

  it("should produce different ciphertexts for the same plaintext due to random IV", () => {
    const originalText = "same-text";
    const encrypted1 = EncryptionService.encrypt(originalText, mockSecretKey);
    const encrypted2 = EncryptionService.encrypt(originalText, mockSecretKey);

    expect(encrypted1).not.toBe(encrypted2);

    // Both should still decrypt to the same text
    expect(EncryptionService.decrypt(encrypted1, mockSecretKey)).toBe(originalText);
    expect(EncryptionService.decrypt(encrypted2, mockSecretKey)).toBe(originalText);
  });

  it("should throw an error or fail to decrypt if secret key is incorrect", () => {
    const originalText = "test-text";
    const encrypted = EncryptionService.encrypt(originalText, mockSecretKey);
    
    const wrongKey = "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789";
    expect(() => {
      EncryptionService.decrypt(encrypted, wrongKey);
    }).toThrow();
  });
});
