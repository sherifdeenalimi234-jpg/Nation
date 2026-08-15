import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  TEAMS_DATA,
  PROJECTS_DATA,
  PROGRAMMES_DATA,
  PUBLICATIONS_DATA,
  getPublishedOnly
} from "@/lib/contentStore";
import { Users, ArrowLeft, FolderGit2, GraduationCap, FileText, ArrowUpRight, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return TEAMS_DATA.map((t) => ({ slug: t.slug }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = TEAMS_DATA.find((t) => t.slug === slug);

  if (!team || team.state !== "Published") {
    notFound();
  }

  const relatedProjects = getPublishedOnly(PROJECTS_DATA).filter((p) => p.leadTeamSlug === team.slug);
  const relatedProgrammes = getPublishedOnly(PROGRAMMES_DATA).filter((pr) => pr.leadTeamSlug === team.slug);
  const relatedPublications = getPublishedOnly(PUBLICATIONS_DATA).filter((pub) => pub.leadTeamSlug === team.slug);

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Teams Directory</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <Users className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                Foundational Secretariat
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{team.name}</h1>
              <p className="text-[#2F9148] font-mono text-xs sm:text-sm mt-1">{team.coreArea}</p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {team.description}
            </p>

            {team.teamLead && (
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2F9148]" />
                <div className="text-xs">
                  <span className="text-slate-400 block font-mono">Team Leadership</span>
                  <span className="text-white font-bold">{team.teamLead}</span>
                </div>
              </div>
            )}
          </div>

          {/* Relationships Section: Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F9148]">
                <FolderGit2 className="w-4 h-4" />
                <span>Lead Projects ({relatedProjects.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="p-5 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{p.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{p.category} • {p.status}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#2F9148]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Relationships Section: Programmes */}
          {relatedProgrammes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F9148]">
                <GraduationCap className="w-4 h-4" />
                <span>Active Programmes ({relatedProgrammes.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProgrammes.map((pr) => (
                  <Link
                    key={pr.slug}
                    href={`/programmes/${pr.slug}`}
                    className="p-5 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{pr.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{pr.type} • {pr.date}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#2F9148]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Relationships Section: Publications */}
          {relatedPublications.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F9148]">
                <FileText className="w-4 h-4" />
                <span>Publications & Policy Briefs ({relatedPublications.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPublications.map((pub) => (
                  <Link
                    key={pub.slug}
                    href={`/publications/${pub.slug}`}
                    className="p-5 rounded-2xl bg-[#002446] border border-white/10 hover:border-[#2F9148]/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{pub.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{pub.category} • {pub.publicationDate}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#2F9148]" />
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
