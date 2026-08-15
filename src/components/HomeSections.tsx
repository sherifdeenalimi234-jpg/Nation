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
  ChevronRight
} from "lucide-react";

// Progression Steps according to Spec Section 13:
// Discover → Explore → Understand → Connect → Participate → Contribute → Return
const PROGRESSION_STEPS = [
  {
    num: "01",
    id: "discover",
    title: "Discover",
    subtitle: "A New-Generation Global Institution",
    description: "Enter an ecosystem designed to transcend traditional NGO models, uniting youth leadership, cutting-edge research, and institutional action worldwide.",
    badge: "First Touchpoint",
    metric: "120+ Countries Reached",
    icon: Globe,
  },
  {
    num: "02",
    id: "explore",
    title: "Explore",
    subtitle: "Multidisciplinary Sectors & Knowledge",
    description: "Navigate curated databases of strategic initiatives, research publications, and global leadership forums with clean visual architecture.",
    badge: "Interactive Core",
    metric: "8 Ecosystem Sectors",
    icon: Compass,
  },
  {
    num: "03",
    id: "understand",
    title: "Understand",
    subtitle: "Data-Driven Global Insights",
    description: "Examine rigorously validated research papers, whitepapers, and policy briefs produced by next-generation scholars and strategic partners.",
    badge: "Research & Intelligence",
    metric: "450+ Peer Publications",
    icon: FileText,
  },
  {
    num: "04",
    id: "connect",
    title: "Connect",
    subtitle: "Cross-Border Collaborations",
    description: "Bridge students, scholars, institutions, and visionary leaders through high-trust, structured international networks.",
    badge: "Global Network",
    metric: "15k+ Global Members",
    icon: Users,
  },
  {
    num: "05",
    id: "participate",
    title: "Participate",
    subtitle: "High-Impact Programmes",
    description: "Enroll in visionary fellowship frameworks, leadership labs, and action accelerators built for deliberate future building.",
    badge: "Action Cohorts",
    metric: "32 Active Fellowships",
    icon: GraduationCap,
  },
  {
    num: "06",
    id: "contribute",
    title: "Contribute",
    subtitle: "Real-World Projects & Systems",
    description: "Deploy solutions, co-author strategic publications, and lead institutional delegations delivering measurable societal impact.",
    badge: "Direct Impact",
    metric: "$4.2M Allocated Support",
    icon: FolderGit2,
  },
  {
    num: "07",
    id: "return",
    title: "Return",
    subtitle: "Everlasting Institutional Knowledge",
    description: "Continuously access evolving research briefs, project updates, and institutional memory as our collective ecosystem scales.",
    badge: "Ecosystem Cycle",
    metric: "98% Retained Engagement",
    icon: Sparkles,
  },
];

// 8 Core Ecosystem Sectors according to Spec
const SECTOR_CARDS = [
  {
    slug: "explore",
    title: "Explore Directory",
    desc: "Interactive content discovery across global initiatives and strategic verticals.",
    icon: Compass,
    badge: "Ecosystem Core",
    status: "Active Phase 01",
  },
  {
    slug: "teams",
    title: "Global Teams",
    desc: "Multidisciplinary working groups, secretariats, and student leadership councils.",
    icon: Users,
    badge: "Leadership",
    status: "Directory Online",
  },
  {
    slug: "projects",
    title: "Active Projects",
    desc: "Scalable solutions tackling global education, climate resilience, and technological ethics.",
    icon: FolderGit2,
    badge: "Deployment",
    status: "14 Live Initiatives",
  },
  {
    slug: "organisations",
    title: "Partner Organisations",
    desc: "Accredited institutional alliances, academic partners, and multilateral bodies.",
    icon: Building2,
    badge: "Alliances",
    status: "Verified Partners",
  },
  {
    slug: "programmes",
    title: "Academic Programmes",
    desc: "Fellowships, leadership academies, research grants, and global exchange labs.",
    icon: GraduationCap,
    badge: "Education",
    status: "Cohort Applications",
  },
  {
    slug: "publications",
    title: "Research & Publications",
    desc: "Peer-reviewed insights, strategic briefs, and policy documents shaping the future.",
    icon: FileText,
    badge: "Intelligence",
    status: "Open Repository",
  },
  {
    slug: "updates",
    title: "Global Dispatches",
    desc: "Official institutional updates, delegation announcements, and field dispatches.",
    icon: Newspaper,
    badge: "Newsroom",
    status: "Weekly Briefings",
  },
  {
    slug: "impact",
    title: "Impact Metrics",
    desc: "Transparent tracking of societal advancement, scholarship metrics, and global reach.",
    icon: Sparkles,
    badge: "Accountability",
    status: "Verified Audits",
  },
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/10">
      {/* Background Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1e62ff]/20 to-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top institutional pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1322] border border-[#1e62ff]/40 text-xs font-mono text-[#00f0ff] mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>OFFICIAL DIGITAL PLATFORM — NATIONSWORLD INSTITUTION</span>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            A New-Generation Global Institution for{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#3b78ff] to-[#1e62ff] bg-clip-text text-transparent">
              Human Advancement
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mb-8">
            NationsWorld is an international ecosystem centered on visionary advancement, human development, leadership, education, research, and global collaboration.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1e62ff] to-[#00f0ff] rounded-xl hover:shadow-lg hover:shadow-[#1e62ff]/30 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Explore Digital Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#progression"
              className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-[#0d1322] hover:bg-[#131b30] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Institutional Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#0d1322]/80 border border-white/10 backdrop-blur-md">
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">120+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Countries Connected</div>
          </div>
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#00f0ff]">450+</div>
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

export function ProgressionSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROGRESSION_STEPS[activeStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <section id="progression" className="py-20 md:py-28 relative border-b border-white/10 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
            Section 13 — Core Progression Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Discover → Explore → Understand → Connect → Participate → Contribute → Return
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            NationsWorld is not a static information website. It is an evolving digital environment engineered to support natural progression from initial discovery to active societal contribution.
          </p>
        </div>

        {/* Step Selector Horizontal Bar for Mobile & Desktop */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-none border-b border-white/10">
          {PROGRESSION_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-none px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#1e62ff] text-white border-[#1e62ff] shadow-lg shadow-[#1e62ff]/20"
                    : "bg-[#0d1322] text-slate-400 border-white/5 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{step.num}</span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-[#0d1322] border border-white/10 relative overflow-hidden">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f0ff]">
              <StepIcon className="w-3.5 h-3.5" />
              <span>{currentStep.badge}</span>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                Phase {currentStep.num}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {currentStep.title}: {currentStep.subtitle}
              </h3>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentStep.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/5">
              <div className="p-3 rounded-xl bg-[#060911] border border-white/5">
                <div className="text-xs text-slate-400 font-mono">Validated Metric</div>
                <div className="text-sm font-bold text-white mt-0.5">{currentStep.metric}</div>
              </div>

              <Link
                href={`/${currentStep.id === 'discover' ? 'explore' : currentStep.id}`}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1e62ff] hover:bg-[#3b78ff] rounded-xl transition-colors flex items-center gap-2 ml-auto"
              >
                <span>Proceed to {currentStep.title} Sector</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#060911] border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SYSTEM DIAGNOSTIC</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ACTIVE STEP {activeStepIndex + 1} OF 7
                </span>
              </div>

              <div className="space-y-2">
                {PROGRESSION_STEPS.map((s, i) => (
                  <div
                    key={s.id}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i <= activeStepIndex ? "bg-[#00f0ff]" : "bg-white/5"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400 font-mono leading-relaxed bg-[#0d1322] p-4 rounded-lg border border-white/5">
              «NationsWorld should feel like a digital environment for people who believe the future can be deliberately built.»
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function EcosystemSectorsGrid() {
  return (
    <section className="py-20 md:py-28 relative border-b border-white/10 bg-[#04060d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
              Ecosystem Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Institutional Sectors
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Explore the 8 foundational sectors of the NationsWorld digital ecosystem.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00f0ff] hover:text-white transition-colors"
          >
            <span>View All Directories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTOR_CARDS.map((sector) => {
            const Icon = sector.icon;
            return (
              <Link
                key={sector.slug}
                href={`/${sector.slug}`}
                className="group p-6 rounded-2xl bg-[#0d1322] hover:bg-[#131b30] border border-white/10 hover:border-[#1e62ff]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#1e62ff]/10 active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#00f0ff] group-hover:bg-[#1e62ff] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {sector.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {sector.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {sector.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function InstitutionalCredibilitySection() {
  return (
    <section className="py-20 md:py-28 relative border-b border-white/10 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e62ff]/10 border border-[#1e62ff]/30 text-xs font-mono text-[#00f0ff]">
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Seriousness & Governance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Designed for Global Institutions, Scholars, and Visionary Leaders
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              NationsWorld maintains institutional rigor to represent our work publicly to international students, young professionals, researchers, academic institutions, and potential partners.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Peer-Reviewed & Accredited Research</div>
                  <div className="text-xs text-slate-400">Rigorous research frameworks ensuring high credibility and policy relevance.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Transparent Global Governance</div>
                  <div className="text-xs text-slate-400">Structured secretariats and youth leadership councils across continents.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Deliberate Build Directive</div>
                  <div className="text-xs text-slate-400">Section 14 compliance: authentic features built without speculative bloat.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-[#0d1322] border border-white/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e62ff]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Global Mandate
                </span>
                <span className="text-xs font-mono text-[#00f0ff]">VERIFIED INSTITUTION</span>
              </div>

              <blockquote className="text-lg text-slate-200 italic font-serif leading-relaxed">
                «The experience communicates vision, intelligence, human advancement, global connection, innovation, and institutional credibility — making every visitor feel: “This is different.”»
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e62ff] to-[#00f0ff] flex items-center justify-center font-bold text-white text-xs">
                  NW
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">NationsWorld Charter</div>
                  <div className="text-[11px] text-slate-400 font-mono">International Board of Directors</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
