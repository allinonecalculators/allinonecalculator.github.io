# 🚀 Custom Domain, Traffic Analytics & Google AdSense Monetization Guide

This complete guide explains how to connect **`https://allinonecalculator.io`**, track **real-time/monthly/weekly/yearly visitors**, and successfully get approved for **Google AdSense**.

---

## 📑 Table of Contents
1. [Custom Domain Setup (`allinonecalculator.io`)](#1-custom-domain-setup-allinonecalculatorio)
2. [Traffic & Visitor Analytics (Real-Time, Weekly, Monthly, Yearly)](#2-traffic--visitor-analytics)
3. [Step-by-Step Google AdSense Approval Guide](#3-step-by-step-google-adsense-approval-guide)
4. [Deployment Commands](#4-deployment-commands)

---

## 1. Custom Domain Setup (`allinonecalculator.io`)

Your project is already configured with:
- **`public/CNAME`** created with `allinonecalculator.io`.
- Automated CI/CD configured to detect CNAME and serve directly from the root domain (`https://allinonecalculator.io/`) without any `/AllinoneCalculator/` subpath.
- Full `sitemap.xml` with all 58 calculators indexed at `https://allinonecalculator.io`.

### Step 1.1: Add DNS Records at Your Domain Registrar
Log into wherever you purchased `allinonecalculator.io` (e.g., GoDaddy, Namecheap, Cloudflare, Hostinger, Porkbun) and open **DNS Management / DNS Records**.

Add the following **5 records**:

| Type | Name / Host | Target / Value | TTL | Note |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Automatic / 300 | GitHub Pages IP 1 |
| **A** | `@` | `185.199.109.153` | Automatic / 300 | GitHub Pages IP 2 |
| **A** | `@` | `185.199.110.153` | Automatic / 300 | GitHub Pages IP 3 |
| **A** | `@` | `185.199.111.153` | Automatic / 300 | GitHub Pages IP 4 |
| **CNAME** | `www` | `ysprajapti.github.io.` | Automatic / 300 | Points www to your GitHub profile |

*(Note: If your DNS provider does not allow `@`, leave the host field blank or enter `allinonecalculator.io`).*

### Step 1.2: Enable the Custom Domain in GitHub Pages
1. Go to your repository settings:  
   👉 [https://github.com/ysprajapti/AllinoneCalculator/settings/pages](https://github.com/ysprajapti/AllinoneCalculator/settings/pages)
2. Under **Custom domain**:
   - Enter: `allinonecalculator.io`
   - Click **Save**.
3. Check the box **"Enforce HTTPS"** (GitHub will provision a free SSL certificate within 15 minutes).

---

## 2. Traffic & Visitor Analytics

### Option A: Built-in Telemetry Hub (`/analytics`)
You now have a dedicated analytics dashboard at:  
👉 **`https://allinonecalculator.io/analytics/`** (or `http://localhost:3000/analytics` locally).
- **Active Viewers Now:** Live pulsing status of current active sessions.
- **Time Periods:** Toggle between **Today**, **This Week**, **This Month**, and **This Year**.
- **Metrics:** Total Page Views, Unique Users, Dwell Time, and Bounce Rate.
- **Domain Breakdown:** Top calculator categories ranked by popularity.

### Option B: Google Analytics 4 (Official & 100% Free)
Google Analytics 4 gives you official Google-certified traffic reports required for AdSense:
1. Go to [https://analytics.google.com](https://analytics.google.com) and click **Start measuring**.
2. Create an account named **SmartCalc**.
3. Create a **Web Stream**:
   - URL: `https://allinonecalculator.io`
   - Stream Name: `SmartCalc Web`
4. Copy your **Measurement ID** (starts with `G-`, e.g. `G-XXXXXXXXXX`).
5. In your GitHub repository:
   - Go to **Settings > Secrets and variables > Actions > Variables tab**.
   - Click **New repository variable**.
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX`
6. Done! Google Analytics will track:
   - **Realtime Users:** Minute-by-minute live viewers on your site and which calculator they are using.
   - **WAU / MAU:** Weekly and monthly active user retention curves.
   - **Country & City:** Geographic viewer distribution.

---

## 3. Step-by-Step Google AdSense Approval Guide

Having a custom top-level domain (`allinonecalculator.io`) increases your approval odds drastically because Google AdSense rarely approves free `.github.io` subdomains!

### Pre-Application Checklist (All Ready in Your Project ✅):
- [x] **5 Mandatory Trust Pages:**
  - About Us (`/about/`)
  - Contact Us (`/contact/`)
  - Privacy Policy (`/privacy-policy/`) — contains GDPR, CCPA, and Google DoubleClick DART cookie clauses
  - Terms & Conditions (`/terms/`)
  - Disclaimer (`/disclaimer/`) — medical/financial disclaimer
- [x] **58 High-Value Calculators:** Each has detailed formula explanations, worked mathematical examples, and FAQs.
- [x] **High Quality Indexing:** Complete `sitemap.xml` and `robots.txt` generated.
- [x] **Fast Mobile Navigation:** Fully responsive light/dark theme with zero layout shift.

### How to Apply:
1. Go to [https://adsense.google.com](https://adsense.google.com) and click **Get started**.
2. Sign in with your Google Account.
3. Enter your website URL:
   ```text
   https://allinonecalculator.io
   ```
4. AdSense will generate a code snippet with your **Publisher ID** (e.g. `ca-pub-XXXXXXXXXXXXXXXX`).
5. Add your Publisher ID to GitHub Actions:
   - Repository **Settings > Secrets and variables > Actions > Variables tab**.
   - Name: `NEXT_PUBLIC_ADSENSE_CLIENT`
   - Value: `ca-pub-XXXXXXXXXXXXXXXX`
6. In Google AdSense, click **Request Review**.
7. Google will review the site (typically within 24 to 72 hours).
8. Once approved, ads will automatically start appearing in the pre-styled ad slots (`AdBanner`, `AdInArticle`, `AdSidebar`)!

---

## 4. Deployment Commands

To push all these domain, analytics, and sitemap upgrades to GitHub:

```bash
git add .
git commit -m "feat: configure custom domain allinonecalculator.io, analytics hub, and GA4/AdSense integrations"
git push origin main
```

