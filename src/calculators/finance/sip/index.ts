import { CalculatorEngineConfig } from "../../engine/types";
import { calculateSIP, formatSIPOutputs } from "./sip.calculation";
import { sipInputs } from "./sip.config";
import { sipContent } from "./sip.content";

export const sipCalculatorConfig: CalculatorEngineConfig = {
  id: "sip-calculator",
  slug: "sip-calculator",
  name: "SIP Calculator",
  category: "finance",
  categoryName: "Finance & Investment",
  inputs: sipInputs,
  calculate: (rawInputs) => {
    const res = calculateSIP({
      monthlyInvestment: rawInputs.monthlyInvestment,
      expectedReturnRate: rawInputs.expectedReturnRate,
      timePeriodYears: rawInputs.timePeriodYears,
    });
    return formatSIPOutputs(res);
  },
  content: sipContent,
  relatedSlugs: [
    "lumpsum-calculator",
    "compound-interest-calculator",
    "ppf-calculator",
    "cagr-calculator",
  ],
};

