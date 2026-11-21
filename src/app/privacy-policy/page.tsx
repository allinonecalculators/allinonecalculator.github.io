import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection & User Privacy",
  description:
    "SmartCalc Privacy Policy: Learn how we protect your privacy, our zero-server data processing model, and our compliance with Google AdSense, GDPR, and CCPA.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <header className="space-y-3">
        <Badge variant="outline">Compliance & Legal</Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: November 20, 2026 • Effective Date: January 1, 2026
        </p>
      </header>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. Introduction & Core Privacy Guarantee</h2>
          <p>
            At AllinoneCalculator (accessible via https://ysprajapti.github.io/AllinoneCalculator/), user privacy is fundamental to our platform design. Our single most important privacy feature is that <strong>calculator operations run locally on your client device</strong>.
          </p>
          <p>
            When you type loan amounts, annual salaries, body weights, or investment horizons into our calculators, that data remains strictly in your browser&apos;s local memory. It is never transmitted to, logged by, or stored on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>We do not require user account registration, passwords, or phone numbers.</li>
            <li>We do not record private financial figures or health measurements.</li>
            <li>We do not sell, rent, or trade your personal data to any third parties.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. Cookies, Analytics & Google AdSense</h2>
          <p>
            Like most websites, we use standard web technologies to maintain site performance and support free access through contextual advertising:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Google Analytics 4 (GA4):</strong> Aggregated, anonymized metrics (such as page views, device types, and bounce rates) to improve website usability.
            </li>
            <li>
              <strong>Google AdSense:</strong> Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads on our site based on prior visits to our website or other websites. Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">google.com/settings/ads</a>).
            </li>
            <li>
              <strong>Local Preferences:</strong> We use your browser&apos;s <code>localStorage</code> solely to remember your chosen display theme (Light or Dark mode).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. GDPR and CCPA Privacy Rights</h2>
          <p>
            Under regulations including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), visitors are entitled to transparency regarding data handling. Because SmartCalc does not maintain user databases or identify individual users, no personally identifiable data is retained.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">5. Changes to this Policy</h2>
          <p>
            We may occasionally update this Privacy Policy to reflect technical or legal modifications. Any revisions will be documented on this page with an updated timestamp.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">6. Contact Information</h2>
          <p>
            For questions regarding this policy, contact our compliance team at <strong>https://github.com/ysprajapti</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

