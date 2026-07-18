"use server";

import { eq, desc, like, and, sql, count } from "drizzle-orm";
import { db } from "~/lib/db";
import { trips, bookings, reviews, users } from "~/lib/db/schema";

// ===== TRIPS =====

export async function getAllTrips() {
  const allTrips = await db.select().from(trips).orderBy(desc(trips.createdAt));
  return allTrips;
}

export async function getTripById(id: number) {
  const result = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
  return result[0] || null;
}

export async function searchTrips(filters: {
  query?: string;
  region?: string;
  travelStyle?: string;
  budget?: string;
  minDuration?: number;
  maxDuration?: number;
}) {
  const conditions = [];

  if (filters.query) {
    conditions.push(
      sql`(${trips.name} ILIKE ${`%${filters.query}%`} OR ${trips.description} ILIKE ${`%${filters.query}%`})`
    );
  }
  if (filters.region && filters.region !== "All") {
    conditions.push(eq(trips.country, filters.region));
  }
  if (filters.travelStyle) {
    conditions.push(eq(trips.travelStyle, filters.travelStyle));
  }
  if (filters.budget) {
    conditions.push(eq(trips.budget, filters.budget));
  }
  if (filters.minDuration) {
    conditions.push(sql`${trips.duration} >= ${filters.minDuration}`);
  }
  if (filters.maxDuration) {
    conditions.push(sql`${trips.duration} <= ${filters.maxDuration}`);
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const results = await db.select().from(trips).where(where).orderBy(desc(trips.createdAt));
  return results;
}

export async function createTrip(data: typeof trips.$inferInsert) {
  const result = await db.insert(trips).values(data).returning();
  return result[0];
}

export async function updateTrip(id: number, data: Partial<typeof trips.$inferInsert>) {
  const result = await db.update(trips).set(data).where(eq(trips.id, id)).returning();
  return result[0];
}

export async function deleteTrip(id: number) {
  await db.delete(trips).where(eq(trips.id, id));
}

// ===== BOOKINGS =====

export async function createBooking(userId: string, tripId: number) {
  const result = await db.insert(bookings).values({ userId, tripId }).returning();
  return result[0];
}

export async function getBookingsByUser(userId: string) {
  const userBookings = await db
    .select({
      booking: bookings,
      trip: trips,
    })
    .from(bookings)
    .innerJoin(trips, eq(bookings.tripId, trips.id))
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt));
  return userBookings;
}

export async function getAllBookings() {
  const allBookings = await db
    .select({
      booking: bookings,
      trip: trips,
      user: users,
    })
    .from(bookings)
    .innerJoin(trips, eq(bookings.tripId, trips.id))
    .innerJoin(users, eq(bookings.userId, users.id))
    .orderBy(desc(bookings.createdAt));
  return allBookings;
}

export async function updateBookingStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled"
) {
  const result = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, id))
    .returning();
  return result[0];
}

// ===== REVIEWS =====

export async function createReview(
  userId: string,
  tripId: number,
  rating: number,
  comment?: string
) {
  const result = await db
    .insert(reviews)
    .values({ userId, tripId, rating, comment })
    .returning();
  return result[0];
}

export async function getReviewsByTrip(tripId: number) {
  const tripReviews = await db
    .select({
      review: reviews,
      user: users,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.tripId, tripId))
    .orderBy(desc(reviews.createdAt));
  return tripReviews;
}

export async function getAverageRating(tripId: number) {
  const result = await db
    .select({
      avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
      totalReviews: count(reviews.id),
    })
    .from(reviews)
    .where(eq(reviews.tripId, tripId));
  return result[0];
}

// ===== DASHBOARD STATS =====

export async function getDashboardStats() {
  const [totalUsers] = await db.select({ count: count() }).from(users);
  const [totalTrips] = await db.select({ count: count() }).from(trips);
  const [totalBookings] = await db.select({ count: count() }).from(bookings);

  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  const [usersThisMonth] = await db
    .select({ count: count() })
    .from(users)
    .where(sql`${users.joinedAt} >= ${currentMonth}`);

  const [tripsThisMonth] = await db
    .select({ count: count() })
    .from(trips)
    .where(sql`${trips.createdAt} >= ${currentMonth}`);

  const [bookingsThisMonth] = await db
    .select({ count: count() })
    .from(bookings)
    .where(sql`${bookings.createdAt} >= ${currentMonth}`);

  return {
    totalUsers: totalUsers.count,
    totalTrips: totalTrips.count,
    totalBookings: totalBookings.count,
    usersThisMonth: usersThisMonth.count,
    tripsThisMonth: tripsThisMonth.count,
    bookingsThisMonth: bookingsThisMonth.count,
  };
}

export async function getRecentTrips(limit = 5) {
  return db.select().from(trips).orderBy(desc(trips.createdAt)).limit(limit);
}

export async function getRecentBookings(limit = 10) {
  return db
    .select({
      booking: bookings,
      trip: trips,
      user: users,
    })
    .from(bookings)
    .innerJoin(trips, eq(bookings.tripId, trips.id))
    .innerJoin(users, eq(bookings.userId, users.id))
    .orderBy(desc(bookings.createdAt))
    .limit(limit);
}
