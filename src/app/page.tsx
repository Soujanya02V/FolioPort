"use client";

import React, { useState, useEffect } from "react";
import DesktopPortfolio from "@/components/DesktopPortfolio";
import MobilePortfolio from "@/components/MobilePortfolio";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run check on client mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avoid hydration mismatch by rendering a styled dark placeholder until client detection finishes
  if (isMobile === null) {
    return <div className="min-h-screen bg-[#0E0E10]" />;
  }

  return isMobile ? <MobilePortfolio /> : <DesktopPortfolio />;
}
