import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "~/lib/paystack";
import { db } from "~/lib/db";
import { bookings } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    if (event === "charge.success") {
      const reference = data?.reference;
      if (!reference) {
        return NextResponse.json({ received: true });
      }

      const result = await verifyTransaction(reference);

      if (result.data.status === "success") {
        const meta = result.data.metadata;
        const bookingId = meta?.bookingId as number | undefined;

        if (bookingId) {
          await db
            .update(bookings)
            .set({ status: "confirmed" })
            .where(eq(bookings.id, bookingId));
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
