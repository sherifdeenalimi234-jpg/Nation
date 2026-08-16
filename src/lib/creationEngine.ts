import { ContentState } from "./contentStore";

export type ContentType =
  | "Project"
  | "Organisation"
  | "Programme"
  | "Team"
  | "Publication"
  | "Update"
  | "Impact";

export function generateUniqueContentId(type: ContentType): string {
  let prefix = "NW-P";
  if (type === "Organisation") prefix = "NW-O";
  if (type === "Programme") prefix = "NW-PR";
  if (type === "Team") prefix = "NW-T";
  if (type === "Publication") prefix = "NW-PUB";
  if (type === "Update") prefix = "NW-U";
  if (type === "Impact") prefix = "NW-I";

  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 1. Project Schema Form Interface
export interface ProjectFormFields {
  id: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  leadTeam: string;
  relatedOrganisation: string;
  relatedProgramme: string;
  location: string;
  projectStatus: "Proposed" | "Active" | "Completed" | "Archived";
  startDate: string;
  endDate: string;
  objectives: string;
  keyActivities: string;
  targetBeneficiaries: string;
  expectedOutcomes: string;
  impactInformation: string;
  externalLink: string;
  mainImageUrl: string;
  supportingDocumentsUrl: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 2. Organisation Schema Form Interface
export interface OrganisationFormFields {
  id: string;
  organisationName: string;
  organisationType: "NationsWorld-Owned" | "Partners" | "Affiliates" | "Proposed";
  logoUrl: string;
  shortDescription: string;
  fullDescription: string;
  mission: string;
  focusAreas: string;
  location: string;
  website: string;
  contactInfo: string;
  relatedTeams: string;
  relatedProgrammes: string;
  relatedProjects: string;
  documentsUrl: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 3. Programme Schema Form Interface
export interface ProgrammeFormFields {
  id: string;
  programmeName: string;
  programmeType: "Conference" | "Dialogue" | "Webinar" | "Workshop" | "Summit" | "Forum" | "Campaign" | "Flagship Programme";
  shortDescription: string;
  fullDescription: string;
  purpose: string;
  objectives: string;
  leadTeam: string;
  relatedOrganisation: string;
  relatedProject: string;
  targetParticipants: string;
  eligibility: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationInfo: string;
  programmeStatus: "Upcoming" | "Ongoing" | "Completed";
  externalRegistrationLink: string;
  mainImageUrl: string;
  supportingDocumentsUrl: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 4. Team Schema Form Interface
export interface TeamFormFields {
  id: string;
  teamName: string;
  teamCategory: string;
  shortDescription: string;
  fullDescription: string;
  focusAreas: string;
  teamImageUrl: string;
  leadershipInfo: string;
  projects: string;
  programmes: string;
  publications: string;
  updates: string;
  impact: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 5. Publication Schema Form Interface
export interface PublicationFormFields {
  id: string;
  title: string;
  publicationType: "Research" | "Report" | "Article" | "Policy Analysis" | "Brief" | "Educational Resource";
  authors: string;
  shortSummary: string;
  fullDescription: string;
  publicationDate: string;
  topic: string;
  relatedTeam: string;
  relatedOrganisation: string;
  relatedProject: string;
  coverImageUrl: string;
  publicationFileUrl: string;
  externalUrl: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 6. Update Schema Form Interface
export interface UpdateFormFields {
  id: string;
  title: string;
  shortSummary: string;
  fullContent: string;
  updateCategory: "Announcement" | "Project" | "Programme" | "Opportunity" | "Publication" | "Organisation" | "Team" | "General";
  date: string;
  relatedProject: string;
  relatedProgramme: string;
  relatedTeam: string;
  featuredImageUrl: string;
  supportingMediaUrl: string;
  externalLink: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

// 7. Impact Schema Form Interface
export interface ImpactFormFields {
  id: string;
  impactTitle: string;
  shortSummary: string;
  fullDescription: string;
  relatedProject: string;
  relatedProgramme: string;
  relatedTeam: string;
  impactArea: string;
  beneficiaries: string;
  geographicScope: string;
  verifiedMetrics: string;
  evidenceDocumentsUrl: string;
  imagesUrl: string;
  periodDate: string;
  creator: string;
  createdDate: string;
  lastUpdated: string;
  publicationStatus: ContentState;
}

export function createDefaultProjectForm(creatorEmail?: string): ProjectFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Project"),
    projectTitle: "",
    shortDescription: "",
    fullDescription: "",
    category: "Innovation & Policy",
    leadTeam: "research-innovation",
    relatedOrganisation: "",
    relatedProgramme: "",
    location: "Global / Geneva",
    projectStatus: "Active",
    startDate: today,
    endDate: "",
    objectives: "",
    keyActivities: "",
    targetBeneficiaries: "",
    expectedOutcomes: "",
    impactInformation: "",
    externalLink: "",
    mainImageUrl: "",
    supportingDocumentsUrl: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultOrganisationForm(creatorEmail?: string): OrganisationFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Organisation"),
    organisationName: "",
    organisationType: "NationsWorld-Owned",
    logoUrl: "",
    shortDescription: "",
    fullDescription: "",
    mission: "",
    focusAreas: "",
    location: "Geneva / Global",
    website: "",
    contactInfo: "",
    relatedTeams: "",
    relatedProgrammes: "",
    relatedProjects: "",
    documentsUrl: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultProgrammeForm(creatorEmail?: string): ProgrammeFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Programme"),
    programmeName: "",
    programmeType: "Flagship Programme",
    shortDescription: "",
    fullDescription: "",
    purpose: "",
    objectives: "",
    leadTeam: "leadership-human-development",
    relatedOrganisation: "",
    relatedProject: "",
    targetParticipants: "",
    eligibility: "",
    location: "Global / Hybrid",
    startDate: today,
    endDate: "",
    registrationInfo: "",
    programmeStatus: "Upcoming",
    externalRegistrationLink: "",
    mainImageUrl: "",
    supportingDocumentsUrl: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultTeamForm(creatorEmail?: string): TeamFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Team"),
    teamName: "",
    teamCategory: "Specialised Directorate",
    shortDescription: "",
    fullDescription: "",
    focusAreas: "",
    teamImageUrl: "",
    leadershipInfo: "",
    projects: "",
    programmes: "",
    publications: "",
    updates: "",
    impact: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultPublicationForm(creatorEmail?: string): PublicationFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Publication"),
    title: "",
    publicationType: "Report",
    authors: "",
    shortSummary: "",
    fullDescription: "",
    publicationDate: today,
    topic: "Global Affairs & Policy",
    relatedTeam: "research-innovation",
    relatedOrganisation: "",
    relatedProject: "",
    coverImageUrl: "",
    publicationFileUrl: "",
    externalUrl: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultUpdateForm(creatorEmail?: string): UpdateFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Update"),
    title: "",
    shortSummary: "",
    fullContent: "",
    updateCategory: "Announcement",
    date: today,
    relatedProject: "",
    relatedProgramme: "",
    relatedTeam: "",
    featuredImageUrl: "",
    supportingMediaUrl: "",
    externalLink: "",
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}

export function createDefaultImpactForm(creatorEmail?: string): ImpactFormFields {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: generateUniqueContentId("Impact"),
    impactTitle: "",
    shortSummary: "",
    fullDescription: "",
    relatedProject: "",
    relatedProgramme: "",
    relatedTeam: "",
    impactArea: "",
    beneficiaries: "",
    geographicScope: "Global",
    verifiedMetrics: "",
    evidenceDocumentsUrl: "",
    imagesUrl: "",
    periodDate: today,
    creator: creatorEmail || "NationsWorld Creator",
    createdDate: today,
    lastUpdated: today,
    publicationStatus: "Draft",
  };
}
