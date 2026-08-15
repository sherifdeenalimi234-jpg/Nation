import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PUBLICATIONS_DATA, TEAMS_DATA } from "@/lib/contentStore";
import { FileText, ArrowLeft, Calendar, User, Download, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return PUBLICATIONS_DATA.map((pub) => ({ slug: pub.slug }));
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = PUBLICATIONS_DATA.find((p) => p.slug === slug);

  if (!pub || pub.state !== "Published") {
    notFound();
  }

  const leadTeam = TEAMS_DATA.find((t) => t.slug === pub.leadTeamSlug);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Publications Repository</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <FileText className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                {pub.category}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{pub.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#2F9148]" />
                  Authors: {pub.authors.join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2F9148]" />
                  {pub.publicationDate}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {pub.description}
            </p>

            {leadTeam && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-slate-400 block font-mono text-xs">Publishing Secretariat</span>
                <Link href={`/teams/${leadTeam.slug}`} className="text-white font-bold hover:text-[#2F9148] text-sm">
                  {leadTeam.name}
                </Link>
              </div>
            )}

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={pub.fileUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Read / Open Publication PDF</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
