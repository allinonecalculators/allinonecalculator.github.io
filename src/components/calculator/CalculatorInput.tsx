"use client";

import React from "react";
import { CalculatorInputField } from "@/calculators/engine/types";

interface CalculatorInputProps {
  config: CalculatorInputField;
  value: number;
  onChange: (val: number) => void;
}

export function CalculatorInput({ config, value, onChange }: CalculatorInputProps) {
  const {
    name,
    label,
    type,
    min = 0,
    max = 10000000,
    step = 1,
    prefix,
    suffix,
    options,
    helpText,
  } = config;

  // Determine effective minimum: if options contains 0 or min is 0, allow 0
  const hasZeroOption = options?.some((opt) => Number(opt.value) === 0);
  const effectiveMin = hasZeroOption ? 0 : min;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, "");
    if (rawVal === "" || rawVal === "0") {
      onChange(0);
      return;
    }
    const num = parseFloat(rawVal);
    if (isNaN(num)) {
      onChange(0);
    } else if (num === 0) {
      onChange(0);
    } else {
      onChange(Math.min(max, Math.max(effectiveMin, num)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="space-y-3 p-4 rounded-xl border border-border/80 bg-card/60 shadow-sm transition-all focus-within:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={name} className="text-xs sm:text-sm font-bold text-foreground">
          {label}
        </label>
        <div className="relative flex items-center max-w-[170px]">
          {prefix && (
            <span className="absolute left-3 text-xs font-semibold text-muted-foreground pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            id={name}
            type="number"
            min={effectiveMin}
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

      {/* Preset / Slabs Quick Selection Chips (Including 0) */}
      {options && options.length > 0 && (
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-muted-foreground">Quick Selection:</span>
            {value === 0 && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                0 Selected
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {options.map((opt) => {
              const optVal = Number(opt.value);
              const isSelected = value === optVal;
              return (
                <button
                  key={`${name}-opt-${opt.value}`}
                  type="button"
                  onClick={() => onChange(optVal)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm ring-1 ring-primary"
                      : "bg-background/80 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Dropdown Select (if type is 'select') */}
      {type === "select" && options && options.length > 0 && (
        <div className="pt-1">
          <select
            id={`${name}-select`}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Synchronized Slider (for slider, number, currency, percentage) */}
      {type !== "select" && (
        <div className="space-y-1 pt-1">
          <input
            type="range"
            min={effectiveMin}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>
              {prefix}
              {effectiveMin.toLocaleString("en-IN")}
              {suffix ? ` ${suffix}` : ""}
            </span>
            <span>
              {prefix}
              {max.toLocaleString("en-IN")}
              {suffix ? ` ${suffix}` : ""}
            </span>
          </div>
        </div>
      )}

      {helpText && (
        <p className="text-[11px] text-muted-foreground/80 leading-normal">
          {helpText}
        </p>
      )}
    </div>
  );
}
