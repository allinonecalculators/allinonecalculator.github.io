"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
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
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, CALCULATOR_REGISTRY, getPopularCalculators, getTrendingCalculators } from "@/calculators/registry";
import { AdBanner } from "@/components/ads/AdBanner";

// Icon mapping helper
const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const popularCalcs = useMemo(() => getPopularCalculators(), []);
  const trendingCalcs = useMemo(() => getTrendingCalculators(), []);

  // Filtered calculators based on search
  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return CALCULATOR_REGISTRY.filter(
      (calc) =>
        calc.name.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.categoryName.toLowerCase().includes(q) ||
        calc.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl space-y-6">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            100% Free • No Sign-up Required • Instant Calculations
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground">
            Every Calculator You Need, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Free, accurate, and easy-to-use online calculators for finance, health,
            mathematics, loans, business, and everyday life.
          </p>

          {/* Search Box */}
          <div id="search-section" className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg rounded-2xl bg-card border border-border/80 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g. SIP, Home Loan, BMI, GST, Percentage)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mr-4 text-xs bg-muted px-2 py-1 rounded text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Results */}
            {searchQuery.trim() && (
              <div className="mt-3 text-left bg-card rounded-2xl border border-border shadow-xl p-3 max-h-96 overflow-y-auto space-y-1 z-20 relative">
                <div className="text-xs font-semibold text-muted-foreground px-3 py-1">
                  {filteredCalculators.length} result(s) found
                </div>
                {filteredCalculators.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No calculators found for &quot;{searchQuery}&quot;. Try &quot;SIP&quot; or &quot;EMI&quot;.
                  </div>
                ) : (
                  filteredCalculators.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`/${calc.category}/${calc.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {calc.name}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {calc.description}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] ml-2 shrink-0">
                        {calc.categoryName}
                      </Badge>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick Category Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">Trending:</span>
            {["SIP Calculator", "Home Loan EMI", "BMI Calculator", "GST Calculator", "Percentage"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full transition-colors font-medium border border-border/50"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Ad Placement: Below Hero */}
      <div className="container mx-auto px-4 sm:px-6">
        <AdBanner slot="home-hero-bottom" />
      </div>

      {/* Popular Calculators Grid */}
      <section className="container mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <Badge variant="success" className="mb-2">Most Used</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Popular Calculators
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Trusted by thousands daily for personal finance, loans, fitness, and daily calculations.
            </p>
          </div>
          <Link href="/all">
            <Button variant="outline" size="sm" className="group">
              <span>View All 50+ Calculators</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCalcs.map((calc) => (
            <Card key={calc.id} className="hover:shadow-md hover:border-primary/40 transition-all flex flex-col group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    {CATEGORY_ICON_MAP[calc.category] || <TrendingUp className="h-5 w-5" />}
                  </div>
                  <Badge variant="outline" className="text-[11px]">
                    {calc.categoryName}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-lg">
                  {calc.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <Link href={`/${calc.category}/${calc.slug}`} className="block">
                  <Button variant="secondary" size="sm" className="w-full justify-between font-semibold">
                    <span>Calculate Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Explore Categories */}
      <section className="container mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="outline">Browse By Domain</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore 10 Comprehensive Categories
          </h2>
          <p className="text-sm text-muted-foreground">
            From financial planning to engineering conversions, choose your topic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/${cat.slug}`} className="block group">
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 w-fit rounded-xl bg-muted group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                    {CATEGORY_ICON_MAP[cat.id]}
                  </div>
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{cat.calculatorCount}+ Calculators</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose SmartCalc? (Educational / Trust signals) */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-card/60 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Users Choose SmartCalc
            </h2>
            <p className="text-sm text-muted-foreground">
              Built with precision, mathematical rigor, and user privacy at core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">100% Client-Side & Private</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your financial numbers, salary figures, and health metrics are calculated locally inside your browser. Nothing is sent to any server.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto sm:mx-0">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">Instant Real-Time Results</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No page reloads or waiting spinners. As you adjust sliders or type inputs, results and visual charts update instantaneously.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">Verified Mathematical Formulas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All algorithms are tested with automated unit test suites and cross-referenced with official banking and government rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad Placement */}
      <div className="container mx-auto px-4 sm:px-6">
        <AdBanner slot="home-footer-top" />
      </div>
    </div>
  );
}

