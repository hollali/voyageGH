import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Database features are unavailable during build.");
    }
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Lazy proxy — only connects to the database when first accessed at runtime
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
