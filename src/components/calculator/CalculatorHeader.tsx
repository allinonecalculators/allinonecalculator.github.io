"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Check, Clock, Sparkles } from "lucide-react";

interface CalculatorHeaderProps {
  title: string;
  categoryName: string;
  shortDescription: string;
}

export function CalculatorHeader({
  title,
  categoryName,
  shortDescription,
}: CalculatorHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="space-y-4 border-b border-border/60 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
            {categoryName}
          </Badge>
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Instant Results</span>
          </Badge>
          <Badge variant="success" className="text-xs flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span>100% Client-Side Private</span>
          </Badge>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="w-fit text-xs flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Tool</span>
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
          {shortDescription}
        </p>
      </div>
    </header>
  );
}

