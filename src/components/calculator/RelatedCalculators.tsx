import React from "react";
import Link from "next/link";
import { CALCULATOR_REGISTRY } from "@/calculators/registry";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedCalculatorsProps {
  currentSlug: string;
  category: string;
  relatedSlugs?: string[];
}

export function RelatedCalculators({
  currentSlug,
  category,
  relatedSlugs = [],
}: RelatedCalculatorsProps) {
  // Find related tools by explicit slugs, or fallback to same category
  let related = CALCULATOR_REGISTRY.filter((c) => relatedSlugs.includes(c.slug));
  if (related.length === 0) {
    related = CALCULATOR_REGISTRY.filter(
      (c) => c.category === category && c.slug !== currentSlug
    ).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="space-y-4 pt-4 border-t border-border/60">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Related Calculators
          </h3>
          <p className="text-xs text-muted-foreground">
            Explore complementary tools for your financial and planning needs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((calc) => (
          <Card
            key={calc.id}
            className="hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-[10px]">
                  {calc.categoryName}
                </Badge>
                {calc.isPopular && (
                  <Badge variant="success" className="text-[10px]">
                    Popular
                  </Badge>
                )}
              </div>
              <CardTitle className="text-base group-hover:text-primary transition-colors">
                {calc.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                {calc.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={`/${calc.category}/${calc.slug}`} className="block">
                <Button variant="secondary" size="sm" className="w-full justify-between text-xs font-semibold">
                  <span>Open Calculator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

