import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { TripCard } from "~/components/TripCard";
import { getAllTrips } from "~/lib/actions";

export const metadata = {
  title: "AI Trips | VoyageGH",
  description: "Manage AI-generated trip itineraries",
};

export default async function AdminTripsPage() {
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
                <p className="text-gray-100 text-lg">No trips generated yet.</p>
                <a
                  href="/admin/create-trip"
                  className="mt-4 inline-block px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                >
                  Generate Your First Trip
                </a>
              </div>
            ) : (
              <div className="trip-grid">
                {allTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    name={trip.name}
                    location={trip.country || ""}
                    imageUrl={trip.imageUrls?.[0] || "/assets/images/ghana/accra-city.jpg"}
                    tags={[trip.travelStyle, trip.budget, trip.groupType].filter((t): t is string => Boolean(t))}
                    price={trip.estimatedPrice || ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
