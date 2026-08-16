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
  CheckCircle2,
  Lightbulb,
  HeartHandshake,
  Award,
  BookMarked,
  UserCheck,
  ShieldCheck,
  HelpCircle
} from "lucide-react";

const APPROVED_PATHWAYS = [
  { title: "Membership", desc: "Access the broader NationsWorld global exposure ecosystem and network.", icon: UserCheck, badge: "Pathway 01" },
  { title: "Volunteering", desc: "Contribute time and energy to regional secretariats and community summits.", icon: HeartHandshake, badge: "Pathway 02" },
  { title: "Research", desc: "Engage in peer-reviewed scholarship, whitepapers, and field studies.", icon: BookOpen, badge: "Pathway 03" },
  { title: "Projects", desc: "Collaborate on active technology, climate, and governance initiatives.", icon: FolderGit2, badge: "Pathway 04" },
  { title: "Programmes", desc: "Participate in global fellowships, workshops, and diplomatic dialogues.", icon: GraduationCap, badge: "Pathway 05" },
  { title: "Courses", desc: "Enroll in open-access educational modules and leadership masterclasses.", icon: BookMarked, badge: "Pathway 06" },
  { title: "Idea Proposals", desc: "Propose innovative ideas for secretarial review (Ideas are reviewed prior to official project adoption).", icon: Lightbulb, badge: "Pathway 07" },
  { title: "Partnerships", desc: "Connect universities, institutes, or coalitions to the NationsWorld ecosystem.", icon: Building2, badge: "Pathway 08" },
  { title: "Leadership", desc: "Take on governance, secretariat, or regional chapter leadership roles.", icon: Award, badge: "Pathway 09" },
  { title: "Publishing", desc: "Publish accredited papers and policy dispatches with institutional backing.", icon: FileText, badge: "Pathway 10" },
  { title: "Expertise Contribution", desc: "Offer expert advisory, peer review, or mentorship to young global scholars.", icon: Sparkles, badge: "Pathway 11" },
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
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>11 APPROVED PARTICIPATION PATHWAYS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Participation & Engagement
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              NationsWorld is an open ecosystem designed for global exposure and human development. Participation is not limited to a single membership tier—explore all 11 active pathways below.
            </p>
          </div>

          {/* Institutional Note on Idea Proposals vs Official Projects */}
          <div className="p-6 rounded-2xl bg-[#002446] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148] uppercase font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Institutional Note: Idea Proposals vs Official Projects</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Submitted ideas remain designated as <span className="text-white font-semibold">Submitted Ideas</span> during initial secretarial evaluation. They are formally adopted as <span className="text-white font-semibold font-mono">Official NationsWorld Projects</span> only after peer review, secretariat approval, and resource allocation.
            </p>
          </div>

          {/* Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROVED_PATHWAYS.map((p) => {
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
                    <span>Select Pathway</span>
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
                    <label className="text-xs font-mono text-slate-300 block mb-1">Proposal / Intent Statement</label>
                    <textarea
                      required
                      rows={3}
                      placeholder={
                        selectedPathway === "Idea Proposals"
                          ? "Detail your idea proposal (will be designated as a Submitted Idea prior to secretariat adoption)..."
                          : "Briefly describe your objectives or research focus..."
                      }
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors"
                  >
                    Submit Pathway Request
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#00172e] border border-[#2F9148] flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#2F9148] shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">Participation Intent Received</div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Your response has been transmitted to the NationsWorld Secretariat. An official dispatch will follow.
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
