import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction, pesewasToGhs } from "~/lib/paystack";
import { db } from "~/lib/db";
import { bookings } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!reference) {
    return NextResponse.redirect(new URL("/dashboard?payment=error", baseUrl));
  }

  try {
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

      return NextResponse.redirect(
        new URL("/dashboard?payment=success", baseUrl)
      );
    }

    return NextResponse.redirect(
      new URL("/dashboard?payment=failed", baseUrl)
    );
  } catch (error) {
    console.error("Paystack callback error:", error);
    return NextResponse.redirect(
      new URL("/dashboard?payment=error", baseUrl)
    );
  }
}
