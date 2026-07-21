"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { TripCard } from "~/components/TripCard";
import { ghanaRegions, travelStyles, budgetOptions, DUMMY_TRIPS } from "~/lib/constants";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

interface TripListItem {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  travelStyle: string;
  budget: string;
  interests: string;
  groupType: string;
  duration: number;
  estimatedPrice: string;
  country?: string;
  itinerary: { location: string }[];
}

export default function TripsClient() {
  const t = useTranslations("trips");
  const [trips, setTrips] = useState<TripListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("query", debouncedSearch);
      if (selectedRegion) params.set("region", selectedRegion);
      if (selectedStyle) params.set("travelStyle", selectedStyle);
      if (selectedBudget) params.set("budget", selectedBudget);

      const res = await fetch(`/api/trips?${params.toString()}`);
      const data = await res.json();
      setTrips(data.length > 0 ? data : DUMMY_TRIPS);
    } catch {
      setTrips(DUMMY_TRIPS);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedRegion, selectedStyle, selectedBudget]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="wrapper py-10 flex-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="p-30-bold text-dark-100">{t("title")}</h1>
            <p className="text-gray-100 text-lg">{t("subtitle")}</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-100" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-light-400 rounded-xl text-base text-dark-300 focus:outline-none focus:border-primary-100"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-100 hover:text-dark-100"
                >
                  <X size={16} />
                </motion.button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                className="combo-box max-w-[200px]"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">{t("allRegions")}</option>
                {ghanaRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select
                className="combo-box max-w-[200px]"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                <option value="">{t("allStyles")}</option>
                {travelStyles.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <select
                className="combo-box max-w-[200px]"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">{t("allBudgets")}</option>
                {budgetOptions.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="trip-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="trip-card animate-pulse">
                  <div className="w-full h-[160px] bg-light-300 rounded-t-xl" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-5 bg-light-300 rounded w-3/4" />
                    <div className="h-4 bg-light-300 rounded w-1/2" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-light-300 rounded-full w-16" />
                      <div className="h-6 bg-light-300 rounded-full w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="bg-white rounded-20 shadow-400 p-12 text-center">
              <p className="text-gray-100 text-lg mb-4">{t("noResults")}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("");
                  setSelectedStyle("");
                  setSelectedBudget("");
                }}
                className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            <div className="trip-grid stagger-children">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  name={trip.name}
                  location={trip.country || ""}
                  imageUrl={trip.imageUrls?.[0] || "/assets/images/ghana/accra-city.jpg"}
                  tags={[trip.travelStyle, trip.budget].filter((t): t is string => Boolean(t))}
                  price={trip.estimatedPrice || ""}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
