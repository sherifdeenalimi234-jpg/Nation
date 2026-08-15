import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { GraduationCap } from "lucide-react";

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Academic Programmes & Fellowships"
          category="Education & Fellowships"
          description="Visionary fellowship cohorts, research grants, leadership academies, and cross-border exchange programs empowering next-generation scholars."
          icon={GraduationCap}
          highlights={[
            "Global Leadership Fellowship 2026",
            "Science & Technology Policy Lab",
            "International Exchange Grants",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
