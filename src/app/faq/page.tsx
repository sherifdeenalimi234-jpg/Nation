"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is NationsWorld of Visionary Advancement?",
      a: "NationsWorld of Visionary Advancement is a multidisciplinary community dedicated to developing people, advancing ideas and creating pathways for meaningful contribution across research, innovation, development, leadership, and production."
    },
    {
      q: "How can I join NationsWorld?",
      a: "You can apply through our Membership Portal by completing the Stage 1 Membership Application. Open the hamburger menu, select 'Membership', and click 'Apply for Membership'."
    },
    {
      q: "What are the core areas of NationsWorld?",
      a: "Our five core areas of focus are Research, Innovation, Development, Leadership, and Production."
    },
    {
      q: "What is The Productive Discourse (TPD)?",
      a: "TPD (The Productive Discourse) is a flagship NationsWorld programme featuring 'A Week of Learning, Leadership, Reflection & Action'."
    },
    {
      q: "How do teams and institutes operate in NationsWorld?",
      a: "NationsWorld operates through specialized teams and institutes designed to transform our core areas of focus into practical programmes, initiatives, and opportunities."
    },
    {
      q: "Who can participate in NationsWorld?",
      a: "NationsWorld welcomes students, researchers, innovators, emerging leaders, creators, and development-oriented individuals committed to learning and contribution."
    }
  ];

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002446] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148]">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Find answers to common questions about NationsWorld, our core areas, membership process, and programmes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="p-6 rounded-2xl bg-[#002446] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-base font-bold text-white pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#2F9148] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Have More Questions?</h3>
            <p className="text-xs text-slate-300">
              Reach out directly to the NationsWorld Secretariat.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
            >
              <span>Contact Secretariat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
