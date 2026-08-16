"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CORE_VALUES } from "@/components/HomeSections";
import { Globe, ShieldCheck, HeartHandshake, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F9148]/10 border border-[#2F9148]/30 text-xs font-mono text-[#2F9148]">
              <ShieldCheck className="w-4 h-4" />
              <span>NATIONSWORLD OF VISIONARY ADVANCEMENT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Uniting Nations. Advancing Humanity.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              NationsWorld of Visionary Advancement is an international youth-focused organisation and ecosystem centered on visionary advancement, human development, leadership, education, research, innovation, and global collaboration.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
              <div className="p-3 rounded-2xl bg-[#2F9148]/20 text-[#2F9148] w-max">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Central Mission</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Global Exposure and Human Development.</strong> NationsWorld creates pathways through which people encounter knowledge, opportunities, networks, cultures, ideas, technology, research, and leadership that contribute to human advancement.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
              <div className="p-3 rounded-2xl bg-[#2F9148]/20 text-[#2F9148] w-max">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Organisational Purpose</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Development of humanity.</strong> Dedicated to equipping young scholars, leaders, and institutions with high-trust networks, open scholarship, research grants, and action frameworks that deliver tangible societal impact worldwide.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
              <div className="p-3 rounded-2xl bg-[#2F9148]/20 text-[#2F9148] w-max">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Meaning of Global Exposure</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Global exposure includes access to opportunities, knowledge, cultures, networks, conferences, organisations, ideas, technology, research, leadership, and careers across an open ecosystem.
              </p>
            </div>
          </div>

          {/* Interactive 17 Core Values System */}
          <div className="space-y-8">
            <div className="max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148]">
                Official Institutional Philosophy
              </div>
              <h2 className="text-3xl font-bold text-white mt-1">The 17 Core Values</h2>
              <p className="text-slate-300 text-sm mt-2">
                Click any core value below to view its official institutional definition.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CORE_VALUES.map((val, idx) => {
                const isSelected = activeValue === idx;
                return (
                  <button
                    key={val.name}
                    onClick={() => setActiveValue(isSelected ? null : idx)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#2F9148] text-white border-[#2F9148] shadow-lg shadow-[#2F9148]/30 scale-105"
                        : "bg-[#002446] text-slate-200 border-white/10 hover:border-[#2F9148]/50"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400 mb-1">0{idx + 1}</div>
                    <div className="text-xs font-bold">{val.name}</div>
                  </button>
                );
              })}
            </div>

            {activeValue !== null && (
              <div className="p-6 rounded-2xl bg-[#002446] border border-[#2F9148]/50 animate-in fade-in duration-200 space-y-2">
                <div className="text-xs font-mono text-[#2F9148]">
                  VALUE 0{activeValue + 1} — DEFINITION
                </div>
                <div className="text-xl font-bold text-white">{CORE_VALUES[activeValue].name}</div>
                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {CORE_VALUES[activeValue].desc}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
