import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldCheck, HeartPulse, Landmark, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer - Financial, Medical, and General Disclaimers",
  description:
    "Comprehensive disclaimer covering financial calculations, medical estimates, loan schedules, and construction planning on SmartCalc.",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />

      <header className="space-y-3">
        <Badge variant="outline">Important Notice</Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Website Disclaimer</h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: November 20, 2026
        </p>
      </header>

      <div className="space-y-6 text-foreground/90 text-sm sm:text-base leading-relaxed">
        {/* General Disclaimer */}
        <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="h-5 w-5" />
            <h2>General Informational Disclaimer</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            The information and calculation tools contained on AllinoneCalculator (https://allinonecalculator.github.io/) are provided for general educational, estimation, and informational purposes only. While we make every reasonable effort to ensure mathematical correctness and update formulas regularly, AllinoneCalculator makes no warranties of any kind regarding accuracy, completeness, or suitability for particular financial or clinical objectives.
          </p>
        </div>

        {/* Financial & Tax Disclaimer */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center space-x-2 text-primary font-bold text-lg">
            <Landmark className="h-5 w-5" />
            <h2>Financial, Banking & Tax Disclaimer</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Mutual fund returns, SIP projections, CAGR figures, and loan EMI schedules are hypothetical illustrations based on constant compounding rates. Real-world financial market returns fluctuate daily and are subject to market risks. Tax calculations (including Indian Income Tax and GST) reflect statutory rules for the specified financial year but do not account for individual exemptions, audit criteria, or complex corporate circumstances. Always consult a Certified Financial Planner (CFP) or Chartered Accountant (CA) before entering major financial transactions.
          </p>
        </div>

        {/* Health & Medical Disclaimer */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center space-x-2 text-rose-500 font-bold text-lg">
            <HeartPulse className="h-5 w-5" />
            <h2>Healthcare & Fitness Disclaimer</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Calculators relating to Body Mass Index (BMI), Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and Calorie targets are general mathematical models developed for average healthy adult demographics. <strong>They do not constitute medical diagnosis, clinical evaluation, or treatment plans.</strong> Individuals who are pregnant, athletic with high muscle density, elderly, or managing metabolic conditions should consult licensed healthcare providers or registered dietitians.
          </p>
        </div>

        {/* Construction & Engineering */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center space-x-2 text-orange-500 font-bold text-lg">
            <Building className="h-5 w-5" />
            <h2>Construction & Material Estimation Disclaimer</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Estimates for cement bags, brick counts, paint liters, and tile boxes are theoretical approximations based on standard nominal dimensions. Site-specific factors, soil conditions, structural drawings, masonry workmanship, and material wastage may lead to variations. Professional civil engineers and quantity surveyors must verify quantities prior to procurement.
          </p>
        </div>
      </div>
    </div>
  );
}

