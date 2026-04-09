"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#0f766e", "#b45309", "#2563eb", "#7c3aed", "#db2777", "#15803d"];

export function TrendLanguageChart({
  data,
}: {
  data: Array<{ name: string; count: number }>;
}) {
  return (
    <div className="glass card h-[320px]">
      <p className="section-title">语言分布</p>
      <h3 className="mt-2 text-2xl font-semibold">本期上榜语言</h3>
      <div className="mt-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="count" data={data} innerRadius={55} outerRadius={88}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
