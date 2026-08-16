"use client";

import React from "react";
import Link from "next/link";
import { Globe, ArrowUpRight, ShieldCheck, Mail, Sparkles, MessageCircle, Video, Camera } from "lucide-react";

const FOOTER_SECTORS = [
  { name: "Explore Directory", href: "/explore" },
  { name: "Global Teams", href: "/teams" },
  { name: "Active Projects", href: "/projects" },
  { name: "Partner Organisations", href: "/organisations" },
];

const FOOTER_INITIATIVES = [
  { name: "Academic Programmes", href: "/programmes" },
  { name: "Research Publications", href: "/publications" },
  { name: "Global Updates", href: "/updates" },
  { name: "Impact Metrics", href: "/impact" },
];

const OFFICIAL_SOCIALS = [
  {
    name: "YouTube",
    handle: "@nations_world",
    href: "https://www.youtube.com/@nations_world",
    icon: Video,
    color: "hover:text-red-400 hover:border-red-500/40",
  },
  {
    name: "Instagram",
    handle: "@nationsworld.global",
    href: "https://www.instagram.com/nationsworld.global?igsh=dGp6bWsyYmZkaXRr",
    icon: Camera,
    color: "hover:text-pink-400 hover:border-pink-500/40",
  },
  {
    name: "WhatsApp Channel",
    handle: "NationsWorld Channel",
    href: "https://whatsapp.com/channel/0029Vb7xfyCICVflI0qMKQ31",
    icon: MessageCircle,
    color: "hover:text-emerald-400 hover:border-emerald-500/40",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#04060d] border-t border-white/10 relative overflow-hidden pt-16 pb-12 text-slate-400">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1e62ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand Info & Social Links */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e62ff] to-[#00f0ff] p-[1px]">
                <div className="w-full h-full bg-[#060911] rounded-[11px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#00f0ff]" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NATIONSWORLD
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              NationsWorld of Visionary Advancement is an international youth-focused organisation and ecosystem centered on visionary advancement, human development, leadership, education, research, innovation, and global collaboration.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
                Uniting Nations. Advancing Humanity.
              </span>
            </div>

            {/* Official External Channels */}
            <div className="pt-3 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Official External Channels
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {OFFICIAL_SOCIALS.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 transition-all ${soc.color}`}
                      title={`Visit NationsWorld on ${soc.name}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{soc.handle}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Sectors */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Ecosystem Sectors
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTORS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives & Insights */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Initiatives & Insights
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {FOOTER_INITIATIVES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Institutional Dispatch */}
            <div className="p-4 rounded-xl bg-[#0d1322] border border-white/10 space-y-2">
              <div className="text-xs font-medium text-white flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                Institutional Dispatch
              </div>
              <p className="text-xs text-slate-400">
                Receive accredited briefings, research publications, and global program updates.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1">
                <input
                  type="email"
                  placeholder="Official Email Address"
                  className="bg-[#060911] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1e62ff] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#1e62ff] hover:bg-[#3b78ff] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} NationsWorld of Visionary Advancement. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Privacy Standards
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Institutional Framework
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Accessibility Statement
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
