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
  ArrowUpRight,
  Lock,
  Edit3,
  CheckCircle2,
  Image as ImageIcon,
  Plus,
  Eye,
  Send,
  MessageCircle,
  AlertCircle
} from "lucide-react";
import {
  checkIsAuthorisedEmail,
  getCreatorSession,
  saveCreatorSession,
  clearCreatorSession,
  CreatorSession
} from "@/lib/creatorAuth";
import {
  createDefaultFormState,
  CreatorFormState,
  generateUniqueContentId
} from "@/lib/creationEngine";
import { TEAMS_DATA } from "@/lib/contentStore";

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
  { name: "Participate", href: "/participate", icon: UserCheckIcon },
];

function UserCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Session & Creator State
  const [session, setSession] = useState<CreatorSession | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Creation Portal Modal State
  const [showCreatePortal, setShowCreatePortal] = useState(false);
  const [portalMode, setPortalMode] = useState<"edit" | "preview" | "published">("edit");
  const [formState, setFormState] = useState<CreatorFormState>(createDefaultFormState("Project"));
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = getCreatorSession();
    if (saved) setSession(saved);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmailInput || !authEmailInput.includes("@")) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    const isAuthorised = checkIsAuthorisedEmail(authEmailInput);

    if (!isAuthorised) {
      setAuthError("Access Restricted: This account is not authorised to create or publish NationsWorld content.");
      return;
    }

    const newSession: CreatorSession = {
      email: authEmailInput,
      name: authEmailInput.split("@")[0].toUpperCase(),
      isAuthorised: true,
      signedInAt: new Date().toISOString(),
    };

    saveCreatorSession(newSession);
    setSession(newSession);
    setShowAuthModal(false);
    setAuthEmailInput("");
    showToast("Creator Access Granted");
  };

  const handleSignOut = () => {
    clearCreatorSession();
    setSession(null);
    showToast("Signed Out");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileTypeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null || prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 30;
        });
      }, 150);
    }
  };

  const handleTypeChange = (type: string) => {
    setFormState(createDefaultFormState(type));
    setPortalMode("edit");
    setUploadProgress(null);
  };

  const handleSaveDraft = () => {
    if (!formState.title) {
      showToast("Title is required to save draft");
      return;
    }
    setFormState((prev) => ({ ...prev, state: "Draft" }));
    showToast("Draft Saved");
  };

  const handlePublish = () => {
    if (!formState.title || !formState.shortDescription) {
      showToast("Please fill in required fields (Title & Description)");
      return;
    }
    setFormState((prev) => ({ ...prev, state: "Published" }));
    setPortalMode("published");
    showToast("Published Successfully");
  };

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

          {/* Creator & CTA Controls */}
          <div className="flex items-center gap-3">
            {session?.isAuthorised ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPortalMode("edit");
                    setShowCreatePortal(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-[#2F9148]/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Content</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-400"
                  title="Sign Out Creator Mode"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002446] border border-[#2F9148] text-white px-4 py-2.5 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#2F9148]" />
          <span>{toastMessage}</span>
        </div>
      )}

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
            {!session?.isAuthorised && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowAuthModal(true);
                }}
                className="w-full py-2.5 px-4 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#2F9148]" />
                <span>Authorised Sign In</span>
              </button>
            )}

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

      {/* Creator Google Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#002446] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Lock className="w-4 h-4" />
                <span>AUTHORISED CREATOR ACCESS</span>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Sign In with Google Account</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your authorised NationsWorld Google account email to unlock content creation and publishing workflows.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Google Email Address</label>
                <input
                  required
                  type="email"
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="e.g. secretariat@nationsworld.org"
                  className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2F9148]"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#2F9148]/20"
              >
                <span>Authenticate Account</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[11px] font-mono text-slate-400 text-center">
              Unauthorised accounts will remain in public-only view.
            </div>
          </div>
        </div>
      )}

      {/* Creation Portal Modal (Project, Organisation, Programme, Team, Publication, Update, Impact) */}
      {showCreatePortal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002446] border border-[#2F9148]/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 my-8 animate-in fade-in">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Edit3 className="w-4 h-4" />
                <span>NATIONSWORLD CREATOR PORTAL</span>
                <span className="text-slate-400">({formState.id})</span>
              </div>
              <button onClick={() => setShowCreatePortal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Portal Tab Mode Bar */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono">
              <button
                onClick={() => setPortalMode("edit")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  portalMode === "edit" ? "bg-[#2F9148] text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Edit Portal
              </button>
              <button
                onClick={() => setPortalMode("preview")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  portalMode === "preview" ? "bg-[#2F9148] text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>

            {/* Mode 1: Edit Form */}
            {portalMode === "edit" && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                {/* Sector Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Content Sector</label>
                    <select
                      value={formState.type}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    >
                      <option value="Project">Project Portal (+ Create Project)</option>
                      <option value="Organisation">Organisation Portal (+ Create Organisation)</option>
                      <option value="Programme">Programme Portal (+ Create Programme)</option>
                      <option value="Team">Team Portal (+ Create Team)</option>
                      <option value="Publication">Publication Portal (+ Create Publication)</option>
                      <option value="Update">Update Portal (+ Create Update)</option>
                      <option value="Impact">Impact Portal (Manage Impact)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Unique Content ID</label>
                    <input
                      disabled
                      type="text"
                      value={formState.id}
                      className="w-full bg-[#00172e]/50 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 font-mono"
                    />
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Title / Name *</label>
                    <input
                      required
                      type="text"
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      placeholder="e.g. Climate Resilience Lab 2026"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Category / Type</label>
                    <input
                      type="text"
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      placeholder="e.g. Innovation, Report, Summit"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Short Description / Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={formState.shortDescription}
                    onChange={(e) => setFormState({ ...formState, shortDescription: e.target.value })}
                    placeholder="Provide a concise summary of the initiative..."
                    className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                  />
                </div>

                {/* Lead Secretariat & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Lead Secretariat / Team</label>
                    <select
                      value={formState.leadTeamSlug}
                      onChange={(e) => setFormState({ ...formState, leadTeamSlug: e.target.value })}
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    >
                      {TEAMS_DATA.map((team) => (
                        <option key={team.slug} value={team.slug}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Location / Platform</label>
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      placeholder="e.g. Geneva, Global / Online"
                      className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                    />
                  </div>
                </div>

                {/* File Upload Simulation (Google Drive Storage) */}
                <div className="p-4 rounded-xl bg-[#00172e] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#2F9148]" />
                      Document / Media Attachment (Google Drive Pipeline)
                    </span>
                    <span className="text-slate-500 text-[10px]">Max 50MB</span>
                  </div>

                  <input
                    type="file"
                    onChange={handleFileTypeUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2F9148] file:text-white cursor-pointer"
                  />

                  {uploadProgress !== null && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Uploading to Drive Folder...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2F9148] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional WhatsApp Pathway */}
                <div className="p-3.5 rounded-xl bg-[#00172e]/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Send copy to Official NationsWorld WhatsApp</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!formState.whatsappContact}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        whatsappContact: e.target.checked ? "https://wa.me/nationsworld" : undefined,
                      })
                    }
                    className="w-4 h-4 accent-[#2F9148] cursor-pointer"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    Save Draft
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPortalMode("preview")}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono text-[#2F9148] bg-white/5 hover:bg-white/10 border border-white/10"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={handlePublish}
                      className="px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-xs font-semibold text-white transition-colors flex items-center gap-2 shadow-lg shadow-[#2F9148]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Content</span>
                    </button>
                  </div>
                </div>

              </form>
            )}

            {/* Mode 2: Live Preview */}
            {portalMode === "preview" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 rounded-xl bg-[#00172e] border border-white/10 text-xs font-mono text-amber-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>PREVIEW MODE — Showing live public layout parity</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#00172e] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                      {formState.type} • {formState.category || "General"}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{formState.date}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white">{formState.title || "Untitled Content"}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">{formState.shortDescription || "No description provided."}</p>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>ID: {formState.id}</span>
                    <span className="text-[#2F9148]">View Resource →</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setPortalMode("edit")}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10"
                  >
                    Return to Edit
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-6 py-2 rounded-xl bg-[#2F9148] text-xs font-semibold text-white shadow-lg shadow-[#2F9148]/20"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Published Success */}
            {portalMode === "published" && (
              <div className="p-8 rounded-2xl bg-[#00172e] border border-[#2F9148] space-y-4 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#2F9148] mx-auto" />
                <div className="text-xl font-bold text-white">Published Successfully</div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your record <span className="font-mono text-[#2F9148]">{formState.id}</span> is now active and available across the NationsWorld ecosystem.
                </p>

                {formState.whatsappContact && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Dispatch Link Prepared</span>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setShowCreatePortal(false);
                      setFormState(createDefaultFormState("Project"));
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#2F9148] text-xs font-semibold text-white"
                  >
                    Return to Platform
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}
