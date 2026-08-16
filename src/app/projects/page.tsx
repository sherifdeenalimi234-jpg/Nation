import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TEAMS_DATA } from "@/lib/contentStore";
import { GoogleContentService } from "@/lib/googleContentService";
import { FolderGit2, ArrowUpRight, MapPin, AlertCircle } from "lucide-react";

export default async function ProjectsPage() {
  const publishedProjects = await GoogleContentService.getPublicProjects();

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>GLOBAL INITIATIVES & RESEARCH LABS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Active Projects & Innovations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore multilateral technological frameworks, climate adaptation laboratories, and digital scholarship platforms.
            </p>
          </div>

          {publishedProjects.length === 0 ? (
            <div className="p-10 rounded-3xl bg-[#002446] border border-white/10 text-center space-y-4 max-w-2xl mx-auto">
              <AlertCircle className="w-10 h-10 text-[#2F9148] mx-auto opacity-80" />
              <h3 className="text-lg font-bold text-white">No Published Projects Found</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No active project records are currently published in the NationsWorld Google Sheets store. Authorised creators can publish projects using the Create Content portal.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedProjects.map((project) => {
                const leadTeam = TEAMS_DATA.find((t) => t.slug === project.leadTeamSlug);

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-slate-400">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-[#2F9148] transition-colors mb-2">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                        <MapPin className="w-3 h-3 text-[#2F9148]" />
                        <span>{project.location}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{leadTeam ? leadTeam.name : "NationsWorld"}</span>
                      <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        View Project <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
