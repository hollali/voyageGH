"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CancelBookingButton } from "~/components/CancelBookingButton";
import { Link } from "~/lib/i18n/routing";
import { useCurrency } from "~/lib/currency";

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
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-3 py-1 text-xs rounded-full font-medium ${colors[status] || "bg-light-500 text-gray-100"}`}
    >
      {status}
    </motion.span>
  );
}

export function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  const t = useTranslations("bookings");
  const { parseAndFormatPrice } = useCurrency();

  return (
    <div className="bg-white rounded-20 shadow-400 overflow-hidden">
      <div className="p-6 border-b border-light-400">
        <h2 className="p-18-semibold text-dark-100">{t("recentBookings")}</h2>
      </div>
      {bookings.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-100 mb-4">{t("noBookings")}</p>
          <Link
            href="/trips"
            className="inline-block px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            {t("recentBookings")}
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
        <table className="w-full">
          <thead>
            <tr className="border-b border-light-400">
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("trip")}</th>
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("region")}</th>
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("price")}</th>
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("status")}</th>
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("date")}</th>
              <th className="text-left p-4 text-sm font-semibold text-dark-200">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(({ booking, trip }, index) => (
              <motion.tr
                key={booking.id}
                className="border-b border-light-400 hover:bg-light-200 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="p-4 text-sm font-medium text-dark-100">{trip.name}</td>
                <td className="p-4 text-sm text-gray-100">{trip.country}</td>
                <td className="p-4 text-sm text-gray-100">
                  {trip.estimatedPrice ? parseAndFormatPrice(trip.estimatedPrice) : "-"}
                </td>
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
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
