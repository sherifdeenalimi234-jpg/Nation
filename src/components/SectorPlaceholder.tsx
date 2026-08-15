import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowLeft, Lock, Sparkles, ShieldCheck } from "lucide-react";

interface SectorPlaceholderProps {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
}

export function SectorPlaceholder({
  title,
  category,
  description,
  icon: Icon,
  highlights,
}: SectorPlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Navigation Back */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to NationsWorld Portal</span>
        </Link>
      </div>

      {/* Main Sector Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1322] border border-white/10 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1e62ff]/10 to-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#00f0ff]">
            <Icon className="w-8 h-8" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#1e62ff]/20 text-[#00f0ff] border border-[#1e62ff]/30">
              {category}
            </span>
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Phase 01 Entry Point
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

        {/* Section 14 Compliance Notice */}
        <div className="p-4 rounded-2xl bg-[#060911] border border-white/5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="text-white font-semibold block mb-0.5">Section 14 — Spec Compliance Note</span>
            Full interactive registry features for this sector are being staged for subsequent phases. Backend workflows are preserved without inventing speculative products.
          </div>
        </div>
      </div>

      {/* Sector Highlights Card Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold px-1">
          Sector Scope & Planned Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0d1322]/60 border border-white/5 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00f0ff]">0{idx + 1}</span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <div className="text-sm font-semibold text-white">{item}</div>
              <div className="text-[11px] font-mono text-slate-500">Staged Infrastructure</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1e62ff]/10 to-[#00f0ff]/10 border border-[#1e62ff]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-white">Join the Global Registry</div>
          <p className="text-xs text-slate-400">Receive accredited briefs when new cohorts and datasets launch.</p>
        </div>
        <Link
          href="/explore"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1e62ff] hover:bg-[#3b78ff] rounded-xl transition-colors shrink-0"
        >
          Explore Active Directories
        </Link>
      </div>

    </div>
  );
}
