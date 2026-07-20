import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, Sparkles } from "lucide-react";
import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { getAllTrips, requireAdmin } from "~/lib/actions";
import { DeleteTripButton } from "~/components/DeleteTripButton";

export const metadata = {
  title: "AI Trips | VoyageGH",
  description: "Manage AI-generated trip itineraries",
};

export default async function AdminTripsPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const allTrips = await getAllTrips();

  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">AI Trips</h1>
              <p className="text-gray-100">Manage all AI-generated itineraries</p>
            </header>

            {allTrips.length === 0 ? (
              <div className="bg-white rounded-20 shadow-400 p-12 text-center">
                <Sparkles size={48} className="mx-auto mb-4 text-primary-100 opacity-50" />
                <p className="text-gray-100 text-lg">No trips generated yet.</p>
                <a
                  href="/admin/create-trip"
                  className="mt-4 inline-block px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                >
                  Generate Your First Trip
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-20 shadow-400 overflow-hidden">
                <div className="table-responsive">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-400">
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Trip</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Region</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Style</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Price</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Duration</th>
                      <th className="text-right p-4 text-sm font-semibold text-dark-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTrips.map((trip) => (
                      <tr key={trip.id} className="border-b border-light-400 hover:bg-light-200 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={trip.imageUrls?.[0] || "/assets/images/ghana/accra-city.jpg"}
                              alt={trip.name}
                              width={48}
                              height={32}
                              className="rounded-lg object-cover"
                            />
                            <div>
                              <Link href={`/trips/${trip.id}`} className="text-sm font-medium text-dark-100 hover:text-primary-100 transition-colors">
                                {trip.name}
                              </Link>
                              <p className="text-xs text-gray-100 line-clamp-1">{trip.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-100">{trip.country}</td>
                        <td className="p-4 text-sm text-gray-100">{trip.travelStyle}</td>
                        <td className="p-4 text-sm text-gray-100">{trip.estimatedPrice}</td>
                        <td className="p-4 text-sm text-gray-100">{trip.duration} days</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/trips/${trip.id}`}
                              className="p-2 rounded-lg hover:bg-light-200 transition-colors"
                              title="View trip"
                            >
                              <Eye size={16} className="text-gray-100" />
                            </Link>
                            <DeleteTripButton tripId={trip.id} tripName={trip.name} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
