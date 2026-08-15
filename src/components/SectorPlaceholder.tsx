import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowLeft, ShieldCheck, Sparkles, Compass } from "lucide-react";

interface SectorPlaceholderProps {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  isPlaceholderArea?: boolean;
}

export function SectorPlaceholder({
  title,
  category,
  description,
  icon: Icon,
  highlights,
  isPlaceholderArea = false,
}: SectorPlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Navigation Back */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to NationsWorld Explore Engine</span>
        </Link>
      </div>

      {/* Main Sector Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
            <Icon className="w-8 h-8" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
              {category}
            </span>
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#00172e] text-slate-300 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F9148]" />
              {isPlaceholderArea ? "Coming Soon" : "Active Ecosystem"}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Section 17 & 19 Compliance Notice */}
        <div className="p-4 rounded-2xl bg-[#00172e] border border-white/10 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#2F9148] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="text-white font-semibold block mb-0.5">
              {isPlaceholderArea ? "Coming Soon — Reserved Ecosystem" : "Verified Ecosystem Sector"}
            </span>
            {isPlaceholderArea
              ? "NationsWorld is preparing this space for future developments. Architectural frameworks are preserved without prematurely implementing backend dependencies."
              : "All active entries in this sector are accredited and published directly by the NationsWorld Academic Secretariat."}
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold px-1">
          Sector Scope & Architectural Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#002446]/80 border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#2F9148]">0{idx + 1}</span>
                <Sparkles className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="text-sm font-semibold text-white">{item}</div>
              <div className="text-[11px] font-mono text-slate-400">Reserved Architecture</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-6 rounded-2xl bg-[#002446] border border-[#2F9148]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-white">Explore NationsWorld Ecosystem</div>
          <p className="text-xs text-slate-300">Discover active projects, secretariats, and research publications.</p>
        </div>
        <Link
          href="/explore"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Open Explore Engine</span>
          <Compass className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
