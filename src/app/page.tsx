import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HeroSection,
  ProgressionSection,
  EcosystemSectorsGrid,
  InstitutionalCredibilitySection
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col selection:bg-[#1e62ff]/30 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* Phase 01 Core Vision & Hero */}
        <HeroSection />

        {/* Section 13: Core Experience Progression */}
        <ProgressionSection />

        {/* 8 Foundational Sectors */}
        <EcosystemSectorsGrid />

        {/* Institutional Credibility & Governance */}
        <InstitutionalCredibilitySection />
      </main>

      <Footer />
    </div>
  );
}
