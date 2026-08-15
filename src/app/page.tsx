import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection, StorytellingProgression } from "@/components/HomeSections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* Spec Hero with Motto: UNITING NATIONS. ADVANCING HUMANITY. */}
        <HeroSection />

        {/* Storytelling Progression 01 - 08 */}
        <StorytellingProgression />
      </main>

      <Footer />
    </div>
  );
}
