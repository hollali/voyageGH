import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { deleteTrip } from "~/lib/actions";
import { db } from "~/lib/db";
import { users } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user || user.status !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const tripId = Number(id);
    if (isNaN(tripId)) {
      return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
    }

    await deleteTrip(tripId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete trip error:", error);
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 });
  }
}
