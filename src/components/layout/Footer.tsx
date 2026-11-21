import React from "react";
import Link from "next/link";
import { Calculator, Heart, ShieldAlert } from "lucide-react";
import { CATEGORIES } from "@/calculators/registry";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/60 backdrop-blur">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Smart<span className="text-primary">Calc</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Free, accurate, and instant online calculators for personal finance, home loans,
              taxation, fitness metrics, mathematics, and everyday conversions. Built with
              transparent formulas and no hidden charges.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-1">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
              <span>For informational purposes only. Consult qualified advisors for critical financial or medical decisions.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Top Categories
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              More Tools
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & About */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-primary transition-colors">
                  Site Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} SmartCalc Platform. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Engineered for speed, privacy, and accuracy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

