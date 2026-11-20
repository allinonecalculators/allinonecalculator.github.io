import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Landmark,
  HeartPulse,
  Percent,
  Briefcase,
  Building2,
  Scale,
  Binary,
  GraduationCap,
  Car,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "@/calculators/registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Calculator Categories - Browse by Domain",
  description:
    "Explore 10 major calculator categories: Finance, Loans, Health, Mathematics, Business, Construction, Utilities, Technology, Education, and Automotive.",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  finance: <TrendingUp className="h-6 w-6 text-emerald-500" />,
  loans: <Landmark className="h-6 w-6 text-blue-500" />,
  health: <HeartPulse className="h-6 w-6 text-rose-500" />,
  math: <Percent className="h-6 w-6 text-amber-500" />,
  business: <Briefcase className="h-6 w-6 text-purple-500" />,
  construction: <Building2 className="h-6 w-6 text-orange-500" />,
  utilities: <Scale className="h-6 w-6 text-indigo-500" />,
  technology: <Binary className="h-6 w-6 text-cyan-500" />,
  education: <GraduationCap className="h-6 w-6 text-teal-500" />,
  automotive: <Car className="h-6 w-6 text-red-500" />,
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "Categories" }]} />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="outline">Directory</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Browse by Category
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Select any domain below to view specialized calculators, mathematical formulas, and practical guides.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`/${cat.slug}`} className="block group">
            <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                  {CATEGORY_ICONS[cat.id]}
                </div>
                <div>
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Explore {cat.calculatorCount}+ Calculators</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

