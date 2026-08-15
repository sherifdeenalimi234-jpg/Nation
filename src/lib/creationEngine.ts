import { ContentState } from "./contentStore";

export function generateUniqueContentId(prefix: "NW-P" | "NW-O" | "NW-PR" | "NW-T" | "NW-PUB" | "NW-U" | "NW-I"): string {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${prefix}${randomNum}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface CreatorFormState {
  id: string;
  prefix: "NW-P" | "NW-O" | "NW-PR" | "NW-T" | "NW-PUB" | "NW-U" | "NW-I";
  type: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  status: string;
  location: string;
  leadTeamSlug: string;
  coverImage?: string;
  fileUrl?: string;
  whatsappContact?: string;
  state: ContentState;
  featured: boolean;
  date: string;
}

export function createDefaultFormState(type: string): CreatorFormState {
  let prefix: "NW-P" | "NW-O" | "NW-PR" | "NW-T" | "NW-PUB" | "NW-U" | "NW-I" = "NW-P";
  if (type === "Organisation") prefix = "NW-O";
  if (type === "Programme") prefix = "NW-PR";
  if (type === "Team") prefix = "NW-T";
  if (type === "Publication") prefix = "NW-PUB";
  if (type === "Update") prefix = "NW-U";
  if (type === "Impact") prefix = "NW-I";

  return {
    id: generateUniqueContentId(prefix),
    prefix,
    type,
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "General",
    status: "Active",
    location: "Global",
    leadTeamSlug: "academic-secretariat",
    state: "Draft",
    featured: false,
    date: new Date().toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
  };
}
