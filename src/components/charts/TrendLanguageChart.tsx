"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#0f766e", "#b45309", "#2563eb", "#7c3aed", "#db2777", "#15803d"];

export function TrendLanguageChart({
  data,
}: {
  data: Array<{ name: string; count: number }>;
}) {
  return (
    <div className="glass feature-card h-[280px] sm:h-[320px]">
      <p className="section-title">语言分布</p>
      <h3 className="mt-2 text-2xl font-semibold">本期上榜语言</h3>
      <div className="mt-4 h-[200px] sm:h-[240px]">
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
      <div className="mt-3 flex flex-wrap gap-2">
        {data.map((entry, index) => (
          <span
            key={entry.name}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${colors[index % colors.length]}18`,
              color: colors[index % colors.length],
            }}
          >
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  );
}
