import { NextRequest, NextResponse } from "next/server";
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
    const { tripId, userId, rating, comment } = await request.json();
    if (!tripId || !userId || !rating) {
      return NextResponse.json(
        { error: "tripId, userId, and rating are required" },
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
