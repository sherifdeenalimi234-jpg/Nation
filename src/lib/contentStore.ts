export type ContentState = "Published" | "Draft" | "Private" | "Archived";

export interface TeamItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  coreArea: string;
  teamLead?: string;
  state: ContentState;
  featured?: boolean;
  isFoundational?: boolean;
}

export interface OrganisationItem {
  id: string;
  slug: string;
  name: string;
  category: "NationsWorld-Owned" | "Partners" | "Affiliates" | "Proposed";
  description: string;
  location: string;
  website?: string;
  logoUrl?: string;
  state: ContentState;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: "Proposed" | "Active" | "Completed" | "Archived";
  location: string;
  leadTeamSlug: string;
  coverImage?: string;
  state: ContentState;
  featured?: boolean;
}

export interface ProgrammeItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "Conference" | "Dialogue" | "Webinar" | "Workshop" | "Summit" | "Forum" | "Campaign" | "Flagship Programme";
  status: "Upcoming" | "Ongoing" | "Completed";
  date: string;
  time?: string;
  location: string;
  leadTeamSlug: string;
  coverImage?: string;
  state: ContentState;
  featured?: boolean;
}

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  publicationDate: string;
  category: "Research" | "Report" | "Article" | "Policy Analysis" | "Brief" | "Educational Resource";
  description: string;
  fileUrl?: string;
  leadTeamSlug?: string;
  relatedProjectSlug?: string;
  state: ContentState;
  featured?: boolean;
}

export interface UpdateItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "Announcement" | "Project" | "Programme" | "Opportunity" | "Publication" | "Organisation" | "Team" | "General";
  date: string;
  relatedSlug?: string;
  imageUrl?: string;
  state: ContentState;
  featured?: boolean;
}

export interface ImpactMetricItem {
  id: string;
  name: string;
  value: string;
  description: string;
  lastUpdated: string;
  state: ContentState;
  featured?: boolean;
}

// 14 Exact Foundational Teams (Protected Institutional Framework)
export const TEAMS_DATA: TeamItem[] = [
  { id: "t1", slug: "research-innovation", name: "Research & Innovation", coreArea: "Scholarly Investigation & Frontier R&D", description: "Leads interdisciplinary research projects, peer review systems, and open scholarship publications.", teamLead: "Dr. Elena Rostova", state: "Published", featured: true, isFoundational: true },
  { id: "t2", slug: "health-public-health", name: "Health & Public Health", coreArea: "Global Health Policy & Well-being", description: "Conducts public health studies, healthcare equity research, and community health initiatives.", teamLead: "Dr. Aris Thorne", state: "Published", featured: true, isFoundational: true },
  { id: "t3", slug: "economic-development-finance", name: "Economic Development & Finance", coreArea: "Sustainable Economics & Capital Access", description: "Focuses on sustainable enterprise models, financial inclusion, and economic policy.", teamLead: "Fatima Benali", state: "Published", featured: true, isFoundational: true },
  { id: "t4", slug: "education-human-capital", name: "Education & Human Capital", coreArea: "Open Learning & Skill Acceleration", description: "Builds open-access educational tools, university exchange pipelines, and scholarship programs.", teamLead: "Sophia Chen", state: "Published", featured: true, isFoundational: true },
  { id: "t5", slug: "climate-environment-sustainability", name: "Climate, Environment & Sustainability", coreArea: "Ecological Policy & Climate Adaptation", description: "Deploys local adaptation frameworks, coastal ocean labs, and environmental policy models.", teamLead: "Kaelen Voss", state: "Published", isFoundational: true },
  { id: "t6", slug: "governance-democracy-public-policy", name: "Governance, Democracy & Public Policy", coreArea: "Multilateral Policy & Democratic Renewal", description: "Researches public governance systems, institutional integrity, and multilateral policy drafting.", teamLead: "Marcus Thorne", state: "Published", isFoundational: true },
  { id: "t7", slug: "technology-digital-transformation", name: "Technology & Digital Transformation", coreArea: "Ethical AI & Digital Infrastructure", description: "Drafts technology charters, AI ethics guidelines, and open digital platforms.", teamLead: "Nadia Yilmaz", state: "Published", isFoundational: true },
  { id: "t8", slug: "entrepreneurship-innovation", name: "Entrepreneurship & Innovation", coreArea: "Venture Incubation & Social Enterprise", description: "Supports young founders, social innovation incubators, and high-impact ventures worldwide.", teamLead: "Carlos Rodriguez", state: "Published", isFoundational: true },
  { id: "t9", slug: "leadership-human-development", name: "Leadership & Human Development", coreArea: "Youth Leadership & Mentorship", description: "Fosters leadership accelerator programs, fellowship cohorts, and human capability development.", teamLead: "Amina Al-Mansoor", state: "Published", isFoundational: true },
  { id: "t10", slug: "international-relations-global-affairs", name: "International Relations & Global Affairs", coreArea: "Diplomatic Exchange & Global Alliances", description: "Facilitates diplomatic delegations, student ambassador forums, and cross-border dialogues.", teamLead: "Julian O'Connor", state: "Published", isFoundational: true },
  { id: "t11", slug: "media-communications-public-affairs", name: "Media, Communications & Public Affairs", coreArea: "Accredited Dispatches & Strategic Communications", description: "Publishes official newsroom dispatches, accredited press briefings, and media campaigns.", teamLead: "Chloe Bennett", state: "Published", isFoundational: true },
  { id: "t12", slug: "energy-infrastructure", name: "Energy & Infrastructure", coreArea: "Clean Energy Transition & Resilient Systems", description: "Researches renewable energy grids, sustainable infrastructure, and smart urban systems.", teamLead: "Henrik Lindqvist", state: "Published", isFoundational: true },
  { id: "t13", slug: "community-development-social-impact", name: "Community Development & Social Impact", coreArea: "Grassroots Development & Human Dignity", description: "Promotes community resilience, cultural preservation, and grassroots social initiatives.", teamLead: "Tariq Okafor", state: "Published", isFoundational: true },
  { id: "t14", slug: "agriculture-food-rural-development", name: "Agriculture, Food & Rural Development", coreArea: "Food Security & Agritech Resilience", description: "Advances agritech solutions, rural economic empowerment, and sustainable food systems.", teamLead: "Zainab Al-Hassan", state: "Published", isFoundational: true },

  // NASDI — Separate Entity from the 14 Foundational Teams
  { id: "nasdi", slug: "nasdi-sustainable-development", name: "NASDI — Sustainable Development", coreArea: "Specialized Alliance & Sustainable Development Entity", description: "Specialized initiative operating alongside NationsWorld's 14 foundational teams to accelerate sustainable development goals.", teamLead: "NASDI Executive Board", state: "Published", featured: false, isFoundational: false },
];

// Cleaned Data Stores — Real records strictly come from the Google Storage pipeline when published
export const ORGANISATIONS_DATA: OrganisationItem[] = [];
export const PROJECTS_DATA: ProjectItem[] = [];
export const PROGRAMMES_DATA: ProgrammeItem[] = [];
export const PUBLICATIONS_DATA: PublicationItem[] = [];
export const UPDATES_DATA: UpdateItem[] = [];
export const IMPACT_METRICS_DATA: ImpactMetricItem[] = [];

// Content Filtering Helper
export function getPublishedOnly<T extends { state: ContentState }>(items: T[]): T[] {
  return items.filter((item) => item.state === "Published");
}
