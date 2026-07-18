import Image from "next/image";
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

  return (
    <article className="stats-card">
      <header className="flex items-center gap-3">
        <Image
          src={headerTitle === "Total Users" ? "/assets/icons/users.svg" : "/assets/icons/itinerary.svg"}
          alt={headerTitle}
          width={24}
          height={24}
        />
        <h2 className="text-sm md:text-lg font-semibold text-dark-200">{headerTitle}</h2>
      </header>
      <div className="content">
        <div className="flex flex-col gap-1">
          <span className="p-40-semibold text-dark-100">{total.toLocaleString()}</span>
          <span className="text-gray-100 text-sm font-normal">
            vs {lastMonthCount.toLocaleString()} last month
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isNeutral && (
            <Image
              src={isPositive ? "/assets/icons/arrow-up-green.svg" : "/assets/icons/arrow-down-red.svg"}
              alt={isPositive ? "increment" : "decrement"}
              width={16}
              height={16}
            />
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
    </article>
  );
}
