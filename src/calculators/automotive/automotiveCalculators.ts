import { CalculatorEngineConfig } from "../engine/types";
import { formatINR, formatNumber } from "@/lib/formatters";

// 1. Fuel Cost Calculator
export const fuelCostCalculatorConfig: CalculatorEngineConfig = {
  id: "fuel-cost-calculator",
  slug: "fuel-cost-calculator",
  name: "Fuel Cost Calculator",
  category: "automotive",
  categoryName: "Automotive & Travel",
  inputs: [
    { name: "tripDistanceKm", label: "Trip Distance", type: "number", defaultValue: 300, min: 1, max: 20000, step: 10, suffix: "km" },
    { name: "mileageKml", label: "Vehicle Mileage", type: "number", defaultValue: 15, min: 2, max: 100, step: 0.5, suffix: "km/L" },
    { name: "fuelPricePerLiter", label: "Fuel Price per Liter", type: "currency", defaultValue: 102, min: 50, max: 250, step: 1, prefix: "₹" },
  ],
  calculate: (inputs) => {
    const dist = Math.max(1, inputs.tripDistanceKm || 300);
    const mileage = Math.max(0.1, inputs.mileageKml || 15);
    const price = Math.max(1, inputs.fuelPricePerLiter || 102);

    const fuelLiters = dist / mileage;
    const totalFuelCost = Math.round(fuelLiters * price);
    const costPerKm = (totalFuelCost / dist).toFixed(2);

    return {
      results: [
        { id: "totalCost", label: "Total Estimated Fuel Cost", value: totalFuelCost, formattedValue: formatINR(totalFuelCost), isHighlighted: true, variant: "primary" },
        { id: "liters", label: "Fuel Required", value: fuelLiters.toFixed(1), formattedValue: `${fuelLiters.toFixed(1)} Liters`, variant: "success" },
        { id: "costPerKm", label: "Effective Running Cost", value: costPerKm, formattedValue: `₹${costPerKm} / km` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate fuel expenses and required liters for daily commutes and road trips.",
    whatIsIt: "Estimates total petrol or diesel expenses for any journey distance.",
    whyUseIt: "Essential for budgeting long road trips and comparing public transit vs driving.",
    howItWorks: "Fuel Liters = Distance / Mileage. Total Cost = Liters × Fuel Price.",
    formula: {
      title: "Fuel Expense Formula",
      expression: "Total Cost = (Distance in km / Mileage in km/L) × Fuel Price",
      variables: [
        { symbol: "Distance", name: "Trip Length", description: "Kilometers to destination." },
        { symbol: "Mileage", name: "Fuel Economy", description: "Kilometers per liter (km/L)." },
      ],
    },
    example: {
      title: "Road Trip Example",
      scenario: "Driving 300 km in a car delivering 15 km/L with petrol at ₹102/L.",
      inputs: { "Distance": "300 km", "Mileage": "15 km/L", "Price": "₹102/L" },
      calculationSteps: [
        "Fuel liters needed = 300 / 15 = 20 Liters.",
        "Total cost = 20 × 102 = ₹2,040.",
        "Cost per km = ₹2,040 / 300 = ₹6.80/km.",
      ],
      result: "Total fuel cost is ₹2,040.",
    },
    faqs: [
      {
        question: "How does AC usage affect fuel consumption?",
        answer: "Running car air conditioning typically increases fuel consumption by approximately 8% to 15% depending on ambient heat.",
      },
    ],
  },
  relatedSlugs: ["trip-cost-calculator", "mileage-calculator", "ev-charging-cost-calculator"],
};

// 2. Mileage Calculator
export const mileageCalculatorConfig: CalculatorEngineConfig = {
  id: "mileage-calculator",
  slug: "mileage-calculator",
  name: "Vehicle Mileage Calculator (km/L)",
  category: "automotive",
  categoryName: "Automotive & Travel",
  inputs: [
    { name: "distanceDriven", label: "Distance Driven on Tank", type: "number", defaultValue: 450, min: 10, max: 5000, step: 10, suffix: "km" },
    { name: "fuelFilledLiters", label: "Fuel Filled to Full", type: "number", defaultValue: 25, min: 1, max: 200, step: 0.5, suffix: "Liters" },
  ],
  calculate: (inputs) => {
    const dist = Math.max(1, inputs.distanceDriven || 450);
    const liters = Math.max(0.1, inputs.fuelFilledLiters || 25);

    const kml = dist / liters;
    const l100km = 100 / kml;
    const mpg = kml * 2.35215;

    return {
      results: [
        { id: "kml", label: "Actual Mileage", value: kml.toFixed(2), formattedValue: `${kml.toFixed(2)} km/L`, isHighlighted: true, variant: "primary" },
        { id: "mpg", label: "Miles per Gallon (US)", value: mpg.toFixed(1), formattedValue: `${mpg.toFixed(1)} MPG`, variant: "success" },
        { id: "l100km", label: "Consumption Metric", value: l100km.toFixed(2), formattedValue: `${l100km.toFixed(2)} L/100km` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate actual vehicle fuel economy (km/L) using the tank-to-tank full method.",
    whatIsIt: "Accurately computes your car or motorcycle's true real-world mileage.",
    whyUseIt: "Identifies mechanical issues or tyre under-inflation when mileage drops.",
    howItWorks: "Mileage = Kilometers Driven / Liters Required to Refill Tank.",
    formula: {
      title: "Mileage Formula",
      expression: "Mileage (km/L) = Distance Driven (km) / Fuel Refilled (Liters)",
      variables: [
        { symbol: "Distance", name: "Trip Meter km", description: "Kilometers driven between tank fills." },
      ],
    },
    example: {
      title: "Tank-to-Tank Example",
      scenario: "Car traveled 450 km on a 25-liter refill.",
      inputs: { "Distance": "450 km", "Fuel Filled": "25 Liters" },
      calculationSteps: ["450 / 25 = 18.0 km/L."],
      result: "Vehicle fuel economy is exactly 18.0 km/L.",
    },
    faqs: [
      {
        question: "Why is the tank-to-tank method most accurate?",
        answer: "It eliminates estimation errors caused by imperfect dashboard fuel gauge needles and trip computers.",
      },
    ],
  },
  relatedSlugs: ["fuel-cost-calculator", "trip-cost-calculator"],
};

// 3. EV Charging Cost Calculator
export const evChargingCostCalculatorConfig: CalculatorEngineConfig = {
  id: "ev-charging-cost-calculator",
  slug: "ev-charging-cost-calculator",
  name: "EV Charging Cost & Savings Calculator",
  category: "automotive",
  categoryName: "Automotive & Travel",
  inputs: [
    { name: "batteryKwh", label: "EV Battery Capacity", type: "slider", defaultValue: 40, min: 10, max: 120, step: 2, suffix: "kWh", helpText: "Tata Nexon EV ~40 kWh, MG ZS EV ~50 kWh, Tesla Model 3 ~60 kWh." },
    { name: "drivingRangeKm", label: "Real World Driving Range", type: "slider", defaultValue: 280, min: 50, max: 700, step: 10, suffix: "km" },
    { name: "electricityTariff", label: "Electricity Cost per Unit (kWh)", type: "currency", defaultValue: 8, min: 3, max: 25, step: 0.5, prefix: "₹" },
  ],
  calculate: (inputs) => {
    const battery = Math.max(1, inputs.batteryKwh || 40);
    const range = Math.max(10, inputs.drivingRangeKm || 280);
    const tariff = Math.max(1, inputs.electricityTariff || 8);

    const fullChargeCost = Math.round(battery * tariff);
    const evCostPerKm = fullChargeCost / range;

    // Petrol car benchmark: ₹7.00 per km
    const petrolEquivalentCost = range * 7.0;
    const savingsPerFullCharge = Math.max(0, Math.round(petrolEquivalentCost - fullChargeCost));

    return {
      results: [
        { id: "fullCost", label: "Cost for 100% Full Charge", value: fullChargeCost, formattedValue: formatINR(fullChargeCost), isHighlighted: true, variant: "primary" },
        { id: "costPerKm", label: "Running Cost per Kilometer", value: evCostPerKm.toFixed(2), formattedValue: `₹${evCostPerKm.toFixed(2)} / km`, variant: "success" },
        { id: "savings", label: "Savings vs Petrol per Full Charge", value: savingsPerFullCharge, formattedValue: formatINR(savingsPerFullCharge), variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate home EV charging costs, cost per kilometer, and savings compared to petrol vehicles.",
    whatIsIt: "Computes the true electricity cost to charge electric vehicles and compares it to internal combustion engines.",
    whyUseIt: "Evaluate the payback period and running cost savings of switching to an electric vehicle.",
    howItWorks: "Full Charge Cost = Battery Capacity (kWh) × Tariff Rate per Unit.",
    formula: {
      title: "EV Running Cost Formula",
      expression: "Cost per km = (Battery kWh × Electricity Tariff) / Real-world Range km",
      variables: [
        { symbol: "kWh", name: "Kilowatt Hours", description: "Battery capacity pack size." },
      ],
    },
    example: {
      title: "Electric Car Example",
      scenario: "40 kWh battery with 280 km range charged at home for ₹8/unit.",
      inputs: { "Battery": "40 kWh", "Range": "280 km", "Electricity Tariff": "₹8/unit" },
      calculationSteps: [
        "Full Charge Cost = 40 × 8 = ₹320.",
        "Cost per km = ₹320 / 280 km = ₹1.14 / km.",
        "Compared to petrol (~₹7.00/km), you save over ₹1,600 every full charge.",
      ],
      result: "Running cost is just ₹1.14 per km.",
    },
    faqs: [
      {
        question: "How does public DC fast charging cost compare to home charging?",
        answer: "Commercial DC fast chargers typically charge ₹18 to ₹24 per unit, which is roughly 2 to 3 times home electricity tariffs.",
      },
    ],
  },
  relatedSlugs: ["fuel-cost-calculator", "trip-cost-calculator"],
};

// 4. Road Trip Cost & Split Calculator
export const tripCostCalculatorConfig: CalculatorEngineConfig = {
  id: "trip-cost-calculator",
  slug: "trip-cost-calculator",
  name: "Road Trip Cost & Split Calculator",
  category: "automotive",
  categoryName: "Automotive & Travel",
  inputs: [
    { name: "totalDistanceKm", label: "Round Trip Distance", type: "number", defaultValue: 600, min: 10, max: 10000, step: 25, suffix: "km" },
    { name: "vehicleMileage", label: "Vehicle Mileage", type: "number", defaultValue: 15, min: 5, max: 50, step: 1, suffix: "km/L" },
    { name: "fuelPrice", label: "Fuel Price per Liter", type: "currency", defaultValue: 100, min: 50, max: 200, step: 1, prefix: "₹" },
    { name: "tollCharges", label: "Toll Charges", type: "currency", defaultValue: 800, min: 0, max: 10000, step: 50, prefix: "₹" },
    { name: "passengers", label: "Total Travelers (Split)", type: "slider", defaultValue: 4, min: 1, max: 10, step: 1, suffix: "people" },
  ],
  calculate: (inputs) => {
    const dist = Math.max(1, inputs.totalDistanceKm || 600);
    const mileage = Math.max(1, inputs.vehicleMileage || 15);
    const fuelPrice = Math.max(1, inputs.fuelPrice || 100);
    const toll = Math.max(0, inputs.tollCharges || 0);
    const people = Math.max(1, inputs.passengers || 4);

    const fuelCost = Math.round((dist / mileage) * fuelPrice);
    const totalTripCost = fuelCost + toll;
    const costPerPerson = Math.round(totalTripCost / people);

    return {
      results: [
        { id: "perPerson", label: "Cost Per Person (Split)", value: costPerPerson, formattedValue: formatINR(costPerPerson), isHighlighted: true, variant: "primary" },
        { id: "total", label: "Total Combined Trip Cost", value: totalTripCost, formattedValue: formatINR(totalTripCost), variant: "success" },
        { id: "fuel", label: "Fuel Expense Portion", value: fuelCost, formattedValue: formatINR(fuelCost) },
      ],
      breakdown: {
        headers: ["Expense Item", "Total Amount", "Per Person Split"],
        rows: [
          ["Fuel Expense", formatINR(fuelCost), formatINR(Math.round(fuelCost / people))],
          ["Toll Plaza Charges", formatINR(toll), formatINR(Math.round(toll / people))],
          ["Grand Total", formatINR(totalTripCost), formatINR(costPerPerson)],
        ],
      },
    };
  },
  content: {
    shortDescription: "Calculate overall journey cost including fuel, highway toll charges, and split equally among travel companions.",
    whatIsIt: "Road trip budget calculator to split travel expenses fairly.",
    whyUseIt: "Eliminates confusion and manual spreadsheet math when traveling with friends or colleagues.",
    howItWorks: "Combines total fuel expenditure with toll fees and divides by passenger headcount.",
    formula: {
      title: "Trip Split Formula",
      expression: "Cost Per Person = (Fuel Cost + Tolls + Incidental Expenses) / Passengers",
      variables: [
        { symbol: "Passengers", name: "Group Size", description: "Number of people sharing vehicle." },
      ],
    },
    example: {
      title: "Weekend Trip Example",
      scenario: "4 friends driving 600 km roundtrip with ₹800 in highway tolls.",
      inputs: { "Distance": "600 km", "Mileage": "15 km/L", "Fuel": "₹100/L", "Tolls": "₹800", "People": "4" },
      calculationSteps: [
        "Fuel = (600 / 15) × 100 = ₹4,000.",
        "Total = ₹4,000 + ₹800 = ₹4,800.",
        "Per Person = ₹4,800 / 4 = ₹1,200.",
      ],
      result: "Each traveler contributes ₹1,200.",
    },
    faqs: [
      {
        question: "Can I add hotel and food costs to this split?",
        answer: "Yes, you can add food and lodging expenses under incidental expenses to calculate the overall per-person tour cost.",
      },
    ],
  },
  relatedSlugs: ["fuel-cost-calculator", "mileage-calculator"],
};

// 5. Speed, Time & Distance Calculator
export const speedTimeDistanceCalculatorConfig: CalculatorEngineConfig = {
  id: "speed-time-distance-calculator",
  slug: "speed-time-distance-calculator",
  name: "Speed, Time & Distance Calculator",
  category: "automotive",
  categoryName: "Automotive & Travel",
  inputs: [
    { name: "distanceKm", label: "Distance to Travel", type: "number", defaultValue: 240, min: 1, max: 20000, step: 10, suffix: "km" },
    { name: "averageSpeedKmh", label: "Average Speed", type: "slider", defaultValue: 60, min: 10, max: 200, step: 5, suffix: "km/h" },
  ],
  calculate: (inputs) => {
    const dist = Math.max(0.1, inputs.distanceKm || 240);
    const speed = Math.max(1, inputs.averageSpeedKmh || 60);

    const totalHours = dist / speed;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    return {
      results: [
        { id: "time", label: "Estimated Travel Time", value: `${hours}h ${minutes}m`, formattedValue: `${hours} Hours ${minutes} Minutes`, isHighlighted: true, variant: "primary" },
        { id: "decimalHours", label: "Decimal Time", value: totalHours.toFixed(2), formattedValue: `${totalHours.toFixed(2)} Hours`, variant: "success" },
        { id: "pace", label: "Travel Pace", value: (60 / speed).toFixed(1), formattedValue: `${(60 / speed).toFixed(1)} mins / km` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate estimated arrival time, duration, or required speed using the fundamental physics formula.",
    whatIsIt: "Solves time, speed, or distance variables for driving, train journeys, and cycling trips.",
    whyUseIt: "Accurately predict arrival times (ETA) based on realistic highway cruising speeds.",
    howItWorks: "Time = Distance / Speed.",
    formula: {
      title: "Speed-Time-Distance Law",
      expression: "Time = Distance / Speed",
      variables: [
        { symbol: "Distance", name: "Journey Length", description: "Kilometers." },
        { symbol: "Speed", name: "Velocity", description: "Kilometers per hour." },
      ],
    },
    example: {
      title: "Journey Duration Example",
      scenario: "Driving 240 km at an average speed of 60 km/h.",
      inputs: { "Distance": "240 km", "Speed": "60 km/h" },
      calculationSteps: ["Time = 240 / 60 = 4.0 Hours."],
      result: "Total journey duration is 4 Hours 0 Minutes.",
    },
    faqs: [
      {
        question: "Why does my actual travel time exceed calculated time?",
        answer: "Calculations assume constant velocity. Traffic signals, toll queues, and rest breaks reduce real-world average speed.",
      },
    ],
  },
  relatedSlugs: ["fuel-cost-calculator", "trip-cost-calculator"],
};

