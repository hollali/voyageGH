import { describe, it, expect } from "vitest";
import {
  ghanaRegions,
  ghanaDestinations,
  travelStyles,
  interests,
  budgetOptions,
  groupTypes,
  DUMMY_TRIPS,
  DUMMY_USERS,
} from "../lib/constants";

describe("Ghana data constants", () => {
  describe("ghanaRegions", () => {
    it("contains all 16 regions of Ghana", () => {
      expect(ghanaRegions.length).toBe(16);
    });

    it("includes Greater Accra", () => {
      expect(ghanaRegions).toContain("Greater Accra");
    });

    it("includes Ashanti", () => {
      expect(ghanaRegions).toContain("Ashanti");
    });

    it("includes Northern", () => {
      expect(ghanaRegions).toContain("Northern");
    });
  });

  describe("ghanaDestinations", () => {
    it("contains at least 10 destinations", () => {
      expect(ghanaDestinations.length).toBeGreaterThanOrEqual(10);
    });

    it("includes Accra and Kumasi", () => {
      expect(ghanaDestinations).toContain("Accra");
      expect(ghanaDestinations).toContain("Kumasi");
    });
  });

  describe("travelStyles", () => {
    it("contains at least 5 styles", () => {
      expect(travelStyles.length).toBeGreaterThanOrEqual(5);
    });

    it("includes Heritage & History", () => {
      expect(travelStyles).toContain("Heritage & History");
    });
  });

  describe("interests", () => {
    it("contains at least 8 interests", () => {
      expect(interests.length).toBeGreaterThanOrEqual(8);
    });

    it("includes Food & Local Cuisine", () => {
      expect(interests).toContain("Food & Local Cuisine");
    });
  });

  describe("budgetOptions", () => {
    it("has 4 budget tiers", () => {
      expect(budgetOptions).toHaveLength(4);
    });

    it("includes Budget and Premium", () => {
      expect(budgetOptions).toContain("Budget");
      expect(budgetOptions).toContain("Premium");
    });
  });

  describe("groupTypes", () => {
    it("includes Solo, Couple, Family", () => {
      expect(groupTypes).toContain("Solo");
      expect(groupTypes).toContain("Couple");
      expect(groupTypes).toContain("Family");
    });
  });
});

describe("DUMMY_TRIPS", () => {
  it("contains at least 4 sample trips", () => {
    expect(DUMMY_TRIPS.length).toBeGreaterThanOrEqual(4);
  });

  it("each trip has required fields", () => {
    DUMMY_TRIPS.forEach((trip) => {
      expect(trip.id).toBeDefined();
      expect(trip.name).toBeTruthy();
      expect(trip.description).toBeTruthy();
      expect(trip.estimatedPrice).toBeTruthy();
      expect(trip.duration).toBeGreaterThan(0);
      expect(trip.budget).toBeTruthy();
      expect(trip.travelStyle).toBeTruthy();
      expect(trip.groupType).toBeTruthy();
      expect(trip.imageUrls.length).toBeGreaterThan(0);
      expect(trip.itinerary.length).toBeGreaterThan(0);
    });
  });

  it("each trip has Ghana-related content", () => {
    DUMMY_TRIPS.forEach((trip) => {
      const text = `${trip.name} ${trip.description} ${trip.itinerary[0]?.location}`.toLowerCase();
      expect(text).toMatch(/ghana|accra|kumasi|cape coast|volta|ashanti|central|northern|greater accra/);
    });
  });

  it("all estimated prices are in GH₵", () => {
    DUMMY_TRIPS.forEach((trip) => {
      expect(trip.estimatedPrice).toMatch(/^GH₵/);
    });
  });
});

describe("DUMMY_USERS", () => {
  it("contains sample users", () => {
    expect(DUMMY_USERS.length).toBeGreaterThanOrEqual(2);
  });

  it("each user has required fields", () => {
    DUMMY_USERS.forEach((user) => {
      expect(user.id).toBeTruthy();
      expect(user.name).toBeTruthy();
      expect(user.email).toBeTruthy();
    });
  });

  it("has at least one admin user", () => {
    const admins = DUMMY_USERS.filter((u) => u.status === "admin");
    expect(admins.length).toBeGreaterThanOrEqual(1);
  });
});
