"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "~/components/Toast";

interface CancelBookingButtonProps {
  bookingId: number;
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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
      toast("Booking cancelled successfully.", "success");
      router.refresh();
    } catch {
        toast("Failed to cancel booking. Please try again.", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (cancelled) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-xs text-red-500 font-medium"
      >
        Cancelled
      </motion.span>
    );
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-100">Cancel booking?</span>
        <motion.button
          onClick={handleCancel}
          disabled={loading}
          className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "..." : "Yes"}
        </motion.button>
        <motion.button
          onClick={() => setShowConfirm(false)}
          className="px-3 py-1 bg-light-500 text-dark-200 text-xs rounded-lg font-medium hover:bg-light-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          No
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => setShowConfirm(true)}
      className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Cancel
    </motion.button>
  );
}
