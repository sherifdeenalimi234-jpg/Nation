// Central NationsWorld Official Social Media Channel Configuration

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
}

export const OFFICIAL_SOCIAL_CONFIG = {
  youtube: {
    name: "YouTube",
    handle: "@nations_world",
    url: "https://www.youtube.com/@nations_world",
  },
  instagram: {
    name: "Instagram",
    handle: "@nationsworld.global",
    url: "https://www.instagram.com/nationsworld.global?igsh=dGp6bWsyYmZkaXRr",
  },
  whatsapp: {
    name: "WhatsApp Channel",
    handle: "Official NationsWorld Channel",
    url: "https://whatsapp.com/channel/0029Vb7xfyCICVflI0qMKQ31",
  },
} as const;
