"use client";

import { motion } from "framer-motion";
import { Users, Map, TrendingUp, TrendingDown } from "lucide-react";
import { calculateTrendPercentage } from "~/lib/utils";

interface StatsCardProps {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

export function StatsCard({ headerTitle, total, lastMonthCount, currentMonthCount }: StatsCardProps) {
  const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);
  const isPositive = trend === "increment";
  const isNeutral = trend === "no change";

  const HeaderIcon = headerTitle === "Total Users" ? Users : Map;

  return (
    <motion.article
      className="stats-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <HeaderIcon size={24} className="text-primary-100" />
        </motion.div>
        <h2 className="text-sm md:text-lg font-semibold text-dark-200">{headerTitle}</h2>
      </header>
      <div className="content">
        <div className="flex flex-col gap-1">
          <motion.span
            className="p-40-semibold text-dark-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {total.toLocaleString()}
          </motion.span>
          <span className="text-gray-100 text-sm font-normal">
            vs {lastMonthCount.toLocaleString()} last month
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isNeutral && (
            <motion.div
              initial={{ y: isPositive ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {isPositive ? (
                <TrendingUp size={16} className="text-success-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
            </motion.div>
          )}
          <span
            className={`text-sm font-semibold ${
              isNeutral ? "text-gray-100" : isPositive ? "text-success-500" : "text-red-500"
            }`}
          >
            {isNeutral ? "0" : `${Math.round(percentage)}%`}
          </span>
          <span className="text-gray-100 text-xs">This month</span>
        </div>
      </div>
    </motion.article>
  );
}
