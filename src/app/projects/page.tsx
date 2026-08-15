import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { FolderGit2 } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Active Projects & Initiatives"
          category="Deployment & Impact"
          description="Scalable projects tackling global education access, climate resilience, AI ethics, and economic empowerment with measurable real-world metrics."
          icon={FolderGit2}
          highlights={[
            "Multilateral AI Governance Charter",
            "Climate Infrastructure Accelerator",
            "Global Education Open Repository",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
