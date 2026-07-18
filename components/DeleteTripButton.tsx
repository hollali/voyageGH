"use client";

import { useState } from "react";
import Image from "next/image";

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
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Yes"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-3 py-1 bg-light-500 text-dark-200 text-xs rounded-lg font-medium hover:bg-light-400 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
      title="Delete trip"
    >
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={16}
        height={16}
        className="opacity-50 group-hover:opacity-100"
      />
    </button>
  );
}
