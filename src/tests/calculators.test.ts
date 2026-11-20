import { describe, it, expect } from "vitest";
import { IMPLEMENTED_CALCULATORS, getEngineConfig } from "@/calculators/engine/registry";
import { computeEMI } from "@/calculators/loans/loansCalculators";

describe("Phase 4 Multi-Category Calculator Engines", () => {
  it("registers 58 active calculator engines across all 10 categories", () => {
    const keys = Object.keys(IMPLEMENTED_CALCULATORS);
    expect(keys.length).toBe(58);
  });

  describe("Finance Calculators", () => {
    it("calculates lumpsum growth accurately", () => {
      const engine = getEngineConfig("lumpsum-calculator")!;
      const out = engine.calculate({ investmentAmount: 100000, expectedReturnRate: 12, timePeriodYears: 10 });
      const total = out.results.find((r) => r.id === "total")!;
      expect(Number(total.value)).toBeGreaterThan(310000);
      expect(Number(total.value)).toBeLessThan(312000);
    });

    it("calculates monthly compound interest accurately", () => {
      const engine = getEngineConfig("compound-interest-calculator")!;
      const out = engine.calculate({ principal: 50000, annualRate: 8, years: 5 });
      const total = out.results.find((r) => r.id === "total")!;
      expect(Number(total.value)).toBeGreaterThan(74000);
      expect(Number(total.value)).toBeLessThan(75000);
    });

    it("calculates simple interest accurately", () => {
      const engine = getEngineConfig("simple-interest-calculator")!;
      const out = engine.calculate({ principal: 20000, rate: 7, timeYears: 3 });
      const interest = out.results.find((r) => r.id === "interest")!;
      expect(Number(interest.value)).toBe(4200);
    });

    it("calculates quarterly compounded FD accurately", () => {
      const engine = getEngineConfig("fd-calculator")!;
      const out = engine.calculate({ depositAmount: 100000, interestRate: 7.25, tenureYears: 5 });
      const maturity = out.results.find((r) => r.id === "maturity")!;
      expect(Number(maturity.value)).toBeGreaterThan(143000);
      expect(Number(maturity.value)).toBeLessThan(144000);
    });

    it("calculates PPF 15-year maturity value correctly", () => {
      const engine = getEngineConfig("ppf-calculator")!;
      const out = engine.calculate({ yearlyDeposit: 150000, interestRate: 7.1, tenureYears: 15 });
      const maturity = out.results.find((r) => r.id === "maturity")!;
      expect(Number(maturity.value)).toBeGreaterThan(4000000);
    });

    it("calculates CAGR percentage accurately", () => {
      const engine = getEngineConfig("cagr-calculator")!;
      const out = engine.calculate({ beginningValue: 50000, endingValue: 150000, timePeriodYears: 5 });
      const cagr = out.results.find((r) => r.id === "cagr")!;
      expect(Number(cagr.value)).toBeCloseTo(24.57, 1);
    });
  });

  describe("Loans & Banking Calculators", () => {
    it("calculates Home Loan EMI and total interest", () => {
      const emiRes = computeEMI(4000000, 8.5, 20);
      expect(emiRes.emi).toBe(34713);
      expect(emiRes.totalInterest).toBeGreaterThan(4300000);
    });

    it("calculates Car Loan EMI", () => {
      const emiRes = computeEMI(800000, 9.0, 5);
      expect(emiRes.emi).toBe(16607);
    });

    it("calculates loan prepayment tenure reduction and savings", () => {
      const engine = getEngineConfig("loan-prepayment-calculator")!;
      const out = engine.calculate({ outstandingLoan: 3000000, interestRate: 8.5, remainingTenureYears: 15, prepaymentAmount: 300000 });
      const saved = out.results.find((r) => r.id === "savedInterest")!;
      expect(Number(saved.value)).toBeGreaterThan(400000);
    });
  });

  describe("Healthcare & Fitness Calculators", () => {
    it("calculates BMI and normal weight category", () => {
      const engine = getEngineConfig("bmi-calculator")!;
      const out = engine.calculate({ weightKg: 70, heightCm: 172 });
      const bmi = out.results.find((r) => r.id === "bmi")!;
      const category = out.results.find((r) => r.id === "category")!;
      expect(Number(bmi.value)).toBeCloseTo(23.7, 1);
      expect(category.formattedValue).toContain("Normal Weight");
    });

    it("calculates Mifflin-St Jeor BMR", () => {
      const engine = getEngineConfig("bmr-calculator")!;
      const out = engine.calculate({ weightKg: 70, heightCm: 175, age: 28 });
      const bmrMale = out.results.find((r) => r.id === "bmrMale")!;
      expect(Number(bmrMale.value)).toBe(1659);
    });

    it("calculates daily hydration target", () => {
      const engine = getEngineConfig("water-intake-calculator")!;
      const out = engine.calculate({ weightKg: 70, workoutMinutes: 45 });
      const liters = out.results.find((r) => r.id === "liters")!;
      expect(Number(liters.value)).toBeCloseTo(2.98, 1);
    });
  });

  describe("Mathematics Calculators", () => {
    it("calculates percentages", () => {
      const engine = getEngineConfig("percentage-calculator")!;
      const out = engine.calculate({ percentage: 15, totalValue: 500 });
      const res = out.results.find((r) => r.id === "result")!;
      expect(Number(res.value)).toBe(75);
    });

    it("calculates GCD and LCM accurately", () => {
      const engine = getEngineConfig("gcd-calculator")!;
      const out = engine.calculate({ num1: 48, num2: 72 });
      const gcd = out.results.find((r) => r.id === "gcd")!;
      const lcm = out.results.find((r) => r.id === "lcm")!;
      expect(Number(gcd.value)).toBe(24);
      expect(Number(lcm.value)).toBe(144);
    });

    it("solves proportions in Ratio calculator", () => {
      const engine = getEngineConfig("ratio-calculator")!;
      const out = engine.calculate({ a: 4, b: 3, c: 1920 });
      const d = out.results.find((r) => r.id === "d")!;
      expect(Number(d.value)).toBe(1440);
    });
  });

  describe("Business & Tax Calculators", () => {
    it("calculates GST exclusive and inclusive", () => {
      const engine = getEngineConfig("gst-calculator")!;
      const out = engine.calculate({ amount: 10000, gstRate: 18 });
      const totalEx = out.results.find((r) => r.id === "totalEx")!;
      const gstEx = out.results.find((r) => r.id === "gstEx")!;
      expect(Number(totalEx.value)).toBe(11800);
      expect(Number(gstEx.value)).toBe(1800);
    });

    it("calculates FY 2024-25 Income Tax with ₹75k std deduction", () => {
      const engine = getEngineConfig("income-tax-calculator")!;
      const out = engine.calculate({ annualIncome: 1200000 });
      const tax = out.results.find((r) => r.id === "tax")!;
      expect(Number(tax.value)).toBe(71500);
    });

    it("calculates gross profit margin and markup", () => {
      const engine = getEngineConfig("profit-margin-calculator")!;
      const out = engine.calculate({ cost: 600, revenue: 1000 });
      const margin = out.results.find((r) => r.id === "margin")!;
      const markup = out.results.find((r) => r.id === "markup")!;
      expect(Number(margin.value)).toBe(40);
      expect(Number(markup.value)).toBeCloseTo(66.67, 1);
    });
  });

  describe("Construction, Utilities, Tech & Education Calculators", () => {
    it("calculates home construction budget", () => {
      const engine = getEngineConfig("home-construction-cost-calculator")!;
      const out = engine.calculate({ builtUpArea: 1500, costPerSqFt: 1800 });
      const total = out.results.find((r) => r.id === "total")!;
      expect(Number(total.value)).toBe(2700000);
    });

    it("converts length units accurately", () => {
      const engine = getEngineConfig("length-converter")!;
      const out = engine.calculate({ meters: 10 });
      const feet = out.results.find((r) => r.id === "feet")!;
      expect(Number(feet.value)).toBeCloseTo(32.81, 1);
    });

    it("calculates IPv4 subnet hosts and mask", () => {
      const engine = getEngineConfig("ip-subnet-calculator")!;
      const out = engine.calculate({ prefixLength: 24 });
      const hosts = out.results.find((r) => r.id === "usable")!;
      const mask = out.results.find((r) => r.id === "mask")!;
      expect(Number(hosts.value)).toBe(254);
      expect(mask.formattedValue).toBe("255.255.255.0");
    });

    it("converts CGPA to percentage using CBSE 9.5 multiplier", () => {
      const engine = getEngineConfig("cgpa-calculator")!;
      const out = engine.calculate({ cgpa: 8.4, multiplier: 9.5 });
      const pct = out.results.find((r) => r.id === "percentage")!;
      expect(Number(pct.value)).toBeCloseTo(79.8, 1);
    });

    it("calculates 75% college attendance requirements and safe bunks", () => {
      const engine = getEngineConfig("attendance-calculator")!;
      const out = engine.calculate({ classesAttended: 42, totalClassesHeld: 50 });
      const current = out.results.find((r) => r.id === "current")!;
      const status = out.results.find((r) => r.id === "status")!;
      expect(Number(current.value)).toBe(84);
      expect(status.formattedValue).toContain("safely miss 6 more classes");
    });

    it("calculates fuel cost and trip split per person", () => {
      const engine = getEngineConfig("trip-cost-calculator")!;
      const out = engine.calculate({ totalDistanceKm: 600, vehicleMileage: 15, fuelPrice: 100, tollCharges: 800, passengers: 4 });
      const perPerson = out.results.find((r) => r.id === "perPerson")!;
      expect(Number(perPerson.value)).toBe(1200);
    });
  });
});

