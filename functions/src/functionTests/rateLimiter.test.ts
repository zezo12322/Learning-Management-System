import { RateLimiter } from "../utils/rateLimiter";
import { Ratelimit } from "@upstash/ratelimit";

// Mock the Ratelimit class from Upstash
jest.mock("@upstash/ratelimit", () => {
  const RatelimitMock: any = jest.fn().mockImplementation(() => {
    return {
      limit: jest.fn().mockResolvedValue({ success: true, remaining: 9 }),
    };
  });
  RatelimitMock.slidingWindow = jest.fn();

  return {
    Ratelimit: RatelimitMock,
  };
});

// Mock Redis
jest.mock("@upstash/redis", () => {
  return {
    Redis: jest.fn().mockImplementation(() => ({})),
  };
});

describe("RateLimiter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize Ratelimit on first check", async () => {
    // Override environment variables for the test
    process.env.UPSTASH_REDIS_REST_URL = "https://example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

    // Rate limiter shouldn't crash
    await expect(RateLimiter.checkLimit("test-uid", 10, "1 m")).resolves.not.toThrow();
    
    // Check if Ratelimit was instantiated
    expect(Ratelimit).toHaveBeenCalled();
  });
});
