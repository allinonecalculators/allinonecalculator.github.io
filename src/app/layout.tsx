import type { Metadata } from "next";
import Script from "next/script";
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
    "Free, accurate, and easy-to-use online calculators for finance, loans, health, mathematics, business, construction, and everyday conversions. Fast, privacy-friendly, and mobile-optimized.",
  keywords: [
    "calculator",
    "online calculator",
    "all in one calculator",
    "sip calculator",
    "emi calculator",
    "bmi calculator",
    "gst calculator",
    "income tax calculator",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allinonecalculator.io"),
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        {/* Google Analytics 4 (GA4) */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

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
