"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, CheckCircle2, Globe, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002446] border border-[#2F9148]/40 text-xs font-mono text-[#2F9148]">
              <Mail className="w-4 h-4" />
              <span>NATIONSWORLD SECRETARIAT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Contact Us
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Reach out to NationsWorld of Visionary Advancement for inquiries, partnership proposals, research collaborations, or general dispatches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-7 bg-[#002446] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@domain.com"
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">Subject *</label>
                    <input
                      required
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Inquiry topic"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-[#2F9148]/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              ) : (
                <div className="p-8 rounded-2xl bg-[#00172e] border border-[#2F9148] text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#2F9148] mx-auto" />
                  <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                  <p className="text-xs text-slate-300">
                    Thank you, {form.name}. Your dispatch has been received by the Secretariat.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148] font-bold uppercase">
                  <Globe className="w-4 h-4" />
                  <span>Global Secretariat</span>
                </div>
                <h3 className="text-xl font-bold text-white">NationsWorld Platform</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uniting Nations. Advancing Humanity.
                </p>
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-slate-300">
                  <div>Official Contact: secretariat@nationsworld.org</div>
                  <div>Platform: NationsWorld of Visionary Advancement</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
