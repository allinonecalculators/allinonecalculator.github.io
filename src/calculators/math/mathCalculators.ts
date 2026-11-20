import { CalculatorEngineConfig } from "../engine/types";
import { formatNumber, formatPercentage } from "@/lib/formatters";

// 1. Percentage Calculator
export const percentageCalculatorConfig: CalculatorEngineConfig = {
  id: "percentage-calculator",
  slug: "percentage-calculator",
  name: "Percentage Calculator",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "percentage", label: "Percentage (X%)", type: "number", defaultValue: 15, min: 0, max: 1000, step: 0.1, suffix: "%" },
    { name: "totalValue", label: "Of Number (Y)", type: "number", defaultValue: 500, min: 0, max: 10000000, step: 10 },
  ],
  calculate: (inputs) => {
    const X = inputs.percentage || 0;
    const Y = inputs.totalValue || 0;

    const resultVal = (X / 100) * Y;
    const addedVal = Y + resultVal;
    const subtractedVal = Y - resultVal;

    return {
      results: [
        { id: "result", label: `${X}% of ${Y}`, value: resultVal, formattedValue: formatNumber(resultVal), isHighlighted: true, variant: "primary" },
        { id: "added", label: `Value with ${X}% added`, value: addedVal, formattedValue: formatNumber(addedVal), variant: "success" },
        { id: "subtracted", label: `Value with ${X}% deducted`, value: subtractedVal, formattedValue: formatNumber(subtractedVal) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate percentages, percentage additions, discounts, and percentage change instantly.",
    whatIsIt: "A versatile math tool for solving common percentage equations.",
    whyUseIt: "Useful for shopping discounts, exam marks, salary appraisals, and commercial markup.",
    howItWorks: "Applies the mathematical relation: Result = (X / 100) × Y.",
    formula: {
      title: "Percentage Formula",
      expression: "P = (X / 100) × Y",
      variables: [
        { symbol: "X", name: "Percentage", description: "Percent rate." },
        { symbol: "Y", name: "Base Number", description: "Total value." },
      ],
    },
    example: {
      title: "Percentage Example",
      scenario: "Finding 15% of 500.",
      inputs: { "X": "15%", "Y": "500" },
      calculationSteps: ["(15 / 100) × 500 = 0.15 × 500 = 75."],
      result: "15% of 500 is 75.",
    },
    faqs: [
      {
        question: "How do I calculate percentage increase?",
        answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100: [(New - Old) / Old] × 100.",
      },
    ],
  },
  relatedSlugs: ["ratio-calculator", "average-calculator"],
};

// 2. Fraction Calculator
export const fractionCalculatorConfig: CalculatorEngineConfig = {
  id: "fraction-calculator",
  slug: "fraction-calculator",
  name: "Fraction Calculator",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "num1", label: "Numerator 1 (A)", type: "number", defaultValue: 3, min: -1000, max: 1000, step: 1 },
    { name: "den1", label: "Denominator 1 (B)", type: "number", defaultValue: 4, min: 1, max: 1000, step: 1 },
    { name: "num2", label: "Numerator 2 (C)", type: "number", defaultValue: 2, min: -1000, max: 1000, step: 1 },
    { name: "den2", label: "Denominator 2 (D)", type: "number", defaultValue: 5, min: 1, max: 1000, step: 1 },
  ],
  calculate: (inputs) => {
    const A = inputs.num1 || 0;
    const B = Math.max(1, inputs.den1 || 1);
    const C = inputs.num2 || 0;
    const D = Math.max(1, inputs.den2 || 1);

    // Helper GCD
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));

    // Addition: (A*D + B*C) / (B*D)
    const addNum = A * D + B * C;
    const addDen = B * D;
    const gAdd = gcd(addNum, addDen) || 1;

    // Multiplication: (A*C) / (B*D)
    const mulNum = A * C;
    const mulDen = B * D;
    const gMul = gcd(mulNum, mulDen) || 1;

    return {
      results: [
        { id: "sum", label: "Addition (A/B + C/D)", value: `${addNum / gAdd}/${addDen / gAdd}`, formattedValue: `${addNum / gAdd}/${addDen / gAdd} (${(addNum / addDen).toFixed(3)})`, isHighlighted: true, variant: "primary" },
        { id: "product", label: "Multiplication (A/B × C/D)", value: `${mulNum / gMul}/${mulDen / gMul}`, formattedValue: `${mulNum / gMul}/${mulDen / gMul} (${(mulNum / mulDen).toFixed(3)})`, variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Add, subtract, multiply, and divide fractions with automated common denominator simplification.",
    whatIsIt: "Performs exact arithmetic on fractions with GCD simplification.",
    whyUseIt: "Eliminates tedious manual cross-multiplication for students and educators.",
    howItWorks: "Finds common denominators: (A/B) + (C/D) = (AD + BC) / BD.",
    formula: {
      title: "Fraction Addition Formula",
      expression: "(A/B) + (C/D) = (A×D + B×C) / (B×D)",
      variables: [
        { symbol: "A, C", name: "Numerators", description: "Top numbers." },
        { symbol: "B, D", name: "Denominators", description: "Bottom numbers." },
      ],
    },
    example: {
      title: "Fraction Addition Example",
      scenario: "Adding 3/4 and 2/5.",
      inputs: { "Fraction 1": "3/4", "Fraction 2": "2/5" },
      calculationSteps: [
        "Common denominator = 4 × 5 = 20.",
        "Numerators = (3 × 5) + (2 × 4) = 15 + 8 = 23.",
        "Result = 23/20 = 1.15.",
      ],
      result: "Sum is 23/20 (1.15).",
    },
    faqs: [
      {
        question: "Can denominators be zero?",
        answer: "No, division by zero is undefined in mathematics. Denominators must always be non-zero.",
      },
    ],
  },
  relatedSlugs: ["percentage-calculator", "ratio-calculator"],
};

// 3. Average Calculator
export const averageCalculatorConfig: CalculatorEngineConfig = {
  id: "average-calculator",
  slug: "average-calculator",
  name: "Average Calculator (Mean, Median, Range)",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "n1", label: "Value 1", type: "number", defaultValue: 10, min: -100000, max: 100000, step: 1 },
    { name: "n2", label: "Value 2", type: "number", defaultValue: 25, min: -100000, max: 100000, step: 1 },
    { name: "n3", label: "Value 3", type: "number", defaultValue: 40, min: -100000, max: 100000, step: 1 },
    { name: "n4", label: "Value 4", type: "number", defaultValue: 55, min: -100000, max: 100000, step: 1 },
  ],
  calculate: (inputs) => {
    const values = [inputs.n1, inputs.n2, inputs.n3, inputs.n4].map((v) => v || 0);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const median = (sorted[1] + sorted[2]) / 2;
    const range = sorted[sorted.length - 1] - sorted[0];

    return {
      results: [
        { id: "mean", label: "Arithmetic Mean (Average)", value: mean, formattedValue: formatNumber(mean, 2), isHighlighted: true, variant: "primary" },
        { id: "median", label: "Median Value", value: median, formattedValue: formatNumber(median, 2), variant: "success" },
        { id: "sum", label: "Sum Total", value: sum, formattedValue: formatNumber(sum) },
        { id: "range", label: "Range (Max - Min)", value: range, formattedValue: formatNumber(range) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate arithmetic mean, median, sum total, and range for numerical datasets.",
    whatIsIt: "Computes core descriptive statistics for numbers.",
    whyUseIt: "Essential for analyzing test scores, sports statistics, and dataset benchmarks.",
    howItWorks: "Mean = Sum of elements / Number of elements.",
    formula: {
      title: "Arithmetic Mean Formula",
      expression: "Mean = (x₁ + x₂ + ... + xₙ) / n",
      variables: [
        { symbol: "x", name: "Data Values", description: "Individual inputs." },
        { symbol: "n", name: "Sample Size", description: "Count of items." },
      ],
    },
    example: {
      title: "Average Example",
      scenario: "Finding the mean of 10, 25, 40, and 55.",
      inputs: { "Values": "10, 25, 40, 55" },
      calculationSteps: [
        "Sum = 10 + 25 + 40 + 55 = 130.",
        "Mean = 130 / 4 = 32.5.",
      ],
      result: "Average is 32.5.",
    },
    faqs: [
      {
        question: "When is median preferred over mean?",
        answer: "When data contains extreme outliers or is heavily skewed (such as income statistics), median provides a truer representative central figure.",
      },
    ],
  },
  relatedSlugs: ["percentage-calculator", "ratio-calculator"],
};

// 4. Square Root Calculator
export const squareRootCalculatorConfig: CalculatorEngineConfig = {
  id: "square-root-calculator",
  slug: "square-root-calculator",
  name: "Square Root & Power Calculator",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "number", label: "Enter Number (x)", type: "number", defaultValue: 144, min: 0, max: 10000000, step: 1 },
  ],
  calculate: (inputs) => {
    const x = Math.max(0, inputs.number || 0);
    const sqrt = Math.sqrt(x);
    const cbrt = Math.cbrt(x);
    const square = x * x;

    return {
      results: [
        { id: "sqrt", label: "Square Root (√x)", value: sqrt, formattedValue: formatNumber(sqrt, 4), isHighlighted: true, variant: "primary" },
        { id: "cbrt", label: "Cube Root (∛x)", value: cbrt, formattedValue: formatNumber(cbrt, 4), variant: "success" },
        { id: "square", label: "Square (x²)", value: square, formattedValue: formatNumber(square) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate square root, cube root, and square powers with precision.",
    whatIsIt: "Solves radical roots and quadratic powers for integers and decimals.",
    whyUseIt: "Required in geometry (Pythagorean theorem), physics, and algebraic proofs.",
    howItWorks: "Finds the factor that when multiplied by itself yields the original number.",
    formula: {
      title: "Square Root Relation",
      expression: "√x = y such that y² = x",
      variables: [
        { symbol: "x", name: "Radicand", description: "Number under radical sign." },
      ],
    },
    example: {
      title: "Root Example",
      scenario: "Finding √144.",
      inputs: { "x": "144" },
      calculationSteps: ["12 × 12 = 144. Therefore, √144 = 12."],
      result: "Square root of 144 is 12.",
    },
    faqs: [
      {
        question: "Can a real number have a negative square root?",
        answer: "The principal square root (√) is always non-negative. However, both (+12)² and (-12)² equal 144.",
      },
    ],
  },
  relatedSlugs: ["percentage-calculator", "gcd-calculator"],
};

// 5. Ratio Calculator
export const ratioCalculatorConfig: CalculatorEngineConfig = {
  id: "ratio-calculator",
  slug: "ratio-calculator",
  name: "Ratio Calculator (Proportions A:B = C:D)",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "a", label: "Value A", type: "number", defaultValue: 4, min: 1, max: 10000, step: 1 },
    { name: "b", label: "Value B", type: "number", defaultValue: 3, min: 1, max: 10000, step: 1 },
    { name: "c", label: "Value C (Solve for D)", type: "number", defaultValue: 1920, min: 1, max: 100000, step: 10 },
  ],
  calculate: (inputs) => {
    const A = Math.max(0.001, inputs.a || 1);
    const B = Math.max(0.001, inputs.b || 1);
    const C = Math.max(0.001, inputs.c || 1);

    // A/B = C/D => D = (B * C) / A
    const D = (B * C) / A;
    const decimalRatio = A / B;

    return {
      results: [
        { id: "d", label: "Resulting Value (D)", value: D, formattedValue: formatNumber(D, 2), isHighlighted: true, variant: "primary" },
        { id: "proportion", label: "Full Proportion", value: `${A} : ${B} = ${C} : ${Math.round(D)}`, formattedValue: `${A} : ${B} = ${C} : ${Math.round(D)}`, variant: "success" },
        { id: "ratio", label: "Decimal Ratio (A / B)", value: decimalRatio, formattedValue: decimalRatio.toFixed(3) },
      ],
    };
  },
  content: {
    shortDescription: "Solve proportions (A:B = C:D) and scale aspect ratios, screen resolutions, and recipe ingredients.",
    whatIsIt: "Solves cross-multiplication proportions for four variables.",
    whyUseIt: "Commonly used for image aspect ratios (16:9, 4:3), map scaling, and chemistry mixing.",
    howItWorks: "Cross multiplication: A × D = B × C, hence D = (B × C) / A.",
    formula: {
      title: "Proportion Formula",
      expression: "A / B = C / D  ⟹  D = (B × C) / A",
      variables: [
        { symbol: "A:B", name: "Known Ratio", description: "Source ratio." },
        { symbol: "C:D", name: "Target Ratio", description: "Scaled ratio with unknown D." },
      ],
    },
    example: {
      title: "Screen Aspect Ratio Example",
      scenario: "Converting a 4:3 aspect ratio to a 1920px width.",
      inputs: { "A": "4", "B": "3", "C": "1920" },
      calculationSteps: [
        "D = (3 × 1920) / 4 = 5,760 / 4 = 1,440.",
      ],
      result: "The height D is 1,440px (1920 × 1440 resolution).",
    },
    faqs: [
      {
        question: "How do I simplify a ratio?",
        answer: "Divide both sides of the ratio by their Greatest Common Divisor (GCD).",
      },
    ],
  },
  relatedSlugs: ["percentage-calculator", "fraction-calculator"],
};

// 6. GCD / LCM Calculator
export const gcdCalculatorConfig: CalculatorEngineConfig = {
  id: "gcd-calculator",
  slug: "gcd-calculator",
  name: "GCD & LCM Calculator",
  category: "math",
  categoryName: "Mathematics",
  inputs: [
    { name: "num1", label: "First Integer (A)", type: "number", defaultValue: 48, min: 1, max: 1000000, step: 1 },
    { name: "num2", label: "Second Integer (B)", type: "number", defaultValue: 72, min: 1, max: 1000000, step: 1 },
  ],
  calculate: (inputs) => {
    const A = Math.max(1, Math.round(inputs.num1 || 1));
    const B = Math.max(1, Math.round(inputs.num2 || 1));

    const computeGCD = (x: number, y: number): number => (y === 0 ? x : computeGCD(y, x % y));
    const gcd = computeGCD(A, B);
    const lcm = (A * B) / gcd;

    return {
      results: [
        { id: "gcd", label: "Greatest Common Divisor (GCD / HCF)", value: gcd, formattedValue: gcd.toString(), isHighlighted: true, variant: "primary" },
        { id: "lcm", label: "Least Common Multiple (LCM)", value: lcm, formattedValue: lcm.toLocaleString("en-IN"), variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate the Greatest Common Divisor (GCD / HCF) and Least Common Multiple (LCM) using Euclidean algorithm.",
    whatIsIt: "Computes the largest common factor and smallest common multiple of two integers.",
    whyUseIt: "Foundational for simplifying fractions, cyclic scheduling, and cryptographic algorithms.",
    howItWorks: "Applies the Euclidean algorithm: gcd(a, b) = gcd(b, a mod b).",
    formula: {
      title: "GCD & LCM Relation",
      expression: "LCM(A, B) = (|A × B|) / GCD(A, B)",
      variables: [
        { symbol: "GCD", name: "Greatest Common Divisor", description: "Highest common factor." },
        { symbol: "LCM", name: "Least Common Multiple", description: "Lowest multiple shared by both numbers." },
      ],
    },
    example: {
      title: "GCD & LCM Example",
      scenario: "Finding GCD and LCM of 48 and 72.",
      inputs: { "A": "48", "B": "72" },
      calculationSteps: [
        "72 mod 48 = 24.",
        "48 mod 24 = 0. Therefore, GCD = 24.",
        "LCM = (48 × 72) / 24 = 3,456 / 24 = 144.",
      ],
      result: "GCD is 24 and LCM is 144.",
    },
    faqs: [
      {
        question: "Is HCF the same as GCD?",
        answer: "Yes, Highest Common Factor (HCF) and Greatest Common Divisor (GCD) are identical mathematical terms.",
      },
    ],
  },
  relatedSlugs: ["fraction-calculator", "percentage-calculator"],
};

