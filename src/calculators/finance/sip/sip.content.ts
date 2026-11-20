import { CalculatorContent } from "../../engine/types";

export const sipContent: CalculatorContent = {
  shortDescription:
    "Calculate the future value of your monthly Systematic Investment Plan (SIP) in mutual funds. Visualize your investment growth with charts and year-by-year compounding breakdowns.",
  whatIsIt:
    "A Systematic Investment Plan (SIP) is an investment method offered by mutual funds that allows you to invest a fixed amount regularly (monthly or quarterly) into a chosen mutual fund scheme instead of making a large lump-sum investment.",
  whyUseIt:
    "SIP enables disciplined savings and leverages Rupee Cost Averaging — purchasing more mutual fund units when markets drop and fewer when markets peak. Furthermore, the mathematical miracle of compounding exponential interest means that even modest monthly contributions can grow into multi-lakh or multi-crore wealth over 10-20 years.",
  howItWorks:
    "Every month on your chosen date, the designated amount is debited from your bank account and invested in fund units at the prevailing Net Asset Value (NAV). As corporate earnings and equity indices grow, earlier accumulated returns earn their own subsequent returns, causing your balance curve to steepen sharply over time.",
  formula: {
    title: "SIP Future Value Formula",
    expression: "M = P × [ ( (1 + i)^n - 1 ) / i ] × (1 + i)",
    variables: [
      {
        symbol: "M",
        name: "Maturity Amount",
        description: "The estimated total accumulated corpus upon completion.",
      },
      {
        symbol: "P",
        name: "Monthly Investment",
        description: "The regular monthly deposit amount.",
      },
      {
        symbol: "i",
        name: "Periodic Interest Rate",
        description: "Annual expected return divided by 12 and 100 (r / 12 / 100).",
      },
      {
        symbol: "n",
        name: "Number of Payments",
        description: "Total number of monthly installments (Years × 12).",
      },
    ],
    notes:
      "This formula calculates an annuity due (investments made at the beginning of each monthly cycle), which reflects standard mutual fund SIP auto-debits.",
  },
  example: {
    title: "Real-World SIP Example",
    scenario:
      "Rohan starts a monthly SIP of ₹10,000 in an equity index fund with an assumed return rate of 12% per annum for a duration of 15 years.",
    inputs: {
      "Monthly Deposit (P)": "₹10,000",
      "Expected Return (r)": "12% p.a.",
      "Duration (t)": "15 Years (180 Months)",
    },
    calculationSteps: [
      "Total Principal Invested = ₹10,000 × 180 months = ₹18,00,000.",
      "Monthly Interest Rate (i) = 12 / (12 × 100) = 0.01.",
      "Compounding Multiplier = [((1 + 0.01)^180 - 1) / 0.01] × 1.01 = [ (5.9958 - 1) / 0.01 ] × 1.01 = 504.576.",
      "Maturity Value (M) = ₹10,000 × 504.576 = ₹50,45,760.",
      "Estimated Wealth Gain = ₹50,45,760 - ₹18,00,000 = ₹32,45,760.",
    ],
    result:
      "Rohan's ₹18 Lakh investment generated an additional ₹32.45 Lakh in returns, creating a total corpus of ₹50.45 Lakh.",
  },
  benefits: [
    "Disciplined, Automated Savings without market timing stress.",
    "Rupee Cost Averaging lowers average acquisition cost during market corrections.",
    "Power of Compounding multiplies returns over long horizons.",
    "High Flexibility: Increase, pause, or withdraw funds anytime without penalty.",
  ],
  faqs: [
    {
      question: "Is SIP return guaranteed?",
      answer:
        "No. Mutual fund investments are subject to market risks. The expected return rate is an estimate based on historical performance, but actual market returns vary based on equity market conditions.",
    },
    {
      question: "Can I increase my SIP amount every year?",
      answer:
        "Yes, many mutual fund houses offer 'Step-Up SIP' or top-up options that automatically increase your monthly investment by a chosen percentage (e.g. 10%) each year in line with salary increments.",
    },
    {
      question: "What is the best date of the month for SIP?",
      answer:
        "Historically, the specific date makes virtually zero difference over a 5 to 10 year period. Selecting a date 2-3 days after your salary credit is recommended to ensure sufficient account balance.",
    },
    {
      question: "Are capital gains from mutual fund SIPs taxable?",
      answer:
        "In India, Equity Mutual Funds held for more than 12 months qualify for Long-Term Capital Gains (LTCG) tax of 12.5% on profits exceeding ₹1.25 Lakh per financial year (as per Union Budget 2024). Short-term gains are taxed at 20%.",
    },
  ],
};

