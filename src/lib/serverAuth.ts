// Secure Creator Authentication & Official Google Resources Layer

export const OFFICIAL_GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID || "1F1Q5QUeFa-GYb5MoFFFZUliUqaRK5WsuQ4_1JZY_4W4";

export const OFFICIAL_GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1F1Q5QUeFa-GYb5MoFFFZUliUqaRK5WsuQ4_1JZY_4W4/edit?usp=drivesdk";

export const OFFICIAL_GOOGLE_DRIVE_FOLDER_ID =
  process.env.GOOGLE_DRIVE_FOLDER_ID || "1OzUYFQLXCuD0-6kpm2yfUY_ZNU21uLSv";

export const OFFICIAL_GOOGLE_DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/1OzUYFQLXCuD0-6kpm2yfUY_ZNU21uLSv";

export const OFFICIAL_APPS_SCRIPT_ENDPOINT =
  process.env.GOOGLE_APPS_SCRIPT_ENDPOINT ||
  "https://script.google.com/macros/s/nationsworld_digital_hub_exec/exec";

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

export function getDriveFolderForSector(sector: string): { folderName: string; rootDriveUrl: string } {
  let folderName = "04 — Projects";
  switch (sector.toLowerCase()) {
    case "teams":
    case "team":
      folderName = "02 — Teams";
      break;
    case "organisations":
    case "organisation":
      folderName = "03 — Organisations";
      break;
    case "projects":
    case "project":
      folderName = "04 — Projects";
      break;
    case "programmes":
    case "programme":
    case "events":
      folderName = "05 — Programmes & Events";
      break;
    case "opportunities":
      folderName = "06 — Opportunities";
      break;
    case "publications":
    case "publication":
      folderName = "07 — Knowledge & Publications";
      break;
    case "updates":
    case "update":
    case "media":
      folderName = "08 — Media";
      break;
    case "impact":
    case "submissions":
      folderName = "09 — Submissions";
      break;
  }

  return {
    folderName,
    rootDriveUrl: OFFICIAL_GOOGLE_DRIVE_FOLDER_URL,
  };
}
