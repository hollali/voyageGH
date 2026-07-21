"use client";

import { useState } from "react";
import { Shield, ShieldOff, Trash2, Loader2 } from "lucide-react";

interface UserActionsProps {
  userId: string;
  currentStatus: string;
  userName: string;
}

export function UserActions({ userId, currentStatus, userName }: UserActionsProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const toggleRole = async () => {
    setLoading(true);
    try {
      const newStatus = status === "admin" ? "user" : "admin";
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={toggleRole}
        disabled={loading}
        className="p-2 rounded-lg hover:bg-light-200 text-gray-100 hover:text-primary-100 transition-colors disabled:opacity-50"
        title={status === "admin" ? `Demote ${userName}` : `Promote ${userName}`}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : status === "admin" ? (
          <ShieldOff size={16} />
        ) : (
          <Shield size={16} />
        )}
      </button>
      <button
        onClick={deleteUser}
        disabled={loading}
        className="p-2 rounded-lg hover:bg-red-50 text-gray-100 hover:text-red-500 transition-colors disabled:opacity-50"
        title={`Delete ${userName}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
