import { CalculatorEngineConfig } from "../engine/types";
import { formatINR, formatPercentage } from "@/lib/formatters";

// Standard reducing balance EMI helper
export function computeEMI(principal: number, annualRate: number, tenureYears: number) {
  const P = Math.max(0, principal);
  const r = Math.max(0, annualRate) / (12 * 100);
  const n = Math.max(1, tenureYears * 12);

  if (r === 0) {
    const emi = Math.round(P / n);
    return { emi, totalPayment: P, totalInterest: 0, n };
  }

  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - P);

  return { emi, totalPayment, totalInterest, n };
}

// 1. Home Loan EMI Calculator
export const homeLoanEmiCalculatorConfig: CalculatorEngineConfig = {
  id: "home-loan-emi-calculator",
  slug: "home-loan-emi-calculator",
  name: "Home Loan EMI Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "loanAmount",
      label: "Home Loan Amount",
      type: "currency",
      defaultValue: 4000000,
      min: 100000,
      max: 50000000,
      step: 50000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 8.5,
      min: 5,
      max: 18,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "tenureYears",
      label: "Loan Tenure",
      type: "slider",
      defaultValue: 20,
      min: 1,
      max: 30,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.loanAmount || 0);
    const R = Math.max(0, inputs.interestRate || 0);
    const T = Math.max(1, inputs.tenureYears || 1);

    const { emi, totalPayment, totalInterest, n } = computeEMI(P, R, T);
    const monthlyRate = R / (12 * 100);

    // Generate yearly schedule
    let balance = P;
    const schedule = [];
    for (let y = 1; y <= T; y++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      for (let m = 1; m <= 12; m++) {
        const intPayment = balance * monthlyRate;
        const prinPayment = emi - intPayment;
        yearlyInterest += intPayment;
        yearlyPrincipal += prinPayment;
        balance = Math.max(0, balance - prinPayment);
      }
      schedule.push({
        year: y,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        balance: Math.round(balance),
      });
    }

    return {
      results: [
        { id: "emi", label: "Monthly EMI", value: emi, formattedValue: formatINR(emi), isHighlighted: true, variant: "primary" },
        { id: "interest", label: "Total Interest Payable", value: totalInterest, formattedValue: formatINR(totalInterest), variant: "warning" },
        { id: "total", label: "Total Amount (Principal + Interest)", value: totalPayment, formattedValue: formatINR(totalPayment) },
      ],
      chart: {
        type: "area",
        title: "Loan Amortization Over Time",
        data: schedule.map((s) => ({
          name: `Yr ${s.year}`,
          "Remaining Principal": s.balance,
          "Principal Repaid": P - s.balance,
        })),
        xKey: "name",
        series: [
          { key: "Remaining Principal", name: "Outstanding Loan", color: "#ef4444" },
          { key: "Principal Repaid", name: "Principal Repaid", color: "#10b981" },
        ],
      },
      breakdown: {
        headers: ["Year", "Principal Repaid", "Interest Paid", "Outstanding Balance"],
        rows: schedule.map((s) => [
          `Year ${s.year}`,
          formatINR(s.principalPaid),
          formatINR(s.interestPaid),
          formatINR(s.balance),
        ]),
      },
    };
  },
  content: {
    shortDescription: "Calculate monthly Home Loan EMI, total interest liability, and view full yearly amortization schedule.",
    whatIsIt: "A Home Loan EMI Calculator determines your exact monthly repayment installment towards your mortgage.",
    whyUseIt: "Allows homebuyers to plan property budgets, compare bank interest quotes, and evaluate affordability before applying.",
    howItWorks: "Uses the reducing balance formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1].",
    formula: {
      title: "Reducing Balance EMI Formula",
      expression: "EMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]",
      variables: [
        { symbol: "EMI", name: "Monthly Installment", description: "Fixed sum paid each month." },
        { symbol: "P", name: "Loan Principal", description: "Sanctioned loan amount." },
        { symbol: "r", name: "Monthly Interest Rate", description: "Annual rate / 12 / 100." },
        { symbol: "n", name: "Tenure in Months", description: "Years × 12." },
      ],
    },
    example: {
      title: "Home Loan Example",
      scenario: "Borrowing ₹40 Lakhs at 8.5% interest for a 20-year term.",
      inputs: { "Principal": "₹40,00,000", "Rate": "8.5%", "Tenure": "20 Years (240 Months)" },
      calculationSteps: [
        "Monthly rate r = 8.5 / (12 × 100) = 0.007083.",
        "(1+r)^240 = 5.3725.",
        "Monthly EMI = ₹34,713.",
        "Total Repayment = ₹34,713 × 240 = ₹83,31,120.",
        "Total Interest Paid = ₹83,31,120 - ₹40,00,000 = ₹43,31,120.",
      ],
      result: "Monthly EMI is ₹34,713 and total interest paid over 20 years is ₹43.31 Lakh.",
    },
    faqs: [
      {
        question: "Can I claim tax deductions on home loan EMI?",
        answer: "Yes, under Indian Income Tax: Principal repayment is eligible under Section 80C up to ₹1.5 Lakh, and Interest payment is deductible under Section 24(b) up to ₹2 Lakh per financial year (Old Tax Regime).",
      },
    ],
  },
  relatedSlugs: ["car-loan-emi-calculator", "personal-loan-emi-calculator", "loan-prepayment-calculator"],
};

// 2. Car Loan EMI Calculator
export const carLoanEmiCalculatorConfig: CalculatorEngineConfig = {
  id: "car-loan-emi-calculator",
  slug: "car-loan-emi-calculator",
  name: "Car Loan EMI Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "loanAmount",
      label: "Vehicle Loan Amount",
      type: "currency",
      defaultValue: 800000,
      min: 50000,
      max: 10000000,
      step: 25000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Car Loan Rate (p.a.)",
      type: "percentage",
      defaultValue: 9.0,
      min: 6,
      max: 18,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "tenureYears",
      label: "Loan Tenure",
      type: "slider",
      defaultValue: 5,
      min: 1,
      max: 8,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.loanAmount || 0);
    const R = Math.max(0, inputs.interestRate || 0);
    const T = Math.max(1, inputs.tenureYears || 1);

    const { emi, totalPayment, totalInterest } = computeEMI(P, R, T);

    return {
      results: [
        { id: "emi", label: "Monthly Car EMI", value: emi, formattedValue: formatINR(emi), isHighlighted: true, variant: "primary" },
        { id: "interest", label: "Total Interest", value: totalInterest, formattedValue: formatINR(totalInterest), variant: "warning" },
        { id: "total", label: "Total Cost of Vehicle Loan", value: totalPayment, formattedValue: formatINR(totalPayment) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate auto loan EMI, monthly installment, and total finance cost for new and used cars.",
    whatIsIt: "A tool to plan car purchases and monthly automobile financing.",
    whyUseIt: "Prevents overstretching monthly budgets when negotiating vehicle on-road prices.",
    howItWorks: "Applies the standard reducing balance loan formula.",
    formula: {
      title: "Car Loan Formula",
      expression: "EMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]",
      variables: [
        { symbol: "P", name: "Loan Amount", description: "On-road vehicle price minus down payment." },
        { symbol: "r", name: "Monthly Rate", description: "Annual interest rate / 12 / 100." },
        { symbol: "n", name: "Tenure", description: "Number of monthly installments." },
      ],
    },
    example: {
      title: "Car Loan Example",
      scenario: "Financing ₹8,00,000 for a car at 9% for 5 years.",
      inputs: { "Principal": "₹8,00,000", "Rate": "9%", "Tenure": "5 Years" },
      calculationSteps: [
        "Monthly EMI = ₹16,607.",
        "Total Payment = ₹9,96,396.",
        "Total Interest Paid = ₹1,96,396.",
      ],
      result: "Monthly installment is ₹16,607.",
    },
    faqs: [
      {
        question: "Is it better to pay a higher down payment on a car?",
        answer: "Yes, because automobiles are depreciating assets. A larger down payment reduces monthly EMI and total interest paid.",
      },
    ],
  },
  relatedSlugs: ["home-loan-emi-calculator", "personal-loan-emi-calculator"],
};

// 3. Personal Loan EMI Calculator
export const personalLoanEmiCalculatorConfig: CalculatorEngineConfig = {
  id: "personal-loan-emi-calculator",
  slug: "personal-loan-emi-calculator",
  name: "Personal Loan EMI Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "loanAmount",
      label: "Personal Loan Amount",
      type: "currency",
      defaultValue: 300000,
      min: 20000,
      max: 5000000,
      step: 10000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Personal Loan Rate (p.a.)",
      type: "percentage",
      defaultValue: 12.5,
      min: 9,
      max: 28,
      step: 0.25,
      suffix: "%",
    },
    {
      name: "tenureYears",
      label: "Tenure",
      type: "slider",
      defaultValue: 3,
      min: 1,
      max: 5,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.loanAmount || 0);
    const R = Math.max(0, inputs.interestRate || 0);
    const T = Math.max(1, inputs.tenureYears || 1);

    const { emi, totalPayment, totalInterest } = computeEMI(P, R, T);

    return {
      results: [
        { id: "emi", label: "Monthly Personal EMI", value: emi, formattedValue: formatINR(emi), isHighlighted: true, variant: "primary" },
        { id: "interest", label: "Total Interest Paid", value: totalInterest, formattedValue: formatINR(totalInterest), variant: "warning" },
        { id: "total", label: "Total Repayment", value: totalPayment, formattedValue: formatINR(totalPayment) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate monthly installments and total interest on unsecured personal loans.",
    whatIsIt: "Calculates borrowing costs for unsecured emergency, medical, wedding, or travel personal loans.",
    whyUseIt: "Helps you assess whether personal loan payments fit comfortably within your monthly salary.",
    howItWorks: "Applies reducing balance interest calculations.",
    formula: {
      title: "Personal Loan Formula",
      expression: "EMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]",
      variables: [
        { symbol: "P", name: "Principal", description: "Loan disbursed." },
        { symbol: "r", name: "Rate", description: "Monthly rate." },
      ],
    },
    example: {
      title: "Personal Loan Example",
      scenario: "Taking a ₹3,00,000 personal loan at 12.5% for 3 years.",
      inputs: { "Principal": "₹3,00,000", "Rate": "12.5%", "Tenure": "3 Years" },
      calculationSteps: [
        "Monthly EMI = ₹10,037.",
        "Total Repayment = ₹3,61,332.",
        "Total Interest = ₹61,332.",
      ],
      result: "Monthly EMI is ₹10,037.",
    },
    faqs: [
      {
        question: "Can I prepay a personal loan?",
        answer: "Yes, though many lenders charge foreclosure fees (1% to 4%) within the first 6-12 months.",
      },
    ],
  },
  relatedSlugs: ["home-loan-emi-calculator", "loan-eligibility-calculator"],
};

// 4. Loan Prepayment Calculator
export const loanPrepaymentCalculatorConfig: CalculatorEngineConfig = {
  id: "loan-prepayment-calculator",
  slug: "loan-prepayment-calculator",
  name: "Loan Prepayment Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "outstandingLoan",
      label: "Outstanding Loan Balance",
      type: "currency",
      defaultValue: 3000000,
      min: 100000,
      max: 50000000,
      step: 50000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Current Interest Rate",
      type: "percentage",
      defaultValue: 8.5,
      min: 5,
      max: 20,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "remainingTenureYears",
      label: "Remaining Tenure",
      type: "slider",
      defaultValue: 15,
      min: 1,
      max: 30,
      step: 1,
      suffix: "Years",
    },
    {
      name: "prepaymentAmount",
      label: "One-Time Part Prepayment",
      type: "currency",
      defaultValue: 300000,
      min: 10000,
      max: 10000000,
      step: 25000,
      prefix: "₹",
      helpText: "Lump sum amount you plan to prepay right now.",
    },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, inputs.outstandingLoan || 0);
    const R = Math.max(0, inputs.interestRate || 0);
    const T = Math.max(1, inputs.remainingTenureYears || 1);
    const prepay = Math.max(0, Math.min(P, inputs.prepaymentAmount || 0));

    // Without prepayment
    const original = computeEMI(P, R, T);
    // With prepayment (keeping original EMI, reducing tenure)
    const newPrincipal = P - prepay;
    const r = R / (12 * 100);

    let newMonths = 0;
    if (r > 0 && original.emi > newPrincipal * r) {
      newMonths = Math.ceil(
        Math.log(original.emi / (original.emi - newPrincipal * r)) / Math.log(1 + r)
      );
    } else {
      newMonths = Math.ceil(newPrincipal / original.emi);
    }

    const monthsSaved = Math.max(0, original.n - newMonths);
    const newTotalPayment = original.emi * newMonths + prepay;
    const interestSaved = Math.max(0, original.totalPayment - newTotalPayment);

    return {
      results: [
        { id: "savedInterest", label: "Total Interest Saved", value: interestSaved, formattedValue: formatINR(interestSaved), isHighlighted: true, variant: "success" },
        { id: "monthsSaved", label: "Tenure Reduced By", value: `${Math.floor(monthsSaved / 12)} Yrs ${monthsSaved % 12} Mos`, formattedValue: `${Math.floor(monthsSaved / 12)} Yrs ${monthsSaved % 12} Mos`, variant: "primary" },
        { id: "newTenure", label: "New Remaining Tenure", value: `${Math.floor(newMonths / 12)} Yrs ${newMonths % 12} Mos`, formattedValue: `${Math.floor(newMonths / 12)} Yrs ${newMonths % 12} Mos` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate how much interest and tenure you save by prepaying part of your loan.",
    whatIsIt: "A tool that shows the immense interest savings achieved by making lump sum part-prepayments.",
    whyUseIt: "Because early EMI payments are mostly interest, early prepayments directly reduce the loan principal.",
    howItWorks: "Recalculates the remaining amortization schedule after deducting the prepayment from principal.",
    formula: {
      title: "Prepayment Reduction Formula",
      expression: "New Principal = Original Principal - Prepayment",
      variables: [
        { symbol: "New Principal", name: "Reduced Balance", description: "Principal remaining after lump sum payment." },
      ],
    },
    example: {
      title: "Prepayment Savings Example",
      scenario: "Prepaying ₹3 Lakh on a ₹30 Lakh loan at 8.5% with 15 years remaining.",
      inputs: { "Outstanding": "₹30,00,000", "Rate": "8.5%", "Prepayment": "₹3,00,000" },
      calculationSteps: [
        "Prepaying ₹3 Lakh cuts nearly 3 years off your mortgage.",
        "Total interest saved exceeds ₹4.5 Lakhs.",
      ],
      result: "You save ₹4.5 Lakhs in interest and shorten tenure by nearly 3 years.",
    },
    faqs: [
      {
        question: "Is there any penalty for prepaying a floating rate home loan?",
        answer: "As per Reserve Bank of India (RBI) regulations, banks and NBFCs cannot charge any prepayment penalty on floating-rate home loans given to individual borrowers.",
      },
    ],
  },
  relatedSlugs: ["home-loan-emi-calculator", "car-loan-emi-calculator"],
};

// 5. Loan Eligibility Calculator
export const loanEligibilityCalculatorConfig: CalculatorEngineConfig = {
  id: "loan-eligibility-calculator",
  slug: "loan-eligibility-calculator",
  name: "Loan Eligibility Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "monthlySalary",
      label: "Net Monthly Income",
      type: "currency",
      defaultValue: 75000,
      min: 10000,
      max: 2000000,
      step: 5000,
      prefix: "₹",
      helpText: "Take-home monthly salary after taxes.",
    },
    {
      name: "existingEmis",
      label: "Existing Monthly EMIs",
      type: "currency",
      defaultValue: 10000,
      min: 0,
      max: 1000000,
      step: 2000,
      prefix: "₹",
    },
    {
      name: "interestRate",
      label: "Expected Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 8.5,
      min: 5,
      max: 18,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "tenureYears",
      label: "Desired Tenure",
      type: "slider",
      defaultValue: 20,
      min: 1,
      max: 30,
      step: 1,
      suffix: "Years",
    },
  ],
  calculate: (inputs) => {
    const salary = Math.max(0, inputs.monthlySalary || 0);
    const existing = Math.max(0, inputs.existingEmis || 0);
    const R = Math.max(0, inputs.interestRate || 0);
    const T = Math.max(1, inputs.tenureYears || 1);

    // Standard bank FOIR (Fixed Obligation to Income Ratio) is 50%
    const maxAllowedEmi = Math.max(0, salary * 0.5 - existing);
    const r = R / (12 * 100);
    const n = T * 12;

    let maxLoan = 0;
    if (r > 0) {
      maxLoan = Math.round(
        (maxAllowedEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
      );
    } else {
      maxLoan = maxAllowedEmi * n;
    }

    return {
      results: [
        { id: "maxLoan", label: "Maximum Loan Eligibility", value: maxLoan, formattedValue: formatINR(maxLoan), isHighlighted: true, variant: "primary" },
        { id: "maxEmi", label: "Max Affordable EMI (50% FOIR)", value: maxAllowedEmi, formattedValue: formatINR(maxAllowedEmi), variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate how much bank loan you qualify for based on your net income and existing liabilities.",
    whatIsIt: "Estimates the maximum loan amount banks will disburse based on standard FOIR ratios.",
    whyUseIt: "Prevents loan application rejections by checking eligibility in advance.",
    howItWorks: "Banks cap total monthly liabilities at 40-50% of net income.",
    formula: {
      title: "FOIR Eligibility Formula",
      expression: "Max EMI = (Net Salary × 50%) - Existing EMIs",
      variables: [
        { symbol: "FOIR", name: "Fixed Obligation Ratio", description: "Typically 50% for salaried individuals." },
      ],
    },
    example: {
      title: "Eligibility Scenario",
      scenario: "Salary of ₹75,000/mo with ₹10,000 existing EMI at 8.5% for 20 years.",
      inputs: { "Salary": "₹75,000", "Existing": "₹10,000", "Rate": "8.5%" },
      calculationSteps: [
        "Allowed Total EMI = ₹75,000 × 50% = ₹37,500.",
        "Available EMI Capacity = ₹37,500 - ₹10,000 = ₹27,500.",
        "Eligible Loan = ₹31.68 Lakhs.",
      ],
      result: "Maximum eligible loan is ~₹31.68 Lakh.",
    },
    faqs: [
      {
        question: "How can I increase my loan eligibility?",
        answer: "You can add a co-borrower (spouse or parent) to combine incomes, pay off existing credit cards/EMIs, or choose a longer loan tenure.",
      },
    ],
  },
  relatedSlugs: ["home-loan-emi-calculator", "personal-loan-emi-calculator"],
};

// 6. Credit Card Interest Calculator
export const creditCardInterestCalculatorConfig: CalculatorEngineConfig = {
  id: "credit-card-interest-calculator",
  slug: "credit-card-interest-calculator",
  name: "Credit Card Interest Calculator",
  category: "loans",
  categoryName: "Loans & Banking",
  inputs: [
    {
      name: "outstandingBalance",
      label: "Credit Card Balance",
      type: "currency",
      defaultValue: 50000,
      min: 1000,
      max: 1000000,
      step: 1000,
      prefix: "₹",
    },
    {
      name: "apr",
      label: "Annual Interest Rate (APR)",
      type: "percentage",
      defaultValue: 42,
      min: 12,
      max: 48,
      step: 0.5,
      suffix: "%",
      helpText: "Most credit cards charge 3% to 3.5% per month (36% to 42% APR).",
    },
    {
      name: "monthlyPayment",
      label: "Planned Monthly Payment",
      type: "currency",
      defaultValue: 3000,
      min: 500,
      max: 100000,
      step: 500,
      prefix: "₹",
    },
  ],
  calculate: (inputs) => {
    const balance = Math.max(0, inputs.outstandingBalance || 0);
    const apr = Math.max(1, inputs.apr || 1);
    const payment = Math.max(100, inputs.monthlyPayment || 100);

    const monthlyRate = apr / (12 * 100);
    const minInterestFirstMonth = balance * monthlyRate;

    if (payment <= minInterestFirstMonth) {
      return {
        results: [
          { id: "months", label: "Time to Pay Off", value: "Never", formattedValue: "Debt Trap (Never)", variant: "warning" },
          { id: "warning", label: "Status", value: "Payment too low", formattedValue: "Payment doesn't cover interest" },
        ],
      };
    }

    let remBalance = balance;
    let months = 0;
    let totalInterest = 0;

    while (remBalance > 0 && months < 360) {
      months++;
      const interest = remBalance * monthlyRate;
      totalInterest += interest;
      const principalPaid = payment - interest;
      remBalance = Math.max(0, remBalance - principalPaid);
    }

    return {
      results: [
        { id: "months", label: "Months to Debt Freedom", value: months, formattedValue: `${months} Months (${(months / 12).toFixed(1)} Years)`, isHighlighted: true, variant: "primary" },
        { id: "interest", label: "Total Interest Paid", value: Math.round(totalInterest), formattedValue: formatINR(Math.round(totalInterest)), variant: "warning" },
        { id: "total", label: "Total Paid", value: Math.round(balance + totalInterest), formattedValue: formatINR(Math.round(balance + totalInterest)) },
      ],
    };
  },
  content: {
    shortDescription: "See the true cost of revolving credit card debt and paying only minimum dues.",
    whatIsIt: "Calculates total interest and payoff duration for credit card balances revolving at 36-42% APR.",
    whyUseIt: "Reveals how paying only minimum amount due can trap consumers in debt for decades.",
    howItWorks: "Simulates month-by-month interest accrual and balance amortization.",
    formula: {
      title: "Credit Card Daily / Monthly Interest",
      expression: "Monthly Interest = Balance × (APR / 1200)",
      variables: [
        { symbol: "APR", name: "Annual Percentage Rate", description: "Nominal interest rate per year." },
      ],
    },
    example: {
      title: "Credit Card Debt Trap Example",
      scenario: "Revolving ₹50,000 at 42% APR paying only ₹3,000 per month.",
      inputs: { "Balance": "₹50,000", "APR": "42%", "Payment": "₹3,000/mo" },
      calculationSteps: [
        "First month interest alone is ₹1,750.",
        "Takes over 24 months to pay off.",
        "Total interest paid exceeds ₹25,000.",
      ],
      result: "You pay an extra ₹25,000+ in pure interest.",
    },
    faqs: [
      {
        question: "What happens if I pay only the minimum due?",
        answer: "Paying only the minimum due avoids late payment fees but allows interest to compound at 3.5% monthly on your entire outstanding balance.",
      },
    ],
  },
  relatedSlugs: ["personal-loan-emi-calculator", "home-loan-emi-calculator"],
};

