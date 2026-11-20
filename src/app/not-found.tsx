import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Calculator className="h-8 w-8" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight">404 - Page Not Found</h1>
      <p className="text-muted-foreground max-w-md">
        The calculator or page you are looking for doesn&apos;t exist, or has been moved to a new URL.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

