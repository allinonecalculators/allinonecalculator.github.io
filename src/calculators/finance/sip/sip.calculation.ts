import { formatINR } from "@/lib/formatters";
import {
  CalculatorResultItem,
  CalculatorChartConfig,
  BreakdownSchedule,
} from "../../engine/types";

export interface SIPInputs {
  monthlyInvestment: number;
  expectedReturnRate: number;
  timePeriodYears: number;
}

export interface SIPCalculationResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  yearlySchedule: {
    year: number;
    investedAmount: number;
    interestEarned: number;
    totalValue: number;
  }[];
}

/**
 * Calculates SIP maturity value using the standard compound formula:
 * M = P × [((1 + i)^n - 1) / i] × (1 + i)
 * where:
 * P = Monthly investment
 * i = Monthly interest rate (annual rate / 12 / 100)
 * n = Total number of months (years × 12)
 */
export function calculateSIP(inputs: SIPInputs): SIPCalculationResult {
  const P = Math.max(0, inputs.monthlyInvestment || 0);
  const annualRate = Math.max(0, inputs.expectedReturnRate || 0);
  const years = Math.max(1, Math.min(50, Math.round(inputs.timePeriodYears || 1)));

  const n = years * 12;
  const totalInvestment = P * n;

  if (annualRate === 0) {
    const yearlySchedule = [];
    for (let y = 1; y <= years; y++) {
      yearlySchedule.push({
        year: y,
        investedAmount: P * y * 12,
        interestEarned: 0,
        totalValue: P * y * 12,
      });
    }
    return {
      totalInvestment,
      estimatedReturns: 0,
      totalValue: totalInvestment,
      yearlySchedule,
    };
  }

  const i = annualRate / (12 * 100);
  const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const estimatedReturns = Math.max(0, totalValue - totalInvestment);

  // Generate Year-by-Year Schedule
  const yearlySchedule = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const investedTillYear = P * months;
    const valueTillYear = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    const prevValue =
      y === 1
        ? 0
        : P * ((Math.pow(1 + i, (y - 1) * 12) - 1) / i) * (1 + i);
    const interestThatYear = valueTillYear - prevValue - P * 12;

    yearlySchedule.push({
      year: y,
      investedAmount: Math.round(investedTillYear),
      interestEarned: Math.max(0, Math.round(interestThatYear)),
      totalValue: Math.round(valueTillYear),
    });
  }

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    yearlySchedule,
  };
}

export function formatSIPOutputs(result: SIPCalculationResult): {
  results: CalculatorResultItem[];
  chart: CalculatorChartConfig;
  breakdown: BreakdownSchedule;
} {
  const results: CalculatorResultItem[] = [
    {
      id: "total-investment",
      label: "Total Invested",
      value: result.totalInvestment,
      formattedValue: formatINR(result.totalInvestment),
      variant: "neutral",
      subText: "Your total principal contribution",
    },
    {
      id: "estimated-returns",
      label: "Estimated Returns",
      value: result.estimatedReturns,
      formattedValue: formatINR(result.estimatedReturns),
      variant: "success",
      subText: "Wealth generated via compounding",
    },
    {
      id: "total-value",
      label: "Total Maturity Value",
      value: result.totalValue,
      formattedValue: formatINR(result.totalValue),
      isHighlighted: true,
      variant: "primary",
      subText: "Expected corpus at completion",
    },
  ];

  // Chart config (Growth Over Time)
  const chartData = result.yearlySchedule.map((item) => ({
    name: `Yr ${item.year}`,
    year: item.year,
    invested: item.investedAmount,
    total: item.totalValue,
    returns: item.totalValue - item.investedAmount,
  }));

  const chart: CalculatorChartConfig = {
    type: "area",
    title: "Wealth Growth Over Time",
    data: chartData,
    xKey: "name",
    series: [
      { key: "invested", name: "Amount Invested", color: "#64748b" },
      { key: "total", name: "Total Corpus Value", color: "#3b82f6" },
    ],
  };

  // Breakdown Schedule
  const breakdown: BreakdownSchedule = {
    headers: ["Year", "Invested Capital", "Yearly Growth", "End Balance"],
    rows: result.yearlySchedule.map((item) => [
      `Year ${item.year}`,
      formatINR(item.investedAmount),
      formatINR(item.interestEarned),
      formatINR(item.totalValue),
    ]),
  };

  return { results, chart, breakdown };
}

