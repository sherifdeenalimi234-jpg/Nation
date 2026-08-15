"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Users,
  BookOpen,
  FolderGit2,
  Building2,
  GraduationCap,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const PATHWAYS = [
  {
    title: "Join Youth Leadership Network",
    desc: "Connect with cross-border youth working groups and regional academic secretariats.",
    icon: Users,
    badge: "Community & Network",
    action: "Apply to Join",
  },
  {
    title: "Co-Author Research Publications",
    desc: "Submit papers, policy briefs, and whitepapers to the Academic Secretariat peer review pipeline.",
    icon: FileText,
    badge: "Open Scholarship",
    action: "Submit Abstract",
  },
  {
    title: "Enroll in Fellowship Programmes",
    desc: "Participate in intensive 6-month accelerators and cross-border leadership academies.",
    icon: GraduationCap,
    badge: "Education Cohorts",
    action: "View Programmes",
  },
  {
    title: "Lead an Active Project Initiative",
    desc: "Deploy solutions tackling climate resilience, education access, and AI ethics.",
    icon: FolderGit2,
    badge: "Project Deployment",
    action: "Submit Project Idea",
  },
  {
    title: "Institutional Alliance & Partnership",
    desc: "Partner your university, research lab, or multilateral organisation with NationsWorld.",
    icon: Building2,
    badge: "Institutional Alliance",
    action: "Partner with Us",
  },
  {
    title: "Scholarship & Research Grants",
    desc: "Access competitive research funding and institutional backing for high-impact studies.",
    icon: Sparkles,
    badge: "Capital & Support",
    action: "Apply for Support",
  },
];

export default function ParticipatePage() {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
              ENGAGEMENT & PARTICIPATION
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Participate in NationsWorld
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Participation is designed as a direct invitation to co-create, research, lead, and contribute to global human advancement. Choose a pathway below.
            </p>
          </div>

          {/* Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATHWAYS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-3xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/60 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{p.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2">{p.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPathway(p.title);
                      setFormSubmitted(false);
                    }}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{p.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dynamic Registration Modal / Form Section */}
          {selectedPathway && (
            <div className="p-8 rounded-3xl bg-[#002446] border border-[#2F9148] space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono text-[#2F9148] uppercase">Selected Pathway</div>
                  <h3 className="text-xl font-bold text-white">{selectedPathway}</h3>
                </div>
                <button
                  onClick={() => setSelectedPathway(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              {!formSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 max-w-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Dr. / Scholar / Student"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Official Email</label>
                      <input
                        required
                        type="email"
                        placeholder="email@institution.org"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Affiliation / Institution</label>
                    <input
                      required
                      type="text"
                      placeholder="University / Secretariat / Organisation"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Statement of Purpose / Proposal</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly describe your objectives or research focus..."
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors"
                  >
                    Submit Official Intent
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#00172e] border border-[#2F9148] flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#2F9148] shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">Application Received</div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Your intent has been registered with the NationsWorld Academic Secretariat. An official dispatch will be issued to your email.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
