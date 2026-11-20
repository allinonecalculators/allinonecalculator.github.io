"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  Calculator,
  Moon,
  Sun,
  Menu,
  X,
  Search,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/calculators/registry";

export function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground flex items-center">
              Smart<span className="text-primary">Calc</span>
              <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                Free
              </span>
            </span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-1 hidden sm:block">
              All-in-One Online Calculators
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
              className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors py-2"
            >
              <span>Categories</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  categoryDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 rounded-xl border border-border bg-card p-2 shadow-lg z-50">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                  Browse by Domain
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm text-foreground/90 hover:bg-muted hover:text-primary transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {cat.calculatorCount}+
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/all"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            All Calculators
          </Link>

          <Link
            href="/blog"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/about"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Quick Search trigger link */}
          <Link href="/#search-section">
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center space-x-2 text-muted-foreground hover:text-foreground text-xs"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search 60+ tools...</span>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                /
              </kbd>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="rounded-full"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </Button>

          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-5 space-y-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
            >
              Home
            </Link>
            <Link
              href="/all"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
            >
              All Calculators
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
            >
              About Us
            </Link>
          </div>

          <div className="border-t border-border pt-3">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Popular Categories
            </p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-foreground/80 hover:text-primary rounded-md hover:bg-muted"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

