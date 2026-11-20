"use client";

import React, { useState } from "react";
import { BreakdownSchedule } from "@/calculators/engine/types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Table } from "lucide-react";

interface CalculatorBreakdownProps {
  breakdown: BreakdownSchedule;
  title?: string;
}

export function CalculatorBreakdown({
  breakdown,
  title = "Yearly Investment & Amortization Breakdown",
}: CalculatorBreakdownProps) {
  const [expanded, setExpanded] = useState(false);
  const rowsToShow = expanded ? breakdown.rows : breakdown.rows.slice(0, 5);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center space-x-2">
          <Table className="h-4 w-4 text-primary" />
          <h3 className="text-base font-bold text-foreground">{title}</h3>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {breakdown.rows.length} Total Intervals
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
              {breakdown.headers.map((h, i) => (
                <th key={i} className="py-2.5 px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono">
            {rowsToShow.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-2.5 px-3 text-foreground/90 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {breakdown.rows.length > 5 && (
        <div className="pt-2 text-center border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-primary"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                <span>View Complete Schedule ({breakdown.rows.length} Intervals)</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

