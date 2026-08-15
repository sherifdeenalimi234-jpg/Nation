import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectorPlaceholder } from "@/components/SectorPlaceholder";
import { Newspaper } from "lucide-react";

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
        <SectorPlaceholder
          title="Global Dispatches & Institutional Newsroom"
          category="Newsroom & Press"
          description="Official announcements, secretariat dispatches, delegation highlights, and global news from the NationsWorld ecosystem."
          icon={Newspaper}
          highlights={[
            "Weekly Institutional Briefings",
            "Delegation Press Releases",
            "Summit Announcements",
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
