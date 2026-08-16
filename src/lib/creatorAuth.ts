// Secure Creator Authentication & Authorised List Management

export interface CreatorSession {
  email: string;
  name: string;
  isAuthorised: boolean;
  signedInAt: string;
}

// Default Authorised Creators List
const AUTHORISED_CREATOR_EMAILS = [
  "sherifdeenalimititilope@gmail.com",
  "kudiratlolade1999@gmail.com",
  "sherifdeenalimi234@gmail.com",
  "admin@nationsworld.org",
  "secretariat@nationsworld.org",
  "editor@nationsworld.org",
  "jules@nationsworld.org",
  "creator@nationsworld.org"
];

const SESSION_STORAGE_KEY = "nationsworld_creator_session";

export function checkIsAuthorisedEmail(email: string): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return AUTHORISED_CREATOR_EMAILS.some((e) => e.toLowerCase() === normalized) || normalized.endsWith("@nationsworld.org");
}

export function saveCreatorSession(session: CreatorSession): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }
}

export function getCreatorSession(): CreatorSession | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as CreatorSession;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

export function clearCreatorSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
