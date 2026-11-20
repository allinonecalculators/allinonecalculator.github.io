import { CalculatorEngineConfig } from "../engine/types";
import { formatINR, formatNumber, formatPercentage } from "@/lib/formatters";

// 1. Lumpsum Calculator
export const lumpsumCalculatorConfig: CalculatorEngineConfig = {
  id: "lumpsum-calculator",
  slug: "lumpsum-calculator",
  name: "Lumpsum Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "investmentAmount",
      label: "Total Investment Amount",
      type: "currency",
      defaultValue: 100000,
      min: 1000,
      max: 10000000,
      step: 5000,
      prefix: "₹",
      helpText: "One-time capital amount invested.",
    },
    {
      name: "expectedReturnRate",
      label: "Expected Return Rate (p.a.)",
      type: "percentage",
      defaultValue: 12,
      min: 1,
      max: 30,
      step: 0.5,
      suffix: "%",
      helpText: "Expected annual compounding return rate.",
    },
    {
      name: "timePeriodYears",
      label: "Time Period",
      type: "slider",
      defaultValue: 10,
      min: 1,
      max: 35,
      step: 1,
      suffix: "Years",
      helpText: "Duration of investment in years.",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.investmentAmount || 0);
    const r = Math.max(0, inputs.expectedReturnRate || 0) / 100;
    const t = Math.max(1, Math.min(40, inputs.timePeriodYears || 1));

    const totalValue = Math.round(P * Math.pow(1 + r, t));
    const estimatedReturns = Math.max(0, totalValue - P);

    const schedule = [];
    for (let y = 1; y <= t; y++) {
      const val = Math.round(P * Math.pow(1 + r, y));
      schedule.push({
        year: y,
        invested: P,
        growth: val - P,
        total: val,
      });
    }

    return {
      results: [
        {
          id: "invested",
          label: "Initial Investment",
          value: P,
          formattedValue: formatINR(P),
          variant: "neutral",
        },
        {
          id: "returns",
          label: "Estimated Returns",
          value: estimatedReturns,
          formattedValue: formatINR(estimatedReturns),
          variant: "success",
        },
        {
          id: "total",
          label: "Total Maturity Value",
          value: totalValue,
          formattedValue: formatINR(totalValue),
          isHighlighted: true,
          variant: "primary",
        },
      ],
      chart: {
        type: "area",
        title: "Lumpsum Wealth Growth Over Time",
        data: schedule.map((s) => ({
          name: `Yr ${s.year}`,
          Principal: s.invested,
          "Total Value": s.total,
        })),
        xKey: "name",
        series: [
          { key: "Principal", name: "Principal Amount", color: "#64748b" },
          { key: "Total Value", name: "Total Corpus", color: "#10b981" },
        ],
      },
      breakdown: {
        headers: ["Year", "Initial Capital", "Total Profit", "End Balance"],
        rows: schedule.map((s) => [
          `Year ${s.year}`,
          formatINR(s.invested),
          formatINR(s.growth),
          formatINR(s.total),
        ]),
      },
    };
  },
  content: {
    shortDescription:
      "Calculate the maturity returns and wealth growth of one-time lump sum mutual fund or equity investments.",
    whatIsIt:
      "A Lumpsum calculator estimates the compounding future value of a single one-time capital investment over your chosen investment horizon.",
    whyUseIt:
      "Unlike monthly SIPs, a lump sum deploys your entire capital upfront, allowing all of it to start compounding from day one.",
    howItWorks:
      "The calculator applies standard annual compound interest: Future Value = P × (1 + r)^t, factoring in continuous wealth accumulation.",
    formula: {
      title: "Lumpsum Future Value Formula",
      expression: "A = P × (1 + r)^t",
      variables: [
        { symbol: "A", name: "Maturity Amount", description: "Final accumulated value." },
        { symbol: "P", name: "Principal Amount", description: "Initial one-time investment." },
        { symbol: "r", name: "Annual Return Rate", description: "Annual interest rate expressed as a decimal." },
        { symbol: "t", name: "Duration", description: "Number of investment years." },
      ],
    },
    example: {
      title: "Real-World Lumpsum Example",
      scenario: "Anita invests ₹2,00,000 as a lump sum in an equity fund earning 12% p.a. for 10 years.",
      inputs: { "Principal (P)": "₹2,00,000", "Rate (r)": "12%", "Time (t)": "10 Years" },
      calculationSteps: [
        "Multiplier = (1 + 0.12)^10 = (1.12)^10 ≈ 3.1058.",
        "Maturity Value = ₹2,00,000 × 3.1058 = ₹6,21,169.",
        "Wealth Gain = ₹6,21,169 - ₹2,00,000 = ₹4,21,169.",
      ],
      result: "Anita's ₹2 Lakh investment more than triples to ₹6.21 Lakh in 10 years.",
    },
    faqs: [
      {
        question: "Is Lumpsum or SIP better for mutual funds?",
        answer:
          "When markets are fairly valued or recovering from a correction, lumpsum investments generally produce higher returns because all capital compounds immediately. In volatile or peak markets, SIP reduces timing risk.",
      },
    ],
  },
  relatedSlugs: ["sip-calculator", "compound-interest-calculator", "cagr-calculator"],
};

// 2. Compound Interest Calculator
export const compoundInterestCalculatorConfig: CalculatorEngineConfig = {
  id: "compound-interest-calculator",
  slug: "compound-interest-calculator",
  name: "Compound Interest Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "principal",
      label: "Principal Amount",
      type: "currency",
      defaultValue: 50000,
      min: 1000,
      max: 10000000,
      step: 5000,
      prefix: "₹",
      helpText: "Initial deposit balance.",
    },
    {
      name: "annualRate",
      label: "Annual Interest Rate",
      type: "percentage",
      defaultValue: 8,
      min: 0.5,
      max: 30,
      step: 0.25,
      suffix: "%",
    },
    {
      name: "years",
      label: "Investment Tenure",
      type: "slider",
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.principal || 0);
    const r = Math.max(0, inputs.annualRate || 0) / 100;
    const t = Math.max(1, inputs.years || 1);
    const n = 12; // Monthly compounding

    const totalValue = Math.round(P * Math.pow(1 + r / n, n * t));
    const interest = Math.max(0, totalValue - P);

    const schedule = [];
    for (let y = 1; y <= t; y++) {
      const val = Math.round(P * Math.pow(1 + r / n, n * y));
      schedule.push({
        year: y,
        principal: P,
        interest: val - P,
        total: val,
      });
    }

    return {
      results: [
        { id: "principal", label: "Initial Principal", value: P, formattedValue: formatINR(P) },
        { id: "interest", label: "Compound Interest", value: interest, formattedValue: formatINR(interest), variant: "success" },
        { id: "total", label: "Maturity Amount", value: totalValue, formattedValue: formatINR(totalValue), isHighlighted: true, variant: "primary" },
      ],
      chart: {
        type: "area",
        title: "Principal vs Compound Growth",
        data: schedule.map((s) => ({ name: `Yr ${s.year}`, Principal: s.principal, Balance: s.total })),
        xKey: "name",
        series: [
          { key: "Principal", name: "Principal", color: "#94a3b8" },
          { key: "Balance", name: "Total Balance", color: "#3b82f6" },
        ],
      },
      breakdown: {
        headers: ["Year", "Principal", "Accrued Interest", "Total Balance"],
        rows: schedule.map((s) => [`Year ${s.year}`, formatINR(s.principal), formatINR(s.interest), formatINR(s.total)]),
      },
    };
  },
  content: {
    shortDescription: "Calculate compound interest with monthly compounding intervals and visual growth curves.",
    whatIsIt: "Compound interest is interest calculated on the initial principal and on the accumulated interest of prior periods.",
    whyUseIt: "Albert Einstein famously called compound interest the 'eighth wonder of the world'. It illustrates how money accelerates over long periods.",
    howItWorks: "Using the formula A = P(1 + r/n)^(nt), interest is added to the balance, allowing future interest to be calculated on larger balances.",
    formula: {
      title: "Compound Interest Formula",
      expression: "A = P × (1 + r/n)^(n×t)",
      variables: [
        { symbol: "A", name: "Final Amount", description: "Total accrued balance." },
        { symbol: "P", name: "Principal", description: "Original deposited sum." },
        { symbol: "r", name: "Interest Rate", description: "Nominal annual rate as decimal." },
        { symbol: "n", name: "Compounding Frequency", description: "Compounding events per year (12 for monthly)." },
        { symbol: "t", name: "Time", description: "Years invested." },
      ],
    },
    example: {
      title: "Compounding Example",
      scenario: "Depositing ₹50,000 at 8% per annum compounded monthly for 5 years.",
      inputs: { "Principal (P)": "₹50,000", "Rate (r)": "8%", "Years (t)": "5" },
      calculationSteps: [
        "r/n = 0.08 / 12 = 0.006667.",
        "n × t = 12 × 5 = 60 periods.",
        "(1 + 0.006667)^60 = 1.4898.",
        "Maturity = ₹50,000 × 1.4898 = ₹74,492.",
      ],
      result: "Total interest earned is ₹24,492 on a ₹50,000 deposit.",
    },
    faqs: [
      {
        question: "How does compounding frequency affect returns?",
        answer: "The more frequently interest is compounded (daily vs monthly vs annually), the higher the effective yield.",
      },
    ],
  },
  relatedSlugs: ["simple-interest-calculator", "sip-calculator", "fd-calculator"],
};

// 3. Simple Interest Calculator
export const simpleInterestCalculatorConfig: CalculatorEngineConfig = {
  id: "simple-interest-calculator",
  slug: "simple-interest-calculator",
  name: "Simple Interest Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "principal",
      label: "Principal Amount",
      type: "currency",
      defaultValue: 20000,
      min: 500,
      max: 10000000,
      step: 1000,
      prefix: "₹",
    },
    {
      name: "rate",
      label: "Annual Interest Rate",
      type: "percentage",
      defaultValue: 7,
      min: 0.5,
      max: 30,
      step: 0.25,
      suffix: "%",
    },
    {
      name: "timeYears",
      label: "Time Duration",
      type: "slider",
      defaultValue: 3,
      min: 1,
      max: 30,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.principal || 0);
    const R = Math.max(0, inputs.rate || 0);
    const T = Math.max(1, inputs.timeYears || 1);

    const simpleInterest = Math.round((P * R * T) / 100);
    const totalAmount = P + simpleInterest;

    return {
      results: [
        { id: "principal", label: "Principal Amount", value: P, formattedValue: formatINR(P) },
        { id: "interest", label: "Total Simple Interest", value: simpleInterest, formattedValue: formatINR(simpleInterest), variant: "success" },
        { id: "total", label: "Final Maturity Sum", value: totalAmount, formattedValue: formatINR(totalAmount), isHighlighted: true, variant: "primary" },
      ],
      breakdown: {
        headers: ["Year", "Annual Interest", "Cumulative Interest", "Total Payable"],
        rows: Array.from({ length: T }, (_, idx) => {
          const yr = idx + 1;
          const yrInterest = Math.round((P * R) / 100);
          return [`Year ${yr}`, formatINR(yrInterest), formatINR(yrInterest * yr), formatINR(P + yrInterest * yr)];
        }),
      },
    };
  },
  content: {
    shortDescription: "Calculate simple interest on personal loans, deposits, and promissory notes using P × R × T / 100.",
    whatIsIt: "Simple interest is calculated solely on the principal portion of an initial loan or deposit.",
    whyUseIt: "Useful for short-term lending, student loans, and basic debt instruments where interest is not reinvested.",
    howItWorks: "Interest = (P × R × T) / 100. The annual interest remains identical each year.",
    formula: {
      title: "Simple Interest Formula",
      expression: "SI = (P × R × T) / 100",
      variables: [
        { symbol: "SI", name: "Simple Interest", description: "Total interest generated." },
        { symbol: "P", name: "Principal", description: "Initial loan or deposit amount." },
        { symbol: "R", name: "Rate of Interest", description: "Annual rate as a percentage." },
        { symbol: "T", name: "Time", description: "Period in years." },
      ],
    },
    example: {
      title: "Simple Interest Example",
      scenario: "Lending ₹20,000 for 3 years at 7% per annum simple interest.",
      inputs: { "Principal (P)": "₹20,000", "Rate (R)": "7%", "Time (T)": "3 Years" },
      calculationSteps: [
        "SI = (20,000 × 7 × 3) / 100 = 4,20,000 / 100 = ₹4,200.",
        "Total Amount = ₹20,000 + ₹4,200 = ₹24,200.",
      ],
      result: "The borrower repays ₹24,200 after 3 years.",
    },
    faqs: [
      {
        question: "How does simple interest differ from compound interest?",
        answer: "Simple interest only earns on the original principal, whereas compound interest also earns on accumulated interest.",
      },
    ],
  },
  relatedSlugs: ["compound-interest-calculator", "fd-calculator"],
};

// 4. FD Calculator (Fixed Deposit)
export const fdCalculatorConfig: CalculatorEngineConfig = {
  id: "fd-calculator",
  slug: "fd-calculator",
  name: "FD Calculator (Fixed Deposit)",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "depositAmount",
      label: "Total Deposit Amount",
      type: "currency",
      defaultValue: 100000,
      min: 5000,
      max: 10000000,
      step: 5000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Bank Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 7.25,
      min: 3,
      max: 12,
      step: 0.05,
      suffix: "%",
      helpText: "Indian banks compound FD interest quarterly (4 times a year).",
    },
    {
      name: "tenureYears",
      label: "Tenure",
      type: "slider",
      defaultValue: 5,
      min: 1,
      max: 10,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.depositAmount || 0);
    const r = Math.max(0, inputs.interestRate || 0) / 100;
    const t = Math.max(1, inputs.tenureYears || 1);
    const n = 4; // Quarterly compounding (standard in Indian banking)

    const maturityValue = Math.round(P * Math.pow(1 + r / n, n * t));
    const interest = Math.max(0, maturityValue - P);

    return {
      results: [
        { id: "principal", label: "Deposited Amount", value: P, formattedValue: formatINR(P) },
        { id: "interest", label: "Total Interest Earned", value: interest, formattedValue: formatINR(interest), variant: "success" },
        { id: "maturity", label: "Total Maturity Value", value: maturityValue, formattedValue: formatINR(maturityValue), isHighlighted: true, variant: "primary" },
      ],
      breakdown: {
        headers: ["Year", "Opening Balance", "Interest Earned", "Closing Balance"],
        rows: Array.from({ length: t }, (_, idx) => {
          const yr = idx + 1;
          const open = Math.round(P * Math.pow(1 + r / n, n * (yr - 1)));
          const close = Math.round(P * Math.pow(1 + r / n, n * yr));
          return [`Year ${yr}`, formatINR(open), formatINR(close - open), formatINR(close)];
        }),
      },
    };
  },
  content: {
    shortDescription: "Calculate bank Fixed Deposit (FD) maturity amount with quarterly compounding.",
    whatIsIt: "A Fixed Deposit is a secure financial instrument offered by banks where money is locked for a set tenure at a guaranteed interest rate.",
    whyUseIt: "Provides guaranteed capital protection and predictable fixed income under DICGC insurance coverage.",
    howItWorks: "Indian commercial banks compound FD interest quarterly: A = P × (1 + r/4)^(4t).",
    formula: {
      title: "Bank FD Maturity Formula",
      expression: "A = P × (1 + r/4)^(4 × t)",
      variables: [
        { symbol: "A", name: "Maturity Proceeds", description: "Total payout upon maturity." },
        { symbol: "P", name: "Deposit Amount", description: "Principal invested." },
        { symbol: "r", name: "Annual Rate", description: "Bank interest rate as decimal." },
        { symbol: "t", name: "Tenure in Years", description: "Lock-in duration." },
      ],
    },
    example: {
      title: "Fixed Deposit Example",
      scenario: "Depositing ₹1,00,000 in a 5-year FD at 7.25% p.a. with quarterly compounding.",
      inputs: { "Deposit (P)": "₹1,00,000", "Rate (r)": "7.25%", "Tenure (t)": "5 Years" },
      calculationSteps: [
        "Quarterly rate = 0.0725 / 4 = 0.018125.",
        "Total compounding quarters = 5 × 4 = 20.",
        "(1 + 0.018125)^20 = 1.4323.",
        "Maturity = ₹1,00,000 × 1.4323 = ₹1,43,230.",
      ],
      result: "At maturity, the depositor receives ₹1,43,230.",
    },
    faqs: [
      {
        question: "Is FD interest taxable?",
        answer: "Yes, FD interest is added to your total income and taxed at your income tax slab rate. Banks deduct TDS at 10% if interest exceeds ₹40,000 (₹50,000 for senior citizens).",
      },
    ],
  },
  relatedSlugs: ["rd-calculator", "ppf-calculator", "compound-interest-calculator"],
};

// 5. RD Calculator (Recurring Deposit)
export const rdCalculatorConfig: CalculatorEngineConfig = {
  id: "rd-calculator",
  slug: "rd-calculator",
  name: "RD Calculator (Recurring Deposit)",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "monthlyDeposit",
      label: "Monthly Deposit Amount",
      type: "currency",
      defaultValue: 5000,
      min: 500,
      max: 500000,
      step: 500,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 7,
      min: 3,
      max: 12,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "tenureYears",
      label: "Tenure",
      type: "slider",
      defaultValue: 3,
      min: 1,
      max: 10,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.monthlyDeposit || 0);
    const r = Math.max(0, inputs.interestRate || 0) / 100;
    const years = Math.max(1, inputs.tenureYears || 1);
    const totalMonths = years * 12;

    // Standard Indian banking quarterly compounded RD formula:
    // Each installment earns compound interest for the remaining quarters
    let maturityValue = 0;
    for (let m = 1; m <= totalMonths; m++) {
      const remainingQuarters = (totalMonths - m + 1) / 3;
      maturityValue += P * Math.pow(1 + r / 4, remainingQuarters);
    }

    const totalInvested = P * totalMonths;
    const finalMaturity = Math.round(maturityValue);
    const interest = Math.max(0, finalMaturity - totalInvested);

    return {
      results: [
        { id: "invested", label: "Total Invested", value: totalInvested, formattedValue: formatINR(totalInvested) },
        { id: "interest", label: "Interest Earned", value: interest, formattedValue: formatINR(interest), variant: "success" },
        { id: "maturity", label: "Total Maturity Value", value: finalMaturity, formattedValue: formatINR(finalMaturity), isHighlighted: true, variant: "primary" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate bank Recurring Deposit (RD) maturity proceeds with regular monthly savings.",
    whatIsIt: "A Recurring Deposit allows individuals to deposit a fixed amount every month into a bank account earning quarterly compounded interest.",
    whyUseIt: "Ideal for disciplined monthly savings with guaranteed returns and zero market risk.",
    howItWorks: "Each monthly deposit accrues quarterly compound interest for the remaining duration of the tenure.",
    formula: {
      title: "Bank RD Compound Formula",
      expression: "M = Σ [ P × (1 + r/4)^(4 × t_i) ]",
      variables: [
        { symbol: "M", name: "Maturity Value", description: "Total payout after tenure." },
        { symbol: "P", name: "Monthly Deposit", description: "Fixed sum deposited each month." },
        { symbol: "r", name: "Annual Interest Rate", description: "Expressed as a decimal." },
      ],
    },
    example: {
      title: "RD Example",
      scenario: "Depositing ₹5,000 every month for 3 years at 7% p.a.",
      inputs: { "Monthly (P)": "₹5,000", "Rate (r)": "7%", "Tenure": "3 Years (36 Months)" },
      calculationSteps: [
        "Total Deposited = ₹5,000 × 36 = ₹1,80,000.",
        "Total Interest Earned = ~₹20,950.",
        "Maturity Value = ₹2,00,950.",
      ],
      result: "Total maturity value is approximately ₹2,00,950.",
    },
    faqs: [
      {
        question: "Can I withdraw RD prematurely?",
        answer: "Yes, but banks typically deduct a premature penalty (typically 0.5% to 1% off the card interest rate).",
      },
    ],
  },
  relatedSlugs: ["fd-calculator", "sip-calculator"],
};

// 6. PPF Calculator
export const ppfCalculatorConfig: CalculatorEngineConfig = {
  id: "ppf-calculator",
  slug: "ppf-calculator",
  name: "PPF Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "yearlyDeposit",
      label: "Yearly Investment Amount",
      type: "currency",
      defaultValue: 150000,
      min: 500,
      max: 150000,
      step: 5000,
      prefix: "₹",
      helpText: "Maximum legal limit under Section 80C is ₹1,50,000 per financial year.",
    },
    {
      name: "interestRate",
      label: "Government Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 7.1,
      min: 6,
      max: 10,
      step: 0.1,
      suffix: "%",
      helpText: "Current sovereign rate set by the Ministry of Finance.",
    },
    {
      name: "tenureYears",
      label: "Tenure",
      type: "slider",
      defaultValue: 15,
      min: 15,
      max: 30,
      step: 5,
      suffix: "Years",
      helpText: "PPF has a mandatory 15-year lock-in, extendable in 5-year blocks.",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Math.min(150000, inputs.yearlyDeposit || 0));
    const r = Math.max(0, inputs.interestRate || 0) / 100;
    const years = Math.max(15, inputs.tenureYears || 15);

    let balance = 0;
    const schedule = [];
    let totalInvested = 0;

    for (let y = 1; y <= years; y++) {
      totalInvested += P;
      const interestEarned = Math.round((balance + P) * r);
      balance = balance + P + interestEarned;
      schedule.push({
        year: y,
        invested: totalInvested,
        interest: interestEarned,
        balance: balance,
      });
    }

    return {
      results: [
        { id: "invested", label: "Total Invested Capital", value: totalInvested, formattedValue: formatINR(totalInvested) },
        { id: "interest", label: "Total Tax-Free Interest", value: balance - totalInvested, formattedValue: formatINR(balance - totalInvested), variant: "success" },
        { id: "maturity", label: "Maturity Corpus (Tax-Free)", value: balance, formattedValue: formatINR(balance), isHighlighted: true, variant: "primary" },
      ],
      chart: {
        type: "area",
        title: "PPF Tax-Free Growth",
        data: schedule.map((s) => ({ name: `Yr ${s.year}`, Invested: s.invested, Balance: s.balance })),
        xKey: "name",
        series: [
          { key: "Invested", name: "Capital Invested", color: "#64748b" },
          { key: "Balance", name: "Tax-Free Corpus", color: "#059669" },
        ],
      },
      breakdown: {
        headers: ["Year", "Total Deposited", "Yearly Interest", "Closing Balance"],
        rows: schedule.map((s) => [`Year ${s.year}`, formatINR(s.invested), formatINR(s.interest), formatINR(s.balance)]),
      },
    };
  },
  content: {
    shortDescription: "Calculate 15-year Public Provident Fund (PPF) returns, annual tax savings, and compounding maturity balance.",
    whatIsIt: "PPF is a government-backed long-term savings scheme offering EEE (Exempt-Exempt-Exempt) tax status.",
    whyUseIt: "Guaranteed sovereign safety, Section 80C tax deduction, and 100% tax-free interest and maturity proceeds.",
    howItWorks: "Interest is calculated monthly on the lowest balance between the 5th and last day of each month, compounded annually on March 31st.",
    formula: {
      title: "PPF Compounding Formula",
      expression: "F = P × [ ( (1 + r)^n - 1 ) / r ] × (1 + r)",
      variables: [
        { symbol: "F", name: "Maturity Sum", description: "Total tax-free corpus." },
        { symbol: "P", name: "Annual Deposit", description: "Deposit made before 5th of April each year." },
        { symbol: "r", name: "Government Rate", description: "Annual sovereign PPF rate." },
      ],
    },
    example: {
      title: "PPF 15-Year Example",
      scenario: "Depositing the full ₹1,50,000 annual limit at 7.1% interest for 15 years.",
      inputs: { "Annual Deposit": "₹1,50,000", "Rate": "7.1%", "Tenure": "15 Years" },
      calculationSteps: [
        "Total Principal Invested = ₹1,50,000 × 15 = ₹22,50,000.",
        "Total Interest Accrued = ₹18,18,209.",
        "Maturity Corpus = ₹40,68,209.",
      ],
      result: "Investor receives ₹40.68 Lakhs completely tax-free.",
    },
    faqs: [
      {
        question: "Why should I deposit before the 5th of the month in PPF?",
        answer: "Interest is calculated on the minimum balance between the 5th and end of the month. Depositing on or before the 5th ensures interest for that entire month.",
      },
    ],
  },
  relatedSlugs: ["sip-calculator", "fd-calculator"],
};

// 7. CAGR Calculator
export const cagrCalculatorConfig: CalculatorEngineConfig = {
  id: "cagr-calculator",
  slug: "cagr-calculator",
  name: "CAGR Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: [
    {
      name: "beginningValue",
      label: "Initial Investment Value",
      type: "currency",
      defaultValue: 50000,
      min: 100,
      max: 100000000,
      step: 1000,
      prefix: "₹",
    },
    {
      name: "endingValue",
      label: "Final / Current Value",
      type: "currency",
      defaultValue: 150000,
      min: 100,
      max: 100000000,
      step: 1000,
      prefix: "₹",
    },
    {
      name: "timePeriodYears",
      label: "Duration in Years",
      type: "slider",
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 0.5,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const BV = Math.max(1, inputs.beginningValue || 1);
    const EV = Math.max(1, inputs.endingValue || 1);
    const n = Math.max(0.1, inputs.timePeriodYears || 1);

    const cagr = (Math.pow(EV / BV, 1 / n) - 1) * 100;
    const absoluteReturn = ((EV - BV) / BV) * 100;

    return {
      results: [
        { id: "cagr", label: "CAGR (Annual Growth)", value: cagr, formattedValue: formatPercentage(cagr), isHighlighted: true, variant: "primary" },
        { id: "absolute", label: "Total Absolute Return", value: absoluteReturn, formattedValue: formatPercentage(absoluteReturn), variant: "success" },
        { id: "growth", label: "Total Value Increase", value: EV - BV, formattedValue: formatINR(EV - BV) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate Compound Annual Growth Rate (CAGR) for stocks, real estate, and investment portfolios.",
    whatIsIt: "CAGR represents the mean annual growth rate of an investment over a specified period longer than one year.",
    whyUseIt: "It smooths out the effects of volatile annual swings to provide a consistent annualized comparison metric.",
    howItWorks: "CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1.",
    formula: {
      title: "CAGR Formula",
      expression: "CAGR = (EV / BV)^(1 / n) - 1",
      variables: [
        { symbol: "EV", name: "Ending Value", description: "Portfolio value at end of period." },
        { symbol: "BV", name: "Beginning Value", description: "Initial invested value." },
        { symbol: "n", name: "Number of Years", description: "Holding period in years." },
      ],
    },
    example: {
      title: "Stock CAGR Example",
      scenario: "An equity portfolio of ₹50,000 grows to ₹1,50,000 over 5 years.",
      inputs: { "Initial (BV)": "₹50,000", "Final (EV)": "₹1,50,000", "Years (n)": "5" },
      calculationSteps: [
        "Ratio = 1,50,000 / 50,000 = 3.0.",
        "3.0^(1 / 5) = 3.0^0.2 = 1.2457.",
        "CAGR = 1.2457 - 1 = 0.2457 (24.57% p.a.).",
      ],
      result: "The investment compounded at an annual rate of 24.57%.",
    },
    faqs: [
      {
        question: "When should I use CAGR instead of absolute returns?",
        answer: "Always use CAGR when comparing investments held over different multi-year durations to see true annualized performance.",
      },
    ],
  },
  relatedSlugs: ["sip-calculator", "lumpsum-calculator"],
};

