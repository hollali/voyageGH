"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ReviewFormProps {
  tripId: number;
  userId: string;
}

export function ReviewForm({ tripId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId, rating, comment }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setSubmitted(true);
      setComment("");
      router.refresh();
    } catch {
      console.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-success-50 p-6 rounded-20 text-success-700 flex items-center gap-3">
        <Image src="/assets/icons/check.svg" alt="check" width={20} height={20} />
        <span className="font-medium">Review submitted! Thank you for your feedback.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-20 shadow-300 flex flex-col gap-4">
      <h4 className="p-18-semibold text-dark-100">Write a Review</h4>

      {/* Star Rating */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-100">Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Image
                src="/assets/icons/star.svg"
                alt={`${star} stars`}
                width={24}
                height={24}
                className={star <= rating ? "opacity-100" : "opacity-30"}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-normal resize-none focus:outline-none focus:border-primary-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="self-start px-6 py-2.5 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 text-sm"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
