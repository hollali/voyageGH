import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getBookingsByUser } from "~/lib/actions";
import Image from "next/image";

export const metadata = {
  title: "My Dashboard | VoyageGH",
  description: "View your trips and bookings",
};

export default async function UserDashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const userBookings = await getBookingsByUser(userId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="wrapper py-10 flex-1">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-2">
            <h1 className="p-30-bold text-dark-100">My Dashboard</h1>
            <p className="text-gray-100 text-lg">Your trips and bookings</p>
          </header>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/trips"
              className="bg-white p-6 rounded-20 shadow-400 hover:shadow-500 transition-shadow flex flex-col gap-3"
            >
              <Image src="/assets/icons/itinerary.svg" alt="browse" width={32} height={32} />
              <h3 className="p-18-semibold text-dark-100">Browse Trips</h3>
              <p className="text-sm text-gray-100">Explore AI-generated itineraries across Ghana</p>
            </Link>
            <Link
              href="/admin/create-trip"
              className="bg-white p-6 rounded-20 shadow-400 hover:shadow-500 transition-shadow flex flex-col gap-3"
            >
              <Image src="/assets/icons/magic-star.svg" alt="create" width={32} height={32} />
              <h3 className="p-18-semibold text-dark-100">Create Trip</h3>
              <p className="text-sm text-gray-100">Generate a custom AI itinerary for your Ghana adventure</p>
            </Link>
            <div className="bg-white p-6 rounded-20 shadow-400 flex flex-col gap-3">
              <Image src="/assets/icons/booking.svg" alt="bookings" width={32} height={32} />
              <h3 className="p-18-semibold text-dark-100">My Bookings</h3>
              <p className="text-sm text-gray-100">{userBookings.length} total bookings</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-20 shadow-400 overflow-hidden">
            <div className="p-6 border-b border-light-400">
              <h2 className="p-18-semibold text-dark-100">Recent Bookings</h2>
            </div>
            {userBookings.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-100 mb-4">No bookings yet.</p>
                <Link
                  href="/trips"
                  className="inline-block px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                >
                  Browse Trips
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-400">
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Trip</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Region</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Price</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.map(({ booking, trip }) => (
                    <tr key={booking.id} className="border-b border-light-400 hover:bg-light-200 transition-colors">
                      <td className="p-4 text-sm font-medium text-dark-100">{trip.name}</td>
                      <td className="p-4 text-sm text-gray-100">{trip.country}</td>
                      <td className="p-4 text-sm text-gray-100">{trip.estimatedPrice}</td>
                      <td className="p-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="p-4 text-sm text-gray-100">
                        {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    confirmed: "bg-success-50 text-success-700",
    pending: "bg-yellow-50 text-yellow-700",
    cancelled: "bg-red-50 text-red-500",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${colors[status] || "bg-light-500 text-gray-100"}`}>
      {status}
    </span>
  );
}
