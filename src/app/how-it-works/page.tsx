"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Layers, ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "LEARN",
      desc: "Acquire knowledge, skills and understanding across research, policy, and technology.",
      detail: "Through open scholarship, accredited dispatches, and educational programmes, individuals gain deep insights into global challenges."
    },
    {
      num: "02",
      title: "THINK",
      desc: "Question, analyse and develop ideas with critical and multidisciplinary perspectives.",
      detail: "NationsWorld encourages rigorous intellectual inquiry, dialogue, and ethical reflection to refine concepts."
    },
    {
      num: "03",
      title: "CREATE",
      desc: "Turn ideas into projects, products and solutions that address real-world needs.",
      detail: "Collaboration in specialized teams and working groups transforms concepts into tangible frameworks, code, and initiatives."
    },
    {
      num: "04",
      title: "LEAD",
      desc: "Apply knowledge through responsible leadership and institutional stewardship.",
      detail: "Members lead secretariats, regional chapters, and working groups, developing practical leadership competencies."
    },
    {
      num: "05",
      title: "CONTRIBUTE",
      desc: "Create meaningful value for people, institutions, and society at large.",
      detail: "Deliver measurable impact through accredited publications, policy briefs, community initiatives, and global alliances."
    }
  ];

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002446] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148]">
              <Layers className="w-4 h-4" />
              <span>THE NATIONSWORLD PATHWAY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              How NationsWorld Works
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              NationsWorld operates through a structured 5-step developmental journey designed to cultivate visionaries and convert ideas into tangible societal impact.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-8 rounded-3xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-6">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-[#2F9148] shrink-0">
                    {step.num}
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      {step.title}
                    </h2>
                    <p className="text-sm font-semibold text-slate-200">{step.desc}</p>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{step.detail}</p>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    Pathway Stage {step.num}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-[#002446] border border-[#2F9148]/40 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready to Begin Your Pathway?</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Explore our programmes or apply for membership to become part of the NationsWorld ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/membership#apply"
                className="px-6 py-3 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
              >
                Apply for Membership →
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
