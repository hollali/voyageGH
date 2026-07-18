interface PricingParams {
  duration: number;
  budget: "Budget" | "Mid-range" | "Luxury" | "Premium";
  groupType: "Solo" | "Couple" | "Family" | "Friends" | "Business" | "Diaspora Visit";
  region?: string;
}

const BUDGET_MULTIPLIERS: Record<string, number> = {
  Budget: 1,
  "Mid-range": 1.8,
  Luxury: 3,
  Premium: 5,
};

const GROUP_MULTIPLIERS: Record<string, number> = {
  Solo: 1,
  Couple: 1.6,
  Family: 2.5,
  Friends: 2,
  Business: 3.5,
  "Diaspora Visit": 4,
};

// Base daily cost per person in GH₵
const BASE_DAILY_COST = 350;

// Regional cost adjustments (some regions are more expensive)
const REGION_ADJUSTMENTS: Record<string, number> = {
  "Greater Accra": 1.3,
  Ashanti: 1.1,
  Central: 1.0,
  Volta: 0.85,
  Northern: 0.8,
  "Upper East": 0.75,
  "Upper West": 0.75,
  Western: 0.95,
  Eastern: 0.9,
  Ghana: 1.0,
};

export function calculatePrice(params: PricingParams): string {
  const budgetMult = BUDGET_MULTIPLIERS[params.budget] || 1;
  const groupMult = GROUP_MULTIPLIERS[params.groupType] || 1;
  const regionMult = REGION_ADJUSTMENTS[params.region || "Ghana"] || 1;

  // For groups, the per-person cost is reduced slightly (shared accommodation, transport)
  const groupDiscount = params.groupType === "Solo" ? 1 : 0.85;

  const totalCost =
    BASE_DAILY_COST *
    params.duration *
    budgetMult *
    regionMult *
    groupMult *
    groupDiscount;

  // Round to nearest 50
  const rounded = Math.round(totalCost / 50) * 50;

  return `GH₵ ${rounded.toLocaleString()}`;
}

export function getPriceBreakdown(params: PricingParams) {
  const budgetMult = BUDGET_MULTIPLIERS[params.budget] || 1;
  const groupMult = GROUP_MULTIPLIERS[params.groupType] || 1;
  const regionMult = REGION_ADJUSTMENTS[params.region || "Ghana"] || 1;
  const groupDiscount = params.groupType === "Solo" ? 1 : 0.85;

  const accommodation = BASE_DAILY_COST * 0.4 * params.duration * budgetMult * regionMult;
  const transport = BASE_DAILY_COST * 0.25 * params.duration * regionMult;
  const food = BASE_DAILY_COST * 0.2 * params.duration * budgetMult;
  const activities = BASE_DAILY_COST * 0.15 * params.duration * regionMult;

  const perPerson = (accommodation + transport + food + activities) * groupMult * groupDiscount;
  const total = Math.round(perPerson / 50) * 50;

  return {
    accommodation: Math.round(accommodation / 50) * 50,
    transport: Math.round(transport / 50) * 50,
    food: Math.round(food / 50) * 50,
    activities: Math.round(activities / 50) * 50,
    perPerson: Math.round(perPerson / 50) * 50,
    total,
  };
}
