import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, HeartHandshake, Calculator, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Mission, Technology & Editorial Rigor",
  description:
    "Learn about SmartCalc's mission to provide accurate, transparent, and completely free online calculation tools for global users.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12 max-w-4xl">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <header className="space-y-4 text-center sm:text-left">
        <Badge variant="outline">Our Mission</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Empowering Decisions with Mathematical Precision
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          SmartCalc was created with a straightforward goal: eliminate complexity, hidden fees,
          and paywalls from online calculation tools.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Who We Are</h2>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          We are a team of software engineers, financial analysts, and mathematics enthusiasts dedicated to building the most reliable, privacy-first calculator suite on the web. Whether you are computing equated monthly installments (EMI) on a life-changing home purchase, optimizing monthly mutual fund SIP allocations, measuring construction quantities, or evaluating daily caloric targets, SmartCalc delivers verifiable math in seconds.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base">Client-Side Privacy</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your financial data, salary figures, and health numbers never leave your browser. Every calculation executes in local client-side memory.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base">Verifiable Accuracy</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All algorithms are subjected to rigorous automated unit tests matching standards set by the Reserve Bank of India (RBI), WHO, and academic bodies.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base">High-Performance Web</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Built with Next.js static generation. Pages load in under 1 second without server delays, heavy scripts, or intrusive popups.
          </p>
        </Card>
      </section>

      <section className="rounded-3xl border border-border bg-muted/30 p-8 space-y-4">
        <h2 className="text-xl font-bold">Calculation Integrity & Transparency</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike black-box calculators that hide their internal logic, every SmartCalc tool provides complete formula explanations, variable breakdowns, and real-world calculation walkthroughs. We believe that understanding how a result is derived is just as important as the number itself.
        </p>
      </section>
    </div>
  );
}

