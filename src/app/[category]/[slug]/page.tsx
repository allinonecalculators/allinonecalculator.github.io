import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CALCULATOR_REGISTRY,
  getCalculatorBySlug,
} from "@/calculators/registry";
import { getEngineConfig } from "@/calculators/engine/registry";
import { CalculatorEngineView } from "@/components/calculator/CalculatorEngineView";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";
import { RelatedCalculators } from "@/components/calculator/RelatedCalculators";

interface CalculatorPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Generate static routes for all calculators in the registry
export function generateStaticParams() {
  return CALCULATOR_REGISTRY.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

// Generate unique SEO Metadata for each calculator
export function generateMetadata({ params }: CalculatorPageProps): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) {
    return { title: "Calculator Not Found" };
  }

  const engineConfig = getEngineConfig(params.slug);
  const description =
    engineConfig?.content.shortDescription || calc.description;

  return {
    title: `${calc.name} - Free Online Calculator & Formula Breakdown`,
    description: `${description} Calculate instant results with verified formulas. 100% free and mobile-friendly.`,
    keywords: calc.keywords,
    openGraph: {
      title: `${calc.name} | SmartCalc`,
      description: description,
      type: "website",
    },
  };
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) {
    notFound();
  }

  const engineConfig = getEngineConfig(params.slug);

  // If calculator has full engine implementation (e.g. SIP Calculator)
  if (engineConfig) {
    return <CalculatorEngineView slug={params.slug} />;
  }

  // Graceful stub for registry tools queued for Phase 4 expansion
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: calc.categoryName, href: `/${calc.category}` },
          { label: calc.name },
        ]}
      />

      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{calc.categoryName}</Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Queued for Phase 4</span>
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          {calc.name}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {calc.description}
        </p>
      </header>

      <Card className="p-8 text-center space-y-4 border-dashed bg-muted/20">
        <div className="p-3 w-fit rounded-2xl bg-primary/10 text-primary mx-auto">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold">Calculator Logic Queued</h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          The calculation engine for <strong>{calc.name}</strong> will be connected in Phase 4. You can explore the fully functional <strong>SIP Calculator</strong> under Finance right now.
        </p>
      </Card>

      <RelatedCalculators
        currentSlug={calc.slug}
        category={calc.category}
      />
    </div>
  );
}

