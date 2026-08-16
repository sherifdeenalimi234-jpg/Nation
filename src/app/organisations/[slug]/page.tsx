import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ORGANISATIONS_DATA } from "@/lib/contentStore";
import { Building2, ArrowLeft, Globe, MapPin, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ORGANISATIONS_DATA.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const org = ORGANISATIONS_DATA.find((o) => o.slug === slug);
  if (!org) return {};

  return {
    title: `${org.name} — Partner Organisation`,
    description: org.description,
    openGraph: {
      title: org.name,
      description: org.description,
      type: "article",
      siteName: "NationsWorld",
    },
  };
}

export default async function OrganisationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = ORGANISATIONS_DATA.find((o) => o.slug === slug);

  if (!org || org.state !== "Published") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#00172e] text-[#ffffff] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <Link
            href="/organisations"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Organisations Directory</span>
          </Link>

          {/* Profile Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#002446] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="p-3.5 rounded-2xl bg-[#2F9148]/20 text-[#2F9148]">
                <Building2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/30">
                {org.category}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{org.name}</h1>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-[#2F9148]" />
                <span>{org.location}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {org.description}
            </p>

            {org.website && (
              <div className="pt-4 border-t border-white/10">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-bold text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
