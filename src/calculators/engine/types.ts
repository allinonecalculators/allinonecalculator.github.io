export type InputFieldType =
  | "currency"
  | "number"
  | "slider"
  | "select"
  | "percentage";

export interface CalculatorInputField {
  name: string;
  label: string;
  type: InputFieldType;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  options?: { label: string; value: string | number }[];
  helpText?: string;
  placeholder?: string;
}

export interface CalculatorResultItem {
  id: string;
  label: string;
  value: number | string;
  formattedValue: string;
  isHighlighted?: boolean;
  subText?: string;
  variant?: "primary" | "success" | "neutral" | "warning";
}

export interface ChartSeries {
  key: string;
  name: string;
  color: string;
}

export interface CalculatorChartConfig {
  type: "donut" | "pie" | "area" | "bar";
  title?: string;
  data: Record<string, any>[];
  xKey?: string;
  series?: ChartSeries[];
}

export interface BreakdownSchedule {
  headers: string[];
  rows: (string | number)[][];
}

export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface CalculatorFormulaConfig {
  title: string;
  expression: string;
  variables: FormulaVariable[];
  notes?: string;
}

export interface PracticalExample {
  title: string;
  scenario: string;
  inputs: Record<string, string | number>;
  calculationSteps: string[];
  result: string;
}

export interface CalculatorFAQItem {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  shortDescription: string;
  whatIsIt: string;
  whyUseIt: string;
  howItWorks: string;
  formula: CalculatorFormulaConfig;
  example: PracticalExample;
  benefits?: string[];
  faqs: CalculatorFAQItem[];
}

export interface CalculatorEngineConfig {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  inputs: CalculatorInputField[];
  calculate: (inputs: Record<string, number>) => {
    results: CalculatorResultItem[];
    chart?: CalculatorChartConfig;
    breakdown?: BreakdownSchedule;
  };
  content: CalculatorContent;
  relatedSlugs: string[];
}

