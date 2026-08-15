"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  Compass,
  Users,
  FolderGit2,
  Building2,
  GraduationCap,
  FileText,
  Newspaper,
  Sparkles,
  Search,
  ArrowUpRight,
  UserCheck,
  Plus,
  Lock,
  Edit3,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Organisations", href: "/organisations", icon: Building2 },
  { name: "Programmes", href: "/programmes", icon: GraduationCap },
  { name: "Publications", href: "/publications", icon: FileText },
  { name: "Updates", href: "/updates", icon: Newspaper },
  { name: "Impact", href: "/impact", icon: Sparkles },
  { name: "About", href: "/about", icon: Globe },
  { name: "Participate", href: "/participate", icon: UserCheck },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Creator State
  const [isCreator, setIsCreator] = useState(false);
  const [showCreatorAuthModal, setShowCreatorAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Form State
  const [createType, setCreateType] = useState("Publication");
  const [createTitle, setCreateTitle] = useState("");
  const [createSummary, setCreateSummary] = useState("");
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#00172e]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#2F9148] p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#00172e] rounded-[11px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#2F9148]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                NATIONSWORLD
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2F9148] animate-pulse" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 -mt-1">
                Institutional Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#002446]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {NAV_ITEMS.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-[#2F9148] shadow-md shadow-[#2F9148]/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Creator Controls & CTA */}
          <div className="flex items-center gap-3">
            {isCreator ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Content</span>
                </button>
                <button
                  onClick={() => setIsCreator(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-400"
                  title="Sign Out Creator Mode"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCreatorAuthModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              >
                <Lock className="w-3 h-3 text-[#2F9148]" />
                <span>Authorised Sign In</span>
              </button>
            )}

            <Link
              href="/explore"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-full transition-all duration-300 shadow-md shadow-[#2F9148]/20 active:scale-95"
            >
              <span>Explore Ecosystem</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#2F9148]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-[#00172e]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-6 overflow-y-auto border-t border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-400 pb-2 border-b border-white/10">
              <span>Navigation Directory</span>
              <span className="text-[#2F9148]">10 Sectors</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                        : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#2F9148] text-white' : 'bg-white/5 text-[#2F9148]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <Link
              href="/explore"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-[#2F9148] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Enter Ecosystem</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Creator Auth Modal (Google Sign In Mock) */}
      {showCreatorAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#002446] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Lock className="w-4 h-4" />
                <span>AUTHORISED CREATOR ACCESS</span>
              </div>
              <button onClick={() => setShowCreatorAuthModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Sign In as NationsWorld Creator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorised team leads and academic secretariats can publish research, project updates, and fellowship announcements directly.
              </p>
            </div>

            <button
              onClick={() => {
                setIsCreator(true);
                setShowCreatorAuthModal(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <Globe className="w-4 h-4 text-[#002446]" />
              <span>Continue with Google Workspace</span>
            </button>

            <div className="text-[11px] font-mono text-slate-400 text-center">
              Unauthorised visitors do not see creator controls on public pages.
            </div>
          </div>
        </div>
      )}

      {/* Create Content Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002446] border border-[#2F9148]/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 my-8 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Edit3 className="w-4 h-4" />
                <span>CREATOR CONTENT MANAGEMENT</span>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isPublishedSuccess ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsPublishedSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Content Sector</label>
                  <select
                    value={createType}
                    onChange={(e) => setCreateType(e.target.value)}
                    className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                  >
                    <option value="Publication">Publication / Research Paper</option>
                    <option value="Project">Active Project Initiative</option>
                    <option value="Programme">Programme / Fellowship</option>
                    <option value="Update">Global Dispatch / Update</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    placeholder="e.g. Climate Tech & Resilient Infrastructure Brief"
                    className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Short Description / Excerpt</label>
                  <textarea
                    required
                    rows={3}
                    value={createSummary}
                    onChange={(e) => setCreateSummary(e.target.value)}
                    placeholder="Provide a concise summary of the initiative or publication..."
                    className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#00172e] border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#2F9148]" />
                    <span>Media Attachment (Optional)</span>
                  </div>
                  <input
                    type="file"
                    className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2F9148] file:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors"
                  >
                    Publish to NationsWorld Platform
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-[#00172e] border border-[#2F9148] space-y-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#2F9148] mx-auto" />
                <div className="text-lg font-bold text-white">Content Published Successfully</div>
                <p className="text-xs text-slate-300">
                  «{createTitle || "New Content"}» has been added to the NationsWorld active repository.
                </p>
                <button
                  onClick={() => {
                    setIsPublishedSuccess(false);
                    setShowCreateModal(false);
                    setCreateTitle("");
                    setCreateSummary("");
                  }}
                  className="px-6 py-2 rounded-xl bg-[#2F9148] text-xs font-semibold text-white"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
