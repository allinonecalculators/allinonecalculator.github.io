export type CalculatorCategorySlug =
  | "finance"
  | "loans"
  | "health"
  | "math"
  | "business"
  | "construction"
  | "utilities"
  | "technology"
  | "education"
  | "automotive";

export interface CalculatorCategory {
  id: CalculatorCategorySlug;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  calculatorCount: number;
}

export interface CalculatorDefinition {
  id: string;
  slug: string;
  name: string;
  category: CalculatorCategorySlug;
  categoryName: string;
  description: string;
  keywords: string[];
  isPopular: boolean;
  isTrending?: boolean;
  iconName?: string;
  estimatedTimeToCalculate?: string;
}

