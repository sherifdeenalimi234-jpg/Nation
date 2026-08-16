"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, ArrowRight, Compass, Home, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-[#f8fafc]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8 bg-slate-900/40 border border-slate-800 p-8 sm:p-12 rounded-2xl backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-wide">
            <ShieldAlert className="w-4 h-4" />
            <span>404 — RECORD NOT FOUND</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            This Resource is Unavailable or Relocated
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The requested page or record could not be identified within the NationsWorld digital ecosystem. Use our institutional search below or explore our primary sectors.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Projects, Programmes, Publications..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-24 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1e62ff] focus:ring-1 focus:ring-[#1e62ff]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#1e62ff] hover:bg-blue-600 text-white text-xs font-semibold transition"
            >
              Search
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e62ff] hover:bg-blue-600 text-white transition"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
