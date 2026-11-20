import { CalculatorCategory, CalculatorDefinition } from "./types";

export const CATEGORIES: CalculatorCategory[] = [
  {
    id: "finance",
    name: "Finance & Investment",
    slug: "finance",
    description: "SIP, Lumpsum, Mutual Funds, PPF, FD, RD, and Compound Interest calculators.",
    iconName: "TrendingUp",
    calculatorCount: 15,
  },
  {
    id: "loans",
    name: "Loans & Banking",
    slug: "loans",
    description: "Home loan EMI, Car loan, Personal loan, and Amortization schedule calculators.",
    iconName: "Landmark",
    calculatorCount: 10,
  },
  {
    id: "health",
    name: "Healthcare & Fitness",
    slug: "health",
    description: "BMI, BMR, TDEE, Calorie, Body Fat, and Ideal Weight calculators.",
    iconName: "HeartPulse",
    calculatorCount: 10,
  },
  {
    id: "math",
    name: "Mathematics",
    slug: "math",
    description: "Percentage, Scientific, Fraction, Average, Square Root, and Ratio calculators.",
    iconName: "Percent",
    calculatorCount: 12,
  },
  {
    id: "business",
    name: "Business & Tax",
    slug: "business",
    description: "GST, Income Tax, Salary Breakup, Profit Margin, and Break-even calculators.",
    iconName: "Briefcase",
    calculatorCount: 10,
  },
  {
    id: "construction",
    name: "Home & Construction",
    slug: "construction",
    description: "Construction cost, Carpet area, Paint, Tiles, Cement, and Brick calculators.",
    iconName: "Building2",
    calculatorCount: 10,
  },
  {
    id: "utilities",
    name: "Conversion & Utilities",
    slug: "utilities",
    description: "Length, Weight, Temperature, Area, Speed, and Volume unit converters.",
    iconName: "Scale",
    calculatorCount: 10,
  },
  {
    id: "technology",
    name: "Technology & Programming",
    slug: "technology",
    description: "Subnet masks, Binary/Hex conversion, Timestamp, Base64, and Passwords.",
    iconName: "Binary",
    calculatorCount: 10,
  },
  {
    id: "education",
    name: "Education & Student",
    slug: "education",
    description: "CGPA to Percentage, GPA, Exam marks, Grade, and Attendance calculators.",
    iconName: "GraduationCap",
    calculatorCount: 8,
  },
  {
    id: "automotive",
    name: "Automotive & Travel",
    slug: "automotive",
    description: "Fuel cost, Vehicle mileage, Trip cost, EV charging, and Depreciation.",
    iconName: "Car",
    calculatorCount: 8,
  },
];

export const CALCULATOR_REGISTRY: CalculatorDefinition[] = [
  // Finance
  {
    id: "sip-calculator",
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    categoryName: "Finance & Investment",
    description: "Calculate expected returns on your monthly Systematic Investment Plan (SIP) investments.",
    keywords: ["sip", "mutual fund", "sip return", "monthly investment", "systematic investment plan"],
    isPopular: true,
    isTrending: true,
    iconName: "TrendingUp",
  },
  {
    id: "lumpsum-calculator",
    slug: "lumpsum-calculator",
    name: "Lumpsum Calculator",
    category: "finance",
    categoryName: "Finance & Investment",
    description: "Calculate maturity returns on one-time mutual fund lump sum investments.",
    keywords: ["lumpsum", "mutual fund", "one time investment", "wealth calculator"],
    isPopular: true,
    isTrending: false,
    iconName: "Coins",
  },
  {
    id: "compound-interest-calculator",
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "finance",
    categoryName: "Finance & Investment",
    description: "Estimate the powerful compounding growth of your savings and investments over time.",
    keywords: ["compound interest", "interest formula", "ci calculator", "wealth compounding"],
    isPopular: true,
    isTrending: true,
    iconName: "LineChart",
  },
  {
    id: "ppf-calculator",
    slug: "ppf-calculator",
    name: "PPF Calculator",
    category: "finance",
    categoryName: "Finance & Investment",
    description: "Calculate maturity value, interest earned, and tax-free returns under Public Provident Fund.",
    keywords: ["ppf", "public provident fund", "tax saving", "government scheme"],
    isPopular: true,
    isTrending: false,
    iconName: "ShieldCheck",
  },
  {
    id: "cagr-calculator",
    slug: "cagr-calculator",
    name: "CAGR Calculator",
    category: "finance",
    categoryName: "Finance & Investment",
    description: "Calculate Compound Annual Growth Rate for your stocks, funds, or real estate.",
    keywords: ["cagr", "annual growth rate", "investment return", "stock cagr"],
    isPopular: false,
    isTrending: false,
    iconName: "BarChart3",
  },

  // Loans
  {
    id: "home-loan-emi-calculator",
    slug: "home-loan-emi-calculator",
    name: "Home Loan EMI Calculator",
    category: "loans",
    categoryName: "Loans & Banking",
    description: "Calculate your monthly Home Loan EMI, total interest payable, and amortization schedule.",
    keywords: ["home loan", "housing loan emi", "home loan interest", "emi calculator"],
    isPopular: true,
    isTrending: true,
    iconName: "Home",
  },
  {
    id: "car-loan-emi-calculator",
    slug: "car-loan-emi-calculator",
    name: "Car Loan EMI Calculator",
    category: "loans",
    categoryName: "Loans & Banking",
    description: "Plan your automobile purchase with exact monthly EMI calculations and interest breakdown.",
    keywords: ["car loan", "auto loan emi", "vehicle loan", "car finance"],
    isPopular: true,
    isTrending: false,
    iconName: "Car",
  },
  {
    id: "personal-loan-emi-calculator",
    slug: "personal-loan-emi-calculator",
    name: "Personal Loan EMI Calculator",
    category: "loans",
    categoryName: "Loans & Banking",
    description: "Calculate monthly installments, total interest, and effective borrowing cost for personal loans.",
    keywords: ["personal loan", "instant loan emi", "bank personal loan"],
    isPopular: false,
    isTrending: false,
    iconName: "CreditCard",
  },

  // Health
  {
    id: "bmi-calculator",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "health",
    categoryName: "Healthcare & Fitness",
    description: "Compute your Body Mass Index (BMI) and discover your healthy weight category.",
    keywords: ["bmi", "body mass index", "healthy weight", "obesity", "fitness"],
    isPopular: true,
    isTrending: true,
    iconName: "HeartPulse",
  },
  {
    id: "bmr-calculator",
    slug: "bmr-calculator",
    name: "BMR Calculator",
    category: "health",
    categoryName: "Healthcare & Fitness",
    description: "Determine your Basal Metabolic Rate and calories burned at rest.",
    keywords: ["bmr", "basal metabolic rate", "metabolism", "calories at rest"],
    isPopular: true,
    isTrending: false,
    iconName: "Flame",
  },
  {
    id: "calorie-calculator",
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    category: "health",
    categoryName: "Healthcare & Fitness",
    description: "Calculate daily calorie intake for weight loss, maintenance, or muscle gain.",
    keywords: ["calories", "tdee", "diet calories", "weight loss calories"],
    isPopular: false,
    isTrending: true,
    iconName: "Apple",
  },

  // Math
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "math",
    categoryName: "Mathematics",
    description: "Quickly compute percentage increase, decrease, differences, and fractions.",
    keywords: ["percentage", "percent", "percentage increase", "math calculator"],
    isPopular: true,
    isTrending: true,
    iconName: "Percent",
  },
  {
    id: "scientific-calculator",
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "math",
    categoryName: "Mathematics",
    description: "Full-featured scientific calculations: trigonometry, logarithms, powers, and roots.",
    keywords: ["scientific", "trigonometry", "sin cos tan", "logarithm"],
    isPopular: true,
    isTrending: false,
    iconName: "Calculator",
  },

  // Business & Tax
  {
    id: "gst-calculator",
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "business",
    categoryName: "Business & Tax",
    description: "Calculate Inclusive and Exclusive GST for 5%, 12%, 18%, and 28% tax slabs in India.",
    keywords: ["gst", "goods and services tax", "gst slab", "cgst sgst", "tax calculator"],
    isPopular: true,
    isTrending: true,
    iconName: "Receipt",
  },
  {
    id: "income-tax-calculator",
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "business",
    categoryName: "Business & Tax",
    description: "Compare New vs Old Tax Regime for Indian salaried individuals and calculate tax liability.",
    keywords: ["income tax", "new tax regime", "old tax regime", "tax slab fy 2024-25"],
    isPopular: true,
    isTrending: true,
    iconName: "FileText",
  },
  {
    id: "salary-calculator",
    slug: "salary-calculator",
    name: "Salary & In-Hand Calculator",
    category: "business",
    categoryName: "Business & Tax",
    description: "Calculate monthly take-home salary after PF, professional tax, and income tax deductions.",
    keywords: ["in hand salary", "ctc to in hand", "net salary", "take home pay"],
    isPopular: true,
    isTrending: false,
    iconName: "Wallet",
  },

  // Construction
  {
    id: "home-construction-cost-calculator",
    slug: "home-construction-cost-calculator",
    name: "Home Construction Cost Calculator",
    category: "construction",
    categoryName: "Home & Construction",
    description: "Estimate total building construction cost, material breakdown, and labour expenses.",
    keywords: ["construction cost", "house building cost", "sq ft rate", "cement steel cost"],
    isPopular: false,
    isTrending: true,
    iconName: "Building2",
  },

  // Utilities
  {
    id: "length-converter",
    slug: "length-converter",
    name: "Length Converter",
    category: "utilities",
    categoryName: "Conversion & Utilities",
    description: "Convert meters, feet, inches, kilometers, miles, centimeters, and yards instantly.",
    keywords: ["length converter", "meters to feet", "inches to cm", "distance conversion"],
    isPopular: false,
    isTrending: false,
    iconName: "Ruler",
  },

  // Education
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA to Percentage Calculator",
    category: "education",
    categoryName: "Education & Student",
    description: "Convert CGPA to percentage using standard university multipliers and grading scales.",
    keywords: ["cgpa to percentage", "cbse cgpa", "college gpa", "percentage converter"],
    isPopular: true,
    isTrending: true,
    iconName: "GraduationCap",
  },

  // Automotive
  {
    id: "fuel-cost-calculator",
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "automotive",
    categoryName: "Automotive & Travel",
    description: "Calculate fuel expenses for daily commutes and long road trips based on vehicle mileage.",
    keywords: ["fuel cost", "petrol cost", "diesel calculator", "trip fuel expense"],
    isPopular: false,
    isTrending: false,
    iconName: "Fuel",
  },
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATOR_REGISTRY.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorDefinition[] {
  return CALCULATOR_REGISTRY.filter((c) => c.category === category);
}

export function getPopularCalculators(): CalculatorDefinition[] {
  return CALCULATOR_REGISTRY.filter((c) => c.isPopular);
}

export function getTrendingCalculators(): CalculatorDefinition[] {
  return CALCULATOR_REGISTRY.filter((c) => c.isTrending);
}

export function getCategoryBySlug(slug: string): CalculatorCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

