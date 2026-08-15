import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { Sparkles } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Impact Metrics & Accountability Audits"
          category="Accountability & Transparency"
          description="Audited metrics on scholarship distributions, research citations, international delegation outcomes, and global reach."
          icon={Sparkles}
          highlights={[
            "Annual Audit Reports",
            "Scholarship Impact Tracker",
            "Citation & Policy Reach Metrics",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
