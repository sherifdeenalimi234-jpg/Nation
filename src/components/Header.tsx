"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  Compass,
  Users,
  FolderGit2,
  Building2,
  GraduationCap,
  FileText,
  Newspaper,
  Sparkles,
  Search,
  ArrowUpRight
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Explore", href: "/explore", icon: Compass, badge: "Ecosystem" },
  { name: "Teams", href: "/teams", icon: Users, badge: "Global" },
  { name: "Projects", href: "/projects", icon: FolderGit2, badge: "Active" },
  { name: "Organisations", href: "/organisations", icon: Building2 },
  { name: "Programmes", href: "/programmes", icon: GraduationCap },
  { name: "Publications", href: "/publications", icon: FileText, badge: "Research" },
  { name: "Updates", href: "/updates", icon: Newspaper },
  { name: "Impact", href: "/impact", icon: Sparkles, badge: "Metrics" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060911]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#1e62ff] rounded-lg p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e62ff] to-[#00f0ff] p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#060911] rounded-[11px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#00f0ff] transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                NATIONSWORLD
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 -mt-1">
                Institutional Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d1322]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {NAV_ITEMS.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-[#1e62ff] shadow-md shadow-[#1e62ff]/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#1e62ff] to-[#00f0ff]/80 hover:from-[#3b78ff] hover:to-[#00f0ff] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1e62ff]/20 active:scale-95"
            >
              <span>Explore Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e62ff]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#00f0ff]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-[#060911]/95 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-6 overflow-y-auto border-t border-white/10 animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-400 pb-2 border-b border-white/10">
              <span>Navigation Directory</span>
              <span className="text-[#00f0ff]">8 Sectors</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 active:scale-[0.99] ${
                      isActive
                        ? "bg-[#1e62ff]/20 border-[#1e62ff] text-white"
                        : "bg-[#0d1322] border-white/5 text-slate-200 hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#1e62ff] text-white' : 'bg-white/5 text-[#00f0ff]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          nationsworld.org{item.href}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#00f0ff]">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1e62ff]/10 to-[#00f0ff]/10 border border-[#1e62ff]/20">
              <div className="text-xs font-semibold text-white mb-1">Institutional Credibility & Access</div>
              <p className="text-xs text-slate-400 mb-3">
                Discover research, leadership programs, and youth initiatives designed for high impact.
              </p>
              <Link
                href="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-[#1e62ff] hover:bg-[#3b78ff] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Ecosystem</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
              <span>© NATIONSWORLD INSTITUTION</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM LIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
