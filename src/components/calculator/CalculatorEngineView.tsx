"use client";

import React, { useState, useMemo } from "react";
import { getEngineConfig } from "@/calculators/engine/registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CalculatorHeader } from "./CalculatorHeader";
import { CalculatorInput } from "./CalculatorInput";
import { CalculatorResultCard } from "./CalculatorResultCard";
import { CalculatorChart } from "./CalculatorChart";
import { CalculatorBreakdown } from "./CalculatorBreakdown";
import { CalculatorFormula } from "./CalculatorFormula";
import { CalculatorExample } from "./CalculatorExample";
import { CalculatorFAQ } from "./CalculatorFAQ";
import { RelatedCalculators } from "./RelatedCalculators";
import { AdBanner } from "@/components/ads/AdBanner";
import { AdInArticle } from "@/components/ads/AdComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Calculator as CalcIcon, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CalculatorEngineViewProps {
  slug: string;
}

export function CalculatorEngineView({ slug }: CalculatorEngineViewProps) {
  const config = getEngineConfig(slug);
  if (!config) return null;

  return <CalculatorEngineInner config={config} />;
}

function CalculatorEngineInner({ config }: { config: NonNullable<ReturnType<typeof getEngineConfig>> }) {
  // Initialize default input states
  const defaultValues = useMemo(() => {
    const initial: Record<string, number> = {};
    config.inputs.forEach((input) => {
      initial[input.name] = input.defaultValue;
    });
    return initial;
  }, [config.inputs]);

  const [inputValues, setInputValues] = useState<Record<string, number>>(defaultValues);

  // Live recalculate
  const calculationOutput = useMemo(() => {
    return config.calculate(inputValues);
  }, [config, inputValues]);

  const handleInputChange = (name: string, value: number) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setInputValues(defaultValues);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: config.categoryName, href: `/${config.category}` },
          { label: config.name },
        ]}
      />

      {/* 2. Calculator Header */}
      <CalculatorHeader
        title={config.name}
        categoryName={config.categoryName}
        shortDescription={config.content.shortDescription}
      />

      {/* 3. Top Banner Ad */}
      <AdBanner slot={`calc-${config.slug}-top`} />

      {/* 4. Calculator Core: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs & Controls (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center space-x-2">
                <CalcIcon className="h-4 w-4 text-primary" />
                <h2 className="text-base font-bold text-foreground">Adjust Parameters</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                title="Reset to default inputs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            {/* Inputs List */}
            <div className="space-y-4">
              {config.inputs.map((input) => (
                <CalculatorInput
                  key={input.name}
                  config={input}
                  value={inputValues[input.name] ?? input.defaultValue}
                  onChange={(val) => handleInputChange(input.name, val)}
                />
              ))}
            </div>

            {/* Calculation Actions */}
            <div className="pt-2 flex gap-3">
              <Button
                className="w-full flex items-center justify-center space-x-2 font-bold shadow-sm"
                onClick={() => {
                  // Instant calculation already happens via useMemo, scroll smoothly to results on mobile
                  const el = document.getElementById("results-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <CalcIcon className="h-4 w-4" />
                <span>Calculate & Update</span>
              </Button>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Calculated locally inside your browser memory.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results & Visual Chart (7 Cols on Desktop) */}
        <div id="results-section" className="lg:col-span-7 space-y-6">
          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {calculationOutput.results.map((res) => (
              <CalculatorResultCard key={res.id} item={res} />
            ))}
          </div>

          {/* Interactive Chart */}
          {calculationOutput.chart && (
            <CalculatorChart config={calculationOutput.chart} />
          )}

          {/* Detailed Breakdown Schedule */}
          {calculationOutput.breakdown && (
            <CalculatorBreakdown breakdown={calculationOutput.breakdown} />
          )}
        </div>
      </div>

      {/* 5. In-Article Ad Slot */}
      <AdInArticle slot={`calc-${config.slug}-mid`} />

      {/* 6. Formula & Practical Example Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CalculatorFormula formula={config.content.formula} />
        <CalculatorExample example={config.content.example} />
      </div>

      {/* 7. Educational Guide & In-Depth Walkthrough */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <Badge variant="outline">Educational Guide</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Understanding {config.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-foreground text-base">What is this calculator?</h3>
            <p>{config.content.whatIsIt}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-foreground text-base">Why use it?</h3>
            <p>{config.content.whyUseIt}</p>
          </div>
        </div>

        {/* Benefits bullets if available */}
        {config.content.benefits && config.content.benefits.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="font-bold text-foreground text-base">Key Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.content.benefits.map((b, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 8. Frequently Asked Questions with FAQPage Schema */}
      <CalculatorFAQ faqs={config.content.faqs} calculatorTitle={config.name} />

      {/* 9. Related Calculators */}
      <RelatedCalculators
        currentSlug={config.slug}
        category={config.category}
        relatedSlugs={config.relatedSlugs}
      />
    </div>
  );
}

