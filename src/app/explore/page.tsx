"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  TEAMS_DATA,
  PROJECTS_DATA,
  PROGRAMMES_DATA,
  PUBLICATIONS_DATA,
  ORGANISATIONS_DATA,
  UPDATES_DATA,
  getPublishedOnly
} from "@/lib/contentStore";
import { Search, Filter, ArrowUpRight, ShieldAlert, X } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Projects", "Programmes", "Publications", "Teams", "Organisations", "Updates"];

  const publishedTeams = getPublishedOnly(TEAMS_DATA).map((item) => ({
    id: item.id,
    title: item.name,
    category: "Teams",
    badge: "TEAM",
    subtitle: item.coreArea,
    description: item.description,
    href: `/teams/${item.slug}`,
  }));

  const publishedProjects = getPublishedOnly(PROJECTS_DATA).map((item) => ({
    id: item.id,
    title: item.title,
    category: "Projects",
    badge: "PROJECT",
    subtitle: `${item.category} • ${item.status}`,
    description: item.description,
    href: `/projects/${item.slug}`,
  }));

  const publishedProgrammes = getPublishedOnly(PROGRAMMES_DATA).map((item) => ({
    id: item.id,
    title: item.title,
    category: "Programmes",
    badge: "PROGRAMME",
    subtitle: `${item.type} • ${item.date}`,
    description: item.description,
    href: `/programmes/${item.slug}`,
  }));

  const publishedPublications = getPublishedOnly(PUBLICATIONS_DATA).map((item) => ({
    id: item.id,
    title: item.title,
    category: "Publications",
    badge: "PUBLICATION",
    subtitle: `${item.category} • ${item.publicationDate}`,
    description: item.description,
    href: `/publications/${item.slug}`,
  }));

  const publishedOrganisations = getPublishedOnly(ORGANISATIONS_DATA).map((item) => ({
    id: item.id,
    title: item.name,
    category: "Organisations",
    badge: "ORGANISATION",
    subtitle: item.category,
    description: item.description,
    href: `/organisations/${item.slug}`,
  }));

  const publishedUpdates = getPublishedOnly(UPDATES_DATA).map((item) => ({
    id: item.id,
    title: item.title,
    category: "Updates",
    badge: "UPDATE",
    subtitle: item.date,
    description: item.description,
    href: `/updates/${item.slug}`,
  }));

  const allItems = [
    ...publishedProjects,
    ...publishedProgrammes,
    ...publishedPublications,
    ...publishedTeams,
    ...publishedOrganisations,
    ...publishedUpdates,
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col selection:bg-[#2F9148]/30 selection:text-white">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148] mb-4">
              <Search className="w-3.5 h-3.5" />
              <span>UNIFIED GLOBAL SEARCH ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore NationsWorld Ecosystem
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Search and discover active public projects, secretariats, academic publications, programmes, and partner organisations.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="p-4 rounded-2xl bg-[#002446] border border-white/10 mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, publications, teams, organisations, programmes..."
                  className="w-full bg-[#00172e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2F9148]"
                />
              </div>

              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2.5 text-xs font-mono text-[#2F9148] bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-white/5 pt-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#2F9148]" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                    selectedCategory === cat
                      ? "bg-[#2F9148] text-white border-[#2F9148]"
                      : "bg-[#00172e] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
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
                  className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.subtitle}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#2F9148] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Direct Pathway</span>
                    <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#002446] border border-white/10 space-y-3 max-w-lg mx-auto">
              <ShieldAlert className="w-8 h-8 text-[#2F9148] mx-auto" />
              <div className="text-sm font-semibold text-white">No Matching Directory Entries</div>
              <p className="text-xs text-slate-400">
                NationsWorld is preparing this space for future developments. Try adjusting your search query or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 px-4 py-2 text-xs font-mono text-white bg-[#2F9148] rounded-xl hover:bg-[#37a854]"
              >
                Clear Search Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
