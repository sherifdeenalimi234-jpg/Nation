import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROJECTS_DATA, TEAMS_DATA, PUBLICATIONS_DATA, getPublishedOnly } from "@/lib/contentStore";
import { FolderGit2, ArrowLeft, Users, FileText, ArrowUpRight, MapPin, Tag } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — NationsWorld Project`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      siteName: "NationsWorld",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project || project.state !== "Published") {
    notFound();
  }

  const leadTeam = TEAMS_DATA.find((t) => t.slug === project.leadTeamSlug);
  const relatedPublications = getPublishedOnly(PUBLICATIONS_DATA).filter(
    (pub) => pub.relatedProjectSlug === project.slug
  );

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects Ecosystem</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <FolderGit2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                Status: {project.status}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{project.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#2F9148]" />
                  {project.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2F9148]" />
                  {project.location}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {leadTeam && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-mono text-xs">Lead Secretariat</span>
                  <Link href={`/teams/${leadTeam.slug}`} className="text-white font-bold hover:text-[#2F9148] text-sm">
                    {leadTeam.name}
                  </Link>
                </div>
                <Users className="w-5 h-5 text-slate-500" />
              </div>
            )}
          </div>

          {/* Related Publications */}
          {relatedPublications.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F9148]">
                <FileText className="w-4 h-4" />
                <span>Supporting Publications ({relatedPublications.length})</span>
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
                      <div className="text-xs text-slate-400 mt-1">{pub.category}</div>
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
