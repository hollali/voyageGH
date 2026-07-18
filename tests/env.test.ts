import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("env validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("validateEnv throws when required vars are missing", async () => {
    delete process.env.DATABASE_URL;
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    delete process.env.CLERK_SECRET_KEY;

    const { validateEnv } = await import("../lib/env");
    expect(() => validateEnv()).toThrow(/Missing required environment variables/);
  });

  it("validateEnv passes when all required vars are set", async () => {
    process.env.DATABASE_URL = "postgresql://test";
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_xxx";
    process.env.CLERK_SECRET_KEY = "sk_test_xxx";

    const { validateEnv } = await import("../lib/env");
    expect(() => validateEnv()).not.toThrow();
  });

  it("getGeminiApiKey throws when GEMINI_API_KEY is not set", async () => {
    delete process.env.GEMINI_API_KEY;

    const { getGeminiApiKey } = await import("../lib/env");
    expect(() => getGeminiApiKey()).toThrow(/GEMINI_API_KEY is not set/);
  });

  it("getGeminiApiKey returns the key when set", async () => {
    process.env.GEMINI_API_KEY = "test-key-123";

    const { getGeminiApiKey } = await import("../lib/env");
    expect(getGeminiApiKey()).toBe("test-key-123");
  });

  it("getPaystackSecretKey throws when not set", async () => {
    delete process.env.PAYSTACK_SECRET_KEY;

    const { getPaystackSecretKey } = await import("../lib/env");
    expect(() => getPaystackSecretKey()).toThrow(/PAYSTACK_SECRET_KEY is not set/);
  });

  it("getPaystackSecretKey returns key when set", async () => {
    process.env.PAYSTACK_SECRET_KEY = "sk_test_xxx";

    const { getPaystackSecretKey } = await import("../lib/env");
    expect(getPaystackSecretKey()).toBe("sk_test_xxx");
  });
});
