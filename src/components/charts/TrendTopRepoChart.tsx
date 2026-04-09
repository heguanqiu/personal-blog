"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TrendTopRepoChart({
  data,
}: {
  data: Array<{ name: string; starsGained: number }>;
}) {
  return (
    <div className="glass card h-[320px]">
      <p className="section-title">热度分布</p>
      <h3 className="mt-2 text-2xl font-semibold">Star 增量 Top 仓库</h3>
      <div className="mt-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="starsGained" fill="#0f766e" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
