"use client";

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

const data = [
  { name: "Jan", users: 40, trips: 24 },
  { name: "Feb", users: 30, trips: 13 },
  { name: "Mar", users: 20, trips: 98 },
  { name: "Apr", users: 27, trips: 39 },
  { name: "May", users: 18, trips: 48 },
  { name: "Jun", users: 23, trips: 38 },
  { name: "Jul", users: 34, trips: 43 },
];

export function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
