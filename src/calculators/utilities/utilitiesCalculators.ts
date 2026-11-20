import { CalculatorEngineConfig } from "../engine/types";
import { formatNumber } from "@/lib/formatters";

// 1. Length Converter
export const lengthConverterConfig: CalculatorEngineConfig = {
  id: "length-converter",
  slug: "length-converter",
  name: "Length & Distance Converter",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "meters", label: "Length in Meters (m)", type: "number", defaultValue: 10, min: 0, max: 100000000, step: 1, suffix: "m" },
  ],
  calculate: (inputs) => {
    const m = Math.max(0, inputs.meters || 0);

    const feet = m * 3.28084;
    const inches = m * 39.3701;
    const km = m / 1000;
    const miles = m * 0.000621371;
    const yards = m * 1.09361;

    return {
      results: [
        { id: "feet", label: "Feet (ft)", value: feet, formattedValue: `${formatNumber(feet, 2)} ft`, isHighlighted: true, variant: "primary" },
        { id: "inches", label: "Inches (in)", value: inches, formattedValue: `${formatNumber(inches, 2)} in`, variant: "success" },
        { id: "km", label: "Kilometers (km)", value: km, formattedValue: `${formatNumber(km, 4)} km` },
        { id: "miles", label: "Miles (mi)", value: miles, formattedValue: `${formatNumber(miles, 4)} mi` },
        { id: "yards", label: "Yards (yd)", value: yards, formattedValue: `${formatNumber(yards, 2)} yd` },
      ],
    };
  },
  content: {
    shortDescription: "Convert meters into feet, inches, kilometers, miles, centimeters, and yards instantly.",
    whatIsIt: "Multi-unit linear distance converter between metric and imperial systems.",
    whyUseIt: "Useful for architectural blueprints, international travel, height measurements, and sports distances.",
    howItWorks: "Applies exact international standard conversion multipliers (1 m = 3.28084 ft).",
    formula: {
      title: "Metric to Imperial Multipliers",
      expression: "Feet = Meters × 3.28084 | Inches = Meters × 39.3701",
      variables: [
        { symbol: "3.28084", name: "Foot Factor", description: "Standard international foot conversion." },
      ],
    },
    example: {
      title: "Distance Conversion Example",
      scenario: "Converting 10 meters into feet and inches.",
      inputs: { "Meters": "10 m" },
      calculationSteps: [
        "10 × 3.28084 = 32.81 feet.",
        "10 × 39.3701 = 393.7 inches.",
      ],
      result: "10 meters equals 32.81 feet or 393.7 inches.",
    },
    faqs: [
      {
        question: "How many feet are in a meter?",
        answer: "There are approximately 3.28084 feet in 1 meter.",
      },
    ],
  },
  relatedSlugs: ["weight-converter", "temperature-converter"],
};

// 2. Weight Converter
export const weightConverterConfig: CalculatorEngineConfig = {
  id: "weight-converter",
  slug: "weight-converter",
  name: "Weight & Mass Converter",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "kilograms", label: "Weight in Kilograms (kg)", type: "number", defaultValue: 75, min: 0, max: 1000000, step: 0.5, suffix: "kg" },
  ],
  calculate: (inputs) => {
    const kg = Math.max(0, inputs.kilograms || 0);

    const pounds = kg * 2.20462;
    const grams = kg * 1000;
    const ounces = kg * 35.274;
    const stones = kg * 0.157473;

    return {
      results: [
        { id: "lbs", label: "Pounds (lbs)", value: pounds, formattedValue: `${formatNumber(pounds, 2)} lbs`, isHighlighted: true, variant: "primary" },
        { id: "grams", label: "Grams (g)", value: grams, formattedValue: `${formatNumber(grams, 0)} g`, variant: "success" },
        { id: "oz", label: "Ounces (oz)", value: ounces, formattedValue: `${formatNumber(ounces, 2)} oz` },
        { id: "stones", label: "Stones (st)", value: stones, formattedValue: `${formatNumber(stones, 2)} st` },
      ],
    };
  },
  content: {
    shortDescription: "Convert kilograms to pounds (lbs), grams, ounces, and stones with precision.",
    whatIsIt: "Weight unit converter for kitchen recipes, gym weights, shipping cargo, and aviation baggage.",
    whyUseIt: "Seamlessly switch between metric and imperial weight measurements.",
    howItWorks: "1 kg equals 2.20462 pounds (lbs) or 35.274 ounces.",
    formula: {
      title: "Weight Conversion Formula",
      expression: "Pounds (lbs) = Kilograms (kg) × 2.20462",
      variables: [
        { symbol: "2.20462", name: "Pound Multiplier", description: "Standard avoirdupois pound conversion." },
      ],
    },
    example: {
      title: "Gym Weight Example",
      scenario: "Converting 75 kg into pounds.",
      inputs: { "Kilograms": "75 kg" },
      calculationSteps: ["75 × 2.20462 = 165.35 lbs."],
      result: "75 kg equals 165.35 pounds.",
    },
    faqs: [
      {
        question: "How many grams are in 1 pound?",
        answer: "There are approximately 453.592 grams in one standard pound.",
      },
    ],
  },
  relatedSlugs: ["length-converter", "temperature-converter"],
};

// 3. Temperature Converter
export const temperatureConverterConfig: CalculatorEngineConfig = {
  id: "temperature-converter",
  slug: "temperature-converter",
  name: "Temperature Converter (°C, °F, K)",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "celsius", label: "Temperature in Celsius (°C)", type: "number", defaultValue: 25, min: -273.15, max: 2000, step: 0.5, suffix: "°C" },
  ],
  calculate: (inputs) => {
    const c = Math.max(-273.15, inputs.celsius ?? 25);

    const fahrenheit = (c * 9) / 5 + 32;
    const kelvin = c + 273.15;

    return {
      results: [
        { id: "f", label: "Fahrenheit (°F)", value: fahrenheit, formattedValue: `${fahrenheit.toFixed(1)} °F`, isHighlighted: true, variant: "primary" },
        { id: "k", label: "Kelvin (K)", value: kelvin, formattedValue: `${kelvin.toFixed(2)} K`, variant: "success" },
        { id: "c", label: "Original Celsius (°C)", value: c, formattedValue: `${c} °C` },
      ],
    };
  },
  content: {
    shortDescription: "Convert temperatures between Celsius (°C), Fahrenheit (°F), and Kelvin (K).",
    whatIsIt: "Thermal scale conversion for weather forecasting, cooking, and science experiments.",
    whyUseIt: "Instantly translate US Fahrenheit temperatures into metric Celsius.",
    howItWorks: "°F = (°C × 9/5) + 32. Kelvin = °C + 273.15.",
    formula: {
      title: "Temperature Scale Equations",
      expression: "°F = (°C × 1.8) + 32  |  K = °C + 273.15",
      variables: [
        { symbol: "32", name: "Freezing Offset", description: "Water freezes at 0°C or 32°F." },
      ],
    },
    example: {
      title: "Room Temperature Example",
      scenario: "Converting pleasant room temperature (25°C) to Fahrenheit.",
      inputs: { "Celsius": "25°C" },
      calculationSteps: [
        "25 × 1.8 = 45.",
        "45 + 32 = 77°F.",
      ],
      result: "25°C equals 77°F or 298.15 Kelvin.",
    },
    faqs: [
      {
        question: "At what temperature are Celsius and Fahrenheit equal?",
        answer: "Celsius and Fahrenheit are identical at -40° (-40°C = -40°F).",
      },
    ],
  },
  relatedSlugs: ["length-converter", "weight-converter"],
};

// 4. Currency Converter
export const currencyConverterConfig: CalculatorEngineConfig = {
  id: "currency-converter",
  slug: "currency-converter",
  name: "Currency Converter",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "amountUsd", label: "Amount in US Dollars (USD $)", type: "currency", defaultValue: 100, min: 1, max: 10000000, step: 10, prefix: "$" },
  ],
  calculate: (inputs) => {
    const usd = Math.max(0, inputs.amountUsd || 100);

    // Standard baseline foreign exchange benchmark pairs:
    const inr = usd * 84.5;
    const eur = usd * 0.95;
    const gbp = usd * 0.79;
    const aed = usd * 3.67;

    return {
      results: [
        { id: "inr", label: "Indian Rupee (INR ₹)", value: inr, formattedValue: `₹${formatNumber(inr, 2)}`, isHighlighted: true, variant: "primary", subText: "Benchmark: 1 USD ≈ ₹84.50" },
        { id: "eur", label: "Euro (EUR €)", value: eur, formattedValue: `€${formatNumber(eur, 2)}`, variant: "success", subText: "Benchmark: 1 USD ≈ €0.95" },
        { id: "gbp", label: "British Pound (GBP £)", value: gbp, formattedValue: `£${formatNumber(gbp, 2)}`, subText: "Benchmark: 1 USD ≈ £0.79" },
        { id: "aed", label: "UAE Dirham (AED)", value: aed, formattedValue: `${formatNumber(aed, 2)} AED`, subText: "Pegged: 1 USD = 3.6725 AED" },
      ],
    };
  },
  content: {
    shortDescription: "Convert major global currencies including USD, INR, EUR, GBP, and AED with transparent reference rates.",
    whatIsIt: "Foreign exchange rate converter for travel budgeting, ecommerce buying, and international trade.",
    whyUseIt: "Quickly gauge currency conversion values without hidden banking spread markups.",
    howItWorks: "Applies international reference exchange rate multiples.",
    formula: {
      title: "Currency Conversion Formula",
      expression: "Target Currency = USD Amount × Exchange Rate",
      variables: [
        { symbol: "Rate", name: "Benchmark Forex Rate", description: "Indicative reference pairing rate." },
      ],
    },
    example: {
      title: "Travel Budget Example",
      scenario: "Converting $100 USD to Indian Rupees.",
      inputs: { "USD": "$100" },
      calculationSteps: ["100 × 84.50 = ₹8,450."],
      result: "$100 USD equals approximately ₹8,450 INR.",
    },
    faqs: [
      {
        question: "Are live forex rates used?",
        answer: "Calculations reflect official benchmark rates for general reference and estimation.",
      },
    ],
  },
  relatedSlugs: ["fuel-mileage-calculator", "length-converter"],
};

// 5. Speed Converter
export const speedConverterConfig: CalculatorEngineConfig = {
  id: "speed-converter",
  slug: "speed-converter",
  name: "Speed Converter (km/h, mph, m/s)",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "kmh", label: "Speed in km/h", type: "number", defaultValue: 100, min: 0, max: 2000, step: 5, suffix: "km/h" },
  ],
  calculate: (inputs) => {
    const kmh = Math.max(0, inputs.kmh || 0);

    const mph = kmh * 0.621371;
    const ms = kmh / 3.6;
    const knots = kmh * 0.539957;

    return {
      results: [
        { id: "mph", label: "Miles per Hour (mph)", value: mph, formattedValue: `${mph.toFixed(1)} mph`, isHighlighted: true, variant: "primary" },
        { id: "ms", label: "Meters per Second (m/s)", value: ms, formattedValue: `${ms.toFixed(2)} m/s`, variant: "success" },
        { id: "knots", label: "Nautical Knots (kn)", value: knots, formattedValue: `${knots.toFixed(1)} kn` },
      ],
    };
  },
  content: {
    shortDescription: "Convert driving, aviation, and running speeds across km/h, mph, m/s, and knots.",
    whatIsIt: "Translates velocity figures across metric, US customary, and nautical standards.",
    whyUseIt: "Useful for driving speed limits abroad, treadmill running paces, and marine navigation.",
    howItWorks: "1 km/h = 0.621371 mph = 0.277778 m/s.",
    formula: {
      title: "Speed Multiplier",
      expression: "mph = km/h × 0.621371  |  m/s = km/h / 3.6",
      variables: [
        { symbol: "0.621371", name: "Miles Factor", description: "Kilometers to statute miles ratio." },
      ],
    },
    example: {
      title: "Highway Speed Example",
      scenario: "Driving at 100 km/h highway speed.",
      inputs: { "Speed": "100 km/h" },
      calculationSteps: [
        "100 × 0.621371 = 62.14 mph.",
        "100 / 3.6 = 27.78 m/s.",
      ],
      result: "100 km/h is equivalent to 62.1 mph.",
    },
    faqs: [
      {
        question: "What is a knot?",
        answer: "A knot is one nautical mile per hour (1.852 km/h), standard in aviation and maritime shipping.",
      },
    ],
  },
  relatedSlugs: ["fuel-mileage-calculator", "length-converter"],
};

// 6. Fuel Mileage Calculator
export const fuelMileageCalculatorConfig: CalculatorEngineConfig = {
  id: "fuel-mileage-calculator",
  slug: "fuel-mileage-calculator",
  name: "Fuel Mileage & Economy Converter",
  category: "utilities",
  categoryName: "Conversion & Utilities",
  inputs: [
    { name: "kml", label: "Fuel Economy (km/L)", type: "number", defaultValue: 18, min: 1, max: 100, step: 0.5, suffix: "km/L" },
  ],
  calculate: (inputs) => {
    const kml = Math.max(0.1, inputs.kml || 18);

    const mpgUS = kml * 2.35215;
    const mpgUK = kml * 2.82481;
    const l100km = 100 / kml;

    return {
      results: [
        { id: "mpgUS", label: "US Miles per Gallon (MPG US)", value: mpgUS, formattedValue: `${mpgUS.toFixed(1)} MPG (US)`, isHighlighted: true, variant: "primary" },
        { id: "l100km", label: "European Standard (L/100km)", value: l100km, formattedValue: `${l100km.toFixed(2)} L/100km`, variant: "success" },
        { id: "mpgUK", label: "Imperial Miles per Gallon (MPG UK)", value: mpgUK, formattedValue: `${mpgUK.toFixed(1)} MPG (UK)` },
      ],
    };
  },
  content: {
    shortDescription: "Convert vehicle fuel economy between kilometers per liter (km/L), US MPG, and Liters per 100km.",
    whatIsIt: "Translates automobile fuel efficiency ratings across international standards.",
    whyUseIt: "Compare car fuel consumption when reading international car reviews or planning travel fuel budgets.",
    howItWorks: "Applies mathematical conversion factors between liters, US gallons, and imperial gallons.",
    formula: {
      title: "Mileage Conversion Formula",
      expression: "MPG (US) = km/L × 2.35215  |  L/100km = 100 / (km/L)",
      variables: [
        { symbol: "km/L", name: "Kilometers per Liter", description: "Standard Indian/Asian vehicle mileage unit." },
      ],
    },
    example: {
      title: "Car Fuel Economy Example",
      scenario: "Sedan delivering 18 km/L.",
      inputs: { "Mileage": "18 km/L" },
      calculationSteps: [
        "MPG (US) = 18 × 2.35215 = 42.34 MPG.",
        "L/100km = 100 / 18 = 5.56 Liters/100km.",
      ],
      result: "18 km/L equals 42.3 MPG (US) or 5.56 L/100km.",
    },
    faqs: [
      {
        question: "Is a lower L/100km number better or worse?",
        answer: "In L/100km, lower is better because it means fewer liters of fuel are consumed to travel 100 kilometers.",
      },
    ],
  },
  relatedSlugs: ["speed-converter", "length-converter"],
};

