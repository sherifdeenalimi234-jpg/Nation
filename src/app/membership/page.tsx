"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  UserCheck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Award,
  Sparkles,
  FileText,
  Building2,
  Users
} from "lucide-react";

export default function MembershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    occupation: "",
    institution: "",
    primaryInterest: "Research",
    statement: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Header Banner */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002446] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148]">
              <UserCheck className="w-4 h-4" />
              <span>NATIONSWORLD MEMBERSHIP PORTAL</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Stage 1 Membership Application
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Welcome to the official NationsWorld Membership Portal. Join a multidisciplinary community dedicated to developing people, advancing ideas and creating pathways for meaningful contribution.
            </p>
          </div>

          {/* Application Form & Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="apply">

            {/* Left Column: Stage 1 Application Form */}
            <div className="lg:col-span-7 bg-[#002446] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
                  Stage 1 Application Form
                </div>
                <h2 className="text-2xl font-bold text-white">Personal & Academic Details</h2>
                <p className="text-xs text-slate-300">
                  Please complete all required fields below to initiate your Stage 1 Membership evaluation.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Dr. Jane Doe"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Official Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@institution.org"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Country of Residence *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Switzerland / Nigeria"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Current Occupation / Role *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        placeholder="Student / Researcher / Professional"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                        Primary Area of Interest *
                      </label>
                      <select
                        value={formData.primaryInterest}
                        onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      >
                        <option value="Research">Research</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Development">Development</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Production">Production</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                      Institution / Organisation
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="University or Organisation name"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                      Statement of Intent & Motivation *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.statement}
                      onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                      placeholder="Describe how you intend to learn, think, create, lead and contribute through NationsWorld..."
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-[#2F9148]/20 flex items-center justify-center gap-2"
                  >
                    <span>Submit Stage 1 Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-8 rounded-2xl bg-[#00172e] border border-[#2F9148] space-y-4 text-center animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#2F9148] mx-auto" />
                  <h3 className="text-xl font-bold text-white">Stage 1 Application Submitted</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Your Stage 1 Membership Application has been received by the NationsWorld Secretariat. An official email confirmation will be sent shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#002446] border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Portal Info & Benefits */}
            <div className="lg:col-span-5 space-y-6">

              <div className="p-6 sm:p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148] uppercase font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Membership Benefits</span>
                </div>
                <h3 className="text-xl font-bold text-white">Why Join NationsWorld?</h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9148] shrink-0 mt-0.5" />
                    <span>Access to global exposure, research networks, and multidisciplinary teams.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9148] shrink-0 mt-0.5" />
                    <span>Participation in flagship programmes like The Productive Discourse (TPD).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9148] shrink-0 mt-0.5" />
                    <span>Pathways for project development, publication, and leadership roles.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9148] shrink-0 mt-0.5" />
                    <span>Mentorship and collaboration with scholars and leaders worldwide.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-[#002446] border border-white/10 space-y-3">
                <div className="text-xs font-mono text-[#2F9148] uppercase font-bold">
                  Next Steps
                </div>
                <div className="text-sm font-bold text-white">Stage 2 Evaluation</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Upon secretarial review of your Stage 1 submission, shortlisted candidates will receive an invitation to proceed with Stage 2 onboarding and team matching.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
