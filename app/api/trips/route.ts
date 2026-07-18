import { NextRequest, NextResponse } from "next/server";
import { searchTrips } from "~/lib/actions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trips = await searchTrips({
      query: searchParams.get("query") || undefined,
      region: searchParams.get("region") || undefined,
      travelStyle: searchParams.get("travelStyle") || undefined,
      budget: searchParams.get("budget") || undefined,
    });
    return NextResponse.json(trips);
  } catch (error) {
    console.error("Search trips error:", error);
    return NextResponse.json({ error: "Failed to search trips" }, { status: 500 });
  }
}
