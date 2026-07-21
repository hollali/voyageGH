"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

interface BookingActionsProps {
  bookingId: number;
  status: string;
  userName: string;
}

export function BookingActions({ bookingId, status, userName }: BookingActionsProps) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const updateStatus = async (newStatus: "confirmed" | "cancelled") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setCurrentStatus(newStatus);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus !== "pending") {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => updateStatus("confirmed")}
        disabled={loading}
        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors disabled:opacity-50"
        title={`Confirm booking for ${userName}`}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
      </button>
      <button
        onClick={() => updateStatus("cancelled")}
        disabled={loading}
        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-50"
        title={`Reject booking for ${userName}`}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
      </button>
    </div>
  );
}
