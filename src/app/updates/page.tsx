import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UPDATES_DATA, getPublishedOnly } from "@/lib/contentStore";
import { Newspaper, ArrowUpRight, Calendar } from "lucide-react";

export default function UpdatesPage() {
  const publishedUpdates = getPublishedOnly(UPDATES_DATA);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <Newspaper className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL NEWSROOM & DISPATCHES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Global Updates & Newsroom
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Official press dispatches, secretariat announcements, and accredited institutional communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedUpdates.map((update) => (
              <Link
                key={update.id}
                href={`/updates/${update.slug}`}
                className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                      {update.type}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {update.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#2F9148] transition-colors mb-2">
                    {update.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                    {update.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Press Dispatch</span>
                  <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Dispatch <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
