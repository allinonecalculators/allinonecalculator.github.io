import { CalculatorEngineConfig } from "./types";
import { sipCalculatorConfig } from "../finance/sip";

export const IMPLEMENTED_CALCULATORS: Record<string, CalculatorEngineConfig> = {
  "sip-calculator": sipCalculatorConfig,
};

export function getEngineConfig(slug: string): CalculatorEngineConfig | undefined {
  return IMPLEMENTED_CALCULATORS[slug];
}

export function getAllImplementedSlugs(): string[] {
  return Object.keys(IMPLEMENTED_CALCULATORS);
}

