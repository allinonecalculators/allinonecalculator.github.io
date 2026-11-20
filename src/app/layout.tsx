import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "SmartCalc - Free All-in-One Online Calculators & Financial Tools",
    template: "%s | SmartCalc",
  },
  description:
    "Free, accurate, and easy-to-use online calculators for finance, loans, health, mathematics, business, construction, and everyday conversions. Fast and mobile-friendly.",
  keywords: [
    "calculator",
    "online calculator",
    "sip calculator",
    "emi calculator",
    "bmi calculator",
    "gst calculator",
    "free calculators",
    "finance calculator",
    "percentage calculator",
  ],
  authors: [{ name: "SmartCalc Team" }],
  creator: "SmartCalc",
  publisher: "SmartCalc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smartcalc.io"),
  openGraph: {
    title: "SmartCalc - Free All-in-One Online Calculators",
    description:
      "Every calculator you need in one place. SIP, Loan EMI, BMI, GST, Income Tax, and Math calculators with instant results and charts.",
    siteName: "SmartCalc",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

