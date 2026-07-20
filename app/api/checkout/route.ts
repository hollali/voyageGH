import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { initializeTransaction, generateReference, ghsToPesewas } from "~/lib/paystack";
import { db } from "~/lib/db";
import { bookings, trips, users } from "~/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { checkRateLimit, getRateLimitHeaders } from "~/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateKey = `checkout:${userId}`;
    const rateLimit = checkRateLimit(rateKey, 10, 60000);
    const headers = getRateLimitHeaders(rateKey, 10);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter}s` },
        { status: 429, headers }
      );
    }

    const { tripId } = await request.json();
    if (!tripId) {
      return NextResponse.json({ error: "tripId is required" }, { status: 400 });
    }

    const [existingBooking] = await db
      .select()
      .from(bookings)
      .where(and(eq(bookings.userId, userId), eq(bookings.tripId, tripId)))
      .limit(1);

    if (existingBooking) {
      return NextResponse.json(
        { error: "You have already booked this trip" },
        { status: 409 }
      );
    }

    const [trip] = await db.select().from(trips).where(eq(trips.id, tripId)).limit(1);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const priceStr = trip.estimatedPrice || "GH₵ 0";
    const numericPrice = Number(priceStr.replace(/[^0-9.]/g, "")) || 100;
    const amountInPesewas = ghsToPesewas(numericPrice);

    const reference = generateReference();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const [booking] = await db
      .insert(bookings)
      .values({ userId, tripId, status: "pending" })
      .returning();

    await db
      .update(bookings)
      .set({ paymentLink: reference })
      .where(eq(bookings.id, booking.id));

    const result = await initializeTransaction({
      email: user.email,
      amount: amountInPesewas,
      reference,
      callbackUrl: `${baseUrl}/api/paystack/callback`,
      metadata: {
        bookingId: booking.id,
        tripId,
        userId,
        tripName: trip.name,
      },
    });

    return NextResponse.json({
      authorizationUrl: result.data.authorization_url,
      reference,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Paystack checkout error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
