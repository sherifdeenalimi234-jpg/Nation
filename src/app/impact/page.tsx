import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IMPACT_METRICS_DATA } from "@/lib/contentStore";
import { BarChart3, Globe, Sparkles, ArrowRight } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>MEASURABLE HUMAN ADVANCEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Global Impact Metrics
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent institutional indicators measuring our reach across youth leaders, multilateral partnerships, and peer-reviewed publications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_METRICS_DATA.map((metric) => (
              <div key={metric.id} className="p-8 rounded-3xl bg-[#002446] border border-white/10 space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {metric.name}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#002446] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Sparkles className="w-4 h-4" />
                <span>INSTITUTIONAL GROWTH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Contribute to NationsWorld Initiatives
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Join our regional secretariats, submit research proposals, or register your organization in our multilateral partner network.
              </p>
            </div>

            <Link
              href="/participate"
              className="px-6 py-3.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-white text-xs font-bold font-mono tracking-wide transition-colors flex items-center gap-2 shrink-0"
            >
              <span>Submit Participation Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
