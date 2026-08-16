import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROGRAMMES_DATA, TEAMS_DATA } from "@/lib/contentStore";
import { GraduationCap, ArrowLeft, Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROGRAMMES_DATA.map((pr) => ({ slug: pr.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = PROGRAMMES_DATA.find((pr) => pr.slug === slug);
  if (!programme) return {};

  return {
    title: `${programme.title} — NationsWorld Programme`,
    description: programme.description,
    openGraph: {
      title: programme.title,
      description: programme.description,
      type: "article",
      siteName: "NationsWorld",
    },
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = PROGRAMMES_DATA.find((pr) => pr.slug === slug);

  if (!programme || programme.state !== "Published") {
    notFound();
  }

  const leadTeam = TEAMS_DATA.find((t) => t.slug === programme.leadTeamSlug);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Academic Programmes</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <GraduationCap className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                {programme.type} • {programme.status}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{programme.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2F9148]" />
                  {programme.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2F9148]" />
                  {programme.location}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {programme.description}
            </p>

            {leadTeam && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-mono text-xs">Organising Secretariat</span>
                  <Link href={`/teams/${leadTeam.slug}`} className="text-white font-bold hover:text-[#2F9148] text-sm">
                    {leadTeam.name}
                  </Link>
                </div>
                <Users className="w-5 h-5 text-slate-500" />
              </div>
            )}

            <div className="pt-4">
              <Link
                href="/participate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
              >
                <span>Submit Application / Registration</span>
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
