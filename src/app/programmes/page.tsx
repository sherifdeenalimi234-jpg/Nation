import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROGRAMMES_DATA, TEAMS_DATA, getPublishedOnly } from "@/lib/contentStore";
import { GraduationCap, ArrowUpRight, Calendar, MapPin } from "lucide-react";

export default function ProgrammesPage() {
  const publishedProgrammes = getPublishedOnly(PROGRAMMES_DATA);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC PROGRAMMES & FELLOWSHIPS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Programmes & Fellowships
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Global leadership fellowships, multilateral dialogue series, and executive climate adaptation workshops designed for emerging leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProgrammes.map((prog) => {
              const leadTeam = TEAMS_DATA.find((t) => t.slug === prog.leadTeamSlug);

              return (
                <Link
                  key={prog.id}
                  href={`/programmes/${prog.slug}`}
                  className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                        {prog.type}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {prog.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#2F9148] transition-colors mb-2">
                      {prog.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#2F9148]" />
                        {prog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2F9148]" />
                        {prog.location}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{leadTeam ? leadTeam.name : "NationsWorld"}</span>
                    <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Programme <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
