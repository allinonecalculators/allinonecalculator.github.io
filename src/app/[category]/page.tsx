import React from "react";
import { notFound } from "next/navigation";
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
  ShieldCheck,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import {
  CATEGORIES,
  getCategoryBySlug,
  getCalculatorsByCategory,
} from "@/calculators/registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdBanner } from "@/components/ads/AdBanner";
import { AdInArticle } from "@/components/ads/AdComponents";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static routes for all 10 categories during Next.js export
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

// SEO Metadata for each category
export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Calculators - Free Online Calculation Tools`,
    description: `Access free, accurate, and instant ${category.name.toLowerCase()} calculators. ${category.description} 100% private and mobile-friendly.`,
    openGraph: {
      title: `${category.name} Calculators | SmartCalc`,
      description: category.description,
      type: "website",
    },
  };
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  finance: <TrendingUp className="h-8 w-8 text-emerald-500" />,
  loans: <Landmark className="h-8 w-8 text-blue-500" />,
  health: <HeartPulse className="h-8 w-8 text-rose-500" />,
  math: <Percent className="h-8 w-8 text-amber-500" />,
  business: <Briefcase className="h-8 w-8 text-purple-500" />,
  construction: <Building2 className="h-8 w-8 text-orange-500" />,
  utilities: <Scale className="h-8 w-8 text-indigo-500" />,
  technology: <Binary className="h-8 w-8 text-cyan-500" />,
  education: <GraduationCap className="h-8 w-8 text-teal-500" />,
  automotive: <Car className="h-8 w-8 text-red-500" />,
};

// Category educational guides & FAQs
const CATEGORY_CONTENT: Record<
  string,
  {
    guideTitle: string;
    guideText: string;
    faqs: { q: string; a: string }[];
  }
> = {
  finance: {
    guideTitle: "Mastering Personal Wealth & Investment Planning",
    guideText:
      "Financial calculators empower you to make informed decisions by visualizing the mathematical power of compounding interest, rupee-cost averaging via SIPs, and inflation protection. Whether calculating mutual fund returns, PPF accumulation, or stock trading profit/loss, our financial tools adhere to standard Indian and international economic formulas.",
    faqs: [
      {
        q: "How does compounding interest boost long-term wealth?",
        a: "Compounding generates returns not just on your initial principal, but also on accumulated interest over previous intervals. Over 10-20 years, interest earned can easily exceed total contributions.",
      },
      {
        q: "What is the difference between SIP and Lumpsum investing?",
        a: "SIP involves investing a fixed sum regularly (monthly), which averages out market volatility. Lumpsum involves deploying a single one-off capital sum at once.",
      },
    ],
  },
  loans: {
    guideTitle: "Smart Borrowing & Loan Repayment Strategies",
    guideText:
      "A home or car loan is typically the largest financial liability individuals undertake. Using loan calculators to evaluate equated monthly installments (EMI), amortization tables, and foreclosure prepayments can help you save substantial amounts on overall interest payable.",
    faqs: [
      {
        q: "How is monthly EMI calculated by banks?",
        a: "Banks use the standard reducing balance formula: EMI = [P × R × (1+R)ⁿ] / [(1+R)ⁿ - 1], where P is principal, R is monthly interest rate, and n is total months.",
      },
      {
        q: "Does prepaying a loan reduce loan tenure or EMI?",
        a: "Most lenders allow you to choose. Reducing tenure generally yields higher interest savings compared to reducing monthly EMI.",
      },
    ],
  },
  health: {
    guideTitle: "Evidence-Based Fitness & Health Metrics",
    guideText:
      "Tracking body mass index, basal metabolic rate, and daily caloric needs provides essential benchmarks for wellness and weight management. Our health calculators implement formulas established by the WHO and medical research organizations.",
    faqs: [
      {
        q: "Are online BMI and calorie calculators medically diagnostic?",
        a: "No. These calculators provide general statistical estimates for healthy adults. They do not replace professional medical evaluations, diagnosis, or personalized dietary counsel.",
      },
      {
        q: "What is the difference between BMR and TDEE?",
        a: "BMR (Basal Metabolic Rate) is the energy your body burns strictly at rest to sustain vital organs. TDEE includes daily physical activity and exercise on top of BMR.",
      },
    ],
  },
  math: {
    guideTitle: "Practical Mathematics & Analytical Tools",
    guideText:
      "From basic percentages and fractions to trigonometry and quadratic formulas, our mathematics tools streamline computation for students, educators, and working professionals without sacrificing step-by-step clarity.",
    faqs: [
      {
        q: "How accurate are these mathematical calculations?",
        a: "Calculations use IEEE 754 double-precision floating-point arithmetic with specialized decimal rounding to prevent floating-point inaccuracy.",
      },
    ],
  },
  business: {
    guideTitle: "Financial Clarity for Entrepreneurs & Taxpayers",
    guideText:
      "Understanding profit margins, GST slabs, income tax regimes, and break-even thresholds is critical for running a solvent business or maximizing personal take-home pay. All tax calculators are regularly aligned with financial year amendments.",
    faqs: [
      {
        q: "What is the standard GST formula?",
        a: "To add GST: Gross = Net + (Net × GST% / 100). To extract inclusive GST: GST Amount = Value - [Value / (1 + GST% / 100)].",
      },
    ],
  },
  construction: {
    guideTitle: "Civil Estimation & Home Renovation Planning",
    guideText:
      "Accurate material estimation prevents costly budget overruns during construction and home remodeling. Compute required cement bags, brick counts, paint cans, and tile boxes with built-in wastage allowances.",
    faqs: [
      {
        q: "What is standard wastage allowance for tiles and bricks?",
        a: "Civil engineers typically recommend adding a 5% to 10% buffer to account for corner cutting, breakages, and irregular wall dimensions.",
      },
    ],
  },
  utilities: {
    guideTitle: "Instant Precision Unit Conversion",
    guideText:
      "Seamlessly convert across metric and imperial systems for length, mass, volume, temperature, and currency with multi-unit comparisons.",
    faqs: [
      {
        q: "How frequently are currency exchange rates updated?",
        a: "Currency conversions utilize benchmark rates for common international pairings, updated regularly for standard reference.",
      },
    ],
  },
  technology: {
    guideTitle: "Essential Developer & Network Engineering Utilities",
    guideText:
      "Streamline network subnetting, cryptographic password generation, JSON debugging, and base conversions in a local browser environment with zero latency.",
    faqs: [
      {
        q: "Are passwords generated sent over the internet?",
        a: "Never. All passwords, Base64 encodings, and network calculations execute 100% locally in your browser using the Web Cryptography API.",
      },
    ],
  },
  education: {
    guideTitle: "Academic Performance & Grade Conversion",
    guideText:
      "Convert CGPA to percentages, calculate required course final grades, and keep track of attendance rules for school and university examinations.",
    faqs: [
      {
        q: "What is the CBSE formula for converting CGPA to percentage?",
        a: "The Central Board of Secondary Education (CBSE) standard formula is: Percentage = CGPA × 9.5.",
      },
    ],
  },
  automotive: {
    guideTitle: "Commute Efficiency & Journey Budgeting",
    guideText:
      "Calculate real-world vehicle mileage, road trip budgets, and evaluate savings when switching to electric vehicles (EVs).",
    faqs: [
      {
        q: "How to calculate accurate tank-to-tank fuel mileage?",
        a: "Fill the tank completely and reset the trip meter to 0. On your next refill, divide the kilometers driven by the exact liters pumped.",
      },
    ],
  },
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const calculators = getCalculatorsByCategory(category.id);
  const extraContent = CATEGORY_CONTENT[category.id] || {
    guideTitle: `${category.name} Guide`,
    guideText: category.description,
    faqs: [],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: category.name }]} />

      {/* Category Hero Header */}
      <header className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-background border border-border shadow-sm">
              {CATEGORY_ICONS[category.id] || <TrendingUp className="h-8 w-8 text-primary" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                  Category Directory
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {calculators.length} Tools Available
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-1">
                {category.name}
              </h1>
            </div>
          </div>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed pt-2">
          {category.description}
        </p>
      </header>

      {/* Top Category Ad */}
      <AdBanner slot={`category-${category.id}-top`} />

      {/* Calculators Listing Section */}
      <section className="space-y-6">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            All {category.name} Calculators
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            Showing {calculators.length} calculators
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Card
              key={calc.id}
              className="hover:border-primary/50 hover:shadow-md transition-all flex flex-col group justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
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
                    <span>Open Calculator</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mid Category Ad */}
      <AdInArticle slot={`category-${category.id}-mid`} />

      {/* Educational Article / Guide */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <Badge variant="outline">Educational Overview</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {extraContent.guideTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {extraContent.guideText}
          </p>
        </div>

        {/* FAQs */}
        {extraContent.faqs.length > 0 && (
          <div className="pt-6 border-t border-border space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {extraContent.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-border/80 bg-muted/30 space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Disclaimers */}
        <div className="pt-4 border-t border-border flex items-start space-x-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>
            Calculations are performed strictly on your device for informational and educational purposes. SmartCalc does not store or transmit your calculation data.
          </span>
        </div>
      </section>
    </div>
  );
}

