"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CalculatorChartConfig } from "@/calculators/engine/types";
import { formatINR } from "@/lib/formatters";

interface CalculatorChartProps {
  config: CalculatorChartConfig;
}

export function CalculatorChart({ config }: CalculatorChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-72 rounded-2xl border border-border bg-muted/20 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
        Loading chart visualization...
      </div>
    );
  }

  const { title, data, xKey = "name", series = [] } = config;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
      {title && (
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <h3 className="text-sm font-bold tracking-tight text-foreground">{title}</h3>
          <span className="text-[11px] text-muted-foreground font-mono">Interactive Chart</span>
        </div>
      )}

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`color-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => {
                if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
                if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
                if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
                return `₹${v}`;
              }}
            />
            <Tooltip
              formatter={(value: any, name: any) => [formatINR(Number(value)), name]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#color-${s.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-border/50 text-xs text-muted-foreground">
        {series.map((s) => (
          <div key={s.key} className="flex items-center space-x-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

