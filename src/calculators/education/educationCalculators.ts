import { CalculatorEngineConfig } from "../engine/types";
import { formatNumber, formatPercentage } from "@/lib/formatters";

// 1. CGPA Calculator
export const cgpaCalculatorConfig: CalculatorEngineConfig = {
  id: "cgpa-calculator",
  slug: "cgpa-calculator",
  name: "CGPA to Percentage Calculator",
  category: "education",
  categoryName: "Education & Student",
  inputs: [
    { name: "cgpa", label: "CGPA Score (10 Point Scale)", type: "slider", defaultValue: 8.4, min: 1.0, max: 10.0, step: 0.1, suffix: "CGPA" },
    { name: "multiplier", label: "University Multiplier", type: "number", defaultValue: 9.5, min: 7.0, max: 10.0, step: 0.1, helpText: "CBSE and most central universities use 9.5. Some state universities use 10.0." },
  ],
  calculate: (inputs) => {
    const cgpa = Math.max(0, Math.min(10, inputs.cgpa || 8.4));
    const mul = Math.max(1, inputs.multiplier || 9.5);

    const percentage = cgpa * mul;
    let division = "First Division with Distinction";
    if (percentage < 40) division = "Fail / Needs Improvement";
    else if (percentage < 50) division = "Third Division";
    else if (percentage < 60) division = "Second Division";
    else if (percentage < 75) division = "First Division";

    return {
      results: [
        { id: "percentage", label: "Equivalent Percentage", value: percentage, formattedValue: formatPercentage(percentage), isHighlighted: true, variant: "primary" },
        { id: "division", label: "Academic Standing", value: division, formattedValue: division, variant: "success" },
        { id: "cgpaScore", label: "Original CGPA", value: cgpa, formattedValue: `${cgpa.toFixed(2)} / 10.0` },
      ],
    };
  },
  content: {
    shortDescription: "Convert CGPA to percentage using standard CBSE (9.5 multiplier) or university-specific grading scales.",
    whatIsIt: "Translates Cumulative Grade Point Average into standard percentage marks for job applications and higher education.",
    whyUseIt: "Required by corporate campus placements, UPSC, and government job eligibility criteria.",
    howItWorks: "Percentage = CGPA × Conversion Multiplier (default 9.5).",
    formula: {
      title: "CBSE CGPA Conversion Formula",
      expression: "Percentage = CGPA × 9.5",
      variables: [
        { symbol: "9.5", name: "CBSE Factor", description: "Standardized multiplier established by the Central Board." },
      ],
    },
    example: {
      title: "CGPA Conversion Example",
      scenario: "Student with 8.4 CGPA on a 10-point scale.",
      inputs: { "CGPA": "8.4", "Multiplier": "9.5" },
      calculationSteps: ["8.4 × 9.5 = 79.8%."],
      result: "8.4 CGPA translates to 79.80% (First Division).",
    },
    faqs: [
      {
        question: "Why does CBSE use 9.5 instead of 10?",
        answer: "CBSE observed that the average marks of the top 91-100 band historically hovered around 95%, making 9.5 the most statistically accurate linear approximation.",
      },
    ],
  },
  relatedSlugs: ["gpa-calculator", "exam-percentage-calculator", "percentage-to-marks-calculator"],
};

// 2. GPA Calculator (4.0 Scale)
export const gpaCalculatorConfig: CalculatorEngineConfig = {
  id: "gpa-calculator",
  slug: "gpa-calculator",
  name: "College GPA Calculator (4.0 Scale)",
  category: "education",
  categoryName: "Education & Student",
  inputs: [
    { name: "gpa", label: "US GPA (4.0 Scale)", type: "slider", defaultValue: 3.5, min: 1.0, max: 4.0, step: 0.05, suffix: "GPA" },
  ],
  calculate: (inputs) => {
    const gpa = Math.max(0, Math.min(4.0, inputs.gpa || 3.5));

    // Standard US 4.0 to Percentage conversion: (GPA / 4) * 100 or polynomial mapping
    const percentage = (gpa / 4) * 100;
    let letterGrade = "A";
    if (gpa >= 3.7) letterGrade = "A / A+";
    else if (gpa >= 3.3) letterGrade = "B+";
    else if (gpa >= 3.0) letterGrade = "B";
    else if (gpa >= 2.7) letterGrade = "B-";
    else if (gpa >= 2.0) letterGrade = "C";
    else letterGrade = "D / F";

    return {
      results: [
        { id: "gpa", label: "Cumulative GPA", value: gpa, formattedValue: `${gpa.toFixed(2)} / 4.00`, isHighlighted: true, variant: "primary" },
        { id: "letter", label: "Letter Grade", value: letterGrade, formattedValue: letterGrade, variant: "success" },
        { id: "percent", label: "Estimated Percentage", value: percentage, formattedValue: formatPercentage(percentage) },
      ],
    };
  },
  content: {
    shortDescription: "Calculate 4.0 scale college Grade Point Average (GPA) and translate to letter grades and percentages.",
    whatIsIt: "Translates standard university grading across international 4.0 GPA benchmarks.",
    whyUseIt: "Required when applying to US, Canadian, and European universities.",
    howItWorks: "Maps 4.0 scale benchmarks to percentage equivalencies.",
    formula: {
      title: "4.0 GPA Equation",
      expression: "Percentage = (GPA / 4.0) × 100",
      variables: [
        { symbol: "4.0", name: "Max GPA", description: "Top academic honors." },
      ],
    },
    example: {
      title: "GPA Example",
      scenario: "Student with 3.5 GPA.",
      inputs: { "GPA": "3.5" },
      calculationSteps: ["(3.5 / 4.0) × 100 = 87.5% (Grade A)."],
      result: "3.5 GPA equals Grade A (87.5%).",
    },
    faqs: [
      {
        question: "What is considered a good GPA on a 4.0 scale?",
        answer: "A GPA of 3.0 or higher is generally considered good, while 3.5+ represents academic honors (Cum Laude).",
      },
    ],
  },
  relatedSlugs: ["cgpa-calculator", "exam-percentage-calculator"],
};

// 3. Percentage to Marks Calculator
export const percentageToMarksCalculatorConfig: CalculatorEngineConfig = {
  id: "percentage-to-marks-calculator",
  slug: "percentage-to-marks-calculator",
  name: "Percentage to Marks Calculator",
  category: "education",
  categoryName: "Education & Student",
  inputs: [
    { name: "targetPercentage", label: "Target Percentage", type: "percentage", defaultValue: 85, min: 1, max: 100, step: 0.5, suffix: "%" },
    { name: "totalMarks", label: "Total Maximum Marks", type: "number", defaultValue: 600, min: 50, max: 2000, step: 50 },
  ],
  calculate: (inputs) => {
    const p = Math.max(0, Math.min(100, inputs.targetPercentage || 85));
    const total = Math.max(1, inputs.totalMarks || 600);

    const requiredMarks = Math.round((p / 100) * total);

    return {
      results: [
        { id: "marks", label: "Marks Required", value: requiredMarks, formattedValue: `${requiredMarks} / ${total}`, isHighlighted: true, variant: "primary" },
        { id: "remaining", label: "Buffer Marks Allowed to Lose", value: total - requiredMarks, formattedValue: `${total - requiredMarks} Marks`, variant: "success" },
      ],
    };
  },
  content: {
    shortDescription: "Calculate exact marks required out of maximum marks to achieve your target percentage.",
    whatIsIt: "Translates percentage targets into concrete exam score objectives.",
    whyUseIt: "Helps students plan exam preparation to achieve scholarship and college cutoffs.",
    howItWorks: "Marks Required = (Target% / 100) × Total Marks.",
    formula: {
      title: "Marks Target Formula",
      expression: "Marks = (Percentage / 100) × Total Marks",
      variables: [
        { symbol: "Total Marks", name: "Exam Maximum", description: "Aggregate sum of all subject maximums." },
      ],
    },
    example: {
      title: "Board Exam Goal Example",
      scenario: "Aiming for 85% in a 600-mark board exam.",
      inputs: { "Target": "85%", "Total": "600 Marks" },
      calculationSteps: ["(85 / 100) × 600 = 0.85 × 600 = 510 marks."],
      result: "You need 510 marks out of 600 to score 85%.",
    },
    faqs: [
      {
        question: "Can I use this for university semesters?",
        answer: "Yes, works across all board exams, semester exams, and competitive tests.",
      },
    ],
  },
  relatedSlugs: ["exam-percentage-calculator", "cgpa-calculator"],
};

// 4. Exam Percentage Calculator
export const examPercentageCalculatorConfig: CalculatorEngineConfig = {
  id: "exam-percentage-calculator",
  slug: "exam-percentage-calculator",
  name: "Exam Percentage Calculator",
  category: "education",
  categoryName: "Education & Student",
  inputs: [
    { name: "marksObtained", label: "Total Marks Obtained", type: "number", defaultValue: 485, min: 0, max: 2000, step: 1 },
    { name: "totalMarks", label: "Total Maximum Marks", type: "number", defaultValue: 600, min: 10, max: 2000, step: 10 },
  ],
  calculate: (inputs) => {
    const obtained = Math.max(0, inputs.marksObtained || 0);
    const total = Math.max(1, inputs.totalMarks || 600);

    const percentage = Math.min(100, (obtained / total) * 100);
    let grade = "A+";
    if (percentage < 35) grade = "F (Fail)";
    else if (percentage < 50) grade = "C";
    else if (percentage < 60) grade = "B";
    else if (percentage < 75) grade = "A";
    else if (percentage < 90) grade = "A+";
    else grade = "Outstanding (O)";

    return {
      results: [
        { id: "percent", label: "Aggregate Percentage", value: percentage, formattedValue: formatPercentage(percentage), isHighlighted: true, variant: "primary" },
        { id: "grade", label: "Resulting Grade", value: grade, formattedValue: grade, variant: "success" },
        { id: "lost", label: "Marks Lost", value: total - obtained, formattedValue: `${total - obtained} Marks` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate overall exam percentage, distinction standing, and grades from marks obtained.",
    whatIsIt: "Computes aggregate academic percentage for school and college examinations.",
    whyUseIt: "Instantly check your result status and grade bracket.",
    howItWorks: "Percentage = (Marks Obtained / Total Marks) × 100.",
    formula: {
      title: "Exam Percentage Formula",
      expression: "Percentage = (Marks Scored / Maximum Marks) × 100",
      variables: [
        { symbol: "Marks Scored", name: "Numerator", description: "Sum of points achieved." },
      ],
    },
    example: {
      title: "Result Calculation Example",
      scenario: "Scoring 485 marks out of 600.",
      inputs: { "Scored": "485", "Total": "600" },
      calculationSteps: ["(485 / 600) × 100 = 80.83%."],
      result: "Aggregate percentage is 80.83% (Distinction).",
    },
    faqs: [
      {
        question: "How is percentage rounded in mark sheets?",
        answer: "Most academic boards round to two decimal places (e.g. 80.83%).",
      },
    ],
  },
  relatedSlugs: ["percentage-to-marks-calculator", "cgpa-calculator"],
};

// 5. College Attendance Calculator (75% Rule)
export const attendanceCalculatorConfig: CalculatorEngineConfig = {
  id: "attendance-calculator",
  slug: "attendance-calculator",
  name: "College Attendance Calculator (75% Rule)",
  category: "education",
  categoryName: "Education & Student",
  inputs: [
    { name: "classesAttended", label: "Classes Attended", type: "number", defaultValue: 42, min: 0, max: 500, step: 1 },
    { name: "totalClassesHeld", label: "Total Classes Conducted", type: "number", defaultValue: 50, min: 1, max: 500, step: 1 },
  ],
  calculate: (inputs) => {
    const attended = Math.max(0, inputs.classesAttended || 0);
    const total = Math.max(1, inputs.totalClassesHeld || 50);

    const currentPercent = (attended / total) * 100;
    const target = 75;

    let message = "";
    let safeBunks = 0;
    let classesToAttend = 0;

    if (currentPercent >= target) {
      // How many classes can be safely bunked without dropping below 75%:
      // (attended) / (total + x) >= 0.75 => x <= (attended / 0.75) - total
      safeBunks = Math.floor(attended / 0.75 - total);
      message = `You can safely miss ${safeBunks} more classes and stay above 75%.`;
    } else {
      // How many consecutive classes must be attended to reach 75%:
      // (attended + x) / (total + x) >= 0.75 => 0.25x >= 0.75*total - attended => x >= (3*total - 4*attended)
      classesToAttend = Math.ceil(3 * total - 4 * attended);
      message = `You need to attend ${classesToAttend} consecutive classes to reach 75%.`;
    }

    return {
      results: [
        { id: "current", label: "Current Attendance", value: currentPercent, formattedValue: formatPercentage(currentPercent), isHighlighted: true, variant: currentPercent >= 75 ? "primary" : "warning" },
        { id: "status", label: "75% Rule Status", value: message, formattedValue: message, variant: currentPercent >= 75 ? "success" : "warning" },
        { id: "classes", label: "Classes Record", value: `${attended} / ${total}`, formattedValue: `${attended} of ${total} attended` },
      ],
    };
  },
  content: {
    shortDescription: "Calculate attendance percentage and find out how many classes you can afford to miss or must attend to maintain 75%.",
    whatIsIt: "Tracks college attendance against mandatory 75% examination eligibility criteria.",
    whyUseIt: "Prevents debarment from semester exams due to attendance shortages.",
    howItWorks: "Solves linear attendance equations to find safe bunks or required classes.",
    formula: {
      title: "Attendance Formula",
      expression: "Attendance % = (Classes Attended / Total Classes) × 100",
      variables: [
        { symbol: "75%", name: "Mandatory Threshold", description: "Standard university requirement." },
      ],
    },
    example: {
      title: "Attendance Example",
      scenario: "Attended 42 out of 50 classes (84%).",
      inputs: { "Attended": "42", "Total": "50" },
      calculationSteps: [
        "Current Attendance = 42 / 50 = 84%.",
        "Safe bunks: 42 / 0.75 = 56. 56 - 50 = 6 classes.",
      ],
      result: "You can safely miss up to 6 classes.",
    },
    faqs: [
      {
        question: "What happens if attendance falls below 75%?",
        answer: "Most Indian universities debar students from semester exams or require medical certificates/condonation fines if attendance is between 65% and 75%.",
      },
    ],
  },
  relatedSlugs: ["cgpa-calculator", "exam-percentage-calculator"],
};

