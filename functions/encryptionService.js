// functions/encryptionService.js
const crypto = require('crypto');

// The algorithm must support authenticated encryption (GCM)
const ALGORITHM = 'aes-256-gcm';

class EncryptionService {
    /**
     * @param {string} text - The raw, sensitive string (e.g., National ID)
     * @param {string} secretKey - Your 32-byte hexadecimal secret key
     * @returns {string} The formatted ciphertext
     */
    static encrypt(text, secretKey) {
        if (!text) return null;

        // 1. Generate a random Initialization Vector for this specific encryption
        const iv = crypto.randomBytes(16);

        // 2. Create the cipher
        const keyBuffer = Buffer.from(secretKey, 'hex');
        const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

        // 3. Encrypt the data
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // 4. Extract the authentication tag (prevents tampering)
        const authTag = cipher.getAuthTag().toString('hex');

        // 5. Return a combined string that PostgreSQL can easily store
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }

    static decrypt(hash, secretKey) {
        if (!hash) return null;

        const parts = hash.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encryptedText = parts[2];

        const keyBuffer = Buffer.from(secretKey, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}

module.exports = EncryptionService;