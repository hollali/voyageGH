import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createBooking, getBookingsByUser } from "~/lib/actions";
import { db } from "~/lib/db";
import { bookings } from "~/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { checkRateLimit, getRateLimitHeaders } from "~/lib/rate-limit";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userBookings = await getBookingsByUser(userId);
    return NextResponse.json(userBookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const rateKey = `bookings-post`;
  const rateLimit = checkRateLimit(rateKey, 10, 60000);
  const headers = getRateLimitHeaders(rateKey, 10);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter}s` },
      { status: 429, headers }
    );
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await request.json();
    if (!tripId) {
      return NextResponse.json({ error: "tripId is required" }, { status: 400 });
    }

    const existingBooking = await db
      .select()
      .from(bookings)
      .where(and(eq(bookings.userId, userId), eq(bookings.tripId, tripId)))
      .limit(1);

    if (existingBooking.length > 0) {
      return NextResponse.json(
        { error: "You have already booked this trip" },
        { status: 409 }
      );
    }

    const booking = await createBooking(userId, tripId);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
