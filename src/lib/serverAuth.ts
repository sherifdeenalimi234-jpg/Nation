// Server-side Authorised Email & Session Verification Layer

const AUTHORISED_CREATORS = [
  "sherifdeenalimititilope@gmail.com",
  "kudiratlolade1999@gmail.com",
  "sherifdeenalimi234@gmail.com",
  "admin@nationsworld.org",
  "secretariat@nationsworld.org",
  "editor@nationsworld.org",
  "jules@nationsworld.org"
];

export function isServerAuthorised(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  if (normalized.endsWith("@nationsworld.org")) return true;
  return AUTHORISED_CREATORS.some((a) => a.toLowerCase() === normalized);
}

export function getDriveFolderForSector(sector: string): string {
  switch (sector.toLowerCase()) {
    case "teams":
      return "02 — Teams";
    case "organisations":
      return "03 — Organisations";
    case "projects":
      return "04 — Projects";
    case "programmes":
    case "events":
      return "05 — Programmes & Events";
    case "opportunities":
      return "06 — Opportunities";
    case "publications":
      return "07 — Knowledge & Publications";
    case "media":
      return "08 — Media";
    case "submissions":
      return "09 — Submissions";
    default:
      return "04 — Projects";
  }
}
