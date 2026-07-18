"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BookingButtonProps {
  tripId: number;
  userId: string | null;
}

export function BookingButton({ tripId, userId }: BookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const router = useRouter();

  const handleBooking = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      if (!res.ok) throw new Error("Booking failed");

      setStatus("success");
      router.refresh();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="px-8 py-3 bg-success-50 text-success-700 rounded-lg font-semibold flex items-center gap-2">
        <Image src="/assets/icons/check.svg" alt="check" width={18} height={18} />
        Booked Successfully
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleBooking}
        disabled={loading}
        className="px-8 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Image src="/assets/icons/loader.svg" alt="loading" width={18} height={18} className="animate-spin" />
            Booking...
          </>
        ) : userId ? (
          "Book This Trip"
        ) : (
          "Sign In to Book"
        )}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm">Failed to book trip. Please try again.</p>
      )}
    </div>
  );
}
