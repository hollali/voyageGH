"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface DeleteTripButtonProps {
  tripId: number;
  tripName: string;
}

export function DeleteTripButton({ tripId, tripName }: DeleteTripButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/trips/${tripId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete trip:", error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-100">Delete?</span>
        <motion.button
          onClick={handleDelete}
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
      className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
      title="Delete trip"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Trash2
        size={16}
        className="text-gray-100 group-hover:text-red-500 transition-colors"
      />
    </motion.button>
  );
}
