"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Filter } from "lucide-react";
import { CALCULATOR_REGISTRY, CATEGORIES } from "@/calculators/registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ads/AdBanner";

export default function AllCalculatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return CALCULATOR_REGISTRY.filter((calc) => {
      const matchesCategory =
        selectedCategory === "all" || calc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        calc.name.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.categoryName.toLowerCase().includes(q) ||
        calc.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "All Calculators" }]} />

      <header className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="text-xs">
          Comprehensive Directory
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          All Online Calculators
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Browse our complete catalog of free, accurate calculators across finance, loans, health,
          math, business, construction, technology, utilities, education, and travel.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="relative flex items-center shadow-sm rounded-2xl bg-card border border-border focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any calculator by name or keyword (e.g. SIP, Tax, BMI, Paint, Subnet)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Categories ({CALCULATOR_REGISTRY.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <AdBanner slot="all-calculators-top" />

      {/* Results Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
          <span>
            Showing <strong className="text-foreground">{filtered.length}</strong> calculators
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-primary hover:underline"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border text-muted-foreground space-y-3">
            <p className="text-base font-semibold text-foreground">
              No calculators found matching your criteria.
            </p>
            <p className="text-xs">
              Try searching with broader terms or clear your active filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Search & Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((calc) => (
              <Card
                key={calc.id}
                className="hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[10px]">
                      {calc.categoryName}
                    </Badge>
                    {calc.isPopular && (
                      <Badge variant="success" className="text-[10px]">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {calc.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                    {calc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={`/${calc.category}/${calc.slug}`} className="block">
                    <Button variant="secondary" size="sm" className="w-full justify-between font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span>Calculate</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

