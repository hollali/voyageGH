import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { getAllBookingsAdmin } from "~/lib/actions";
import { BookingActions } from "~/components/BookingActions";

export const metadata = {
  title: "Manage Bookings | VoyageGH",
  description: "Confirm and reject bookings",
};

export default async function AdminBookingsPage() {
  const allBookings = await getAllBookingsAdmin();

  const statusCounts = {
    all: allBookings.length,
    pending: allBookings.filter((b) => b.booking.status === "pending").length,
    confirmed: allBookings.filter((b) => b.booking.status === "confirmed").length,
    cancelled: allBookings.filter((b) => b.booking.status === "cancelled").length,
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">Bookings</h1>
              <p className="text-gray-100">Confirm and manage all user bookings</p>
            </header>

            {/* Status Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "All", value: statusCounts.all, color: "bg-light-500 text-dark-100" },
                { label: "Pending", value: statusCounts.pending, color: "bg-yellow-50 text-yellow-700" },
                { label: "Confirmed", value: statusCounts.confirmed, color: "bg-green-50 text-green-700" },
                { label: "Cancelled", value: statusCounts.cancelled, color: "bg-red-50 text-red-500" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-20 shadow-400 p-4">
                  <p className="text-sm text-gray-100">{s.label}</p>
                  <p className="text-2xl font-bold text-dark-100 mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {allBookings.length === 0 ? (
              <div className="bg-white rounded-20 shadow-400 p-12 text-center">
                <p className="text-gray-100 text-lg">No bookings yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-20 shadow-400 overflow-hidden">
                <div className="table-responsive">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-light-400">
                        <th className="text-left p-4 text-sm font-semibold text-dark-200">User</th>
                        <th className="text-left p-4 text-sm font-semibold text-dark-200">Trip</th>
                        <th className="text-left p-4 text-sm font-semibold text-dark-200">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-dark-200">Date</th>
                        <th className="text-right p-4 text-sm font-semibold text-dark-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.map((b) => (
                        <tr key={b.booking.id} className="border-b border-light-400 hover:bg-light-200 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-white text-sm font-bold">
                                {b.user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-dark-100">{b.user.name}</p>
                                <p className="text-xs text-gray-100">{b.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-dark-100">{b.trip.name}</p>
                            <p className="text-xs text-gray-100">{b.trip.estimatedPrice}</p>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                              b.booking.status === "confirmed"
                                ? "bg-green-50 text-green-700"
                                : b.booking.status === "cancelled"
                                ? "bg-red-50 text-red-500"
                                : "bg-yellow-50 text-yellow-700"
                            }`}>
                              {b.booking.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-100">
                            {new Date(b.booking.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-4 text-right">
                            <BookingActions
                              bookingId={b.booking.id}
                              status={b.booking.status}
                              userName={b.user.name}
                            />
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
