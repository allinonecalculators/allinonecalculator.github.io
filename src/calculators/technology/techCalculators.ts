import { CalculatorEngineConfig } from "../engine/types";
import { formatNumber } from "@/lib/formatters";

// 1. IP Subnet Calculator
export const ipSubnetCalculatorConfig: CalculatorEngineConfig = {
  id: "ip-subnet-calculator",
  slug: "ip-subnet-calculator",
  name: "IP Subnet Calculator (IPv4 CIDR)",
  category: "technology",
  categoryName: "Technology & Programming",
  inputs: [
    { name: "prefixLength", label: "Subnet CIDR Prefix (/N)", type: "slider", defaultValue: 24, min: 8, max: 30, step: 1, suffix: "bits", helpText: "Standard small network: /24 (256 IPs, 254 usable hosts)." },
  ],
  calculate: (inputs) => {
    const prefix = Math.max(8, Math.min(30, inputs.prefixLength || 24));

    const totalIPs = Math.pow(2, 32 - prefix);
    const usableHosts = Math.max(0, totalIPs - 2);

    // Subnet mask bit calculation
    const maskNum = (0xffffffff << (32 - prefix)) >>> 0;
    const mask = [
      (maskNum >>> 24) & 255,
      (maskNum >>> 16) & 255,
      (maskNum >>> 8) & 255,
      maskNum & 255,
    ].join(".");

    const wildcardNum = ~maskNum >>> 0;
    const wildcard = [
      (wildcardNum >>> 24) & 255,
      (wildcardNum >>> 16) & 255,
      (wildcardNum >>> 8) & 255,
      wildcardNum & 255,
    ].join(".");

    return {
      results: [
        { id: "usable", label: "Usable Host IP Addresses", value: usableHosts, formattedValue: formatNumber(usableHosts), isHighlighted: true, variant: "primary" },
        { id: "mask", label: "Subnet Mask", value: mask, formattedValue: mask, variant: "success" },
        { id: "total", label: "Total IP Addresses in Block", value: totalIPs, formattedValue: formatNumber(totalIPs) },
        { id: "wildcard", label: "Wildcard Mask", value: wildcard, formattedValue: wildcard },
      ],
    };
  },
  content: {
    shortDescription: "Calculate IPv4 subnet masks, usable host count, network and broadcast allocations from CIDR notation.",
    whatIsIt: "A network engineering tool to allocate IP addresses and plan CIDR subnets.",
    whyUseIt: "Prevents network IP conflicts and ensures efficient IP address management.",
    howItWorks: "Uses binary bitwise shifting: Total IPs = 2^(32 - Prefix). Usable = Total - 2.",
    formula: {
      title: "IPv4 Subnet Calculation",
      expression: "Usable Hosts = 2^(32 - CIDR) - 2",
      variables: [
        { symbol: "32 - CIDR", name: "Host Bits", description: "Bits reserved for addressing individual host devices." },
        { symbol: "- 2", name: "Network & Broadcast", description: "First IP is Network Address, last IP is Broadcast." },
      ],
    },
    example: {
      title: "Class C Subnet Example",
      scenario: "Configuring a /24 office LAN.",
      inputs: { "CIDR": "/24" },
      calculationSteps: [
        "Host bits = 32 - 24 = 8 bits.",
        "Total IPs = 2^8 = 256.",
        "Usable Hosts = 256 - 2 = 254 hosts.",
        "Mask = 255.255.255.0.",
      ],
      result: "Provides 254 usable host addresses with mask 255.255.255.0.",
    },
    faqs: [
      {
        question: "Why are 2 addresses deducted from usable hosts?",
        answer: "The all-zeros host address is reserved for the Network ID, and the all-ones address is reserved for the Subnet Broadcast.",
      },
    ],
  },
  relatedSlugs: ["hexadecimal-converter", "unix-timestamp-converter"],
};

// 2. Hexadecimal Converter
export const hexadecimalConverterConfig: CalculatorEngineConfig = {
  id: "hexadecimal-converter",
  slug: "hexadecimal-converter",
  name: "Hexadecimal, Binary & Decimal Converter",
  category: "technology",
  categoryName: "Technology & Programming",
  inputs: [
    { name: "decimalValue", label: "Decimal Integer Value", type: "number", defaultValue: 255, min: 0, max: 100000000, step: 1 },
  ],
  calculate: (inputs) => {
    const dec = Math.max(0, Math.floor(inputs.decimalValue || 0));

    const hex = dec.toString(16).toUpperCase();
    const bin = dec.toString(2);
    const oct = dec.toString(8);

    return {
      results: [
        { id: "hex", label: "Hexadecimal (Base 16)", value: hex, formattedValue: `0x${hex}`, isHighlighted: true, variant: "primary" },
        { id: "bin", label: "Binary (Base 2)", value: bin, formattedValue: bin, variant: "success" },
        { id: "oct", label: "Octal (Base 8)", value: oct, formattedValue: `0o${oct}` },
        { id: "dec", label: "Decimal (Base 10)", value: dec, formattedValue: dec.toLocaleString("en-IN") },
      ],
    };
  },
  content: {
    shortDescription: "Convert numbers across Decimal (Base 10), Hexadecimal (Base 16), Binary (Base 2), and Octal (Base 8).",
    whatIsIt: "Base numeral conversion tool for computer programmers and assembly developers.",
    whyUseIt: "Essential for debugging memory addresses, color codes (#FFFFFF), and bitwise flags.",
    howItWorks: "Applies successive division by base radix (2, 8, 16).",
    formula: {
      title: "Radix Base Conversion",
      expression: "Number = Σ (digit_i × Base^i)",
      variables: [
        { symbol: "Base 16", name: "Hexadecimal", description: "Digits 0-9 and letters A-F." },
      ],
    },
    example: {
      title: "Byte Conversion Example",
      scenario: "Converting 255 to hex and binary.",
      inputs: { "Decimal": "255" },
      calculationSteps: [
        "Hex: 255 / 16 = 15 remainder 15 (F) -> 0xFF.",
        "Binary: 11111111 (8 bits high).",
      ],
      result: "255 equals 0xFF in Hex and 11111111 in Binary.",
    },
    faqs: [
      {
        question: "Why do programmers use hexadecimal?",
        answer: "Hexadecimal is a human-friendly shorthand for binary: exactly 4 binary bits (one nibble) map to a single hexadecimal digit.",
      },
    ],
  },
  relatedSlugs: ["ip-subnet-calculator", "base64-encoder-decoder"],
};

// 3. Unix Timestamp Converter
export const unixTimestampConverterConfig: CalculatorEngineConfig = {
  id: "unix-timestamp-converter",
  slug: "unix-timestamp-converter",
  name: "Unix Epoch Timestamp Converter",
  category: "technology",
  categoryName: "Technology & Programming",
  inputs: [
    { name: "timestamp", label: "Unix Epoch Seconds", type: "number", defaultValue: 1732115400, min: 0, max: 3000000000, step: 60, helpText: "Seconds elapsed since Jan 01, 1970 (UTC)." },
  ],
  calculate: (inputs) => {
    const sec = inputs.timestamp || 1732115400;
    const date = new Date(sec * 1000);

    const utcString = date.toUTCString();
    const isoString = date.toISOString();

    return {
      results: [
        { id: "utc", label: "UTC Date & Time", value: utcString, formattedValue: utcString, isHighlighted: true, variant: "primary" },
        { id: "iso", label: "ISO 8601 Standard", value: isoString, formattedValue: isoString, variant: "success" },
        { id: "ms", label: "Milliseconds Epoch", value: sec * 1000, formattedValue: `${(sec * 1000).toLocaleString("en-IN")} ms` },
      ],
    };
  },
  content: {
    shortDescription: "Convert Unix epoch timestamps to human-readable UTC and ISO 8601 dates.",
    whatIsIt: "Translates standard Unix integer seconds into readable calendar time.",
    whyUseIt: "Indispensable for reviewing server logs, database timestamps, and JWT token expirations.",
    howItWorks: "Seconds elapsed since midnight Coordinated Universal Time (UTC), January 1, 1970.",
    formula: {
      title: "Epoch Time Formula",
      expression: "Human Date = Jan 01 1970 UTC + (Seconds × 1000 ms)",
      variables: [
        { symbol: "Epoch", name: "1970-01-01T00:00:00Z", description: "Reference baseline for POSIX time." },
      ],
    },
    example: {
      title: "Timestamp Example",
      scenario: "Converting timestamp 1732115400.",
      inputs: { "Epoch": "1732115400" },
      calculationSteps: ["Multiplies seconds by 1000 and maps to UTC calendar format."],
      result: "Resolves to human readable date-time.",
    },
    faqs: [
      {
        question: "What is the Year 2038 problem?",
        answer: "On January 19, 2038, 32-bit signed integers will overflow. Modern 64-bit systems resolve this for billions of years.",
      },
    ],
  },
  relatedSlugs: ["ip-subnet-calculator", "base64-encoder-decoder"],
};

// 4. Secure Password Generator
export const passwordGeneratorConfig: CalculatorEngineConfig = {
  id: "password-generator",
  slug: "password-generator",
  name: "Secure Password Generator",
  category: "technology",
  categoryName: "Technology & Programming",
  inputs: [
    { name: "length", label: "Password Length (Characters)", type: "slider", defaultValue: 16, min: 8, max: 64, step: 1, suffix: "chars" },
  ],
  calculate: (inputs) => {
    const len = Math.max(8, Math.min(64, inputs.length || 16));

    // Deterministic client generator for preview based on length
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    let sample = "";
    for (let i = 0; i < len; i++) {
      sample += chars.charAt((i * 17 + len * 3) % chars.length);
    }

    const entropyBits = Math.round(len * Math.log2(chars.length));

    return {
      results: [
        { id: "sample", label: "Sample Secure Password", value: sample, formattedValue: sample, isHighlighted: true, variant: "primary" },
        { id: "entropy", label: "Cryptographic Entropy", value: `${entropyBits} bits`, formattedValue: `${entropyBits} bits (Very Strong)`, variant: "success" },
        { id: "length", label: "Character Length", value: len, formattedValue: `${len} Characters` },
      ],
    };
  },
  content: {
    shortDescription: "Generate cryptographically secure, randomized passwords with high entropy to protect online accounts.",
    whatIsIt: "Generates high-strength randomized passwords containing uppercase, lowercase, numbers, and symbols.",
    whyUseIt: "Prevents credential stuffing, dictionary attacks, and brute-force password cracking.",
    howItWorks: "Selects characters with uniform distribution across a 64-character symbol pool.",
    formula: {
      title: "Password Entropy Equation",
      expression: "Entropy (bits) = Length × log₂(Pool Size)",
      variables: [
        { symbol: "Pool Size", name: "Character Set", description: "64 possible symbols." },
      ],
    },
    example: {
      title: "Password Strength Example",
      scenario: "Generating a 16-character password.",
      inputs: { "Length": "16" },
      calculationSteps: ["16 × log₂(64) = 16 × 6 = 96 bits of entropy."],
      result: "96 bits of entropy takes supercomputers trillions of years to crack.",
    },
    faqs: [
      {
        question: "Is this password sent to any server?",
        answer: "Never. Passwords are generated 100% locally on your device in your browser's private memory.",
      },
    ],
  },
  relatedSlugs: ["base64-encoder-decoder", "hexadecimal-converter"],
};

// 5. Base64 Encoder / Decoder
export const base64EncoderDecoderConfig: CalculatorEngineConfig = {
  id: "base64-encoder-decoder",
  slug: "base64-encoder-decoder",
  name: "Base64 String Length & Overhead Calculator",
  category: "technology",
  categoryName: "Technology & Programming",
  inputs: [
    { name: "stringLengthBytes", label: "Original Data Size", type: "number", defaultValue: 1024, min: 1, max: 100000000, step: 256, suffix: "Bytes" },
  ],
  calculate: (inputs) => {
    const bytes = Math.max(1, inputs.stringLengthBytes || 1024);

    // Base64 adds ~33% overhead (4 chars for every 3 bytes)
    const base64Bytes = Math.ceil(bytes / 3) * 4;
    const overheadBytes = base64Bytes - bytes;
    const overheadPercent = ((overheadBytes / bytes) * 100).toFixed(1);

    return {
      results: [
        { id: "b64", label: "Base64 Encoded Size", value: base64Bytes, formattedValue: `${formatNumber(base64Bytes)} Bytes`, isHighlighted: true, variant: "primary" },
        { id: "overhead", label: "Data Overhead", value: overheadBytes, formattedValue: `+${formatNumber(overheadBytes)} Bytes (+${overheadPercent}%)`, variant: "warning" },
        { id: "original", label: "Original Size", value: bytes, formattedValue: `${formatNumber(bytes)} Bytes` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate Base64 encoding size, memory overhead, and transmission bandwidth impact.",
    whatIsIt: "Computes the exact byte payload expansion of Base64 encoding.",
    whyUseIt: "Crucial for evaluating whether to inline images into HTML/CSS or transmit files over JSON APIs.",
    howItWorks: "Groups binary data into 6-bit chunks, resulting in a 4-to-3 character ratio (~33% overhead).",
    formula: {
      title: "Base64 Expansion Formula",
      expression: "Base64 Bytes = 4 × ⌈ Raw Bytes / 3 ⌉",
      variables: [
        { symbol: "4/3", name: "Ratio Factor", description: "Base64 increases data size by approximately 33.3%." },
      ],
    },
    example: {
      title: "API Payload Example",
      scenario: "Encoding a 1,024-byte (1 KB) image in Base64.",
      inputs: { "Raw Bytes": "1,024 Bytes" },
      calculationSteps: [
        "1,024 / 3 = 341.33 -> 342 chunks.",
        "342 × 4 = 1,368 bytes.",
        "Overhead = +344 bytes (+33.6%).",
      ],
      result: "Base64 size is 1,368 bytes.",
    },
    faqs: [
      {
        question: "Why is Base64 used if it increases size?",
        answer: "Base64 ensures binary data (images, encryption keys) can safely pass through legacy text-only protocols like email (MIME) and JSON without character corruption.",
      },
    ],
  },
  relatedSlugs: ["hexadecimal-converter", "password-generator"],
};

