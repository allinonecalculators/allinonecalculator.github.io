import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Educational Guides - SmartCalc Knowledge Hub",
  description:
    "In-depth guides, financial formula breakdowns, and practical tutorials to help you understand calculations better.",
};

const ARTICLES = [
  {
    slug: "how-sip-compounding-works",
    title: "How Mutual Fund SIP Compounding Creates Exponential Wealth",
    excerpt:
      "A complete walkthrough of the mathematical formula behind Systematic Investment Plans and why starting 5 years earlier can double your retirement corpus.",
    category: "Finance & Investment",
    readTime: "6 min read",
    date: "Nov 20, 2026",
  },
  {
    slug: "new-vs-old-tax-regime-guide",
    title: "New vs Old Tax Regime: Which One Saves You More Money?",
    excerpt:
      "Detailed tax slab comparison for salaried individuals, factoring in standard deduction, 80C, HRA, and home loan interest exemptions.",
    category: "Business & Tax",
    readTime: "8 min read",
    date: "Nov 15, 2026",
  },
  {
    slug: "reducing-balance-loan-emi-formula",
    title: "The Reducing Balance EMI Formula Explained with Examples",
    excerpt:
      "Understand why your initial EMI payments go mostly toward interest, and how making part prepayments cuts years off your mortgage tenure.",
    category: "Loans & Banking",
    readTime: "5 min read",
    date: "Nov 10, 2026",
  },
  {
    slug: "bmi-limitations-and-healthy-weight",
    title: "Understanding BMI: Healthy Ranges, Muscle Mass & Limitations",
    excerpt:
      "Why BMI is an effective population screening tool, when to look at waist-to-height ratio, and how to accurately calculate your TDEE.",
    category: "Healthcare & Fitness",
    readTime: "7 min read",
    date: "Nov 5, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10 max-w-5xl">
      <Breadcrumbs items={[{ label: "Blog & Educational Guides" }]} />

      <header className="space-y-4 text-center sm:text-left">
        <Badge variant="outline">Knowledge Hub</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Financial & Mathematical Guides
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
          Explore comprehensive tutorials, formula proofs, and practical case studies designed to give you clarity on personal finances, loans, and health metrics.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((article) => (
          <Card key={article.slug} className="flex flex-col justify-between hover:shadow-md hover:border-primary/50 transition-all p-6 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-[10px]">
                  {article.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{article.date}</span>
                </div>
              </div>
              <h2 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">{article.readTime}</span>
              <span className="font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

