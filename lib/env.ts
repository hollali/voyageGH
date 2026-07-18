const REQUIRED_ENV_VARS = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};

const OPTIONAL_ENV_VARS = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
};

export function validateEnv() {
  const missing: string[] = [];

  for (const [key, value] of Object.entries(REQUIRED_ENV_VARS)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
      `Please add them to .env.local`
    );
  }

  const warnings: string[] = [];
  for (const [key, value] of Object.entries(OPTIONAL_ENV_VARS)) {
    if (!value) {
      warnings.push(key);
    }
  }

  if (warnings.length > 0) {
    console.warn(
      `[VoyageGH] Optional env vars not set (some features disabled): ${warnings.join(", ")}`
    );
  }
}

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not set. AI trip generation is disabled.");
  }
  return key;
}

export function getPaystackSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not set. Payment features are disabled.");
  }
  return key;
}
