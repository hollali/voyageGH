"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface UserGrowthChartProps {
  data?: { name: string; users: number; trips: number }[];
}

const fallbackData = [
  { name: "Jan", users: 0, trips: 0 },
  { name: "Feb", users: 0, trips: 0 },
  { name: "Mar", users: 0, trips: 0 },
  { name: "Apr", users: 0, trips: 0 },
  { name: "May", users: 0, trips: 0 },
  { name: "Jun", users: 0, trips: 0 },
  { name: "Jul", users: 0, trips: 0 },
];

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data || fallbackData}>
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
        <Line
          type="monotone"
          dataKey="users"
          stroke="#256ff1"
          strokeWidth={2}
          dot={{ fill: "#256ff1", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="trips"
          stroke="#12b76a"
          strokeWidth={2}
          dot={{ fill: "#12b76a", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
