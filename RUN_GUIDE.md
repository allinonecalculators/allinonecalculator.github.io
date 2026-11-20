# SmartCalc - How to Run & Project Execution Guide

This document provides step-by-step instructions for running, testing, building, and deploying the **SmartCalc (All-in-One Calculator Platform)**.

---

## ⚡ Quick Command Reference

| Action | Command | Purpose / Output |
| :--- | :--- | :--- |
| **Start Development Server** | `npm run dev` | Runs live local server with hot reloading at `http://localhost:3000` |
| **Run Unit Tests** | `npm run test` | Executes 35 Vitest automated mathematical accuracy tests |
| **Run Tests in Watch Mode** | `npm run test:watch` | Re-runs tests automatically when code changes |
| **Build Production Export** | `npm run build` | Compiles static HTML export into the `/out` directory (125 pages) |
| **Preview Production Build** | `npx serve out` | Serves the generated static `/out` folder locally on port 3000 |
| **Code Quality Check** | `npm run lint` | Runs Next.js ESLint verification |

---

## 1. Running the Local Development Server

To run the application locally on your machine:

```bash
npm run dev
```

- **Default Address:** Open [http://localhost:3000](http://localhost:3000) in your web browser.
- **Features Active in Dev Mode:**
  - Fast Hot Module Replacement (HMR) for instant UI updates.
  - Interactive dual-bound input sliders and live recalculation.
  - Interactive Recharts visualization with tooltips.
  - Light and Dark mode theme toggling.
  - Instant client-side search across all 58 calculators.

> **Tip:** If port `3000` is already in use by another app, you can start on another port:
> ```bash
> npm run dev -- -p 3001
> ```

---

## 2. Running Automated Unit Tests

SmartCalc includes an automated Vitest test suite that verifies calculation accuracy against Reserve Bank of India (RBI) amortization standards, WHO BMI standards, Union Budget 2024 tax slabs, and CBSE grading multipliers.

To execute all tests once:
```bash
npm run test
```

To run tests in interactive watch mode while editing:
```bash
npm run test:watch
```

### Verified Test Suites:
- `src/tests/formatters.test.ts`: Indian Rupee (₹) formatting, decimals, and percentage parsing.
- `src/tests/sip.test.ts`: Systematic Investment Plan compounding and yearly schedule verification.
- `src/tests/calculators.test.ts`: 25 integration tests covering Finance, Loans, Health, Mathematics, Business & Tax, Construction, Utilities, Technology, Education, and Automotive calculators.

---

## 3. Building for Production (Static Export)

SmartCalc is configured with Next.js static export (`output: "export"`), making it 100% compatible with GitHub Pages, Netlify, Cloudflare Pages, or any static CDN.

To generate the production build:
```bash
npm run build
```

### Output:
- The production-ready files are written to the `out/` folder in the project root.
- **125 Pre-rendered Static HTML Pages Generated:**
  - Homepage (`index.html`)
  - All Calculators Directory (`all/index.html`)
  - Categories Directory (`categories/index.html`)
  - 10 Domain Hubs (`finance/`, `loans/`, `health/`, `math/`, `business/`, etc.)
  - 58 Fully Active Calculators (`/[category]/[slug]/index.html`)
  - Trust & Legal Pages (`about/`, `contact/`, `privacy-policy/`, `terms/`, `disclaimer/`, `blog/`)
  - SEO Files: `robots.txt`, `sitemap.xml`, and optimized JavaScript chunks.

---

## 4. Previewing the Production Static Build Locally

To inspect the generated static export before pushing to GitHub:

### Option A: Using `npx serve` (Recommended)
```bash
npx serve out
```
Then visit [http://localhost:3000](http://localhost:3000).

### Option B: Using Python's Built-in HTTP Server
```bash
python -m http.server 3000 --directory out
```

---

## 5. Deploying to GitHub Pages (Automated CI/CD)

The repository includes a ready-to-use GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Deployment Steps:
1. **Push your code to your GitHub repository:**
   ```bash
   git remote add origin https://github.com/<your-username>/smartcalc.git
   git push -u origin main
   ```
2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. **Automated Deployment:**
   - Every push to the `main` branch automatically triggers the workflow.
   - The workflow runs `npm ci`, verifies `npm run test`, executes `npm run build`, and deploys the `/out` folder to your custom domain or GitHub Pages URL (`https://<username>.github.io/<repo>/`).

---

## 6. Project Directory Architecture

```
AllinoneCalculator/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages CI/CD workflow
├── public/                         # Static assets (robots.txt, sitemap.xml)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML layout with ThemeProvider, Header, Footer
│   │   ├── page.tsx                # Homepage (Hero, Live Search, Top Categories)
│   │   ├── all/page.tsx            # All Calculators Search & Filter Directory
│   │   ├── categories/page.tsx     # Categories Overview Hub
│   │   ├── about/page.tsx          # About Us & Methodology
│   │   ├── contact/page.tsx        # Contact & Feedback Form
│   │   ├── privacy-policy/page.tsx # AdSense & Privacy Compliance
│   │   ├── terms/page.tsx          # Terms & Conditions
│   │   ├── disclaimer/page.tsx     # Financial, Medical & Construction Disclaimers
│   │   ├── blog/page.tsx           # Knowledge Guides Hub
│   │   ├── [category]/page.tsx     # Dynamic Category Pages
│   │   └── [category]/[slug]/page.tsx # Individual Calculator SSG Pages
│   ├── calculators/
│   │   ├── engine/
│   │   │   ├── types.ts            # Core TypeScript interfaces
│   │   │   └── registry.ts         # Central calculator engine dispatcher
│   │   ├── finance/                # SIP, Lumpsum, CI, SI, FD, RD, PPF, CAGR
│   │   ├── loans/                  # Home, Car, Personal Loan, Prepayment, Eligibility
│   │   ├── health/                 # BMI, BMR, TDEE, Calorie, Water, Age
│   │   ├── math/                   # Percentage, Fraction, Average, Sqrt, Ratio, GCD
│   │   ├── business/               # GST, Income Tax, Salary, Margins, Markup, Discount
│   │   ├── construction/           # Construction Cost, Carpet Area, Paint, Tiles, Cement
│   │   ├── utilities/              # Length, Weight, Temp, Currency, Speed, Mileage
│   │   ├── technology/             # Subnet, Hex, Unix Timestamp, Password, Base64
│   │   ├── education/              # CGPA, GPA, Marks, Exam, Attendance
│   │   └── automotive/             # Fuel Cost, Mileage, EV Charging, Trip Cost, Speed-Time
│   ├── components/
│   │   ├── calculator/             # Reusable Calculator Engine UI Components
│   │   ├── layout/                 # Global Header, Footer
│   │   ├── ads/                    # AdSense AdBanner, AdInArticle, AdSidebar
│   │   └── ui/                     # Accessible Button, Card, Badge, Input primitives
│   ├── context/
│   │   └── ThemeContext.tsx        # Light/Dark mode state management
│   ├── lib/
│   │   ├── formatters.ts           # Indian Rupee (₹), decimal, percentage formatters
│   │   └── utils.ts                # Tailwind merge helper
│   └── tests/
│       ├── formatters.test.ts      # Number formatting test suite
│       ├── sip.test.ts             # SIP calculation test suite
│       └── calculators.test.ts     # Multi-category integration tests (25 tests)
├── next.config.mjs                 # Next.js static export config (output: "export")
├── package.json                    # Project dependencies and npm scripts
├── tailwind.config.ts              # Tailwind CSS configuration
└── vitest.config.ts                # Vitest test runner configuration
```

