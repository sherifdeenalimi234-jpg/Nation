import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { Users } from "lucide-react";

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Global Teams & Secretariats"
          category="Governance & Leadership"
          description="Multidisciplinary working groups, secretariats, and youth leadership councils driving regional institutional strategies across continents."
          icon={Users}
          highlights={[
            "Regional Academic Secretariats",
            "Youth Leadership Councils",
            "International Working Groups",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
