"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
      <div className="bg-success-50 border border-success-500/20 p-4 rounded-xl flex items-center gap-3">
        <Image src="/assets/icons/check.svg" alt="success" width={20} height={20} />
        <span className="text-success-700 font-medium">Payment successful! Your booking is confirmed.</span>
        <button onClick={() => setVisible(false)} className="ml-auto text-success-700 hover:text-success-500">&times;</button>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="bg-red-50 border border-red-500/20 p-4 rounded-xl flex items-center gap-3">
        <Image src="/assets/icons/close.svg" alt="error" width={20} height={20} />
        <span className="text-red-500 font-medium">Payment was not completed. Please try again.</span>
        <button onClick={() => setVisible(false)} className="ml-auto text-red-500 hover:text-red-600">&times;</button>
      </div>
    );
  }
  return (
    <div className="bg-yellow-50 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-3">
      <Image src="/assets/icons/info.svg" alt="info" width={20} height={20} />
      <span className="text-yellow-700 font-medium">There was an issue processing your payment.</span>
      <button onClick={() => setVisible(false)} className="ml-auto text-yellow-700 hover:text-yellow-600">&times;</button>
    </div>
  );
}
