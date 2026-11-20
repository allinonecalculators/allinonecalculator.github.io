import React from "react";
import { CalculatorFormulaConfig } from "@/calculators/engine/types";
import { Sigma } from "lucide-react";

interface CalculatorFormulaProps {
  formula: CalculatorFormulaConfig;
}

export function CalculatorFormula({ formula }: CalculatorFormulaProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center space-x-2 border-b border-border/60 pb-3">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Sigma className="h-4 w-4" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {formula.title}
        </h3>
      </div>

      {/* Formula Expression Box */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border font-mono text-center text-sm sm:text-base font-bold text-primary overflow-x-auto">
        {formula.expression}
      </div>

      {/* Variable Descriptions */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Formula Parameter Legend
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {formula.variables.map((v, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-border/70 bg-background text-xs space-y-1"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                  {v.symbol}
                </span>
                <span className="font-semibold text-foreground">{v.name}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {formula.notes && (
        <p className="text-xs text-muted-foreground pt-2 border-t border-border/60 italic">
          * {formula.notes}
        </p>
      )}
    </div>
  );
}

