import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleContentService } from "@/lib/googleContentService";
import { Building2, ArrowUpRight, MapPin, Globe, Layers, AlertCircle } from "lucide-react";

export default async function OrganisationsPage() {
  const publishedOrgs = await GoogleContentService.getPublicOrganisations();

  const categories = [
    { key: "NationsWorld-Owned", title: "NationsWorld-Owned Entities", desc: "Central institutional research bodies and proprietary ecosystem hubs." },
    { key: "Partners", title: "Institutional Partners", desc: "Accredited university alliances, international institutions, and consortiums." },
    { key: "Affiliates", title: "Global Affiliates", desc: "Regional youth action networks and grassroots policy advocacy chapters." },
    { key: "Proposed", title: "Proposed Strategic Alliances", desc: "Frontier technology and policy coalitions under multilateral review." },
  ] as const;

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#2F9148]">
              <Building2 className="w-3.5 h-3.5" />
              <span>4 TOP-LEVEL INSTITUTIONAL CATEGORIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Organisations Directory
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the structured multilateral ecosystem connecting NationsWorld-owned institutes, accredited university partners, global affiliates, and proposed coalitions.
            </p>
          </div>

          {publishedOrgs.length === 0 ? (
            <div className="p-10 rounded-3xl bg-[#002446] border border-white/10 text-center space-y-4 max-w-2xl mx-auto">
              <AlertCircle className="w-10 h-10 text-[#2F9148] mx-auto opacity-80" />
              <h3 className="text-lg font-bold text-white">No Published Organisations Found</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No organisation entries are currently published in the Google Sheet repository. Authorised creators can publish organisations via the Create Content portal.
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const orgsInCategory = publishedOrgs.filter((o) => o.category === cat.key);

              return (
                <div key={cat.key} className="space-y-6">
                  <div className="pb-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#2F9148]" />
                        <span>{cat.title}</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">{cat.desc}</p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 shrink-0 w-fit">
                      {orgsInCategory.length} Registered
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orgsInCategory.map((org) => (
                      <Link
                        key={org.id}
                        href={`/organisations/${org.slug}`}
                        className="group p-6 rounded-2xl bg-[#002446] hover:bg-[#00305c] border border-white/10 hover:border-[#2F9148]/50 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                              {org.category}
                            </span>
                            <Globe className="w-4 h-4 text-[#2F9148]" />
                          </div>

                          <h3 className="text-lg font-bold text-white group-hover:text-[#2F9148] transition-colors mb-2">
                            {org.name}
                          </h3>

                          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                            <MapPin className="w-3 h-3 text-[#2F9148]" />
                            <span>{org.location}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                            {org.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span>Profile Entry</span>
                          <span className="text-[#2F9148] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            View Profile <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
