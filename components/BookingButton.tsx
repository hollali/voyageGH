"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Check, CreditCard } from "lucide-react";

interface BookingButtonProps {
  tripId: number;
  userId: string | null;
  tripName: string;
  price: string;
}

export function BookingButton({ tripId, userId, tripName, price }: BookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "redirecting">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleBooking = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Booking failed");
        setStatus("error");
        return;
      }

      setStatus("redirecting");
      window.location.href = data.authorizationUrl;
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "redirecting") {
    return (
      <div className="px-8 py-3 bg-primary-100/10 text-primary-100 rounded-lg font-semibold flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={18} />
        </motion.div>
        Redirecting to Paystack...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <motion.button
        onClick={handleBooking}
        disabled={loading}
        className="px-8 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={18} />
            </motion.div>
            Processing...
          </>
        ) : (
          <>
            Book Now — {price}
          </>
        )}
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-100">
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Check size={14} className="text-success-500" />
        </motion.div>
        <span>Secure payment via Paystack</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-xs text-gray-100 mt-1">
        <span className="px-2 py-1 bg-light-500 rounded text-dark-200 font-medium">MTN MoMo</span>
        <span className="px-2 py-1 bg-light-500 rounded text-dark-200 font-medium">Vodafone Cash</span>
        <span className="px-2 py-1 bg-light-500 rounded text-dark-200 font-medium">Card</span>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
      )}
    </div>
  );
}
