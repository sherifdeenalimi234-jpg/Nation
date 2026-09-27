import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HeroSection,
  WhoWeAreSection,
  AreasOfFocusSection,
  PhilosophySection,
  PathwaySection,
  ProgrammesSection,
  TeamsSection,
  MembershipCtaSection,
  FinalStatementSection
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section with Typewriter Animation */}
        <HeroSection />

        {/* 2. Who We Are */}
        <WhoWeAreSection />

        {/* 3. Our Areas of Focus (What We Do) */}
        <AreasOfFocusSection />

        {/* 4. Our Philosophy */}
        <PhilosophySection />

        {/* 5. The NationsWorld Pathway */}
        <PathwaySection />

        {/* 6. Programmes & Initiatives */}
        <ProgrammesSection />

        {/* 7. Teams & Institutes */}
        <TeamsSection />

        {/* 8. Membership Call-to-Action */}
        <MembershipCtaSection />

        {/* 9. Final Statement */}
        <FinalStatementSection />
      </main>

      <Footer />
    </div>
  );
}
