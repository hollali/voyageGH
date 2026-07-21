import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { users } from "~/lib/db/schema";
import { getAdminSession } from "~/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!["user", "admin"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const result = await db
    .update(users)
    .set({ status })
    .where(eq(users.id, id))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (id === session.userId) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  const result = await db.delete(users).where(eq(users.id, id)).returning();

  if (result.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
