import { CalculatorInputField } from "../../engine/types";

export const sipInputs: CalculatorInputField[] = [
  {
    name: "monthlyInvestment",
    label: "Monthly Investment",
    type: "currency",
    defaultValue: 5000,
    min: 500,
    max: 1000000,
    step: 500,
    prefix: "₹",
    helpText: "Amount you plan to invest every month.",
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
    helpText: "Historically, broad Indian equity funds have averaged 12-14% over 10+ years.",
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
    helpText: "Investment duration in full years.",
  },
];

