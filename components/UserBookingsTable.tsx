"use client";

import Link from "next/link";
import { CancelBookingButton } from "~/components/CancelBookingButton";

interface BookingEntry {
  booking: {
    id: number;
    userId: string;
    tripId: number;
    status: string;
    paymentLink: string | null;
    createdAt: Date;
  };
  trip: {
    id: number;
    name: string;
    country: string | null;
    estimatedPrice: string | null;
  };
}

interface UserBookingsTableProps {
  bookings: BookingEntry[];
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

export function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  return (
    <div className="bg-white rounded-20 shadow-400 overflow-hidden">
      <div className="p-6 border-b border-light-400">
        <h2 className="p-18-semibold text-dark-100">Recent Bookings</h2>
      </div>
      {bookings.length === 0 ? (
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
              <th className="text-left p-4 text-sm font-semibold text-dark-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(({ booking, trip }) => (
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
                <td className="p-4">
                  {booking.status === "pending" && (
                    <CancelBookingButton bookingId={booking.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
