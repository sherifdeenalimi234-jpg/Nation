"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Award,
  Factory,
  Users,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { TEAMS_DATA } from "@/lib/contentStore";

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

// 1. HERO SECTION WITH TYPEWRITER ANIMATION
export function HeroSection() {
  const statements = [
    "We Research.",
    "We Innovate.",
    "We Develop.",
    "We Lead.",
    "We Produce."
  ];

  const [statementIndex, setStatementIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentStatement = statements[statementIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentStatement.substring(0, displayText.length + 1));
        if (displayText.length === currentStatement.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentStatement.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setStatementIndex((prev) => (prev + 1) % statements.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, statementIndex]);

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden border-b border-white/10 bg-[#001c36]">
      {/* Subtle institutional ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#2F9148]/15 via-emerald-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#001224] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148] mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#2F9148] animate-ping" />
          <span className="font-semibold tracking-wider uppercase">NATIONSWORLD INSTITUTIONAL PLATFORM</span>
        </div>

        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            NATIONSWORLD OF VISIONARY ADVANCEMENT
          </h1>

          {/* Typewriter Animation Display */}
          <div className="h-16 sm:h-20 flex items-center justify-center md:justify-start mb-6">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2F9148] tracking-tight">
              {displayText}
            </span>
            <span className="inline-block w-1.5 h-8 sm:h-12 bg-[#2F9148] ml-2 animate-pulse rounded-full" />
          </div>

          <p className="text-xl sm:text-2xl font-semibold text-emerald-300 tracking-wide mb-6">
            Building People. Advancing Ideas. Creating the Future.
          </p>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-3xl mb-10">
            NationsWorld is a multidisciplinary platform bringing together people, ideas and initiatives committed to learning, innovation, leadership, development and meaningful production.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              href="/explore"
              className="px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl shadow-lg shadow-[#2F9148]/25 transition-all duration-300 flex items-center gap-2.5 active:scale-95"
            >
              <span>EXPLORE NATIONSWORLD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/membership#apply"
              className="px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 bg-[#001224] hover:bg-[#002446] border border-white/10 hover:border-white/25 rounded-xl transition-all duration-300 flex items-center gap-2.5 active:scale-95"
            >
              <span>JOIN NATIONSWORLD</span>
              <ChevronRight className="w-4 h-4 text-[#2F9148]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. WHO WE ARE
export function WhoWeAreSection() {
  return (
    <section className="py-20 md:py-28 bg-[#00172e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            WHO WE ARE
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
            NationsWorld of Visionary Advancement is a multidisciplinary community dedicated to developing people, advancing ideas and creating pathways for meaningful contribution.
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We bring together researchers, innovators, emerging leaders, creators and development-oriented individuals to learn, collaborate, build and contribute to a better future.
          </p>

          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 text-xs font-bold uppercase tracking-wider text-white transition-all"
            >
              <span>LEARN MORE ABOUT US</span>
              <ArrowRight className="w-4 h-4 text-[#2F9148]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. OUR AREAS OF FOCUS (WHAT WE DO)
export function AreasOfFocusSection() {
  const cards = [
    {
      title: "RESEARCH",
      desc: "Exploring questions, generating knowledge and understanding the issues that shape our world.",
      icon: BookOpen
    },
    {
      title: "INNOVATION",
      desc: "Transforming ideas into new approaches, possibilities and solutions.",
      icon: Lightbulb
    },
    {
      title: "DEVELOPMENT",
      desc: "Developing people, communities, institutions and systems for sustainable advancement.",
      icon: TrendingUp
    },
    {
      title: "LEADERSHIP",
      desc: "Preparing people to think critically, lead responsibly and contribute meaningfully.",
      icon: Award
    },
    {
      title: "PRODUCTION",
      desc: "Turning knowledge, creativity and ideas into tangible products, projects, solutions and initiatives.",
      icon: Factory
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#001a33] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            OUR AREAS OF FOCUS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            WHAT WE DO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="p-8 rounded-3xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#00172e] text-[#2F9148] group-hover:bg-[#2F9148] group-hover:text-white transition-colors duration-300 w-max">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#2F9148] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 4. OUR PHILOSOPHY
export function PhilosophySection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#00172e] via-[#002446] to-[#00172e] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
          OUR PHILOSOPHY
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          ADVANCEMENT BEGINS WITH PEOPLE
        </h2>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#00172e]/90 border border-[#2F9148]/40 shadow-2xl space-y-6">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 leading-relaxed italic">
            “When people learn, they think differently.
            <br />
            When they think differently, they create.
            <br />
            When they create, they can transform their communities.”
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
            At NationsWorld, we firmly believe that human development is the foundation for all systemic progress. By investing in how individuals learn, question, and build, we empower people to drive visionary change.
          </p>
        </div>
      </div>
    </section>
  );
}

// 5. THE NATIONSWORLD PATHWAY
export function PathwaySection() {
  const steps = [
    { num: "01", title: "LEARN", desc: "Acquire knowledge, skills and understanding." },
    { num: "02", title: "THINK", desc: "Question, analyse and develop ideas." },
    { num: "03", title: "CREATE", desc: "Turn ideas into projects, products and solutions." },
    { num: "04", title: "LEAD", desc: "Apply knowledge through responsible leadership." },
    { num: "05", title: "CONTRIBUTE", desc: "Create meaningful value for people and society." }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#00172e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            THE NATIONSWORLD PATHWAY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEARN. THINK. CREATE. LEAD. CONTRIBUTE.
          </h2>
        </div>

        {/* Connected 5-Step Visual Journey */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/60 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-extrabold text-[#2F9148]">
                  {step.num}
                </span>
                {idx < 4 && (
                  <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />
                )}
              </div>
              <h3 className="text-base font-bold text-white tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. PROGRAMMES & INITIATIVES
export function ProgrammesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#001a33] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
              FEATURED INITIATIVES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              PROGRAMMES & INITIATIVES
            </h2>
          </div>

          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
          >
            <span>EXPLORE PROGRAMMES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Flagship Programme Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] text-xs font-mono font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>FLAGSHIP PROGRAMME</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              TPD — THE PRODUCTIVE DISCOURSE
            </h3>

            <p className="text-sm font-semibold text-emerald-300">
              “A Week of Learning, Leadership, Reflection & Action.”
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An intensive multilateral dialogue bringing together emerging thinkers, scholars, and youth leaders to reflect on critical issues, build collaborative frameworks, and execute impactful projects.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/programmes"
              className="px-6 py-3.5 rounded-xl bg-[#00172e] border border-white/10 hover:border-[#2F9148] text-xs font-bold uppercase tracking-wider text-white transition-all inline-flex items-center gap-2"
            >
              <span>DISCOVER TPD</span>
              <ArrowUpRight className="w-4 h-4 text-[#2F9148]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. TEAMS & INSTITUTES
export function TeamsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#00172e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            STRUCTURE & GOVERNANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            OUR TEAMS & INSTITUTES
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            NationsWorld operates through specialized teams and institutes designed to transform our areas of focus into practical programmes, initiatives and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEAMS_DATA.slice(0, 6).map((team) => (
            <div
              key={team.slug}
              className="p-6 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/60 transition-all space-y-2"
            >
              <div className="text-[10px] font-mono text-[#2F9148] uppercase font-bold">
                SECRETARIAT
              </div>
              <h3 className="text-base font-bold text-white">{team.name}</h3>
              <p className="text-xs text-slate-300 line-clamp-2">{team.description}</p>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold uppercase tracking-wider text-white transition-colors"
          >
            <span>EXPLORE TEAMS & INSTITUTES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 8. MEMBERSHIP CALL-TO-ACTION
export function MembershipCtaSection() {
  return (
    <section className="py-20 md:py-28 bg-[#001c36] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#002446] border border-[#2F9148]/40 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
            PARTICIPATE IN THE ECOSYSTEM
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            BECOME PART OF NATIONSWORLD
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
            NationsWorld is built around people who are willing to learn, think, create, lead and contribute.
            <br className="hidden sm:inline" />
            Whether you are a student, researcher, innovator, emerging leader, creator or development-oriented individual, NationsWorld provides a community through which you can grow and contribute.
          </p>

          <div className="pt-2">
            <Link
              href="/membership#apply"
              className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl shadow-lg shadow-[#2F9148]/25 transition-all inline-flex items-center gap-2.5"
            >
              <span>APPLY FOR MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 9. FINAL STATEMENT
export function FinalStatementSection() {
  return (
    <section className="py-24 md:py-36 bg-[#001224] text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          “THE FUTURE IS NOT SIMPLY WAITED FOR.
          <br />
          <span className="text-[#2F9148]">
            IT IS LEARNED, IMAGINED, BUILT AND LED.”
          </span>
        </h2>

        <div className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-300 font-bold pt-4">
          NATIONSWORLD OF VISIONARY ADVANCEMENT
        </div>
      </div>
    </section>
  );
}
