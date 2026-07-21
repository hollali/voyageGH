"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { useToast } from "~/components/Toast";

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
  const { toast } = useToast();
  const t = useTranslations("review");

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
        toast(t("failedSubmit"), "error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-success-50 p-6 rounded-20 text-success-700 flex items-center gap-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
        >
          <Check size={20} />
        </motion.div>
        <span className="font-medium">{t("reviewSubmitted")}</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-20 shadow-300 flex flex-col gap-4">
      <h4 className="p-18-semibold text-dark-100">{t("writeReview")}</h4>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-100">{t("rating")}</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              role="radio"
              aria-checked={star === rating}
              aria-label={`Rate ${star} out of 5`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 rounded"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star
                size={24}
                className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("shareExperience")}
        rows={3}
        className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-normal resize-none focus:outline-none focus:border-primary-100"
      />

      <motion.button
        type="submit"
        disabled={loading}
        className="self-start px-6 py-2.5 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:opacity-50 text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? t("submitting") : t("submitReview")}
      </motion.button>
    </form>
  );
}
