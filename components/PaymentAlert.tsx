"use client";

import Image from "next/image";
import { Check, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function PaymentAlert({ status }: { status: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment")) {
      params.delete("payment");
      const url = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
      window.history.replaceState({}, "", url);
    }
  }, []);

  if (!visible) return null;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-success-50 border border-success-500/20 p-4 rounded-xl flex items-center gap-3"
      >
        <Check size={20} className="text-success-500" />
        <span className="text-success-700 font-medium">Payment successful! Your booking is confirmed.</span>
        <button onClick={() => setVisible(false)} className="ml-auto text-success-700 hover:text-success-500">&times;</button>
      </motion.div>
    );
  }
  if (status === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-500/20 p-4 rounded-xl flex items-center gap-3"
      >
        <X size={20} className="text-red-500" />
        <span className="text-red-500 font-medium">Payment was not completed. Please try again.</span>
        <button onClick={() => setVisible(false)} className="ml-auto text-red-500 hover:text-red-600">&times;</button>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-3"
    >
      <AlertTriangle size={20} className="text-yellow-700" />
      <span className="text-yellow-700 font-medium">There was an issue processing your payment.</span>
      <button onClick={() => setVisible(false)} className="ml-auto text-yellow-700 hover:text-yellow-600">&times;</button>
    </motion.div>
  );
}
