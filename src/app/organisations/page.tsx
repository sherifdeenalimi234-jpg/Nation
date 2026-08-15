import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { Building2 } from "lucide-react";

export default function OrganisationsPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Partner Organisations & Alliances"
          category="Institutional Alliances"
          description="Accredited academic institutions, research centers, multilateral alliances, and funding partners collaborating across the NationsWorld ecosystem."
          icon={Building2}
          highlights={[
            "Higher Education Alliance",
            "Research Institute Partners",
            "Multilateral Policy Coalitions",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
