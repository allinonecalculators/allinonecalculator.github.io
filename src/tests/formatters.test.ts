import { describe, it, expect } from "vitest";
import { formatINR, formatNumber, formatPercentage, parseNumberInput } from "@/lib/formatters";

describe("Formatting Utilities", () => {
  it("formats Indian currency correctly with Rupee symbol", () => {
    expect(formatINR(100000)).toMatch(/₹\s?1,00,000/);
    expect(formatINR(10000000)).toMatch(/₹\s?1,00,00,000/);
    expect(formatINR(0)).toMatch(/₹\s?0/);
  });

  it("handles decimal precision in numbers", () => {
    expect(formatNumber(1234.567, 2)).toBe("1,234.57");
    expect(formatNumber(1234, 0)).toBe("1,234");
  });

  it("formats percentages correctly", () => {
    expect(formatPercentage(12.5)).toBe("12.5%");
    expect(formatPercentage(100)).toBe("100%");
  });

  it("parses user input strings safely", () => {
    expect(parseNumberInput("1,00,000")).toBe(100000);
    expect(parseNumberInput("  50000  ")).toBe(50000);
    expect(parseNumberInput("invalid")).toBe(0);
    expect(parseNumberInput("")).toBe(0);
  });
});

