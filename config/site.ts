import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jujutsuinfinitecodes.app";

export const siteConfig: SiteConfig = {
  name: "jujutsuinfinitecodes",
  tagLine: "Daily verified Jujutsu Infinite Roblox code tracker",
  description:
    "Find active and expired jujutsu infinite codes with daily verification, timestamps, redeem instructions, and troubleshooting.",
  url: BASE_URL,
  authors: [
    {
      name: "jujutsuinfinitecodes",
      url: "https://jujutsuinfinitecodes.app",
    },
  ],
  creator: "@jujutsuinfinitecodes",
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  defaultNextTheme: "system", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // apple-touch-icon.png
  },
};
