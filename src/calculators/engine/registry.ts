import { CalculatorEngineConfig } from "./types";
import { sipCalculatorConfig } from "../finance/sip";
import {
  lumpsumCalculatorConfig,
  compoundInterestCalculatorConfig,
  simpleInterestCalculatorConfig,
  fdCalculatorConfig,
  rdCalculatorConfig,
  ppfCalculatorConfig,
  cagrCalculatorConfig,
} from "../finance/financeCalculators";
import {
  homeLoanEmiCalculatorConfig,
  carLoanEmiCalculatorConfig,
  personalLoanEmiCalculatorConfig,
  loanPrepaymentCalculatorConfig,
  loanEligibilityCalculatorConfig,
  creditCardInterestCalculatorConfig,
} from "../loans/loansCalculators";
import {
  bmiCalculatorConfig,
  bmrCalculatorConfig,
  tdeeCalculatorConfig,
  calorieCalculatorConfig,
  waterIntakeCalculatorConfig,
  ageCalculatorConfig,
} from "../health/healthCalculators";
import {
  percentageCalculatorConfig,
  fractionCalculatorConfig,
  averageCalculatorConfig,
  squareRootCalculatorConfig,
  ratioCalculatorConfig,
  gcdCalculatorConfig,
} from "../math/mathCalculators";
import {
  gstCalculatorConfig,
  incomeTaxCalculatorConfig,
  salaryCalculatorConfig,
  profitMarginCalculatorConfig,
  markupCalculatorConfig,
  discountCalculatorConfig,
} from "../business/businessCalculators";
import {
  homeConstructionCostCalculatorConfig,
  carpetAreaCalculatorConfig,
  paintCalculatorConfig,
  tilesCalculatorConfig,
  cementCalculatorConfig,
} from "../construction/constructionCalculators";
import {
  lengthConverterConfig,
  weightConverterConfig,
  temperatureConverterConfig,
  currencyConverterConfig,
  speedConverterConfig,
  fuelMileageCalculatorConfig,
} from "../utilities/utilitiesCalculators";
import {
  ipSubnetCalculatorConfig,
  hexadecimalConverterConfig,
  unixTimestampConverterConfig,
  passwordGeneratorConfig,
  base64EncoderDecoderConfig,
} from "../technology/techCalculators";
import {
  cgpaCalculatorConfig,
  gpaCalculatorConfig,
  percentageToMarksCalculatorConfig,
  examPercentageCalculatorConfig,
  attendanceCalculatorConfig,
} from "../education/educationCalculators";
import {
  fuelCostCalculatorConfig,
  mileageCalculatorConfig,
  evChargingCostCalculatorConfig,
  tripCostCalculatorConfig,
  speedTimeDistanceCalculatorConfig,
} from "../automotive/automotiveCalculators";

export const IMPLEMENTED_CALCULATORS: Record<string, CalculatorEngineConfig> = {
  // Finance (8)
  "sip-calculator": sipCalculatorConfig,
  "lumpsum-calculator": lumpsumCalculatorConfig,
  "compound-interest-calculator": compoundInterestCalculatorConfig,
  "simple-interest-calculator": simpleInterestCalculatorConfig,
  "fd-calculator": fdCalculatorConfig,
  "rd-calculator": rdCalculatorConfig,
  "ppf-calculator": ppfCalculatorConfig,
  "cagr-calculator": cagrCalculatorConfig,

  // Loans (6)
  "home-loan-emi-calculator": homeLoanEmiCalculatorConfig,
  "car-loan-emi-calculator": carLoanEmiCalculatorConfig,
  "personal-loan-emi-calculator": personalLoanEmiCalculatorConfig,
  "loan-prepayment-calculator": loanPrepaymentCalculatorConfig,
  "loan-eligibility-calculator": loanEligibilityCalculatorConfig,
  "credit-card-interest-calculator": creditCardInterestCalculatorConfig,

  // Health (6)
  "bmi-calculator": bmiCalculatorConfig,
  "bmr-calculator": bmrCalculatorConfig,
  "tdee-calculator": tdeeCalculatorConfig,
  "calorie-calculator": calorieCalculatorConfig,
  "water-intake-calculator": waterIntakeCalculatorConfig,
  "age-calculator": ageCalculatorConfig,

  // Math (6)
  "percentage-calculator": percentageCalculatorConfig,
  "fraction-calculator": fractionCalculatorConfig,
  "average-calculator": averageCalculatorConfig,
  "square-root-calculator": squareRootCalculatorConfig,
  "ratio-calculator": ratioCalculatorConfig,
  "gcd-calculator": gcdCalculatorConfig,

  // Business (6)
  "gst-calculator": gstCalculatorConfig,
  "income-tax-calculator": incomeTaxCalculatorConfig,
  "salary-calculator": salaryCalculatorConfig,
  "profit-margin-calculator": profitMarginCalculatorConfig,
  "markup-calculator": markupCalculatorConfig,
  "discount-calculator": discountCalculatorConfig,

  // Construction (5)
  "home-construction-cost-calculator": homeConstructionCostCalculatorConfig,
  "carpet-area-calculator": carpetAreaCalculatorConfig,
  "paint-calculator": paintCalculatorConfig,
  "tiles-calculator": tilesCalculatorConfig,
  "cement-calculator": cementCalculatorConfig,

  // Utilities (6)
  "length-converter": lengthConverterConfig,
  "weight-converter": weightConverterConfig,
  "temperature-converter": temperatureConverterConfig,
  "currency-converter": currencyConverterConfig,
  "speed-converter": speedConverterConfig,
  "fuel-mileage-calculator": fuelMileageCalculatorConfig,

  // Technology (5)
  "ip-subnet-calculator": ipSubnetCalculatorConfig,
  "hexadecimal-converter": hexadecimalConverterConfig,
  "unix-timestamp-converter": unixTimestampConverterConfig,
  "password-generator": passwordGeneratorConfig,
  "base64-encoder-decoder": base64EncoderDecoderConfig,

  // Education (5)
  "cgpa-calculator": cgpaCalculatorConfig,
  "gpa-calculator": gpaCalculatorConfig,
  "percentage-to-marks-calculator": percentageToMarksCalculatorConfig,
  "exam-percentage-calculator": examPercentageCalculatorConfig,
  "attendance-calculator": attendanceCalculatorConfig,

  // Automotive (5)
  "fuel-cost-calculator": fuelCostCalculatorConfig,
  "mileage-calculator": mileageCalculatorConfig,
  "ev-charging-cost-calculator": evChargingCostCalculatorConfig,
  "trip-cost-calculator": tripCostCalculatorConfig,
  "speed-time-distance-calculator": speedTimeDistanceCalculatorConfig,
};

export function getEngineConfig(slug: string): CalculatorEngineConfig | undefined {
  return IMPLEMENTED_CALCULATORS[slug];
}

export function getAllImplementedSlugs(): string[] {
  return Object.keys(IMPLEMENTED_CALCULATORS);
}
