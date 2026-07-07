/**
 * @fileoverview Redis-backed rate limiting using Upstash.
 *
 * Protects callable endpoints from brute-force or denial-of-service attacks.
 * It uses a sliding window approach for accurate limit tracking.
 */

const {Redis} = require("@upstash/redis");
const {Ratelimit} = require("@upstash/ratelimit");

// Declare the variables, but do NOT initialize them yet
// This allows lazy initialization to prevent crashes if Redis isn't immediately available.
let redisClient = null;
const limiters = {};

/**
 * Retrieves or creates a rate limiter configuration.
 *
 * @param {number} maxRequests - Max requests allowed in the time window.
 * @param {string} windowString - Time window (e.g., "1 m", "10 s").
 * @return {Ratelimit} The Upstash Ratelimit instance.
 */
function getLimiter(maxRequests, windowString) {
  const key = `${maxRequests}_${windowString}`;

  // If this specific limit configuration doesn't exist yet, create it.
  if (!limiters[key]) {
    // LAZY INITIALIZATION:
    // We only instantiate the Redis connection when a Cloud Function actually runs.
    // This prevents the Firebase CLI from crashing during local deployment analysis.
    if (!redisClient) {
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;

      if (!url || !token) {
        console.error("CRITICAL: Upstash secrets are missing from the environment.");
        // We pass a dummy URL so it doesn't crash the server instance,
        // but it will fail gracefully when it tries to connect.
        redisClient = new Redis({url: "https://dummy.upstash.io", token: "dummy"});
      } else {
        redisClient = new Redis({url, token});
      }
    }

    limiters[key] = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(maxRequests, windowString),
      ephemeralCache: new Map(),
    });
  }

  return limiters[key];
}

class RateLimiter {
  /**
     * Checks the request against the Redis rate limiter.
     * Throws an error if the rate limit is exceeded.
     *
     * @param {string} identifier - e.g., "ip_192.168.1.1" or "uid_ABC123"
     * @param {number} maxRequests - e.g., 10
     * @param {string} windowString - e.g., "1 m"
     */
  static async checkLimit(identifier, maxRequests, windowString) {
    const limiter = getLimiter(maxRequests, windowString);

    // Check the identifier against Redis
    const {success} = await limiter.limit(identifier);

    if (!success) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
  }
}

module.exports = RateLimiter;
