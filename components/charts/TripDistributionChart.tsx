"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TripDistributionChartProps {
  data?: { name: string; count: number }[];
}

const fallbackData = [
  { name: "Solo", count: 0 },
  { name: "Couple", count: 0 },
  { name: "Family", count: 0 },
  { name: "Friends", count: 0 },
  { name: "Business", count: 0 },
];

export function TripDistributionChart({ data }: TripDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data || fallbackData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaecf0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#7f7e83" }}
          axisLine={{ stroke: "#eaecf0" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#7f7e83" }}
          axisLine={{ stroke: "#eaecf0" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #eaecf0",
            borderRadius: "8px",
            boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill="#256ff1"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
