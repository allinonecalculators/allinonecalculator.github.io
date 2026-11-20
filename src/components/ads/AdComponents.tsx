import React from "react";

interface AdProps {
  slot?: string;
  className?: string;
}

export function AdInArticle({ slot = "in-article-slot", className = "" }: AdProps) {
  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (!adsenseEnabled) {
    return (
      <aside
        aria-label="Article Advertisement"
        className={`w-full my-8 p-4 rounded-xl border border-dashed border-border/70 bg-muted/20 text-center flex flex-col items-center justify-center min-h-[90px] ${className}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Advertisement • In-Article Placement
        </span>
      </aside>
    );
  }

  return (
    <aside aria-label="Sponsored In-Article" className={`w-full my-8 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
      />
    </aside>
  );
}

export function AdSidebar({ slot = "sidebar-slot", className = "" }: AdProps) {
  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (!adsenseEnabled) {
    return (
      <aside
        aria-label="Sidebar Advertisement"
        className={`w-full p-4 rounded-xl border border-dashed border-border/70 bg-muted/20 text-center flex flex-col items-center justify-center min-h-[250px] ${className}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Advertisement • Sidebar
        </span>
      </aside>
    );
  }

  return (
    <aside aria-label="Sponsored Sidebar" className={`w-full text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
      />
    </aside>
  );
}

