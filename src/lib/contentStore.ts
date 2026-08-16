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

// 14 Exact Foundational Teams (Protected)
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

export const ORGANISATIONS_DATA: OrganisationItem[] = [
  { id: "o1", slug: "nationsworld-research-institute", name: "NationsWorld Research Institute", category: "NationsWorld-Owned", description: "The central scholarly research body of the ecosystem.", location: "Geneva / Global", website: "https://nationsworld.org/institute", state: "Published", featured: true },
  { id: "o2", slug: "international-higher-education-alliance", name: "International Higher Education Alliance", category: "Partners", description: "A coalition of 45 partner universities supporting student exchanges.", location: "Global Consortium", website: "https://partner.org", state: "Published", featured: true },
  { id: "o3", slug: "youth-climate-action-network", name: "Youth Climate Action Network", category: "Affiliates", description: "Affiliated global youth groups leading local adaptation projects.", location: "Nairobi / Global", state: "Published" },
  { id: "o4", slug: "frontier-technology-coalition", name: "Frontier Technology Coalition", category: "Proposed", description: "Proposed alliance exploring ethical AI governance standards.", location: "Tokyo / San Francisco", state: "Published" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  { id: "p1", slug: "multilateral-ai-governance-charter", title: "Multilateral AI Governance Charter", description: "Co-authoring ethical AI guidelines for multilateral policy adoption.", category: "Innovation & Ethics", status: "Active", location: "Global / Online", leadTeamSlug: "technology-digital-transformation", state: "Published", featured: true },
  { id: "p2", slug: "climate-resilient-coastal-labs", title: "Climate Resilient Coastal Labs", description: "Deploying ocean sensors and community adaptation frameworks.", category: "Environment", status: "Active", location: "Southeast Asia & West Africa", leadTeamSlug: "climate-environment-sustainability", state: "Published", featured: true },
  { id: "p3", slug: "open-scholarship-digital-portal", title: "Open Scholarship Digital Portal", description: "Providing free academic paper publishing access to young scholars.", category: "Education", status: "Completed", location: "Global", leadTeamSlug: "education-human-capital", state: "Published" },
  { id: "p4", slug: "youth-diplomacy-summit-2027", title: "Youth Diplomacy Summit 2027", description: "Drafting the 2027 Youth Declaration on Global Cooperation.", category: "Governance", status: "Proposed", location: "Vienna, Austria", leadTeamSlug: "international-relations-global-affairs", state: "Published" },
];

export const PROGRAMMES_DATA: ProgrammeItem[] = [
  { id: "pr1", slug: "global-leadership-fellowship-2026", title: "Global Leadership Fellowship 2026", description: "6-month leadership accelerator pairing scholars with international secretariats.", type: "Flagship Programme", status: "Upcoming", date: "Oct 2026 - Mar 2027", location: "Hybrid / Geneva", leadTeamSlug: "leadership-human-development", state: "Published", featured: true },
  { id: "pr2", slug: "ai-ethics-multilateral-dialogue", title: "AI Ethics & Multilateral Policy Dialogue", description: "High-level panel featuring international technology envoys and youth scholars.", type: "Summit", status: "Upcoming", date: "Nov 14, 2026", location: "Online / Live Stream", leadTeamSlug: "technology-digital-transformation", state: "Published", featured: true },
  { id: "pr3", slug: "climate-adaptation-workshop-series", title: "Climate Adaptation Workshop Series", description: "Hands-on regional workshops on community flood resilience.", type: "Workshop", status: "Ongoing", date: "Aug - Dec 2026", location: "Nairobi & Regional Chapters", leadTeamSlug: "climate-environment-sustainability", state: "Published" },
];

export const PUBLICATIONS_DATA: PublicationItem[] = [
  { id: "pub1", slug: "youth-leadership-index-2026", title: "Global Youth Leadership Index 2026", authors: ["Leadership & Human Development Team", "Dr. Elena Rostova"], publicationDate: "Aug 2026", category: "Report", description: "Comprehensive policy assessment evaluating youth engagement in 120 member states.", fileUrl: "#", leadTeamSlug: "leadership-human-development", relatedProjectSlug: "multilateral-ai-governance-charter", state: "Published", featured: true },
  { id: "pub2", slug: "ethical-frameworks-for-frontier-ai", title: "Ethical Frameworks for Frontier AI Governance", authors: ["Marcus Thorne", "Sophia Chen"], publicationDate: "Jul 2026", category: "Policy Analysis", description: "Strategic policy brief on AI risk management and youth participation.", fileUrl: "#", leadTeamSlug: "technology-digital-transformation", relatedProjectSlug: "multilateral-ai-governance-charter", state: "Published", featured: true },
  { id: "pub3", slug: "coastal-community-resilience-report", title: "Coastal Community Resilience in Developing Nations", authors: ["Kaelen Voss"], publicationDate: "May 2026", category: "Research", description: "Empirical study on sea level adaptation models across West Africa.", fileUrl: "#", leadTeamSlug: "climate-environment-sustainability", relatedProjectSlug: "climate-resilient-coastal-labs", state: "Published" },
];

export const UPDATES_DATA: UpdateItem[] = [
  { id: "u1", slug: "academic-secretariat-announces-cohort-04", title: "Leadership Team Announces Fellowship Cohort 04", description: "Applications are now open for the 2026 Global Leadership Fellowship.", type: "Programme", date: "Aug 12, 2026", relatedSlug: "global-leadership-fellowship-2026", state: "Published", featured: true },
  { id: "u2", slug: "ai-charter-presented-at-multilateral-forum", title: "AI Governance Charter Presented to International Delegates", description: "Draft charter received widespread endorsement at Geneva dialogue.", type: "Project", date: "Aug 04, 2026", relatedSlug: "multilateral-ai-governance-charter", state: "Published", featured: true },
];

export const IMPACT_METRICS_DATA: ImpactMetricItem[] = [
  { id: "im1", name: "Connected Countries", value: "120+", description: "Countries represented in youth working groups and secretariats.", lastUpdated: "Aug 2026", state: "Published", featured: true },
  { id: "im2", name: "Accredited Publications", value: "450+", description: "Peer-reviewed papers, whitepapers, and policy briefs published.", lastUpdated: "Aug 2026", state: "Published", featured: true },
  { id: "im3", name: "Youth Leaders Engaged", value: "15,000+", description: "Active members participating in fellowships, dialogues, and labs.", lastUpdated: "Aug 2026", state: "Published", featured: true },
  { id: "im4", name: "Allocated Research Capital", value: "$4.2M", description: "Direct scholarship grants and research support distributed.", lastUpdated: "Aug 2026", state: "Published", featured: true },
];

// Content Filtering Helper (Section 18: Public vs Private Content States)
export function getPublishedOnly<T extends { state: ContentState }>(items: T[]): T[] {
  return items.filter((item) => item.state === "Published");
}
