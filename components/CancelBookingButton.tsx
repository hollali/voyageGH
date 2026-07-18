"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CancelBookingButtonProps {
  bookingId: number;
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: "cancelled" }),
      });
      if (!res.ok) throw new Error("Cancel failed");
      setCancelled(true);
      router.refresh();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cancelled) {
    return (
      <span className="text-xs text-red-500 font-medium">Cancelled</span>
    );
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-600 font-medium disabled:opacity-50 transition-colors"
    >
      {loading ? "Cancelling..." : "Cancel"}
    </button>
  );
}
