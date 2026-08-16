import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UPDATES_DATA } from "@/lib/contentStore";
import { Newspaper, ArrowLeft, Calendar, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return UPDATES_DATA.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = UPDATES_DATA.find((u) => u.slug === slug);
  if (!update) return {};

  return {
    title: `${update.title} — NationsWorld Newsroom`,
    description: update.description,
    openGraph: {
      title: update.title,
      description: update.description,
      type: "article",
      siteName: "NationsWorld",
    },
  };
}

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = UPDATES_DATA.find((u) => u.slug === slug);

  if (!update || update.state !== "Published") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Newsroom & Dispatches</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <Newspaper className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                Dispatch Type: {update.type}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{update.title}</h1>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2">
                <Calendar className="w-3.5 h-3.5 text-[#2F9148]" />
                <span>{update.date}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {update.description}
            </p>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
              >
                <span>Explore Ecosystem Directory</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
