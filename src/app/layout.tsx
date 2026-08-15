import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NationsWorld — Global Ecosystem for Human Advancement & Youth Leadership",
  description:
    "An international institution and ecosystem centered on visionary advancement, human development, leadership, education, research, innovation, and global collaboration.",
  keywords: [
    "NationsWorld",
    "Global Ecosystem",
    "Youth Leadership",
    "Human Advancement",
    "Research & Innovation",
    "Global Collaboration",
  ],
  authors: [{ name: "NationsWorld" }],
  openGraph: {
    title: "NationsWorld — Global Ecosystem for Human Advancement",
    description:
      "A new-generation global institution empowering youth leadership, research, education, and innovation worldwide.",
    type: "website",
    siteName: "NationsWorld",
  },
};

export const viewport: Viewport = {
  themeColor: "#060911",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#060911] text-[#f8fafc] selection:bg-[#1e62ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
