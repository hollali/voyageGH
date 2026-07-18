"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { TripCard } from "~/components/TripCard";
import { ghanaRegions, travelStyles, budgetOptions, DUMMY_TRIPS } from "~/lib/constants";

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

export default function TripsPage() {
  const [trips, setTrips] = useState<TripListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("query", searchQuery);
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
  }, [searchQuery, selectedRegion, selectedStyle, selectedBudget]);

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
            <h1 className="p-30-bold text-dark-100">Ghana Trips</h1>
            <p className="text-gray-100 text-lg">AI-generated itineraries for every corner of Ghana</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Image src="/assets/icons/search.svg" alt="search" width={20} height={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-100" />
              <input
                type="text"
                placeholder="Search trips by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-light-400 rounded-xl text-base text-dark-300 focus:outline-none focus:border-primary-100"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                className="combo-box max-w-[200px]"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                {ghanaRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select
                className="combo-box max-w-[200px]"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                <option value="">All Travel Styles</option>
                {travelStyles.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <select
                className="combo-box max-w-[200px]"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">All Budgets</option>
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
              <p className="text-gray-100 text-lg mb-4">No trips found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("");
                  setSelectedStyle("");
                  setSelectedBudget("");
                }}
                className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="trip-grid">
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
