import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createReview, getReviewsByTrip } from "~/lib/actions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");
    if (!tripId) {
      return NextResponse.json({ error: "tripId is required" }, { status: 400 });
    }
    const reviews = await getReviewsByTrip(Number(tripId));
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId, rating, comment } = await request.json();
    if (!tripId || !rating) {
      return NextResponse.json(
        { error: "tripId and rating are required" },
        { status: 400 }
      );
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await createReview(userId, tripId, rating, comment);
    return NextResponse.json(review);
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
