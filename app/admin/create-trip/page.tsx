"use client";

import { useState } from "react";
import Image from "next/image";
import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { ghanaRegions, travelStyles, interests, budgetOptions, groupTypes } from "~/lib/constants";
import type { TripFormData } from "~/lib/types";

export default function CreateTripPage() {
  const [formData, setFormData] = useState<TripFormData>({
    country: "Ghana",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  const [loading, setLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedTrip(data);
    } catch (error) {
      console.error("Failed to generate trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">Create a Ghana Trip</h1>
              <p className="text-gray-100">Generate an AI-powered itinerary for your Ghana adventure</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form */}
              <form onSubmit={handleSubmit} className="trip-form">
                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Region in Ghana</label>
                  <select
                    className="combo-box"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  >
                    <option value="Ghana">All Ghana</option>
                    {ghanaRegions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Travel Style</label>
                  <select
                    className="combo-box"
                    value={formData.travelStyle}
                    onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                    required
                  >
                    <option value="">Select travel style</option>
                    {travelStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Interests</label>
                  <select
                    className="combo-box"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    required
                  >
                    <option value="">Select interests</option>
                    {interests.map((interest) => (
                      <option key={interest} value={interest}>{interest}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Budget (GH₵)</label>
                  <select
                    className="combo-box"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                  >
                    <option value="">Select budget</option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Duration (days)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    className="combo-box"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    placeholder="Number of days"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2.5 px-6">
                  <label className="form-label">Group Type</label>
                  <select
                    className="combo-box"
                    value={formData.groupType}
                    onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                    required
                  >
                    <option value="">Select group type</option>
                    {groupTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="px-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Image src="/assets/icons/loader.svg" alt="loading" width={20} height={20} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Image src="/assets/icons/magic-star.svg" alt="ai" width={20} height={20} />
                        Generate Trip
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Preview */}
              <div className="bg-white border border-light-200 rounded-xl shadow-100 p-6">
                <h2 className="p-18-semibold text-dark-100 mb-4">Preview</h2>
                {generatedTrip ? (
                  <div className="flex flex-col gap-4">
                    <pre className="text-sm text-gray-100 overflow-auto max-h-[500px]">
                      {JSON.stringify(generatedTrip, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-gray-100">
                    <Image src="/assets/icons/itinerary.svg" alt="preview" width={48} height={48} className="mb-4 opacity-50" />
                    <p>Generated itinerary will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
