"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  Compass,
  Users,
  FolderGit2,
  Building2,
  GraduationCap,
  FileText,
  Newspaper,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  BookOpen,
  Award,
  Zap,
  Layers,
  Search,
  X,
  UserCheck,
  Edit,
  Plus
} from "lucide-react";

export const CORE_VALUES = [
  { name: "Integrity", desc: "Unwavering commitment to truthfulness, ethical standards, and institutional transparency." },
  { name: "Collaboration", desc: "Building bridges across borders, disciplines, and cultures for shared global progress." },
  { name: "Inclusivity", desc: "Ensuring all youth, scholars, and communities are valued and empowered." },
  { name: "Service", desc: "Dedicated to advancing the common good and uplifting humanity." },
  { name: "Sustainability", desc: "Stewarding social, environmental, and technological resources for future generations." },
  { name: "Empowerment", desc: "Equipping young leaders with intelligence, tools, and platforms to lead." },
  { name: "Impact", desc: "Focusing on tangible, measurable improvements in global human development." },
  { name: "Excellence", desc: "Upholding high academic, research, and governance standards in all endeavors." },
  { name: "Innovation", desc: "Pioneering creative solutions and novel frameworks for complex global challenges." },
  { name: "Knowledge", desc: "Championing evidence-based research, open scholarship, and continuous learning." },
  { name: "Accountability", desc: "Maintaining clear metrics, open governance, and responsibility to stakeholders." },
  { name: "Justice", desc: "Advocating for fairness, human rights, and equitable systemic opportunities." },
  { name: "Peace", desc: "Cultivating dialogue, conflict resolution, and global harmony." },
  { name: "Dignity", desc: "Honouring the inherent worth of every human being across all nations." },
  { name: "Responsibility", desc: "Taking ownership of collective futures through deliberate institutional action." },
  { name: "Courage", desc: "Challenging outdated paradigms and standing up for visionary transformation." },
  { name: "Adaptability", desc: "Evolving rapidly in response to dynamic global technologies and needs." }
];

// Foundational Teams (14 Teams as specified)
export const FOUNDATIONAL_TEAMS = [
  { name: "Academic Secretariat", focus: "Research Coordination & Peer Review" },
  { name: "Global Youth Council", focus: "Youth Representation & Policy Advocacy" },
  { name: "Climate Resilience Taskforce", focus: "Environmental Policy & Sustainability" },
  { name: "AI & Tech Ethics Forum", focus: "Technological Governance & Ethics" },
  { name: "Education Infrastructure Group", focus: "Open Scholarship & Digital Learning" },
  { name: "Human Rights & Peace Envoy", focus: "International Justice & Peacebuilding" },
  { name: "Economic Advancement Lab", focus: "Sustainable Economies & Entrepreneurship" },
  { name: "Health & Human Well-being Secretariat", focus: "Global Health Policy & Resilience" },
  { name: "Diplomatic Exchange Delegation", focus: "Multilateral Engagement & Alliances" },
  { name: "Innovation & Future Systems Lab", focus: "Emerging Tech & Frontier Development" },
  { name: "Cultural Preservation Council", focus: "Heritage, Diversity & Global Unity" },
  { name: "Media & Strategic Dispatches", focus: "Accredited Publications & Journalism" },
  { name: "Scholarship & Grants Committee", focus: "Fellowship Awards & Capital Allocation" },
  { name: "Impact Metrics & Audit Bureau", focus: "Transparency, Metrics & Verification" }
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/10 bg-[#002446]">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2F9148]/20 to-[#002446]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00172e] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148] mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#2F9148] animate-ping" />
          <span>OFFICIAL DIGITAL PLATFORM — NATIONSWORLD INSTITUTION</span>
        </div>

        <div className="max-w-4xl">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#2F9148] font-bold mb-3">
            NATIONSWORLD OF VISIONARY ADVANCEMENT
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            UNITING NATIONS.{" "}
            <span className="bg-gradient-to-r from-[#2F9148] via-emerald-300 to-white bg-clip-text text-transparent">
              ADVANCING HUMANITY.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mb-8">
            An international youth-focused organisation and ecosystem centered on visionary advancement, human development, leadership, education, research, innovation, and global collaboration.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl shadow-lg shadow-[#2F9148]/20 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/participate"
              className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-[#00172e] hover:bg-[#002446] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Participate & Join</span>
              <ChevronRight className="w-4 h-4 text-[#2F9148]" />
            </Link>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#00172e]/90 border border-white/10 backdrop-blur-md">
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">120+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Countries Connected</div>
          </div>
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#2F9148]">450+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Research Publications</div>
          </div>
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">15k+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Youth Leaders Engaged</div>
          </div>
          <div className="p-4">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Institutional Transparency</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StorytellingProgression() {
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(0);

  return (
    <div className="space-y-24 py-20 bg-[#00172e] text-white">

      {/* 01 — Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-semibold">
              01 — Who We Are
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              A New-Generation Global Institution
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              NationsWorld is not an ordinary NGO, charity, or corporate platform. It is built as a serious, international institution engineered for the future — combining institutional credibility, human warmth, and technological sophistication.
            </p>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#2F9148]">
              <ShieldCheck className="w-5 h-5" />
              <span>GLOBAL INSTITUTIONAL CHARTER</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              «NationsWorld operates to unite youth leaders, researchers, and partners across continents under a shared commitment to human advancement and ethical development.»
            </p>
          </div>
        </div>
      </section>

      {/* 02 — Why We Exist & 17 Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-semibold">
              02 — Why We Exist
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
              Purpose, Vision & Our 17 Core Values
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Our mission is to empower youth leadership and accelerate human advancement through 17 foundational principles.
            </p>
          </div>

          {/* Interactive Core Values UI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CORE_VALUES.map((val, idx) => {
              const isSelected = activeValueIndex === idx;
              return (
                <button
                  key={val.name}
                  onClick={() => setActiveValueIndex(isSelected ? null : idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-[#2F9148] text-white border-[#2F9148] shadow-lg shadow-[#2F9148]/30 scale-[1.02]"
                      : "bg-[#002446] text-slate-200 border-white/10 hover:border-[#2F9148]/50 hover:bg-[#00305c]"
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 mb-1">0{idx + 1}</div>
                  <div className="text-xs font-bold">{val.name}</div>
                </button>
              );
            })}
          </div>

          {/* Expanded Selected Value Detail Card */}
          {activeValueIndex !== null && (
            <div className="p-6 rounded-2xl bg-[#002446] border border-[#2F9148]/50 animate-in fade-in duration-300 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#2F9148] uppercase tracking-widest mb-1">
                  Core Value 0{activeValueIndex + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {CORE_VALUES[activeValueIndex].name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {CORE_VALUES[activeValueIndex].desc}
                </p>
              </div>
              <button
                onClick={() => setActiveValueIndex(null)}
                className="text-xs font-mono text-slate-400 hover:text-white p-2 rounded-lg bg-white/5"
              >
                Close Explanation
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 03 — Explore Ecosystem & 04 — Discover Activity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-semibold">
                03 & 04 — Ecosystem & Active Teams
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
                14 Foundational Secretariats & Working Groups
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                NationsWorld maintains established working groups driving international action.
              </p>
            </div>

            <Link
              href="/teams"
              className="text-xs font-mono uppercase text-[#2F9148] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Explore All Teams</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOUNDATIONAL_TEAMS.slice(0, 6).map((team, i) => (
              <div
                key={team.name}
                className="p-5 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/50 transition-all duration-200"
              >
                <div className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30 w-max mb-3">
                  Secretariat 0{i + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{team.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{team.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Knowledge & Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-semibold">
              05 — Knowledge & Research
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Accredited Research Repository
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Access peer-reviewed research papers, whitepapers, and policy briefs produced by next-generation scholars and strategic partners worldwide.
            </p>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors"
            >
              <span>Browse Publications</span>
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#00172e] border border-white/5 space-y-3">
            <div className="text-xs font-mono text-[#2F9148] uppercase">Featured Dispatch</div>
            <div className="text-base font-bold text-white">
              Global Youth Leadership Index 2026: Multilateral Policy Assessment
            </div>
            <p className="text-xs text-slate-400">
              Assessing youth contributions across 120 member states. Published by the NationsWorld Academic Secretariat.
            </p>
          </div>
        </div>
      </section>

      {/* 07 — Participate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#002446] to-[#00305c] border border-[#2F9148]/40 text-center space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            07 — Direct Participation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Ready to Shape the Future?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Join fellowship cohorts, co-author publications, lead project initiatives, or partner with our global secretariat.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/participate"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl transition-all shadow-lg shadow-[#2F9148]/20"
            >
              Join Ecosystem Pathways
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-200 bg-[#00172e] hover:bg-[#002446] border border-white/10 rounded-xl transition-all"
            >
              Read Institutional About
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
