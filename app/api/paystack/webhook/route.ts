import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyTransaction } from "~/lib/paystack";
import { db } from "~/lib/db";
import { bookings } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

function verifyPaystackSignature(body: string, signature: string, secretKey: string): boolean {
  const hash = crypto.createHmac("sha512", secretKey).update(body).digest("hex");
  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (!verifyPaystackSignature(rawBody, signature, secretKey)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
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
