import localFont from "next/font/local";

/**
 * Site-wide fonts, self-hosted (both SIL Open Font License). Loading them
 * through next/font/google breaks CI builds at random: for some requests
 * Google serves fonts.gstatic.com/l/font?kit=…&skey=…&v=… URLs, which
 * Turbopack's font loader rejects ("next/font/google queries have exactly
 * one entry"). Self-hosting also takes Google off the build's critical path.
 *
 * Each file is Google's latin subset of the variable font (Outfit v15,
 * Rubik v31), covering the same weight range the Google loader used to
 * request. zh/ja text falls back to system fonts, as it always did.
 */

export const outfit = localFont({
  src: [{ path: "./outfit-latin.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
});

export const rubik = localFont({
  src: [{ path: "./rubik-latin.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});
