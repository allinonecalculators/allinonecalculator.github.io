import { CalculatorEngineConfig } from "../engine/types";
import { formatNumber } from "@/lib/formatters";

// 1. BMI Calculator
export const bmiCalculatorConfig: CalculatorEngineConfig = {
  id: "bmi-calculator",
  slug: "bmi-calculator",
  name: "BMI Calculator (Body Mass Index)",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    {
      name: "weightKg",
      label: "Body Weight",
      type: "slider",
      defaultValue: 70,
      min: 20,
      max: 200,
      step: 0.5,
      suffix: "kg",
    },
    {
      name: "heightCm",
      label: "Height",
      type: "slider",
      defaultValue: 172,
      min: 100,
      max: 230,
      step: 1,
      suffix: "cm",
    },
  ],
  calculate: (inputs) => {
    const weight = Math.max(1, inputs.weightKg || 70);
    const heightM = Math.max(0.5, (inputs.heightCm || 172) / 100);

    const bmi = weight / (heightM * heightM);
    let category = "Normal Weight";
    let variant: "primary" | "success" | "warning" = "success";

    if (bmi < 18.5) {
      category = "Underweight";
      variant = "warning";
    } else if (bmi < 25) {
      category = "Normal Weight (Healthy)";
      variant = "success";
    } else if (bmi < 30) {
      category = "Overweight";
      variant = "warning";
    } else {
      category = "Obese Class";
      variant = "warning";
    }

    const minHealthyWeight = Math.round(18.5 * heightM * heightM);
    const maxHealthyWeight = Math.round(24.9 * heightM * heightM);

    return {
      results: [
        { id: "bmi", label: "Your Body Mass Index (BMI)", value: bmi.toFixed(1), formattedValue: bmi.toFixed(1), isHighlighted: true, variant },
        { id: "category", label: "WHO Weight Category", value: category, formattedValue: category, variant },
        { id: "healthyRange", label: "Healthy Weight Range", value: `${minHealthyWeight} - ${maxHealthyWeight} kg`, formattedValue: `${minHealthyWeight} - ${maxHealthyWeight} kg` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate Body Mass Index (BMI) and discover your recommended healthy weight range according to WHO standards.",
    whatIsIt: "BMI is a simple screening index of weight-for-height commonly used to classify underweight, overweight and obesity in adults.",
    whyUseIt: "Provides a quick screening baseline to evaluate health risks associated with excess adipose tissue.",
    howItWorks: "BMI is calculated by dividing body weight in kilograms by the square of height in meters: kg / m².",
    formula: {
      title: "Body Mass Index Formula",
      expression: "BMI = Weight (kg) / [ Height (m) ]²",
      variables: [
        { symbol: "BMI", name: "Body Mass Index", description: "Units in kg/m²." },
        { symbol: "Weight", name: "Weight in Kilograms", description: "Body weight on scale." },
        { symbol: "Height", name: "Height in Meters", description: "Standing height (cm / 100)." },
      ],
    },
    example: {
      title: "BMI Calculation Example",
      scenario: "Adult weighing 70 kg with a height of 172 cm.",
      inputs: { "Weight": "70 kg", "Height": "172 cm (1.72 m)" },
      calculationSteps: [
        "Height squared = 1.72 × 1.72 = 2.9584 m².",
        "BMI = 70 / 2.9584 = 23.66 kg/m².",
      ],
      result: "BMI of 23.7 falls comfortably in the WHO Normal Healthy Weight range (18.5 - 24.9).",
    },
    faqs: [
      {
        question: "Does BMI differentiate muscle from body fat?",
        answer: "No. BMI does not measure body fat directly and may overestimate fatness in athletes with dense muscular development.",
      },
    ],
  },
  relatedSlugs: ["bmr-calculator", "tdee-calculator", "calorie-calculator"],
};

// 2. BMR Calculator
export const bmrCalculatorConfig: CalculatorEngineConfig = {
  id: "bmr-calculator",
  slug: "bmr-calculator",
  name: "BMR Calculator (Basal Metabolic Rate)",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    { name: "weightKg", label: "Weight", type: "slider", defaultValue: 70, min: 30, max: 200, step: 1, suffix: "kg" },
    { name: "heightCm", label: "Height", type: "slider", defaultValue: 175, min: 120, max: 220, step: 1, suffix: "cm" },
    { name: "age", label: "Age", type: "slider", defaultValue: 28, min: 15, max: 90, step: 1, suffix: "years" },
  ],
  calculate: (inputs) => {
    const W = inputs.weightKg || 70;
    const H = inputs.heightCm || 175;
    const A = inputs.age || 28;

    // Mifflin-St Jeor Formula
    const bmrMale = Math.round(10 * W + 6.25 * H - 5 * A + 5);
    const bmrFemale = Math.round(10 * W + 6.25 * H - 5 * A - 161);

    return {
      results: [
        { id: "bmrMale", label: "Male BMR (At Rest)", value: bmrMale, formattedValue: `${bmrMale} kcal/day`, isHighlighted: true, variant: "primary" },
        { id: "bmrFemale", label: "Female BMR (At Rest)", value: bmrFemale, formattedValue: `${bmrFemale} kcal/day`, variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate Basal Metabolic Rate (BMR) using the clinically validated Mifflin-St Jeor equation.",
    whatIsIt: "BMR represents the minimal number of calories required to maintain vital physiological life functions while resting.",
    whyUseIt: "BMR provides the absolute floor for designing calorie deficit or surplus nutrition plans.",
    howItWorks: "Applies the Mifflin-St Jeor equation based on body weight, height, and age.",
    formula: {
      title: "Mifflin-St Jeor Equation",
      expression: "BMR = (10 × W) + (6.25 × H) - (5 × A) + s",
      variables: [
        { symbol: "W", name: "Weight in kg", description: "Body weight." },
        { symbol: "H", name: "Height in cm", description: "Stature." },
        { symbol: "A", name: "Age in years", description: "Chronological age." },
        { symbol: "s", name: "Sex Adjustment", description: "+5 for men, -161 for women." },
      ],
    },
    example: {
      title: "BMR Example",
      scenario: "28-year-old male weighing 70 kg at 175 cm height.",
      inputs: { "Weight": "70 kg", "Height": "175 cm", "Age": "28 Years" },
      calculationSteps: [
        "10 × 70 = 700.",
        "6.25 × 175 = 1,093.75.",
        "5 × 28 = 140.",
        "BMR = 700 + 1093.75 - 140 + 5 = 1,659 kcal/day.",
      ],
      result: "Basal burn at complete bed rest is approximately 1,659 calories per day.",
    },
    faqs: [
      {
        question: "Should I ever eat below my BMR?",
        answer: "Generally no. Eating below your BMR for extended periods risks metabolic slowdown, muscle wasting, and nutritional deficiencies.",
      },
    ],
  },
  relatedSlugs: ["tdee-calculator", "calorie-calculator", "bmi-calculator"],
};

// 3. TDEE Calculator
export const tdeeCalculatorConfig: CalculatorEngineConfig = {
  id: "tdee-calculator",
  slug: "tdee-calculator",
  name: "TDEE Calculator (Total Daily Energy Expenditure)",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    { name: "weightKg", label: "Weight", type: "slider", defaultValue: 72, min: 30, max: 200, step: 1, suffix: "kg" },
    { name: "heightCm", label: "Height", type: "slider", defaultValue: 175, min: 120, max: 220, step: 1, suffix: "cm" },
    { name: "age", label: "Age", type: "slider", defaultValue: 30, min: 15, max: 90, step: 1, suffix: "years" },
  ],
  calculate: (inputs) => {
    const W = inputs.weightKg || 72;
    const H = inputs.heightCm || 175;
    const A = inputs.age || 30;

    const bmr = 10 * W + 6.25 * H - 5 * A + 5;
    const sedentary = Math.round(bmr * 1.2);
    const light = Math.round(bmr * 1.375);
    const moderate = Math.round(bmr * 1.55);
    const veryActive = Math.round(bmr * 1.725);

    return {
      results: [
        { id: "moderate", label: "Moderate Exercise (3-5 days/wk)", value: moderate, formattedValue: `${moderate} kcal`, isHighlighted: true, variant: "primary" },
        { id: "light", label: "Light Activity (1-3 days/wk)", value: light, formattedValue: `${light} kcal`, variant: "success" },
        { id: "sedentary", label: "Sedentary (Desk Job)", value: sedentary, formattedValue: `${sedentary} kcal` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate Total Daily Energy Expenditure (TDEE) and maintenance calories across activity levels.",
    whatIsIt: "TDEE is the total number of calories you burn daily including physical activity, digestion, and basal metabolism.",
    whyUseIt: "Knowing your TDEE is essential for planning fat loss (eating 500 kcal below TDEE) or lean muscle building.",
    howItWorks: "Multiplies your Basal Metabolic Rate (BMR) by an activity coefficient ranging from 1.2 to 1.9.",
    formula: {
      title: "TDEE Formula",
      expression: "TDEE = BMR × Activity Multiplier",
      variables: [
        { symbol: "Sedentary", name: "1.2", description: "Little or no exercise." },
        { symbol: "Moderate", name: "1.55", description: "Moderate exercise 3-5 days/week." },
      ],
    },
    example: {
      title: "TDEE Scenario",
      scenario: "30-year-old active professional with a 1,660 kcal BMR exercising 4 times a week.",
      inputs: { "BMR": "1,660 kcal", "Activity": "Moderate (1.55)" },
      calculationSteps: ["TDEE = 1,660 × 1.55 = 2,573 kcal/day."],
      result: "Maintenance calories needed to maintain current weight is ~2,570 kcal/day.",
    },
    faqs: [
      {
        question: "How much deficit should I create for weight loss?",
        answer: "A deficit of 300 to 500 calories below your TDEE results in healthy, sustainable fat loss of approximately 0.5 kg per week.",
      },
    ],
  },
  relatedSlugs: ["calorie-calculator", "bmr-calculator", "bmi-calculator"],
};

// 4. Calorie Calculator
export const calorieCalculatorConfig: CalculatorEngineConfig = {
  id: "calorie-calculator",
  slug: "calorie-calculator",
  name: "Calorie Calculator (Weight Loss & Gain)",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    { name: "weightKg", label: "Current Weight", type: "slider", defaultValue: 75, min: 35, max: 180, step: 1, suffix: "kg" },
    { name: "heightCm", label: "Height", type: "slider", defaultValue: 175, min: 130, max: 215, step: 1, suffix: "cm" },
    { name: "age", label: "Age", type: "slider", defaultValue: 28, min: 16, max: 80, step: 1, suffix: "years" },
  ],
  calculate: (inputs) => {
    const W = inputs.weightKg || 75;
    const H = inputs.heightCm || 175;
    const A = inputs.age || 28;

    const bmr = 10 * W + 6.25 * H - 5 * A + 5;
    const maintenance = Math.round(bmr * 1.5);
    const mildLoss = maintenance - 250;
    const weightLoss = maintenance - 500;
    const muscleGain = maintenance + 300;

    return {
      results: [
        { id: "loss", label: "Weight Loss (-0.5 kg/week)", value: weightLoss, formattedValue: `${weightLoss} kcal/day`, isHighlighted: true, variant: "primary" },
        { id: "maintenance", label: "Maintain Weight", value: maintenance, formattedValue: `${maintenance} kcal/day`, variant: "neutral" },
        { id: "gain", label: "Lean Muscle Gain (+0.25 kg/week)", value: muscleGain, formattedValue: `${muscleGain} kcal/day`, variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate daily calorie targets for sustainable weight loss, weight maintenance, or muscle building.",
    whatIsIt: "Translates caloric physics (3,500 kcal ≈ 0.5 kg of body fat) into daily dietary targets.",
    whyUseIt: "Prevents extreme starvation diets by computing balanced deficits.",
    howItWorks: "Computes maintenance intake and applies caloric offsets.",
    formula: {
      title: "Calorie Deficit Principle",
      expression: "Weight Loss Calories = Maintenance Calories - 500 kcal",
      variables: [
        { symbol: "500 kcal deficit", name: "Daily Cut", description: "Yields ~3,500 kcal weekly deficit (≈ 0.5 kg fat loss)." },
      ],
    },
    example: {
      title: "Fat Loss Example",
      scenario: "Person with 2,400 kcal maintenance seeking to lose 2 kg per month.",
      inputs: { "Maintenance": "2,400 kcal/day", "Deficit": "500 kcal/day" },
      calculationSteps: ["Daily Target = 2,400 - 500 = 1,900 kcal/day."],
      result: "Target 1,900 calories daily to lose ~0.5 kg per week.",
    },
    faqs: [
      {
        question: "Is protein intake important during a calorie deficit?",
        answer: "Yes, consuming 1.6 to 2.2 grams of protein per kg of body weight preserves lean muscle mass during a calorie deficit.",
      },
    ],
  },
  relatedSlugs: ["tdee-calculator", "water-intake-calculator"],
};

// 5. Daily Water Intake Calculator
export const waterIntakeCalculatorConfig: CalculatorEngineConfig = {
  id: "water-intake-calculator",
  slug: "water-intake-calculator",
  name: "Daily Water Intake Calculator",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    { name: "weightKg", label: "Body Weight", type: "slider", defaultValue: 70, min: 30, max: 160, step: 1, suffix: "kg" },
    { name: "workoutMinutes", label: "Daily Exercise Duration", type: "slider", defaultValue: 45, min: 0, max: 180, step: 15, suffix: "minutes" },
  ],
  calculate: (inputs) => {
    const W = inputs.weightKg || 70;
    const workout = inputs.workoutMinutes || 0;

    // Baseline: 35ml per kg body weight + 350ml per 30 mins workout
    const baselineMl = W * 35;
    const workoutExtraMl = (workout / 30) * 350;
    const totalMl = Math.round(baselineMl + workoutExtraMl);
    const totalLiters = (totalMl / 1000).toFixed(2);
    const glasses = Math.round(totalMl / 250); // 250ml glass

    return {
      results: [
        { id: "liters", label: "Daily Water Target", value: totalLiters, formattedValue: `${totalLiters} Liters/day`, isHighlighted: true, variant: "primary" },
        { id: "glasses", label: "Standard Glasses (250ml)", value: glasses, formattedValue: `${glasses} Glasses`, variant: "success" },
        { id: "milliliters", label: "Total Volume", value: totalMl, formattedValue: `${totalMl} mL` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate your recommended daily water hydration in liters and standard glasses based on weight and exercise.",
    whatIsIt: "Estimates daily fluid requirements to maintain optimal physical performance and cellular hydration.",
    whyUseIt: "Prevents dehydration-induced fatigue, headaches, and impaired cognitive performance.",
    howItWorks: "Applies the clinical benchmark of 35ml per kilogram plus sweat replenishment for exercise.",
    formula: {
      title: "Hydration Formula",
      expression: "Water (mL) = (Weight in kg × 35) + [ (Workout mins / 30) × 350 ]",
      variables: [
        { symbol: "Weight × 35", name: "Basal Need", description: "35ml fluid per kilogram of body weight." },
        { symbol: "Exercise", name: "Sweat Replacement", description: "350ml additional water per 30 minutes of physical exertion." },
      ],
    },
    example: {
      title: "Hydration Example",
      scenario: "70 kg individual working out for 45 minutes daily.",
      inputs: { "Weight": "70 kg", "Workout": "45 Mins" },
      calculationSteps: [
        "Base requirement = 70 × 35 = 2,450 mL.",
        "Workout extra = (45 / 30) × 350 = 525 mL.",
        "Total = 2,450 + 525 = 2,975 mL (≈ 3.0 Liters).",
      ],
      result: "Target is 3 Liters (approximately 12 glasses) per day.",
    },
    faqs: [
      {
        question: "Does coffee and tea count towards daily water intake?",
        answer: "Moderate caffeine intake counts towards hydration, although pure water is always the optimal choice.",
      },
    ],
  },
  relatedSlugs: ["calorie-calculator", "bmi-calculator"],
};

// 6. Age Calculator
export const ageCalculatorConfig: CalculatorEngineConfig = {
  id: "age-calculator",
  slug: "age-calculator",
  name: "Age Calculator",
  category: "health",
  categoryName: "Healthcare & Fitness",
  inputs: [
    { name: "birthYear", label: "Birth Year", type: "slider", defaultValue: 1998, min: 1940, max: 2026, step: 1, suffix: "Year" },
    { name: "birthMonth", label: "Birth Month (1-12)", type: "slider", defaultValue: 6, min: 1, max: 12, step: 1, suffix: "Month" },
    { name: "birthDay", label: "Birth Day (1-31)", type: "slider", defaultValue: 15, min: 1, max: 31, step: 1, suffix: "Day" },
  ],
  calculate: (inputs) => {
    const y = inputs.birthYear || 1998;
    const m = (inputs.birthMonth || 6) - 1;
    const d = inputs.birthDay || 15;

    const birthDate = new Date(y, m, d);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.max(0, now.getTime() - birthDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    return {
      results: [
        { id: "ageExact", label: "Exact Chronological Age", value: `${years} Yrs ${months} Mos ${days} Days`, formattedValue: `${years} Years, ${months} Months, ${days} Days`, isHighlighted: true, variant: "primary" },
        { id: "totalDays", label: "Total Days Lived", value: totalDays, formattedValue: `${totalDays.toLocaleString("en-IN")} Days`, variant: "success" },
        { id: "totalHours", label: "Total Hours Lived", value: totalHours, formattedValue: `${totalHours.toLocaleString("en-IN")} Hours` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate your exact chronological age in years, months, days, and total hours lived.",
    whatIsIt: "An age calculator calculates the precise difference between your date of birth and the current date.",
    whyUseIt: "Useful for passport applications, government exam age cutoffs, and retirement milestones.",
    howItWorks: "Calculates calendar month and leap year differences.",
    formula: {
      title: "Date Difference Algorithm",
      expression: "Age = Current Date - Date of Birth",
      variables: [
        { symbol: "DOB", name: "Date of Birth", description: "Birth year, month, and day." },
      ],
    },
    example: {
      title: "Age Calculation Example",
      scenario: "Person born on June 15, 1998.",
      inputs: { "DOB": "15 June 1998" },
      calculationSteps: ["Calculates exact elapsed calendar years, remaining months, and remaining days."],
      result: "Provides exact age breakdown.",
    },
    faqs: [
      {
        question: "Does the calculator account for leap years?",
        answer: "Yes, the algorithm accurately factors in 366-day leap years including February 29th.",
      },
    ],
  },
  relatedSlugs: ["bmi-calculator", "bmr-calculator"],
};

