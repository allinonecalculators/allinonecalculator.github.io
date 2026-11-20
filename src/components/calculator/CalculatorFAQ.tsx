"use client";

import React, { useState } from "react";
import { CalculatorFAQItem } from "@/calculators/engine/types";
import { ChevronDown, HelpCircle } from "lucide-react";

interface CalculatorFAQProps {
  faqs: CalculatorFAQItem[];
  calculatorTitle: string;
}

export function CalculatorFAQ({ faqs, calculatorTitle }: CalculatorFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Schema.org FAQPage structured data for Google SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-border/60 pb-3">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Frequently Asked Questions
            </h3>
            <span className="text-xs text-muted-foreground">
              Common questions about {calculatorTitle}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border bg-muted/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-foreground hover:text-primary transition-colors gap-3"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

