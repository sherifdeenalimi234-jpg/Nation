"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally without exposing raw traces to visitors
    console.error("NationsWorld Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-[#f8fafc]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-6 bg-slate-900/40 border border-slate-800 p-8 sm:p-12 rounded-2xl backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-wide">
            <AlertTriangle className="w-4 h-4" />
            <span>CONNECTION NOTICE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            NationsWorld is temporarily unable to load this content.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Our global infrastructure layer experienced a temporary communication latency or network response pause. Please refresh or retry your request.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e62ff] hover:bg-blue-600 text-white transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Request</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
