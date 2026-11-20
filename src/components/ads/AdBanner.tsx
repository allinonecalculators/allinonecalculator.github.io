import React from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

/**
 * AdSense Ad Component Placeholder
 * Prepared according to Google AdSense guidelines:
 * - Remains inert and unobtrusive until client-side AdSense ID is configured.
 * - Complies with spacing and layout shift (CLS) standards.
 */
export function AdBanner({ slot = "default-slot", format = "auto", className = "" }: AdBannerProps) {
  // Can be switched on when NEXT_PUBLIC_ADSENSE_CLIENT is set
  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (!adsenseEnabled) {
    return (
      <aside
        aria-label="Advertisement Placeholder"
        className={`w-full my-6 p-4 rounded-xl border border-dashed border-border/70 bg-muted/30 text-center flex flex-col items-center justify-center min-h-[90px] ${className}`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Advertisement Space
        </span>
        <span className="text-xs text-muted-foreground/50 mt-1">
          SmartCalc Ad Placement • Non-intrusive & AdSense Ready
        </span>
      </aside>
    );
  }

  return (
    <aside aria-label="Sponsored Content" className={`w-full my-6 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

