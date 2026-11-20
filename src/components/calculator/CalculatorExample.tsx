import React from "react";
import { PracticalExample } from "@/calculators/engine/types";
import { BookOpenCheck, CheckCircle2 } from "lucide-react";

interface CalculatorExampleProps {
  example: PracticalExample;
}

export function CalculatorExample({ example }: CalculatorExampleProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      <div className="flex items-center space-x-2 border-b border-border/60 pb-3">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <BookOpenCheck className="h-4 w-4" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {example.title}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {example.scenario}
      </p>

      {/* Inputs table */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs space-y-2">
        <h4 className="font-semibold text-foreground">Example Scenario Parameters:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(example.inputs).map(([key, val]) => (
            <div key={key} className="bg-background p-2 rounded-lg border border-border/60">
              <span className="text-muted-foreground block text-[10px]">{key}</span>
              <span className="font-bold text-foreground font-mono">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step by step calculation */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Calculation Steps
        </h4>
        <div className="space-y-2">
          {example.calculationSteps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-foreground/90">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                {idx + 1}
              </span>
              <p className="pt-0.5 leading-relaxed font-mono">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Outcome Box */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-3 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-medium">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{example.result}</p>
      </div>
    </div>
  );
}

