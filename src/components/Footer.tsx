"use client";

import React from "react";
import Link from "next/link";
import { Globe, ArrowUpRight, ShieldCheck, Mail, Video, Camera, MessageCircle } from "lucide-react";
import { OFFICIAL_SOCIAL_CONFIG } from "@/lib/socialConfig";

const FOOTER_NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Teams & Institutes", href: "/teams" },
  { name: "Programmes", href: "/programmes" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Production", href: "/production" },
  { name: "FAQ", href: "/faq" },
  { name: "Membership", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

const OFFICIAL_SOCIALS = [
  {
    name: OFFICIAL_SOCIAL_CONFIG.youtube.name,
    handle: OFFICIAL_SOCIAL_CONFIG.youtube.handle,
    href: OFFICIAL_SOCIAL_CONFIG.youtube.url,
    icon: Video,
    color: "hover:text-red-400 hover:border-red-500/40",
  },
  {
    name: OFFICIAL_SOCIAL_CONFIG.instagram.name,
    handle: OFFICIAL_SOCIAL_CONFIG.instagram.handle,
    href: OFFICIAL_SOCIAL_CONFIG.instagram.url,
    icon: Camera,
    color: "hover:text-pink-400 hover:border-pink-500/40",
  },
  {
    name: OFFICIAL_SOCIAL_CONFIG.whatsapp.name,
    handle: OFFICIAL_SOCIAL_CONFIG.whatsapp.handle,
    href: OFFICIAL_SOCIAL_CONFIG.whatsapp.url,
    icon: MessageCircle,
    color: "hover:text-emerald-400 hover:border-emerald-500/40",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#001224] border-t border-white/10 relative overflow-hidden pt-16 pb-12 text-slate-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2F9148]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2F9148]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand Info & Core Areas */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2F9148] p-[1px]">
                <div className="w-full h-full bg-[#00172e] rounded-[11px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#2F9148]" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                NATIONSWORLD
              </span>
            </Link>

            <div className="text-xs font-mono uppercase tracking-widest text-[#2F9148] font-bold">
              NATIONSWORLD OF VISIONARY ADVANCEMENT
            </div>

            <div className="p-3 rounded-xl bg-[#00172e] border border-white/10 text-xs font-mono text-slate-200 tracking-wider font-semibold">
              RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              A multidisciplinary platform bringing together people, ideas and initiatives committed to learning, innovation, leadership, development and meaningful production.
            </p>

            {/* Official External Social Channels */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Official Channels
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
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00172e] border border-white/10 text-xs font-medium text-slate-200 transition-all ${soc.color}`}
                      title={`Visit NationsWorld on ${soc.name}`}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#2F9148]" />
                      <span>{soc.handle}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white text-slate-300 transition-colors duration-200 inline-flex items-center gap-1.5 group text-xs font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9148] group-hover:scale-125 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Dispatch */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Stay Connected
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Subscribe for institutional updates, research publications, and global initiative announcements.
            </p>

            <div className="p-4 rounded-xl bg-[#00172e] border border-white/10 space-y-3">
              <div className="text-xs font-medium text-white flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2F9148]" />
                <span>NationsWorld Dispatch</span>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="bg-[#002446] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2F9148] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#2F9148] hover:bg-[#37a854] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Information */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} NATIONSWORLD OF VISIONARY ADVANCEMENT. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About NationsWorld
            </Link>
            <Link href="/membership" className="hover:text-white transition-colors">
              Membership Portal
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
