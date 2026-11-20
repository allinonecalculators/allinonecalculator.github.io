# SmartCalc - All-in-One Online Calculator Platform

SmartCalc is a high-performance, SEO-optimized, free online calculator platform engineered using Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui. Built for lightning-fast client-side execution, full mobile responsiveness, and zero-server dependency (100% static export compatible with GitHub Pages).

---

## 🌟 Key Features

- **50+ Specialized Calculators**: Finance, Banking & Loans, Healthcare & Fitness, Mathematics, Business & Tax, Construction, Unit Converters, Tech/Dev tools, Education, and Automotive.
- **100% Client-Side & Private**: Calculations run completely in the user's browser. No sensitive financial or health data leaves the device.
- **Dynamic Real-Time Results**: Interactive charts (Recharts) and breakdowns update in real time.
- **SEO & Core Web Vitals Optimized**: Semantic HTML5, structured data (JSON-LD), automated sitemap, canonical links, and OpenGraph social tags.
- **AdSense & Monetization Architecture**: Clean, non-intrusive ad placement slots (`AdBanner`, `AdInArticle`, `AdSidebar`, `AdFooter`) compliant with Google AdSense quality guidelines.
- **GitHub Pages Ready**: Static export configuration (`output: "export"`) with GitHub Actions workflow for zero-cost automated hosting.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm run test
```

### 4. Build Static Site (GitHub Pages Export)
```bash
npm run build
```
Generates production-ready HTML/CSS/JS in the `/out` directory.

---

## 📂 Project Architecture

```
AllinoneCalculator/
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD
├── public/                         # Static assets (robots.txt, sitemap.xml)
├── src/
│   ├── app/                        # Next.js App Router (pages, layout, globals.css)
│   ├── calculators/                # Calculation engine, types, and central registry
│   ├── components/
│   │   ├── ui/                     # Reusable UI primitives (Button, Card, Badge, Input)
│   │   ├── layout/                 # Global Header, Footer, Navigation, ThemeToggle
│   │   ├── ads/                    # AdSense-compliant ad placement components
│   │   └── common/                 # Search, Breadcrumbs, etc.
│   ├── context/                    # ThemeContext (Light/Dark mode)
│   ├── lib/                        # Formatting utilities (INR ₹, numbers) & cn helper
│   └── tests/                      # Automated Vitest suites
├── next.config.mjs                 # Next.js static export config
├── tailwind.config.ts              # Tailwind CSS design system tokens
└── vitest.config.ts                # Unit testing configuration
```

---

## 📄 License
MIT License

