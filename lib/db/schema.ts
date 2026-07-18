import { pgTable, serial, varchar, text, integer, timestamp, jsonb, bigint, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: text("image_url"),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("user"),
  itineraryCreated: integer("itinerary_created").notNull().default(0),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  estimatedPrice: varchar("estimated_price", { length: 50 }),
  duration: integer("duration"),
  budget: varchar("budget", { length: 50 }),
  travelStyle: varchar("travel_style", { length: 100 }),
  interests: text("interests"),
  groupType: varchar("group_type", { length: 50 }),
  country: varchar("country", { length: 255 }),
  imageUrls: jsonb("image_urls").$type<string[]>().default([]),
  itinerary: jsonb("itinerary").$type<DayPlan[]>().default([]),
  bestTimeToVisit: jsonb("best_time_to_visit").$type<string[]>().default([]),
  weatherInfo: jsonb("weather_info").$type<string[]>().default([]),
  location: jsonb("location").$type<{ city: string; coordinates: [number, number]; openStreetMap: string }>(),
  paymentLink: varchar("payment_link", { length: 500 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tripsRelations = relations(trips, ({ many }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  tripId: integer("trip_id").notNull().references(() => trips.id),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  trip: one(trips, {
    fields: [bookings.tripId],
    references: [trips.id],
  }),
}));

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  tripId: integer("trip_id").notNull().references(() => trips.id),
  rating: real("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  trip: one(trips, {
    fields: [reviews.tripId],
    references: [trips.id],
  }),
}));

// Type definitions
interface Activity {
  time: string;
  description: string;
}

interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}
