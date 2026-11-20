import { describe, it, expect } from "vitest";
import { calculateSIP, formatSIPOutputs } from "@/calculators/finance/sip/sip.calculation";

describe("SIP Calculation Engine", () => {
  it("calculates 10-year standard SIP accurately at 12% annual return", () => {
    // 10,000/mo for 10 years at 12%
    const res = calculateSIP({
      monthlyInvestment: 10000,
      expectedReturnRate: 12,
      timePeriodYears: 10,
    });

    expect(res.totalInvestment).toBe(1200000);
    // Standard annuity due formula for 10k/mo, 12% p.a., 120 months gives ~23,23,391
    expect(res.totalValue).toBeGreaterThan(2320000);
    expect(res.totalValue).toBeLessThan(2330000);
    expect(res.estimatedReturns).toBe(res.totalValue - res.totalInvestment);
    expect(res.yearlySchedule).toHaveLength(10);
    expect(res.yearlySchedule[9].totalValue).toBe(res.totalValue);
  });

  it("calculates 15-year SIP matching the PRD real-world example", () => {
    // 10,000/mo for 15 years at 12%
    const res = calculateSIP({
      monthlyInvestment: 10000,
      expectedReturnRate: 12,
      timePeriodYears: 15,
    });

    expect(res.totalInvestment).toBe(1800000);
    // 180 months at 1% per month = ~50,45,760
    expect(res.totalValue).toBeGreaterThan(5040000);
    expect(res.totalValue).toBeLessThan(5050000);
    expect(res.estimatedReturns).toBeGreaterThan(3240000);
  });

  it("handles 0% expected return rate safely without division by zero", () => {
    const res = calculateSIP({
      monthlyInvestment: 5000,
      expectedReturnRate: 0,
      timePeriodYears: 5,
    });

    expect(res.totalInvestment).toBe(300000);
    expect(res.totalValue).toBe(300000);
    expect(res.estimatedReturns).toBe(0);
    expect(res.yearlySchedule).toHaveLength(5);
  });

  it("handles minimum boundary inputs safely", () => {
    const res = calculateSIP({
      monthlyInvestment: 500,
      expectedReturnRate: 5,
      timePeriodYears: 1,
    });

    expect(res.totalInvestment).toBe(6000);
    expect(res.totalValue).toBeGreaterThan(6000);
    expect(res.yearlySchedule).toHaveLength(1);
  });

  it("handles negative or zero inputs safely", () => {
    const res = calculateSIP({
      monthlyInvestment: -1000,
      expectedReturnRate: -5,
      timePeriodYears: 0,
    });

    expect(res.totalInvestment).toBe(0);
    expect(res.totalValue).toBe(0);
    expect(res.estimatedReturns).toBe(0);
  });

  it("formats results into structured UI items correctly", () => {
    const res = calculateSIP({
      monthlyInvestment: 10000,
      expectedReturnRate: 12,
      timePeriodYears: 5,
    });

    const formatted = formatSIPOutputs(res);
    expect(formatted.results).toHaveLength(3);
    expect(formatted.results[0].formattedValue).toMatch(/₹/);
    expect(formatted.chart.data).toHaveLength(5);
    expect(formatted.breakdown.rows).toHaveLength(5);
  });
});

