import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { calculatePrice, getPriceBreakdown } from "../lib/pricing";

describe("calculatePrice", () => {
  it("returns a formatted GH₵ string", () => {
    const price = calculatePrice({
      duration: 5,
      budget: "Mid-range",
      groupType: "Solo",
    });
    expect(price).toMatch(/^GH₵ [\d,]+$/);
  });

  it("returns higher price for Luxury vs Budget", () => {
    const budget = calculatePrice({
      duration: 5,
      budget: "Budget",
      groupType: "Solo",
    });
    const luxury = calculatePrice({
      duration: 5,
      budget: "Luxury",
      groupType: "Solo",
    });
    const budgetNum = parseInt(budget.replace(/[^\d]/g, ""));
    const luxuryNum = parseInt(luxury.replace(/[^\d]/g, ""));
    expect(luxuryNum).toBeGreaterThan(budgetNum);
  });

  it("returns higher price for longer durations", () => {
    const short = calculatePrice({
      duration: 3,
      budget: "Mid-range",
      groupType: "Solo",
    });
    const long = calculatePrice({
      duration: 10,
      budget: "Mid-range",
      groupType: "Solo",
    });
    const shortNum = parseInt(short.replace(/[^\d]/g, ""));
    const longNum = parseInt(long.replace(/[^\d]/g, ""));
    expect(longNum).toBeGreaterThan(shortNum);
  });

  it("returns higher price for Premium vs Budget", () => {
    const budget = calculatePrice({
      duration: 7,
      budget: "Budget",
      groupType: "Solo",
    });
    const premium = calculatePrice({
      duration: 7,
      budget: "Premium",
      groupType: "Solo",
    });
    const budgetNum = parseInt(budget.replace(/[^\d]/g, ""));
    const premiumNum = parseInt(premium.replace(/[^\d]/g, ""));
    expect(premiumNum).toBeGreaterThan(budgetNum);
  });

  it("returns higher price for Family group vs Solo", () => {
    const solo = calculatePrice({
      duration: 5,
      budget: "Mid-range",
      groupType: "Solo",
    });
    const family = calculatePrice({
      duration: 5,
      budget: "Mid-range",
      groupType: "Family",
    });
    const soloNum = parseInt(solo.replace(/[^\d]/g, ""));
    const familyNum = parseInt(family.replace(/[^\d]/g, ""));
    expect(familyNum).toBeGreaterThan(soloNum);
  });

  it("Greater Accra region costs more than Northern", () => {
    const accra = calculatePrice({
      duration: 5,
      budget: "Mid-range",
      groupType: "Solo",
      region: "Greater Accra",
    });
    const northern = calculatePrice({
      duration: 5,
      budget: "Mid-range",
      groupType: "Solo",
      region: "Northern",
    });
    const accraNum = parseInt(accra.replace(/[^\d]/g, ""));
    const northernNum = parseInt(northern.replace(/[^\d]/g, ""));
    expect(accraNum).toBeGreaterThan(northernNum);
  });
});

describe("getPriceBreakdown", () => {
  it("returns all cost categories", () => {
    const breakdown = getPriceBreakdown({
      duration: 5,
      budget: "Mid-range",
      groupType: "Solo",
    });
    expect(breakdown).toHaveProperty("accommodation");
    expect(breakdown).toHaveProperty("transport");
    expect(breakdown).toHaveProperty("food");
    expect(breakdown).toHaveProperty("activities");
    expect(breakdown).toHaveProperty("perPerson");
    expect(breakdown).toHaveProperty("total");
  });

  it("all costs are positive integers", () => {
    const breakdown = getPriceBreakdown({
      duration: 7,
      budget: "Luxury",
      groupType: "Couple",
    });
    expect(breakdown.accommodation).toBeGreaterThan(0);
    expect(breakdown.transport).toBeGreaterThan(0);
    expect(breakdown.food).toBeGreaterThan(0);
    expect(breakdown.activities).toBeGreaterThan(0);
    expect(breakdown.perPerson).toBeGreaterThan(0);
    expect(breakdown.total).toBeGreaterThan(0);
  });

  it("total is rounded to nearest 50", () => {
    const breakdown = getPriceBreakdown({
      duration: 4,
      budget: "Budget",
      groupType: "Solo",
    });
    expect(breakdown.total % 50).toBe(0);
  });
});
