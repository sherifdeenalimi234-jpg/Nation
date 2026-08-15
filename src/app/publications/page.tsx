import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { FileText } from "lucide-react";

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Research Publications & Policy Briefs"
          category="Intelligence & Scholarly Repository"
          description="Peer-reviewed research papers, whitepapers, strategic briefs, and policy recommendations authored by emerging global scholars."
          icon={FileText}
          highlights={[
            "Youth Leadership Index 2026",
            "Ethical AI Governance Framework",
            "Sustainable Development Briefings",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
