"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Compass,
  Search,
  Filter,
  ArrowUpRight,
  Globe,
  FileText,
  Users,
  FolderGit2,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

const EXPLORE_ITEMS = [
  {
    id: "exp-01",
    title: "Global Youth Leadership Index 2026",
    category: "Publications",
    sector: "Research",
    summary: "Comprehensive assessment of youth-led policy contributions across 120 member states.",
    badge: "Featured Publication",
    date: "Aug 2026",
    href: "/publications",
    active: true,
  },
  {
    id: "exp-02",
    title: "Climate Tech & Resilient Infrastructure Fellowship",
    category: "Programmes",
    sector: "Education",
    summary: "6-month international accelerator pairing young scientists with institutional mentors.",
    badge: "Applications Open",
    date: "Cohort 04",
    href: "/programmes",
    active: true,
  },
  {
    id: "exp-03",
    title: "Multilateral AI Governance Charter",
    category: "Projects",
    sector: "Innovation",
    summary: "Drafting ethical AI guidelines co-authored by international youth delegates.",
    badge: "Active Initiative",
    date: "Ongoing",
    href: "/projects",
    active: true,
  },
  {
    id: "exp-04",
    title: "NationsWorld Academic Secretariat — Europe & Africa",
    category: "Teams",
    sector: "Governance",
    summary: "Regional academic secretariats coordinating research delegations and university chapters.",
    badge: "Secretariat",
    date: "Live Directory",
    href: "/teams",
    active: true,
  },
  {
    id: "exp-05",
    title: "International Higher Education Alliance",
    category: "Organisations",
    sector: "Alliances",
    summary: "Network of 45+ partner universities supporting cross-border research exchanges.",
    badge: "Partner Network",
    date: "Verified",
    href: "/organisations",
    active: true,
  },
  {
    id: "exp-06",
    title: "Annual Impact Assessment & Audit Report",
    category: "Impact",
    sector: "Accountability",
    summary: "Audited metrics on scholarship allocations, research citations, and program reach.",
    badge: "Transparency",
    date: "2026 Audit",
    href: "/impact",
    active: true,
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Publications", "Programmes", "Projects", "Teams", "Organisations", "Impact"];

  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#060911] text-[#f8fafc] flex flex-col selection:bg-[#1e62ff]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f0ff] mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>INTERACTIVE DISCOVERY ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore NationsWorld Ecosystem
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Discover accredited research, active youth projects, partner universities, and global fellowship cohorts.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="p-4 rounded-2xl bg-[#0d1322] border border-white/10 mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search publications, programs, projects, partners..."
                  className="w-full bg-[#060911] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1e62ff]"
                />
              </div>

              {/* Reset filter button if needed */}
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2.5 text-xs font-mono text-[#00f0ff] bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-white/5 pt-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                    selectedCategory === cat
                      ? "bg-[#1e62ff] text-white border-[#1e62ff]"
                      : "bg-[#060911] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Items List */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group p-6 rounded-2xl bg-[#0d1322] hover:bg-[#131b30] border border-white/10 hover:border-[#1e62ff]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1e62ff]/20 text-[#00f0ff] border border-[#1e62ff]/40">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{item.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Sector: {item.sector}</span>
                    <span className="text-[#00f0ff] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#0d1322] border border-white/10 space-y-3 max-w-lg mx-auto">
              <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="text-sm font-semibold text-white">No Matching Directory Entries</div>
              <p className="text-xs text-slate-400">
                Try adjusting your search query or switching categories.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
