import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TEAMS_DATA, getPublishedOnly } from "@/lib/contentStore";
import { Users, ArrowUpRight, ShieldCheck, Sparkles, Layers } from "lucide-react";

export default function TeamsPage() {
  const allPublishedTeams = getPublishedOnly(TEAMS_DATA);
  const foundationalTeams = allPublishedTeams.filter((t) => t.isFoundational);
  const separateEntities = allPublishedTeams.filter((t) => !t.isFoundational);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <Users className="w-3.5 h-3.5" />
              <span>14 FOUNDATIONAL TEAMS + NASDI ALLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore Our Teams
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the internal foundational teams and working groups through which NationsWorld operates globally across continents.
            </p>
          </div>

          {/* 14 Foundational Teams Section */}
          <div className="space-y-6">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2F9148]" />
                <span>14 Foundational Internal Teams</span>
              </h2>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                14 Permanent Structures
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundationalTeams.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.slug}`}
                  className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                        Foundational Team
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#2F9148]" />
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#2F9148] transition-colors mb-1">
                      {team.name}
                    </h3>
                    <div className="text-xs font-mono text-[#2F9148] mb-3">{team.coreArea}</div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {team.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Lead: {team.teamLead || "Secretariat Board"}</span>
                    <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Space <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Separate Entities Section (NASDI) */}
          {separateEntities.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Specialized Alliances & Separate Entities</span>
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Operates Alongside 14 Foundational Teams
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {separateEntities.map((team) => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.slug}`}
                    className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Specialized Entity
                        </span>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                        {team.name}
                      </h3>
                      <div className="text-xs font-mono text-amber-400 mb-3">{team.coreArea}</div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {team.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Leadership: {team.teamLead}</span>
                      <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        View Space <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
