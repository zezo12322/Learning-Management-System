// functions/rateLimiter.js
//
//waiting for official company mail so that service can be set up on upstash on non personal mail. Until then, we will use a native Postgres solution for rate limiting.
//
// IF USING REDIS (Uncomment these lines when you switch to Upstash)
// const { Redis } = require("@upstash/redis");
// const { Ratelimit } = require("@upstash/ratelimit");
// const redis = new Redis({ url: '...', token: '...' });

class RateLimiter {
    /**
     * @param {string} identifier - e.g., "ip_192.168.1.1" or "uid_ABC123"
     * @param {number} maxRequests - e.g., 10
     * @param {string} windowString - e.g., "1 m"
     */
    static async checkLimit(identifier, maxRequests, windowString) {

        // =========================================================
        // ENGINE OPTION A: REDIS (UPSTASH) - The Recommended Future State
        // =========================================================
        /*
        const ratelimit = new Ratelimit({
            redis: redis,
            limiter: Ratelimit.slidingWindow(maxRequests, windowString),
        });
        const { success } = await ratelimit.limit(identifier);
        if (!success) throw new Error('RATE_LIMIT_EXCEEDED');
        return;
        */

        // =========================================================
        // ENGINE OPTION B: NATIVE POSTGRESQL - The Temporary Setup
        // =========================================================
        // You would place the executeGraphql(trackMutation) logic we discussed earlier right here.
        // For now, let's pretend it evaluates to false if they spam:
        const isSpamming = false; // Replace with actual DB check logic

        if (isSpamming) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
    }
}

module.exports = RateLimiter;