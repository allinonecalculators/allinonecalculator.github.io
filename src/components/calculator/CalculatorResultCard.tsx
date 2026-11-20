import React from "react";
import { CalculatorResultItem } from "@/calculators/engine/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalculatorResultCardProps {
  item: CalculatorResultItem;
}

export function CalculatorResultCard({ item }: CalculatorResultCardProps) {
  const isPrimary = item.isHighlighted || item.variant === "primary";
  const isSuccess = item.variant === "success";

  return (
    <Card
      className={cn(
        "p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-sm",
        isPrimary && "bg-primary text-primary-foreground border-primary shadow-md",
        isSuccess && "bg-emerald-500/10 text-emerald-950 dark:text-emerald-50 border-emerald-500/30",
        !isPrimary && !isSuccess && "bg-card text-card-foreground border-border"
      )}
    >
      <div className="space-y-1">
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {item.label}
        </span>
        <div
          className={cn(
            "text-2xl sm:text-3xl font-black tracking-tight",
            isPrimary && "text-primary-foreground",
            isSuccess && "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {item.formattedValue}
        </div>
      </div>

      {item.subText && (
        <p
          className={cn(
            "text-xs mt-3 pt-2 border-t leading-tight",
            isPrimary
              ? "border-primary-foreground/20 text-primary-foreground/80"
              : "border-border/60 text-muted-foreground"
          )}
        >
          {item.subText}
        </p>
      )}
    </Card>
  );
}

