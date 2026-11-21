import { CalculatorEngineConfig } from "../engine/types";
import { formatINR, formatPercentage } from "@/lib/formatters";

// 1. GST Calculator
export const gstCalculatorConfig: CalculatorEngineConfig = {
  id: "gst-calculator",
  slug: "gst-calculator",
  name: "GST Calculator (India)",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    {
      name: "amount",
      label: "Initial Amount",
      type: "currency",
      defaultValue: 10000,
      min: 1,
      max: 100000000,
      step: 100,
      prefix: "₹",
    },
    {
      name: "gstRate",
      label: "GST Tax Slab",
      type: "slider",
      defaultValue: 18,
      min: 0,
      max: 28,
      step: 1,
      suffix: "%",
      options: [
        { label: "0% (Nil / Exempt)", value: 0 },
        { label: "5%", value: 5 },
        { label: "12%", value: 12 },
        { label: "18%", value: 18 },
        { label: "28%", value: 28 },
      ],
      helpText: "Standard GST Slabs in India: 0% (Nil / Exempt), 5%, 12%, 18%, 28%.",
    },
  ],
  calculate: (inputs) => {
    const amount = Math.max(0, inputs.amount || 0);
    const rate = Math.max(0, inputs.gstRate || 0);

    // Exclusive (Adding GST to net amount)
    const gstExclusive = Math.round((amount * rate) / 100);
    const totalExclusive = amount + gstExclusive;
    const cgstEx = Math.round(gstExclusive / 2);
    const sgstEx = gstExclusive - cgstEx;

    // Inclusive (Removing GST from gross amount)
    const netInclusive = Math.round(amount / (1 + rate / 100));
    const gstInclusive = amount - netInclusive;
    const cgstIn = Math.round(gstInclusive / 2);
    const sgstIn = gstInclusive - cgstIn;

    return {
      results: [
        { id: "totalEx", label: "Gross Total (GST Added)", value: totalExclusive, formattedValue: formatINR(totalExclusive), isHighlighted: true, variant: "primary" },
        { id: "gstEx", label: "GST Amount (Exclusive)", value: gstExclusive, formattedValue: formatINR(gstExclusive), variant: "success", subText: `CGST: ${formatINR(cgstEx)} | SGST: ${formatINR(sgstEx)}` },
        { id: "netIn", label: "Net Pre-GST (GST Inclusive)", value: netInclusive, formattedValue: formatINR(netInclusive), subText: `Extracted Tax: ${formatINR(gstInclusive)}` },
      ],
      breakdown: {
        headers: ["Tax Type", "Exclusive Rate", "Inclusive Rate"],
        rows: [
          ["Base Price", formatINR(amount), formatINR(netInclusive)],
          [`CGST (${rate / 2}%)`, formatINR(cgstEx), formatINR(cgstIn)],
          [`SGST (${rate / 2}%)`, formatINR(sgstEx), formatINR(sgstIn)],
          ["Final Total", formatINR(totalExclusive), formatINR(amount)],
        ],
      },
    };
  },
  content: {
    shortDescription: "Calculate inclusive and exclusive Goods and Services Tax (GST) with CGST, SGST, and IGST breakdowns for Indian tax slabs.",
    whatIsIt: "A GST calculator computes the tax liability added to or extracted from product sales in India.",
    whyUseIt: "Essential for business invoicing, B2B purchasing, and consumer price verification.",
    howItWorks: "Exclusive GST: Amount × (GST% / 100). Inclusive GST: Amount - [Amount / (1 + GST% / 100)].",
    formula: {
      title: "GST Calculation Formulas",
      expression: "GST Amount = (Net Price × GST%) / 100",
      variables: [
        { symbol: "Net Price", name: "Original Value", description: "Tax-exclusive cost." },
        { symbol: "CGST / SGST", name: "Central / State Split", description: "Divided equally 50:50 for intrastate trade." },
      ],
    },
    example: {
      title: "GST Invoicing Example",
      scenario: "Billing a software service of ₹10,000 at 18% GST.",
      inputs: { "Amount": "₹10,000", "GST Slab": "18%" },
      calculationSteps: [
        "GST = (10,000 × 18) / 100 = ₹1,800.",
        "CGST (9%) = ₹900.",
        "SGST (9%) = ₹900.",
        "Total Invoice = ₹10,000 + ₹1,800 = ₹11,800.",
      ],
      result: "Total invoice amount is ₹11,800.",
    },
    faqs: [
      {
        question: "What is the difference between IGST and CGST/SGST?",
        answer: "For sales within the same state (Intrastate), tax is split into CGST and SGST. For sales across state borders (Interstate), integrated tax (IGST) is applied.",
      },
    ],
  },
  relatedSlugs: ["income-tax-calculator", "salary-calculator", "discount-calculator"],
};

// 2. Income Tax Calculator (FY 2024-25)
export const incomeTaxCalculatorConfig: CalculatorEngineConfig = {
  id: "income-tax-calculator",
  slug: "income-tax-calculator",
  name: "Income Tax Calculator (FY 2024-25)",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    {
      name: "annualIncome",
      label: "Total Gross Annual Income",
      type: "currency",
      defaultValue: 1200000,
      min: 0,
      max: 50000000,
      step: 25000,
      prefix: "₹",
      options: [
        { label: "₹0", value: 0 },
        { label: "₹5 Lakh", value: 500000 },
        { label: "₹10 Lakh", value: 1000000 },
        { label: "₹15 Lakh", value: 1500000 },
        { label: "₹25 Lakh", value: 2500000 },
      ],
      helpText: "Annual CTC or total taxable business profits.",
    },
  ],
  calculate: (inputs) => {
    const gross = Math.max(0, inputs.annualIncome || 0);
    // Standard deduction for salaried under New Regime (FY 24-25 / AY 25-26) = ₹75,000
    const stdDeduction = 75000;
    const taxableNew = Math.max(0, gross - stdDeduction);

    let taxNew = 0;
    // Slabs (Budget 2024 revised):
    // 0 - 3L: Nil
    // 3L - 7L: 5%
    // 7L - 10L: 10%
    // 10L - 12L: 15%
    // 12L - 15L: 20%
    // Above 15L: 30%
    if (taxableNew <= 700000) {
      taxNew = 0; // Section 87A rebate applies up to 7L
    } else {
      if (taxableNew > 1500000) {
        taxNew += (taxableNew - 1500000) * 0.3;
        taxNew += 300000 * 0.2; // 12-15L
        taxNew += 200000 * 0.15; // 10-12L
        taxNew += 300000 * 0.1; // 7-10L
        taxNew += 400000 * 0.05; // 3-7L
      } else if (taxableNew > 1200000) {
        taxNew += (taxableNew - 1200000) * 0.2;
        taxNew += 200000 * 0.15;
        taxNew += 300000 * 0.1;
        taxNew += 400000 * 0.05;
      } else if (taxableNew > 1000000) {
        taxNew += (taxableNew - 1000000) * 0.15;
        taxNew += 300000 * 0.1;
        taxNew += 400000 * 0.05;
      } else if (taxableNew > 700000) {
        taxNew += (taxableNew - 700000) * 0.1;
        taxNew += 400000 * 0.05;
      }
    }

    const cess = Math.round(taxNew * 0.04);
    const totalTax = Math.round(taxNew + cess);
    const takeHomeAnnual = gross - totalTax;

    return {
      results: [
        { id: "tax", label: "Total Income Tax (New Regime)", value: totalTax, formattedValue: formatINR(totalTax), isHighlighted: true, variant: "primary" },
        { id: "takeHome", label: "Annual Post-Tax Income", value: takeHomeAnnual, formattedValue: formatINR(takeHomeAnnual), variant: "success" },
        { id: "monthly", label: "Monthly In-Hand (Approx)", value: Math.round(takeHomeAnnual / 12), formattedValue: formatINR(Math.round(takeHomeAnnual / 12)) },
      ],
      breakdown: {
        headers: ["Component", "Amount"],
        rows: [
          ["Gross Income", formatINR(gross)],
          ["Standard Deduction", formatINR(stdDeduction)],
          ["Taxable Income", formatINR(taxableNew)],
          ["Base Income Tax", formatINR(Math.round(taxNew))],
          ["Health & Education Cess (4%)", formatINR(cess)],
          ["Final Tax Liability", formatINR(totalTax)],
        ],
      },
    };
  },
  content: {
    shortDescription: "Calculate Indian income tax liability under the revised New Tax Regime (FY 2024-25 / AY 2025-26) with standard deduction and cess.",
    whatIsIt: "Computes income tax according to the latest Indian Finance Act slabs and Section 87A rebate rules.",
    whyUseIt: "Crucial for annual tax planning, salary structuring, and TDS declarations.",
    howItWorks: "Applies progressive tax slabs to income after deducting the ₹75,000 salaried standard deduction.",
    formula: {
      title: "New Tax Regime Slabs (Budget 2024)",
      expression: "Tax = Slabs [0-3L: Nil, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, >15L: 30%] + 4% Cess",
      variables: [
        { symbol: "Section 87A", name: "Tax Rebate", description: "Zero tax for taxable income up to ₹7,00,000." },
        { symbol: "Cess", name: "Health & Education Cess", description: "4% surcharge on base income tax." },
      ],
    },
    example: {
      title: "Tax Calculation Example",
      scenario: "Salaried employee earning ₹12,00,000 annual CTC.",
      inputs: { "Gross CTC": "₹12,00,000" },
      calculationSteps: [
        "Standard Deduction = ₹75,000.",
        "Taxable Income = ₹12,00,000 - ₹75,000 = ₹11,25,000.",
        "Tax on 3-7L (4L @ 5%) = ₹20,000.",
        "Tax on 7-10L (3L @ 10%) = ₹30,000.",
        "Tax on 10-11.25L (1.25L @ 15%) = ₹18,750.",
        "Total Base Tax = ₹68,750.",
        "4% Cess = ₹2,750.",
        "Total Tax Payable = ₹71,500.",
      ],
      result: "Total tax payable is ₹71,500.",
    },
    faqs: [
      {
        question: "Is the New Tax Regime the default regime in India?",
        answer: "Yes, from FY 2023-24 onward, the New Tax Regime is the default regime unless an employee explicitly opts for the Old Tax Regime.",
      },
    ],
  },
  relatedSlugs: ["salary-calculator", "gst-calculator"],
};

// 3. Salary & In-Hand Calculator
export const salaryCalculatorConfig: CalculatorEngineConfig = {
  id: "salary-calculator",
  slug: "salary-calculator",
  name: "Salary & In-Hand Calculator",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    {
      name: "annualCtc",
      label: "Annual Cost to Company (CTC)",
      type: "currency",
      defaultValue: 1200000,
      min: 200000,
      max: 50000000,
      step: 25000,
      prefix: "₹",
    },
  ],
  calculate: (inputs) => {
    const ctc = Math.max(0, inputs.annualCtc || 0);

    // Standard Indian salary structure breakdown:
    // Basic = 40% of CTC
    const basicAnnual = ctc * 0.4;
    // EPF employee contribution = 12% of basic (capped optionally or uncapped)
    const epfEmployee = Math.round(basicAnnual * 0.12);
    // Employer EPF contribution (part of CTC)
    const epfEmployer = epfEmployee;
    // Professional tax (standard ₹2,400/yr in states like Maharashtra, Karnataka)
    const profTax = 2400;

    // Approximate income tax under new regime
    const taxable = Math.max(0, ctc - epfEmployer - 75000);
    let incomeTax = 0;
    if (taxable > 700000) {
      if (taxable > 1500000) incomeTax += (taxable - 1500000) * 0.3 + 140000;
      else if (taxable > 1200000) incomeTax += (taxable - 1200000) * 0.2 + 80000;
      else if (taxable > 1000000) incomeTax += (taxable - 1000000) * 0.15 + 50000;
      else if (taxable > 700000) incomeTax += (taxable - 700000) * 0.1 + 20000;
    }
    incomeTax = Math.round(incomeTax * 1.04); // add cess

    const totalDeductions = epfEmployee + epfEmployer + profTax + incomeTax;
    const netAnnual = Math.max(0, ctc - totalDeductions);
    const inHandMonthly = Math.round(netAnnual / 12);

    return {
      results: [
        { id: "monthly", label: "Estimated Monthly In-Hand Pay", value: inHandMonthly, formattedValue: formatINR(inHandMonthly), isHighlighted: true, variant: "primary" },
        { id: "netAnnual", label: "Annual In-Hand Salary", value: netAnnual, formattedValue: formatINR(netAnnual), variant: "success" },
        { id: "pfAnnual", label: "Your Annual EPF Savings", value: epfEmployee * 2, formattedValue: formatINR(epfEmployee * 2) },
      ],
      breakdown: {
        headers: ["Component", "Monthly", "Annual"],
        rows: [
          ["Cost to Company (CTC)", formatINR(Math.round(ctc / 12)), formatINR(ctc)],
          ["Employee EPF (12%)", formatINR(Math.round(epfEmployee / 12)), formatINR(epfEmployee)],
          ["Employer EPF (Retirement)", formatINR(Math.round(epfEmployer / 12)), formatINR(epfEmployer)],
          ["Professional Tax", "₹200", formatINR(profTax)],
          ["TDS / Income Tax (Approx)", formatINR(Math.round(incomeTax / 12)), formatINR(incomeTax)],
          ["Net Take-Home Salary", formatINR(inHandMonthly), formatINR(netAnnual)],
        ],
      },
    };
  },
  content: {
    shortDescription: "Convert annual CTC into real monthly take-home salary after PF, professional tax, and income tax deductions.",
    whatIsIt: "Estimates actual net bank salary credited each month from an offered CTC package.",
    whyUseIt: "Prevents surprise discrepancies between job offer letters and first monthly paychecks.",
    howItWorks: "Deducts Employee PF, Employer PF, Professional Tax, and Income Tax TDS from gross salary.",
    formula: {
      title: "In-Hand Salary Formula",
      expression: "Net Pay = Gross Salary - Employee PF - Professional Tax - Income Tax (TDS)",
      variables: [
        { symbol: "PF", name: "Provident Fund", description: "12% of basic salary mandatory retirement savings." },
      ],
    },
    example: {
      title: "CTC Breakdown Example",
      scenario: "₹12,00,000 CTC in Bangalore/Mumbai.",
      inputs: { "Annual CTC": "₹12,00,000" },
      calculationSteps: [
        "Gross monthly CTC = ₹1,00,000.",
        "Employee EPF = ~₹4,800/mo.",
        "TDS Income Tax = ~₹5,958/mo.",
        "Professional Tax = ₹200/mo.",
        "Net In-Hand = ~₹84,240/mo.",
      ],
      result: "Monthly take-home salary is approximately ₹84,240.",
    },
    faqs: [
      {
        question: "Does EPF money belong to the employee?",
        answer: "Yes, both employee and employer contributions accumulate in your EPFO account earning government interest (currently ~8.25% p.a.).",
      },
    ],
  },
  relatedSlugs: ["income-tax-calculator", "gst-calculator"],
};

// 4. Profit Margin Calculator
export const profitMarginCalculatorConfig: CalculatorEngineConfig = {
  id: "profit-margin-calculator",
  slug: "profit-margin-calculator",
  name: "Profit Margin Calculator",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    { name: "cost", label: "Cost Price (COGS)", type: "currency", defaultValue: 600, min: 1, max: 10000000, step: 10, prefix: "₹" },
    { name: "revenue", label: "Selling Price / Revenue", type: "currency", defaultValue: 1000, min: 1, max: 10000000, step: 10, prefix: "₹" },
  ],
  calculate: (inputs) => {
    const cost = Math.max(0, inputs.cost || 0);
    const revenue = Math.max(0.01, inputs.revenue || 0.01);

    const profit = revenue - cost;
    const margin = (profit / revenue) * 100;
    const markup = (profit / (cost || 1)) * 100;

    return {
      results: [
        { id: "margin", label: "Gross Profit Margin", value: margin, formattedValue: formatPercentage(margin), isHighlighted: true, variant: "primary" },
        { id: "profit", label: "Net Profit Amount", value: profit, formattedValue: formatINR(profit), variant: "success" },
        { id: "markup", label: "Markup Percentage", value: markup, formattedValue: formatPercentage(markup) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate gross profit margin percentage, markup percentage, and net profit per unit.",
    whatIsIt: "Measures business profitability and pricing power on goods sold.",
    whyUseIt: "Ensures selling prices cover operational overheads and deliver target operating margins.",
    howItWorks: "Margin = (Profit / Revenue) × 100. Markup = (Profit / Cost) × 100.",
    formula: {
      title: "Profit Margin Formula",
      expression: "Margin % = [ (Revenue - Cost) / Revenue ] × 100",
      variables: [
        { symbol: "Revenue", name: "Selling Price", description: "Top line income." },
        { symbol: "Cost", name: "Cost of Goods Sold (COGS)", description: "Direct product manufacturing cost." },
      ],
    },
    example: {
      title: "Margin Example",
      scenario: "Product cost ₹600 sold at ₹1,000.",
      inputs: { "Cost": "₹600", "Selling Price": "₹1,000" },
      calculationSteps: [
        "Profit = ₹1,000 - ₹600 = ₹400.",
        "Margin = (400 / 1000) × 100 = 40.0%.",
        "Markup = (400 / 600) × 100 = 66.7%.",
      ],
      result: "Profit margin is 40.0% and markup is 66.7%.",
    },
    faqs: [
      {
        question: "What is the difference between markup and margin?",
        answer: "Margin is profit as a percentage of selling price, whereas markup is profit as a percentage of wholesale cost.",
      },
    ],
  },
  relatedSlugs: ["markup-calculator", "discount-calculator"],
};

// 5. Markup Calculator
export const markupCalculatorConfig: CalculatorEngineConfig = {
  id: "markup-calculator",
  slug: "markup-calculator",
  name: "Markup Calculator",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    { name: "cost", label: "Cost Price", type: "currency", defaultValue: 500, min: 1, max: 10000000, step: 10, prefix: "₹" },
    { name: "markupPercent", label: "Desired Markup Percentage", type: "percentage", defaultValue: 50, min: 1, max: 1000, step: 1, suffix: "%" },
  ],
  calculate: (inputs) => {
    const cost = Math.max(0, inputs.cost || 0);
    const markup = Math.max(0, inputs.markupPercent || 0);

    const profit = Math.round((cost * markup) / 100);
    const sellingPrice = cost + profit;
    const margin = (profit / sellingPrice) * 100;

    return {
      results: [
        { id: "sellingPrice", label: "Required Selling Price", value: sellingPrice, formattedValue: formatINR(sellingPrice), isHighlighted: true, variant: "primary" },
        { id: "profit", label: "Profit Earned per Unit", value: profit, formattedValue: formatINR(profit), variant: "success" },
        { id: "margin", label: "Equivalent Gross Margin", value: margin, formattedValue: formatPercentage(margin) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate retail selling prices and gross margins from wholesale costs and target markup percentages.",
    whatIsIt: "Determines retail pricing based on cost-plus markup pricing models.",
    whyUseIt: "Quickly set competitive retail prices for ecommerce and brick-and-mortar retail inventory.",
    howItWorks: "Selling Price = Cost + [ Cost × (Markup% / 100) ].",
    formula: {
      title: "Markup Formula",
      expression: "Selling Price = Cost × (1 + Markup% / 100)",
      variables: [
        { symbol: "Cost", name: "Wholesale Cost", description: "Acquisition or production expense." },
      ],
    },
    example: {
      title: "Retail Pricing Example",
      scenario: "Cost ₹500 with a 50% target markup.",
      inputs: { "Cost": "₹500", "Markup": "50%" },
      calculationSteps: [
        "Profit = ₹500 × 0.50 = ₹250.",
        "Selling Price = ₹500 + ₹250 = ₹750.",
      ],
      result: "Retail selling price is ₹750.",
    },
    faqs: [
      {
        question: "Can markup exceed 100%?",
        answer: "Yes, markup can exceed 100% (e.g. 200% markup on a ₹100 item equals a ₹300 selling price), whereas profit margin can never reach 100%.",
      },
    ],
  },
  relatedSlugs: ["profit-margin-calculator", "discount-calculator"],
};

// 6. Discount Calculator
export const discountCalculatorConfig: CalculatorEngineConfig = {
  id: "discount-calculator",
  slug: "discount-calculator",
  name: "Discount Calculator",
  category: "business",
  categoryName: "Business & Tax",
  inputs: [
    { name: "originalPrice", label: "Original Retail Price", type: "currency", defaultValue: 2500, min: 1, max: 10000000, step: 50, prefix: "₹" },
    {
      name: "discountPercent",
      label: "Discount Percentage",
      type: "percentage",
      defaultValue: 25,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
      options: [
        { label: "0%", value: 0 },
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
        { label: "20%", value: 20 },
        { label: "25%", value: 25 },
        { label: "50%", value: 50 },
      ],
    },
  ],
  calculate: (inputs) => {
    const original = Math.max(0, inputs.originalPrice || 0);
    const disc = Math.max(0, Math.min(100, inputs.discountPercent || 0));

    const savings = Math.round((original * disc) / 100);
    const finalPrice = original - savings;

    return {
      results: [
        { id: "finalPrice", label: "Final Discounted Price", value: finalPrice, formattedValue: formatINR(finalPrice), isHighlighted: true, variant: "primary" },
        { id: "savings", label: "Total Amount Saved", value: savings, formattedValue: formatINR(savings), variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate the sale price and total money saved during discount sales and promotional shopping.",
    whatIsIt: "Computes discounted sale price after percentage reductions.",
    whyUseIt: "Instantly check true savings during retail sales, Black Friday, or festive shopping.",
    howItWorks: "Final Price = Original Price - [Original Price × (Discount% / 100)].",
    formula: {
      title: "Discount Formula",
      expression: "Final Price = Original × (1 - Discount% / 100)",
      variables: [
        { symbol: "Savings", name: "Money Saved", description: "Original Price × Discount%." },
      ],
    },
    example: {
      title: "Shopping Discount Example",
      scenario: "₹2,500 item with a 25% discount.",
      inputs: { "Original": "₹2,500", "Discount": "25%" },
      calculationSteps: [
        "Savings = 2,500 × 0.25 = ₹625.",
        "Final Price = 2,500 - 625 = ₹1,875.",
      ],
      result: "Final price is ₹1,875 and you save ₹625.",
    },
    faqs: [
      {
        question: "How do double discounts work (e.g. 20% + 10%)?",
        answer: "The second discount applies to the already discounted price, not the original price.",
      },
    ],
  },
  relatedSlugs: ["gst-calculator", "profit-margin-calculator"],
};

