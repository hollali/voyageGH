import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { bookings } from "~/lib/db/schema";
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
  const bookingId = parseInt(id);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }

  const { status } = await request.json();
  if (!["confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const result = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, bookingId))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
