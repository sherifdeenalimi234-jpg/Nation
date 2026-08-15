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

// 14 Foundational Teams Data Store
export const TEAMS_DATA: TeamItem[] = [
  { id: "t1", slug: "academic-secretariat", name: "Academic Secretariat", coreArea: "Research Coordination & Peer Review", description: "Coordinates peer reviews, open scholarship publications, and university chapter research projects.", teamLead: "Dr. Elena Rostova", state: "Published", featured: true },
  { id: "t2", slug: "global-youth-council", name: "Global Youth Council", coreArea: "Youth Representation & Policy Advocacy", description: "Represents young global scholars in multilateral dialogues and regional summit delegations.", teamLead: "Amina Al-Mansoor", state: "Published", featured: true },
  { id: "t3", slug: "climate-resilience-taskforce", name: "Climate Resilience Taskforce", coreArea: "Environmental Policy & Sustainability", description: "Deploys local adaptation frameworks and cross-border climate research labs.", teamLead: "Kaelen Voss", state: "Published", featured: true },
  { id: "t4", slug: "ai-tech-ethics-forum", name: "AI & Tech Ethics Forum", coreArea: "Technological Governance & Ethics", description: "Drafts governance charters ensuring AI advancements serve global human dignity.", teamLead: "Marcus Thorne", state: "Published", featured: true },
  { id: "t5", slug: "education-infrastructure-group", name: "Education Infrastructure Group", coreArea: "Open Scholarship & Digital Learning", description: "Builds open-access educational tools and university exchange pipelines.", teamLead: "Sophia Chen", state: "Published" },
  { id: "t6", slug: "human-rights-peace-envoy", name: "Human Rights & Peace Envoy", coreArea: "International Justice & Peacebuilding", description: "Fosters conflict resolution, youth mediation, and international rights advocacy.", teamLead: "Julian O'Connor", state: "Published" },
  { id: "t7", slug: "economic-advancement-lab", name: "Economic Advancement Lab", coreArea: "Sustainable Economies & Entrepreneurship", description: "Supports sustainable enterprise models and young founder incubators worldwide.", teamLead: "Fatima Benali", state: "Published" },
  { id: "t8", slug: "health-human-wellbeing-secretariat", name: "Health & Human Well-being Secretariat", coreArea: "Global Health Policy & Resilience", description: "Conducts public health policy studies and youth wellness initiatives.", teamLead: "Dr. Aris Thorne", state: "Published" },
  { id: "t9", slug: "diplomatic-exchange-delegation", name: "Diplomatic Exchange Delegation", coreArea: "Multilateral Engagement & Alliances", description: "Facilitates diplomatic delegations and student ambassador forums.", teamLead: "Carlos Rodriguez", state: "Published" },
  { id: "t10", slug: "innovation-future-systems-lab", name: "Innovation & Future Systems Lab", coreArea: "Emerging Tech & Frontier Development", description: "Researches frontier technologies, quantum ethics, and space policy.", teamLead: "Nadia Yilmaz", state: "Published" },
  { id: "t11", slug: "cultural-preservation-council", name: "Cultural Preservation Council", coreArea: "Heritage, Diversity & Global Unity", description: "Promotes indigenous knowledge preservation and cross-cultural heritage projects.", teamLead: "Tariq Okafor", state: "Published" },
  { id: "t12", slug: "media-strategic-dispatches", name: "Media & Strategic Dispatches", coreArea: "Accredited Publications & Journalism", description: "Publishes official NationsWorld newsroom dispatches and press briefings.", teamLead: "Chloe Bennett", state: "Published" },
  { id: "t13", slug: "scholarship-grants-committee", name: "Scholarship & Grants Committee", coreArea: "Fellowship Awards & Capital Allocation", description: "Oversees research grant distributions and youth scholarship allocations.", teamLead: "Henrik Lindqvist", state: "Published" },
  { id: "t14", slug: "impact-metrics-audit-bureau", name: "Impact Metrics & Audit Bureau", coreArea: "Transparency, Metrics & Verification", description: "Audits organizational data, impact metrics, and institutional compliance.", teamLead: "Zainab Al-Hassan", state: "Published" },
];

export const ORGANISATIONS_DATA: OrganisationItem[] = [
  { id: "o1", slug: "nationsworld-research-institute", name: "NationsWorld Research Institute", category: "NationsWorld-Owned", description: "The central scholarly research body of the ecosystem.", location: "Geneva / Global", website: "https://nationsworld.org/institute", state: "Published", featured: true },
  { id: "o2", slug: "international-higher-education-alliance", name: "International Higher Education Alliance", category: "Partners", description: "A coalition of 45 partner universities supporting student exchanges.", location: "Global Consortium", website: "https://partner.org", state: "Published", featured: true },
  { id: "o3", slug: "youth-climate-action-network", name: "Youth Climate Action Network", category: "Affiliates", description: "Affiliated global youth groups leading local adaptation projects.", location: "Nairobi / Global", state: "Published" },
  { id: "o4", slug: "frontier-technology-coalition", name: "Frontier Technology Coalition", category: "Proposed", description: "Proposed alliance exploring ethical AI governance standards.", location: "Tokyo / San Francisco", state: "Published" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  { id: "p1", slug: "multilateral-ai-governance-charter", title: "Multilateral AI Governance Charter", description: "Co-authoring ethical AI guidelines for multilateral policy adoption.", category: "Innovation & Ethics", status: "Active", location: "Global / Online", leadTeamSlug: "ai-tech-ethics-forum", state: "Published", featured: true },
  { id: "p2", slug: "climate-resilient-coastal-labs", title: "Climate Resilient Coastal Labs", description: "Deploying ocean sensors and community adaptation frameworks.", category: "Environment", status: "Active", location: "Southeast Asia & West Africa", leadTeamSlug: "climate-resilience-taskforce", state: "Published", featured: true },
  { id: "p3", slug: "open-scholarship-digital-portal", title: "Open Scholarship Digital Portal", description: "Providing free academic paper publishing access to young scholars.", category: "Education", status: "Completed", location: "Global", leadTeamSlug: "education-infrastructure-group", state: "Published" },
  { id: "p4", slug: "youth-diplomacy-summit-2027", title: "Youth Diplomacy Summit 2027", description: "Drafting the 2027 Youth Declaration on Global Cooperation.", category: "Governance", status: "Proposed", location: "Vienna, Austria", leadTeamSlug: "diplomatic-exchange-delegation", state: "Published" },
];

export const PROGRAMMES_DATA: ProgrammeItem[] = [
  { id: "pr1", slug: "global-leadership-fellowship-2026", title: "Global Leadership Fellowship 2026", description: "6-month leadership accelerator pairing scholars with international secretariats.", type: "Flagship Programme", status: "Upcoming", date: "Oct 2026 - Mar 2027", location: "Hybrid / Geneva", leadTeamSlug: "academic-secretariat", state: "Published", featured: true },
  { id: "pr2", slug: "ai-ethics-multilateral-dialogue", title: "AI Ethics & Multilateral Policy Dialogue", description: "High-level panel featuring international technology envoys and youth scholars.", type: "Summit", status: "Upcoming", date: "Nov 14, 2026", location: "Online / Live Stream", leadTeamSlug: "ai-tech-ethics-forum", state: "Published", featured: true },
  { id: "pr3", slug: "climate-adaptation-workshop-series", title: "Climate Adaptation Workshop Series", description: "Hands-on regional workshops on community flood resilience.", type: "Workshop", status: "Ongoing", date: "Aug - Dec 2026", location: "Nairobi & Regional Chapters", leadTeamSlug: "climate-resilience-taskforce", state: "Published" },
];

export const PUBLICATIONS_DATA: PublicationItem[] = [
  { id: "pub1", slug: "youth-leadership-index-2026", title: "Global Youth Leadership Index 2026", authors: ["Academic Secretariat", "Dr. Elena Rostova"], publicationDate: "Aug 2026", category: "Report", description: "Comprehensive policy assessment evaluating youth engagement in 120 member states.", fileUrl: "#", leadTeamSlug: "academic-secretariat", relatedProjectSlug: "multilateral-ai-governance-charter", state: "Published", featured: true },
  { id: "pub2", slug: "ethical-frameworks-for-frontier-ai", title: "Ethical Frameworks for Frontier AI Governance", authors: ["Marcus Thorne", "Sophia Chen"], publicationDate: "Jul 2026", category: "Policy Analysis", description: "Strategic policy brief on AI risk management and youth participation.", fileUrl: "#", leadTeamSlug: "ai-tech-ethics-forum", relatedProjectSlug: "multilateral-ai-governance-charter", state: "Published", featured: true },
  { id: "pub3", slug: "coastal-community-resilience-report", title: "Coastal Community Resilience in Developing Nations", authors: ["Kaelen Voss"], publicationDate: "May 2026", category: "Research", description: "Empirical study on sea level adaptation models across West Africa.", fileUrl: "#", leadTeamSlug: "climate-resilience-taskforce", relatedProjectSlug: "climate-resilient-coastal-labs", state: "Published" },
];

export const UPDATES_DATA: UpdateItem[] = [
  { id: "u1", slug: "academic-secretariat-announces-cohort-04", title: "Academic Secretariat Announces Fellowship Cohort 04", description: "Applications are now open for the 2026 Global Leadership Fellowship.", type: "Programme", date: "Aug 12, 2026", relatedSlug: "global-leadership-fellowship-2026", state: "Published", featured: true },
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
