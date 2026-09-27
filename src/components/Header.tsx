"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
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
  Plus,
  Eye,
  Send,
  AlertCircle,
  Upload,
  FileCheck,
  ShieldAlert,
  UserCheck,
  Home,
  HelpCircle,
  Factory,
  Mail,
  Info,
  Layers
} from "lucide-react";
import {
  getCreatorSession,
  saveCreatorSession,
  clearCreatorSession,
  CreatorSession
} from "@/lib/creatorAuth";
import {
  ContentType,
  ProjectFormFields,
  OrganisationFormFields,
  ProgrammeFormFields,
  TeamFormFields,
  PublicationFormFields,
  UpdateFormFields,
  ImpactFormFields,
  createDefaultProjectForm,
  createDefaultOrganisationForm,
  createDefaultProgrammeForm,
  createDefaultTeamForm,
  createDefaultPublicationForm,
  createDefaultUpdateForm,
  createDefaultImpactForm
} from "@/lib/creationEngine";
import { TEAMS_DATA } from "@/lib/contentStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [membershipDropdownOpen, setMembershipDropdownOpen] = useState(false);

  // Creator Session State
  const [session, setSession] = useState<CreatorSession | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Portal & Content Creation State
  const [showCreatePortal, setShowCreatePortal] = useState(false);
  const [portalMode, setPortalMode] = useState<"select_type" | "edit" | "preview" | "published">("select_type");
  const [selectedType, setSelectedType] = useState<ContentType>("Project");
  const [publishing, setPublishing] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pipelineResult, setPipelineResult] = useState<any>(null);

  // Content-Specific Form States
  const [projectForm, setProjectForm] = useState<ProjectFormFields>(createDefaultProjectForm());
  const [orgForm, setOrgForm] = useState<OrganisationFormFields>(createDefaultOrganisationForm());
  const [progForm, setProgForm] = useState<ProgrammeFormFields>(createDefaultProgrammeForm());
  const [teamForm, setTeamForm] = useState<TeamFormFields>(createDefaultTeamForm());
  const [pubForm, setPubForm] = useState<PublicationFormFields>(createDefaultPublicationForm());
  const [updateForm, setUpdateForm] = useState<UpdateFormFields>(createDefaultUpdateForm());
  const [impactForm, setImpactForm] = useState<ImpactFormFields>(createDefaultImpactForm());

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = getCreatorSession();
    if (saved) {
      setSession(saved);
      initForms(saved.email);
    }
  }, []);

  const initForms = (email: string) => {
    setProjectForm(createDefaultProjectForm(email));
    setOrgForm(createDefaultOrganisationForm(email));
    setProgForm(createDefaultProgrammeForm(email));
    setTeamForm(createDefaultTeamForm(email));
    setPubForm(createDefaultPublicationForm(email));
    setUpdateForm(createDefaultUpdateForm(email));
    setImpactForm(createDefaultImpactForm(email));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmailInput || !authEmailInput.includes("@")) {
      setAuthError("Please enter a valid Google email address.");
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmailInput }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.message || "Access Restricted: Account is not authorised.");
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
      initForms(authEmailInput);
      setShowAuthModal(false);
      setAuthEmailInput("");
      showToast("Creator Access Granted");
    } catch {
      setAuthError("Server authentication check failed. Please try again.");
    }
  };

  const handleSignOut = () => {
    clearCreatorSession();
    setSession(null);
    showToast("Signed Out");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectContentType = (type: ContentType) => {
    setSelectedType(type);
    setPortalMode("edit");
  };

  // Google Drive File Upload Helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      showToast("File exceeds 25MB maximum limit.");
      return;
    }

    setUploadingFile(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(",")[1];

        const res = await fetch("/api/content?action=uploadFile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.email,
            contentType: selectedType,
            filePayload: {
              name: file.name,
              mimeType: file.type || "application/octet-stream",
              base64Data,
            },
          }),
        });

        const data = await res.json();
        setUploadingFile(false);

        if (!res.ok || !data.success || !data.fileUrl) {
          showToast(`Drive Storage Failed: ${data.message || "File could not be stored in Google Drive"}`);
          return;
        }

        const driveUrl = data.fileUrl;
        showToast(`Uploaded to Drive Subfolder: ${data.folderName || "NationsWorld"}`);

        if (selectedType === "Project") {
          setProjectForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Organisation") {
          setOrgForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Programme") {
          setProgForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Team") {
          setTeamForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Publication") {
          setPubForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Update") {
          setUpdateForm(prev => ({ ...prev, [targetField]: driveUrl }));
        } else if (selectedType === "Impact") {
          setImpactForm(prev => ({ ...prev, [targetField]: driveUrl }));
        }
      };

      reader.readAsDataURL(file);
    } catch {
      setUploadingFile(false);
      showToast("Failed to upload file to Google Drive. Transaction aborted.");
    }
  };

  const getActiveRecord = () => {
    switch (selectedType) {
      case "Project": return { record: projectForm, title: projectForm.projectTitle, desc: projectForm.shortDescription };
      case "Organisation": return { record: orgForm, title: orgForm.organisationName, desc: orgForm.shortDescription };
      case "Programme": return { record: progForm, title: progForm.programmeName, desc: progForm.shortDescription };
      case "Team": return { record: teamForm, title: teamForm.teamName, desc: teamForm.shortDescription };
      case "Publication": return { record: pubForm, title: pubForm.title, desc: pubForm.shortSummary };
      case "Update": return { record: updateForm, title: updateForm.title, desc: updateForm.shortSummary };
      case "Impact": return { record: impactForm, title: impactForm.impactTitle, desc: impactForm.shortSummary };
    }
  };

  const handleSaveDraft = () => {
    const { title } = getActiveRecord();
    if (!title) {
      showToast("Please enter a title/name to save draft.");
      return;
    }
    showToast("Draft Saved Locally");
  };

  const handlePublish = async () => {
    const { record, title, desc } = getActiveRecord();

    if (!title || !desc) {
      showToast("Please fill in required fields (Title & Short Summary).");
      return;
    }

    setPublishing(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.email,
          contentType: selectedType,
          record: {
            ...record,
            publicationStatus: "Published",
            state: "Published",
            creator: session?.email || "Authorised Creator",
            lastUpdated: new Date().toISOString().split("T")[0],
          },
        }),
      });

      const data = await res.json();
      setPublishing(false);

      if (!res.ok || !data.success) {
        showToast(`Publishing Failed: ${data.message || "Storage pipeline rejected record."}`);
        return;
      }

      setPipelineResult(data);
      setPortalMode("published");
      showToast("Published Successfully to Google Sheet & Website");
    } catch {
      setPublishing(false);
      showToast("Publication pipeline failed. Your record was not published.");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#00172e] border-b border-white/10 py-3 shadow-2xl"
          : "bg-[#00172e] py-4 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo - Left */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#2F9148] p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#00172e] rounded-[11px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#2F9148]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                NATIONSWORLD
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2F9148] animate-pulse" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-300 -mt-1 font-semibold">
                NATIONSWORLD OF VISIONARY ADVANCEMENT
              </span>
            </div>
          </Link>

          {/* Controls - Right */}
          <div className="flex items-center gap-3">
            {session?.isAuthorised && (
              <button
                onClick={() => {
                  setPortalMode("select_type");
                  setShowCreatePortal(true);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2F9148] hover:bg-[#37a854] rounded-lg transition-colors shadow-md shadow-[#2F9148]/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Content</span>
              </button>
            )}

            {/* Hamburger Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-colors flex items-center gap-2"
              aria-label="Toggle Navigation Menu"
            >
              <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline text-slate-300">
                Menu
              </span>
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#2F9148]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002446] border border-[#2F9148] text-white px-4 py-3 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-in fade-in max-w-md">
          <CheckCircle2 className="w-4 h-4 text-[#2F9148] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hamburger Navigation Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-[#00172e] z-40 flex flex-col justify-between p-6 sm:p-10 overflow-y-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto w-full space-y-6">

            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-400 pb-3 border-b border-white/10">
              <span>Main Navigation</span>
              <span className="text-[#2F9148]">NationsWorld Ecosystem</span>
            </div>

            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium">

              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-[#2F9148]" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/about"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-[#2F9148]" />
                  <span>About</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* Teams & Institutes */}
              <Link
                href="/teams"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/teams"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#2F9148]" />
                  <span>Teams & Institutes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* Programmes & Initiatives */}
              <Link
                href="/programmes"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/programmes"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[#2F9148]" />
                  <span>Programmes & Initiatives</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* How It Works */}
              <Link
                href="/how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/how-it-works"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-[#2F9148]" />
                  <span>How It Works</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* Production */}
              <Link
                href="/production"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/production"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Factory className="w-4 h-4 text-[#2F9148]" />
                  <span>Production</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* FAQ */}
              <Link
                href="/faq"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  pathname === "/faq"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-[#2F9148]" />
                  <span>FAQ</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* Membership (Expandable / Nested Submenu) */}
              <div className="col-span-1 md:col-span-2 rounded-xl border border-white/10 bg-[#002446] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMembershipDropdownOpen(!membershipDropdownOpen)}
                  className="w-full flex items-center justify-between p-3.5 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-[#2F9148]" />
                    <span className="font-semibold">Membership</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${membershipDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {(membershipDropdownOpen || pathname.startsWith("/membership")) && (
                  <div className="px-3 pb-3 space-y-1 bg-[#00172e] border-t border-white/5 pt-2">
                    <Link
                      href="/membership"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2F9148]" />
                        Membership Portal
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#2F9148]" />
                    </Link>

                    <Link
                      href="/membership#apply"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Apply for Membership
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all col-span-1 md:col-span-2 ${
                  pathname === "/contact"
                    ? "bg-[#2F9148]/20 border-[#2F9148] text-white"
                    : "bg-[#002446] border-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2F9148]" />
                  <span>Contact</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

            </nav>
          </div>

          {/* Footer Controls within Hamburger Drawer */}
          <div className="max-w-3xl mx-auto w-full mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {session?.isAuthorised ? (
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#2F9148]" />
                  <span>Authorised: {session.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="ml-2 text-red-400 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="px-3.5 py-2 text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#2F9148]" />
                  <span>Authorised Creator Sign In</span>
                </button>
              )}
            </div>

            <Link
              href="/membership#apply"
              onClick={() => setIsMenuOpen(false)}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-center text-white bg-[#2F9148] hover:bg-[#37a854] rounded-xl transition-all shadow-md shadow-[#2F9148]/20 flex items-center justify-center gap-2"
            >
              <span>Apply for Membership</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Creator Google Sign-In Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#002446] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Lock className="w-4 h-4" />
                <span>AUTHORISED CREATOR SIGN-IN</span>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Google Account Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sign in with an authorized Google account email address to access content creation, file storage, and publishing workflows.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Google Account Email</label>
                <input
                  required
                  type="email"
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="e.g. sherifdeenalimititilope@gmail.com"
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
                className="w-full py-3 px-4 rounded-xl bg-[#2F9148] hover:bg-[#37a854] text-[#ffffff] text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#2F9148]/20"
              >
                <span>Authenticate Creator Account</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[11px] font-mono text-slate-400 text-center">
              Google Apps Script + Drive pipeline protection active.
            </div>
          </div>
        </div>
      )}

      {/* Content Creation Portal Modal */}
      {showCreatePortal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#002446] border border-[#2F9148]/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 my-8 animate-in fade-in">

            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2F9148]">
                <Edit3 className="w-4 h-4" />
                <span>NATIONSWORLD CREATION ENGINE</span>
                {portalMode !== "select_type" && (
                  <span className="text-slate-400">({selectedType})</span>
                )}
              </div>
              <button onClick={() => setShowCreatePortal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Navigation Header */}
            {portalMode !== "select_type" && portalMode !== "published" && (
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                <button
                  onClick={() => setPortalMode("select_type")}
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  ← Change Content Type
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPortalMode("edit")}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      portalMode === "edit" ? "bg-[#2F9148] text-white" : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Edit Schema Form
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
              </div>
            )}

            {/* PORTAL STEP 1: Content Type Selection */}
            {portalMode === "select_type" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">What do you want to create?</h3>
                  <p className="text-xs text-slate-300">
                    Select a content category below. You will receive a content-specific form with fields engineered for that schema.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { type: "Project" as ContentType, icon: FolderGit2, label: "Project", desc: "Multilateral initiatives, labs, and research portals" },
                    { type: "Organisation" as ContentType, icon: Building2, label: "Organisation", desc: "Owned entities, alliance partners, and proposed bodies" },
                    { type: "Programme" as ContentType, icon: GraduationCap, label: "Programme", desc: "Summits, fellowships, workshops, and dialogues" },
                    { type: "Team" as ContentType, icon: Users, label: "Team (Directorates)", desc: "Additional future teams and directorate expansions" },
                    { type: "Publication" as ContentType, icon: FileText, label: "Publication", desc: "Reports, research papers, policy briefs, and resources" },
                    { type: "Update" as ContentType, icon: Newspaper, label: "Update", desc: "Official dispatches, newsroom releases, and announcements" },
                    { type: "Impact" as ContentType, icon: Sparkles, label: "Impact", desc: "Verified impact metrics, beneficiary evidence, and scope" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.type}
                        onClick={() => handleSelectContentType(item.type)}
                        className="p-4 rounded-2xl bg-[#00172e] hover:bg-[#002b52] border border-white/10 hover:border-[#2F9148] text-left transition-all group flex items-start gap-3.5"
                      >
                        <div className="p-2.5 rounded-xl bg-white/5 text-[#2F9148] group-hover:bg-[#2F9148] group-hover:text-white transition-colors shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-[#2F9148] transition-colors flex items-center gap-1">
                            {item.label}
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PORTAL STEP 2: Content-Specific Form Rendering */}
            {portalMode === "edit" && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

                {/* PROJECT FORM */}
                {selectedType === "Project" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">PROJECT SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {projectForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={projectForm.projectTitle}
                          onChange={(e) => setProjectForm({ ...projectForm, projectTitle: e.target.value })}
                          placeholder="e.g. Multilateral AI Governance Charter"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Category / Type</label>
                        <input
                          type="text"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          placeholder="e.g. Innovation & Policy"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Description / Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={projectForm.shortDescription}
                        onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                        placeholder="Concise overview of the project..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Full Description</label>
                      <textarea
                        rows={4}
                        value={projectForm.fullDescription}
                        onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                        placeholder="Comprehensive details regarding the project scope, background, and governance..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Lead Team / Secretariat</label>
                        <select
                          value={projectForm.leadTeam}
                          onChange={(e) => setProjectForm({ ...projectForm, leadTeam: e.target.value })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        >
                          {TEAMS_DATA.map((t) => (
                            <option key={t.slug} value={t.slug}>{t.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Location / Platform</label>
                        <input
                          type="text"
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                          placeholder="e.g. Geneva / Global"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Project Status</label>
                        <select
                          value={projectForm.projectStatus}
                          onChange={(e) => setProjectForm({ ...projectForm, projectStatus: e.target.value as any })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        >
                          <option value="Proposed">Proposed</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Start Date</label>
                        <input
                          type="date"
                          value={projectForm.startDate}
                          onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">End Date (If applicable)</label>
                        <input
                          type="date"
                          value={projectForm.endDate}
                          onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#00172e] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5 text-[#2F9148]">
                          <Upload className="w-4 h-4" />
                          Supporting File / Media Attachment (Google Drive Pipeline)
                        </span>
                        <span className="text-slate-500 text-[10px]">Folder: 04 — Projects</span>
                      </div>

                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "supportingDocumentsUrl")}
                        className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2F9148] file:text-white cursor-pointer"
                      />

                      {projectForm.supportingDocumentsUrl && (
                        <div className="p-2.5 rounded-lg bg-[#2F9148]/10 border border-[#2F9148]/30 text-xs font-mono text-[#2F9148] flex items-center justify-between">
                          <span className="truncate">Saved to Drive: {projectForm.supportingDocumentsUrl}</span>
                          <FileCheck className="w-4 h-4 shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ORGANISATION FORM */}
                {selectedType === "Organisation" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">ORGANISATION SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {orgForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Organisation Name *</label>
                        <input
                          type="text"
                          required
                          value={orgForm.organisationName}
                          onChange={(e) => setOrgForm({ ...orgForm, organisationName: e.target.value })}
                          placeholder="e.g. NationsWorld Research Institute"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Organisation Type</label>
                        <select
                          value={orgForm.organisationType}
                          onChange={(e) => setOrgForm({ ...orgForm, organisationType: e.target.value as any })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        >
                          <option value="NationsWorld-Owned">NationsWorld-Owned</option>
                          <option value="Partners">Partners</option>
                          <option value="Affiliates">Affiliates</option>
                          <option value="Proposed">Proposed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={orgForm.shortDescription}
                        onChange={(e) => setOrgForm({ ...orgForm, shortDescription: e.target.value })}
                        placeholder="Brief overview of the organisation..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#00172e] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5 text-[#2F9148]">
                          <Upload className="w-4 h-4" />
                          Logo / Document Attachment (Google Drive Folder: 03 — Organisations)
                        </span>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "documentsUrl")}
                        className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2F9148] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* PROGRAMME FORM */}
                {selectedType === "Programme" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">PROGRAMME SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {progForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Programme Name *</label>
                        <input
                          type="text"
                          required
                          value={progForm.programmeName}
                          onChange={(e) => setProgForm({ ...progForm, programmeName: e.target.value })}
                          placeholder="e.g. Global Leadership Fellowship 2026"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Programme Type</label>
                        <select
                          value={progForm.programmeType}
                          onChange={(e) => setProgForm({ ...progForm, programmeType: e.target.value as any })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        >
                          <option value="Flagship Programme">Flagship Programme</option>
                          <option value="Conference">Conference</option>
                          <option value="Dialogue">Dialogue</option>
                          <option value="Webinar">Webinar</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Summit">Summit</option>
                          <option value="Forum">Forum</option>
                          <option value="Campaign">Campaign</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={progForm.shortDescription}
                        onChange={(e) => setProgForm({ ...progForm, shortDescription: e.target.value })}
                        placeholder="Brief summary of the programme..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#00172e] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5 text-[#2F9148]">
                          <Upload className="w-4 h-4" />
                          Programme Prospectus / Media (Google Drive Folder: 05 — Programmes & Events)
                        </span>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "supportingDocumentsUrl")}
                        className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2F9148] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* TEAM FORM */}
                {selectedType === "Team" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">ADDITIONAL TEAM CREATION FORM</span>
                      <span className="text-slate-400">ID: {teamForm.id}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Note: The 14 foundational NationsWorld teams receive protected status and cannot be recreated. This form is for establishing future additional working groups or special directorates.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Team Name *</label>
                        <input
                          type="text"
                          required
                          value={teamForm.teamName}
                          onChange={(e) => setTeamForm({ ...teamForm, teamName: e.target.value })}
                          placeholder="e.g. Quantum Computing & Global Security Directorate"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Team Category</label>
                        <input
                          type="text"
                          value={teamForm.teamCategory}
                          onChange={(e) => setTeamForm({ ...teamForm, teamCategory: e.target.value })}
                          placeholder="e.g. Special Directorate"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={teamForm.shortDescription}
                        onChange={(e) => setTeamForm({ ...teamForm, shortDescription: e.target.value })}
                        placeholder="Core directive and scope of the team..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>
                )}

                {/* PUBLICATION FORM */}
                {selectedType === "Publication" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">PUBLICATION SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {pubForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Publication Title *</label>
                        <input
                          type="text"
                          required
                          value={pubForm.title}
                          onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                          placeholder="e.g. Global Youth Leadership Index 2026"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Publication Type</label>
                        <select
                          value={pubForm.publicationType}
                          onChange={(e) => setPubForm({ ...pubForm, publicationType: e.target.value as any })}
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        >
                          <option value="Report">Report</option>
                          <option value="Research">Research Paper</option>
                          <option value="Article">Article</option>
                          <option value="Policy Analysis">Policy Analysis</option>
                          <option value="Brief">Policy Brief</option>
                          <option value="Educational Resource">Educational Resource</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Summary / Abstract *</label>
                      <textarea
                        rows={2}
                        required
                        value={pubForm.shortSummary}
                        onChange={(e) => setPubForm({ ...pubForm, shortSummary: e.target.value })}
                        placeholder="Abstract or executive summary of the paper..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>
                )}

                {/* UPDATE FORM */}
                {selectedType === "Update" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">NEWSROOM UPDATE SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {updateForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Update Title *</label>
                        <input
                          type="text"
                          required
                          value={updateForm.title}
                          onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                          placeholder="e.g. Leadership Team Announces Fellowship Cohort 04"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={updateForm.shortSummary}
                        onChange={(e) => setUpdateForm({ ...updateForm, shortSummary: e.target.value })}
                        placeholder="Dispatch lead summary..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>
                )}

                {/* IMPACT FORM */}
                {selectedType === "Impact" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-[#00172e] border border-[#2F9148]/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2F9148]">VERIFIED IMPACT SCHEMA FORM</span>
                      <span className="text-slate-400">ID: {impactForm.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Impact Title *</label>
                        <input
                          type="text"
                          required
                          value={impactForm.impactTitle}
                          onChange={(e) => setImpactForm({ ...impactForm, impactTitle: e.target.value })}
                          placeholder="e.g. Connected Member Countries"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-1">Verified Metric / Value *</label>
                        <input
                          type="text"
                          required
                          value={impactForm.verifiedMetrics}
                          onChange={(e) => setImpactForm({ ...impactForm, verifiedMetrics: e.target.value })}
                          placeholder="e.g. 120+ Member States"
                          className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Short Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={impactForm.shortSummary}
                        onChange={(e) => setImpactForm({ ...impactForm, shortSummary: e.target.value })}
                        placeholder="Overview of the impact achievement..."
                        className="w-full bg-[#00172e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2F9148]"
                      />
                    </div>
                  </div>
                )}

                {/* ACTION BAR */}
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
                      disabled={publishing || uploadingFile}
                      onClick={handlePublish}
                      className="px-6 py-2.5 rounded-xl bg-[#2F9148] hover:bg-[#37a854] disabled:opacity-50 text-xs font-semibold text-white transition-colors flex items-center gap-2 shadow-lg shadow-[#2F9148]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{publishing ? "Writing to Pipeline..." : "Publish Content"}</span>
                    </button>
                  </div>
                </div>

              </form>
            )}

            {/* PORTAL STEP 3: Live Preview */}
            {portalMode === "preview" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-[#00172e] border border-white/10 text-xs font-mono text-amber-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>PREVIEW MODE — Content Parity Render ({selectedType})</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#00172e] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#2F9148]/20 text-[#2F9148] border border-[#2F9148]/40">
                      {selectedType}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{new Date().toISOString().split("T")[0]}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white">{getActiveRecord().title || "Untitled Content"}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">{getActiveRecord().desc || "No summary provided."}</p>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Creator: {session?.email}</span>
                    <span className="text-[#2F9148]">State: Published</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setPortalMode("edit")}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10"
                  >
                    Return to Form
                  </button>

                  <button
                    disabled={publishing}
                    onClick={handlePublish}
                    className="px-6 py-2 rounded-xl bg-[#2F9148] text-xs font-semibold text-white shadow-lg shadow-[#2F9148]/20"
                  >
                    Confirm & Publish
                  </button>
                </div>
              </div>
            )}

            {/* PORTAL STEP 4: Published Success */}
            {portalMode === "published" && (
              <div className="p-8 rounded-2xl bg-[#00172e] border border-[#2F9148] space-y-4 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#2F9148] mx-auto" />
                <div className="text-xl font-bold text-white">Record Published Successfully</div>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  The <span className="font-mono text-[#2F9148]">{selectedType}</span> record was written to the <span className="font-mono text-white">{selectedType}s</span> Google Sheet tab and uploaded media stored in Drive subfolder <span className="font-mono text-white">{pipelineResult?.driveDestination?.folderName || "NationsWorld"}</span>.
                </p>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 text-left max-w-md mx-auto space-y-1">
                  <div>Sheet Tab: {selectedType}s</div>
                  <div>Record ID: {pipelineResult?.recordId || getActiveRecord().record.id}</div>
                  <div>Drive Folder: {pipelineResult?.driveDestination?.folderName}</div>
                  <div>Status: Published on Website</div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setPortalMode("select_type");
                      initForms(session?.email || "");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white"
                  >
                    Create Another Item
                  </button>

                  <button
                    onClick={() => {
                      setShowCreatePortal(false);
                      setPortalMode("select_type");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#2F9148] text-xs font-semibold text-white"
                  >
                    Return to Website
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
