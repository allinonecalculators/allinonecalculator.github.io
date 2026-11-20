"use client";

import React from "react";
import { CalculatorInputField } from "@/calculators/engine/types";
import { Input } from "@/components/ui/input";

interface CalculatorInputProps {
  config: CalculatorInputField;
  value: number;
  onChange: (val: number) => void;
}

export function CalculatorInput({ config, value, onChange }: CalculatorInputProps) {
  const { name, label, min = 0, max = 10000000, step = 1, prefix, suffix, helpText } = config;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, "");
    const num = parseFloat(rawVal);
    if (isNaN(num)) {
      onChange(0);
    } else {
      onChange(Math.min(max, Math.max(min, num)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="space-y-2.5 p-4 rounded-xl border border-border/80 bg-card/60 shadow-sm transition-all focus-within:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={name} className="text-xs sm:text-sm font-bold text-foreground">
          {label}
        </label>
        <div className="relative flex items-center max-w-[160px]">
          {prefix && (
            <span className="absolute left-3 text-xs font-semibold text-muted-foreground pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            id={name}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            className={`w-full h-9 rounded-lg border border-border bg-background px-3 text-right text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              prefix ? "pl-7" : ""
            } ${suffix ? "pr-8" : ""}`}
          />
          {suffix && (
            <span className="absolute right-3 text-xs font-semibold text-muted-foreground pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Synchronized Slider */}
      <div className="space-y-1 pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>
            {prefix}
            {min.toLocaleString("en-IN")}
            {suffix ? ` ${suffix}` : ""}
          </span>
          <span>
            {prefix}
            {max.toLocaleString("en-IN")}
            {suffix ? ` ${suffix}` : ""}
          </span>
        </div>
      </div>

      {helpText && (
        <p className="text-[11px] text-muted-foreground/80 leading-normal">
          {helpText}
        </p>
      )}
    </div>
  );
}

