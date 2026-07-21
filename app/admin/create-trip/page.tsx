"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Map } from "lucide-react";
import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { ghanaRegions, travelStyles, interests, budgetOptions, groupTypes } from "~/lib/constants";
import type { TripFormData } from "~/lib/types";

interface GeneratedTrip {
  id?: number;
  name?: string;
  description?: string;
  estimatedPrice?: string;
  duration?: number;
  country?: string;
  travelStyle?: string;
  budget?: string;
  itinerary?: { day: number; location: string; activities: { time: string; description: string }[] }[];
}

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
  const [generatedTrip, setGeneratedTrip] = useState<GeneratedTrip | null>(null);

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
                  <label htmlFor="region" className="form-label">Region in Ghana</label>
                  <select
                    id="region"
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
                  <label htmlFor="travelStyle" className="form-label">Travel Style</label>
                  <select
                    id="travelStyle"
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
                  <label htmlFor="interest" className="form-label">Interests</label>
                  <select
                    id="interest"
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
                  <label htmlFor="budget" className="form-label">Budget (GH₵)</label>
                  <select
                    id="budget"
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
                  <label htmlFor="duration" className="form-label">Duration (days)</label>
                  <input
                    id="duration"
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
                  <label htmlFor="groupType" className="form-label">Group Type</label>
                  <select
                    id="groupType"
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
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 size={20} />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Generate Trip
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Preview */}
              <div className="bg-white border border-light-200 rounded-xl shadow-100 p-6">
                <h2 className="p-18-semibold text-dark-100 mb-4">Preview</h2>
                {generatedTrip ? (
                  <div className="flex flex-col gap-4">
                    <div className="bg-primary-100/5 border border-primary-100/20 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-dark-100">{generatedTrip.name}</h3>
                      <p className="text-sm text-gray-100 mt-1">{generatedTrip.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {generatedTrip.estimatedPrice && (
                          <span className="px-3 py-1 bg-primary-100/10 text-primary-100 text-xs rounded-full font-medium">{generatedTrip.estimatedPrice}</span>
                        )}
                        {generatedTrip.duration && (
                          <span className="px-3 py-1 bg-light-500 text-gray-100 text-xs rounded-full font-medium">{generatedTrip.duration} days</span>
                        )}
                        {generatedTrip.travelStyle && (
                          <span className="px-3 py-1 bg-light-500 text-gray-100 text-xs rounded-full font-medium">{generatedTrip.travelStyle}</span>
                        )}
                        {generatedTrip.country && (
                          <span className="px-3 py-1 bg-light-500 text-gray-100 text-xs rounded-full font-medium">{generatedTrip.country}</span>
                        )}
                      </div>
                    </div>

                    {generatedTrip.itinerary && generatedTrip.itinerary.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-dark-100">Itinerary</h4>
                        {generatedTrip.itinerary.map((day) => (
                          <div key={day.day} className="border border-light-400 rounded-lg p-3">
                            <p className="font-semibold text-dark-100 text-sm">Day {day.day} — {day.location}</p>
                            {day.activities?.map((act, i) => (
                              <p key={i} className="text-xs text-gray-100 mt-1">
                                <span className="font-medium text-dark-200">{act.time}:</span> {act.description}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedTrip.id && (
                      <Link
                        href={`/trips/${generatedTrip.id}`}
                        className="text-center py-2.5 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors text-sm"
                      >
                        View Full Trip
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-100 text-gray-100">
                    <Map size={48} className="mb-4 opacity-50" />
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
