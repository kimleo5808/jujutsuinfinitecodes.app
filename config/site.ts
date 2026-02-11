import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theforgecodes.app";

export const siteConfig: SiteConfig = {
  name: "theforgecodes",
  tagLine: "Daily verified The Forge Roblox code tracker",
  description:
    "Find active and expired the forge codes with daily verification, timestamps, redeem instructions, and troubleshooting.",
  url: BASE_URL,
  authors: [
    {
      name: "theforgecodes",
      url: "https://theforgecodes.app",
    },
  ],
  creator: "@theforgecodes",
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
