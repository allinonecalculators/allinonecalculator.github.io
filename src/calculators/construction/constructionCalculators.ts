import { CalculatorEngineConfig } from "../engine/types";
import { formatINR, formatNumber } from "@/lib/formatters";

// 1. Home Construction Cost Calculator
export const homeConstructionCostCalculatorConfig: CalculatorEngineConfig = {
  id: "home-construction-cost-calculator",
  slug: "home-construction-cost-calculator",
  name: "Home Construction Cost Calculator",
  category: "construction",
  categoryName: "Home & Construction",
  inputs: [
    { name: "builtUpArea", label: "Built-up Area (Sq Ft)", type: "number", defaultValue: 1500, min: 100, max: 50000, step: 50, suffix: "sq ft" },
    { name: "costPerSqFt", label: "Construction Rate per Sq Ft", type: "currency", defaultValue: 1800, min: 1000, max: 6000, step: 100, prefix: "₹", helpText: "Standard quality: ₹1,600-₹2,000/sq ft. Premium quality: ₹2,200-₹3,500/sq ft." },
  ],
  calculate: (inputs) => {
    const area = Math.max(1, inputs.builtUpArea || 1500);
    const rate = Math.max(1, inputs.costPerSqFt || 1800);

    const totalCost = area * rate;
    // Standard civil engineering cost breakdown:
    // Cement: 16%, Steel: 24%, Sand & Aggregate: 12%, Finishing & Flooring: 18%, Labour: 30%
    const cementCost = Math.round(totalCost * 0.16);
    const steelCost = Math.round(totalCost * 0.24);
    const labourCost = Math.round(totalCost * 0.30);
    const finishingCost = Math.round(totalCost * 0.30);

    return {
      results: [
        { id: "total", label: "Estimated Total Construction Cost", value: totalCost, formattedValue: formatINR(totalCost), isHighlighted: true, variant: "primary" },
        { id: "labour", label: "Estimated Labour Cost (30%)", value: labourCost, formattedValue: formatINR(labourCost), variant: "neutral" },
        { id: "materials", label: "Estimated Raw Materials (Steel + Cement)", value: cementCost + steelCost, formattedValue: formatINR(cementCost + steelCost), variant: "success" },
      ],
      breakdown: {
        headers: ["Work Category", "Cost Share", "Estimated Amount"],
        rows: [
          ["Steel & Reinforcement", "24%", formatINR(steelCost)],
          ["Cement & Concrete", "16%", formatINR(cementCost)],
          ["Labour & Contractor", "30%", formatINR(labourCost)],
          ["Flooring, Tiles, Paint & Fittings", "30%", formatINR(finishingCost)],
          ["Total Budget", "100%", formatINR(totalCost)],
        ],
      },
    };
  },
  content: {
    shortDescription: "Estimate total residential house construction cost, material requirements, and labour budgets based on square footage.",
    whatIsIt: "Estimates complete house building budgets from ground breaking to turnkey completion.",
    whyUseIt: "Prevents cost overruns and material shortages when negotiating with builders and civil contractors.",
    howItWorks: "Multiplies total built-up square footage by prevailing local construction rates per square foot.",
    formula: {
      title: "Construction Budget Formula",
      expression: "Total Cost = Built-up Area (Sq Ft) × Rate per Sq Ft",
      variables: [
        { symbol: "Area", name: "Built-up Square Feet", description: "Covered building footprint across all floors." },
        { symbol: "Rate", name: "Cost per Sq Ft", description: "All-inclusive turnkey material and labour rate." },
      ],
    },
    example: {
      title: "House Building Example",
      scenario: "Constructing a 1,500 sq ft duplex home at ₹1,800/sq ft.",
      inputs: { "Area": "1,500 Sq Ft", "Rate": "₹1,800/sq ft" },
      calculationSteps: [
        "Total Cost = 1,500 × 1,800 = ₹27,00,000.",
        "Steel cost (~24%) = ₹6,48,000.",
        "Cement cost (~16%) = ₹4,32,00,0.",
        "Labour cost (~30%) = ₹8,10,000.",
      ],
      result: "Total estimated project budget is ₹27 Lakh.",
    },
    faqs: [
      {
        question: "Does built-up area include balconies and staircases?",
        answer: "Yes, built-up area includes covered living spaces, external walls, balconies, and internal staircases.",
      },
    ],
  },
  relatedSlugs: ["carpet-area-calculator", "paint-calculator", "cement-calculator"],
};

// 2. Carpet Area Calculator
export const carpetAreaCalculatorConfig: CalculatorEngineConfig = {
  id: "carpet-area-calculator",
  slug: "carpet-area-calculator",
  name: "Carpet Area & RERA Calculator",
  category: "construction",
  categoryName: "Home & Construction",
  inputs: [
    { name: "superBuiltUp", label: "Super Built-up Area (Quoted by Builder)", type: "number", defaultValue: 1200, min: 200, max: 20000, step: 25, suffix: "sq ft" },
    { name: "loadingFactor", label: "Loading Factor Percentage", type: "percentage", defaultValue: 25, min: 10, max: 45, step: 1, suffix: "%", helpText: "Typical apartment loading ranges from 20% to 30%." },
  ],
  calculate: (inputs) => {
    const superArea = Math.max(1, inputs.superBuiltUp || 1200);
    const loading = Math.max(0, inputs.loadingFactor || 25);

    // Carpet Area = Super Built-up / (1 + Loading% / 100)
    const carpetArea = Math.round(superArea / (1 + loading / 100));
    const commonAreaLost = superArea - carpetArea;

    return {
      results: [
        { id: "carpet", label: "Usable RERA Carpet Area", value: carpetArea, formattedValue: `${carpetArea} Sq Ft (${(carpetArea * 0.0929).toFixed(1)} m²)`, isHighlighted: true, variant: "primary" },
        { id: "common", label: "Common Area & Wall Loading", value: commonAreaLost, formattedValue: `${commonAreaLost} Sq Ft (${loading}%)`, variant: "warning" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate usable RERA carpet area from builder super built-up area and loading factor.",
    whatIsIt: "Differentiates true net usable floor space (carpet area) from common amenities and external walls.",
    whyUseIt: "Protects homebuyers from paying inflated prices on non-usable common areas.",
    howItWorks: "Carpet Area = Super Built-up Area / (1 + Loading%).",
    formula: {
      title: "Carpet Area Formula",
      expression: "RERA Carpet Area = Super Built-up Area / (1 + Loading / 100)",
      variables: [
        { symbol: "Loading", name: "Loading Factor", description: "Lobbies, lift shafts, staircases, and corridors." },
      ],
    },
    example: {
      title: "Apartment Carpet Example",
      scenario: "1,200 sq ft flat with 25% builder loading.",
      inputs: { "Super Built-up": "1,200 Sq Ft", "Loading": "25%" },
      calculationSteps: [
        "Carpet Area = 1,200 / 1.25 = 960 Sq Ft.",
        "Lost to common areas = 240 Sq Ft.",
      ],
      result: "Actual usable living area is 960 Sq Ft.",
    },
    faqs: [
      {
        question: "What is RERA Carpet Area?",
        answer: "Under the Real Estate (Regulation and Development) Act (RERA), carpet area is defined as the net usable floor area of an apartment excluding external walls and common areas, but including internal partition walls.",
      },
    ],
  },
  relatedSlugs: ["home-construction-cost-calculator", "tiles-calculator"],
};

// 3. Paint Calculator
export const paintCalculatorConfig: CalculatorEngineConfig = {
  id: "paint-calculator",
  slug: "paint-calculator",
  name: "Wall Paint Calculator",
  category: "construction",
  categoryName: "Home & Construction",
  inputs: [
    { name: "carpetArea", label: "Room / Floor Area", type: "number", defaultValue: 500, min: 50, max: 20000, step: 25, suffix: "sq ft" },
    { name: "ceilingHeight", label: "Ceiling Height", type: "slider", defaultValue: 10, min: 8, max: 15, step: 0.5, suffix: "feet" },
  ],
  calculate: (inputs) => {
    const area = Math.max(1, inputs.carpetArea || 500);
    // Wall surface area rule of thumb: ~3.5 times floor area for standard rooms
    const wallArea = Math.round(area * 3.5);
    // Standard emulsion coverage: ~140 sq ft per liter for 2 coats
    const paintLiters = Math.ceil(wallArea / 140);
    const primerLiters = Math.ceil(wallArea / 180);

    return {
      results: [
        { id: "paint", label: "Wall Paint Needed (2 Coats)", value: paintLiters, formattedValue: `${paintLiters} Liters`, isHighlighted: true, variant: "primary" },
        { id: "primer", label: "Primer Coat Required", value: primerLiters, formattedValue: `${primerLiters} Liters`, variant: "success" },
        { id: "wallArea", label: "Total Wall Surface Area", value: wallArea, formattedValue: `${wallArea} Sq Ft` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate liters of wall paint, primer, and surface area coverage for rooms and apartments.",
    whatIsIt: "Estimates paint bucket quantities required for internal wall finishing.",
    whyUseIt: "Prevents buying excess expensive paint cans and enables accurate painting labour contractor quotes.",
    howItWorks: "Computes total wall surface area and divides by paint manufacturer coverage ratings.",
    formula: {
      title: "Paint Coverage Formula",
      expression: "Liters = Wall Area (Sq Ft) / Coverage per Liter (Sq Ft)",
      variables: [
        { symbol: "Coverage", name: "Coverage Rate", description: "~140 sq ft/liter for 2 emulsion coats." },
      ],
    },
    example: {
      title: "Room Painting Example",
      scenario: "500 sq ft flat painting walls with 2 coats.",
      inputs: { "Floor Area": "500 Sq Ft" },
      calculationSteps: [
        "Wall area = 500 × 3.5 = 1,750 Sq Ft.",
        "Paint required = 1,750 / 140 ≈ 12.5 (13 Liters).",
      ],
      result: "Purchase approximately 13 Liters of wall paint.",
    },
    faqs: [
      {
        question: "How many coats of paint are recommended?",
        answer: "Two coats of emulsion paint over one base coat of primer are standard for optimal color uniformity and durability.",
      },
    ],
  },
  relatedSlugs: ["tiles-calculator", "home-construction-cost-calculator"],
};

// 4. Tiles Calculator
export const tilesCalculatorConfig: CalculatorEngineConfig = {
  id: "tiles-calculator",
  slug: "tiles-calculator",
  name: "Floor & Wall Tiles Calculator",
  category: "construction",
  categoryName: "Home & Construction",
  inputs: [
    { name: "floorArea", label: "Floor Area to Tile", type: "number", defaultValue: 400, min: 20, max: 20000, step: 10, suffix: "sq ft" },
    { name: "tileLengthInches", label: "Tile Length", type: "slider", defaultValue: 24, min: 12, max: 48, step: 6, suffix: "inches" },
    { name: "tileWidthInches", label: "Tile Width", type: "slider", defaultValue: 24, min: 12, max: 48, step: 6, suffix: "inches" },
  ],
  calculate: (inputs) => {
    const area = Math.max(1, inputs.floorArea || 400);
    const l = Math.max(6, inputs.tileLengthInches || 24);
    const w = Math.max(6, inputs.tileWidthInches || 24);

    const tileAreaSqFt = (l * w) / 144;
    const baseTiles = Math.ceil(area / tileAreaSqFt);
    const tilesWithWastage = Math.ceil(baseTiles * 1.1); // 10% cutting wastage
    const boxes = Math.ceil(tilesWithWastage / 4); // 4 tiles per standard box

    return {
      results: [
        { id: "tiles", label: "Total Tiles Required (10% Buffer)", value: tilesWithWastage, formattedValue: `${tilesWithWastage} Tiles`, isHighlighted: true, variant: "primary" },
        { id: "boxes", label: "Standard Boxes Needed", value: boxes, formattedValue: `${boxes} Boxes (4 pcs/box)`, variant: "success" },
        { id: "baseTiles", label: "Exact Net Tile Count", value: baseTiles, formattedValue: `${baseTiles} Tiles` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate exact tile pieces and boxes needed for floors and bathrooms with cutting wastage buffer.",
    whatIsIt: "Determines tile quantities for vitrified tiles, ceramic tiles, and marble flooring.",
    whyUseIt: "Accounts for corner cuts, broken tiles, and perimeter cuts.",
    howItWorks: "Divides room area by individual tile area and adds a 10% wastage allowance.",
    formula: {
      title: "Tile Quantity Formula",
      expression: "Total Tiles = [ Floor Area / Tile Area ] × 1.10",
      variables: [
        { symbol: "1.10", name: "10% Wastage", description: "Buffer for cuts, breaks, and irregular wall angles." },
      ],
    },
    example: {
      title: "Flooring Example",
      scenario: "400 sq ft hall with standard 2ft × 2ft (24″ × 24″) tiles.",
      inputs: { "Area": "400 Sq Ft", "Tile Size": "2ft × 2ft (4 sq ft)" },
      calculationSteps: [
        "Net tiles = 400 / 4 = 100 tiles.",
        "With 10% wastage = 100 × 1.10 = 110 tiles.",
        "Boxes (4 per box) = 110 / 4 = 28 boxes.",
      ],
      result: "Order 28 boxes (112 tiles).",
    },
    faqs: [
      {
        question: "Why is a 10% wastage allowance necessary?",
        answer: "Tiles must be trimmed around room perimeters, door frames, and corners. Ordering exact counts results in mid-project shortages.",
      },
    ],
  },
  relatedSlugs: ["carpet-area-calculator", "paint-calculator"],
};

// 5. Cement Bags Calculator
export const cementCalculatorConfig: CalculatorEngineConfig = {
  id: "cement-calculator",
  slug: "cement-calculator",
  name: "Cement Bags Calculator",
  category: "construction",
  categoryName: "Home & Construction",
  inputs: [
    { name: "builtUpArea", label: "Slab / Construction Area", type: "number", defaultValue: 1000, min: 50, max: 20000, step: 50, suffix: "sq ft" },
  ],
  calculate: (inputs) => {
    const area = Math.max(1, inputs.builtUpArea || 1000);
    // Standard rule of thumb in civil engineering: ~0.4 cement bags per sq ft of residential construction
    const totalBags = Math.round(area * 0.4);
    const weightTons = ((totalBags * 50) / 1000).toFixed(1);

    return {
      results: [
        { id: "bags", label: "Required 50kg Cement Bags", value: totalBags, formattedValue: `${totalBags} Bags (50 kg each)`, isHighlighted: true, variant: "primary" },
        { id: "tons", label: "Total Cement Weight", value: weightTons, formattedValue: `${weightTons} Metric Tons`, variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Estimate 50kg cement bags required for concrete slabs, masonry, and wall plastering.",
    whatIsIt: "Calculates total cement bag requirements for residential building works.",
    whyUseIt: "Enables bulk cement procurement discounts directly from manufacturers.",
    howItWorks: "Uses the established civil engineering benchmark of ~0.4 bags per sq ft of built-up area.",
    formula: {
      title: "Cement Requirement Benchmark",
      expression: "Cement Bags = Built-up Area (Sq Ft) × 0.40",
      variables: [
        { symbol: "0.40", name: "Empirical Constant", description: "Bags required for RCC frame, masonry, and plastering." },
      ],
    },
    example: {
      title: "Cement Estimation Example",
      scenario: "1,000 sq ft residential slab construction.",
      inputs: { "Area": "1,000 Sq Ft" },
      calculationSteps: ["1,000 × 0.4 = 400 Bags (50 kg each)."],
      result: "Order approximately 400 cement bags (20 Metric Tons).",
    },
    faqs: [
      {
        question: "What grade of cement is best for residential slabs?",
        answer: "OPC 53 grade or PPC (Portland Pozzolana Cement) is most widely recommended for structural RCC slabs and footings.",
      },
    ],
  },
  relatedSlugs: ["home-construction-cost-calculator", "tiles-calculator"],
};

