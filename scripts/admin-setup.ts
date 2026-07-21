/**
 * Admin Setup Utility
 *
 * Run this to create an admin user or set a password on an existing admin.
 *
 * Usage:
 *   npx tsx scripts/admin-setup.ts <email> <password>
 *
 * This will:
 * 1. Find the user by email in the database
 * 2. Hash the password
 * 3. Update their status to "admin" and set the password hash
 */

import { hashPassword } from "../lib/auth";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/admin-setup.ts <email> <password>");
    process.exit(1);
  }

  // Dynamic imports to avoid issues at build time
  const { neon } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const { eq } = await import("drizzle-orm");
  const schema = await import("../lib/db/schema");

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(url);
  const db = drizzle(sql, { schema });

  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (!user) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await db
    .update(schema.users)
    .set({
      status: "admin",
      passwordHash,
    })
    .where(eq(schema.users.id, user.id));

  console.log(`✓ User ${email} is now an admin.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
