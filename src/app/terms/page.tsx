import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms and Conditions - Terms of Service",
  description:
    "Review the Terms and Conditions governing your access and usage of SmartCalc calculation tools and educational content.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <header className="space-y-3">
        <Badge variant="outline">Legal Agreement</Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: November 20, 2026
        </p>
      </header>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. Agreement to Terms</h2>
          <p>
            By accessing or using the SmartCalc platform (smartcalc.io), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you should discontinue using the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. Permitted Use</h2>
          <p>
            SmartCalc grants you a free, non-exclusive, non-transferable license to use our online calculators for personal, educational, and professional estimation purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Engage in automated scraping or denial-of-service attacks against our static infrastructure.</li>
            <li>Attempt to reverse-engineer or re-license proprietary software code without authorization.</li>
            <li>Use the tools for any unlawful or deceptive transactions.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. No Professional Advice</h2>
          <p>
            All calculations, formulas, projections, and estimates provided by SmartCalc are intended solely for educational and preliminary informational purposes. They do not constitute certified financial, legal, tax, architectural, or medical advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. Limitation of Liability</h2>
          <p>
            In no event shall SmartCalc, its operators, contributors, or partners be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including financial losses, miscalculated taxes, or construction variances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with standard international commercial guidelines and applicable local laws.
          </p>
        </section>
      </div>
    </div>
  );
}

