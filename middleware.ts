import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Permanent (301) redirects for removed/retired pages, keyed by full pathname.
// localePrefix is "as-needed", so the default locale (en) has no prefix.
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/blog/nextjs-starter-template-guide":
    "/blog/jujutsu-infinite-content-creator-guide",
  "/zh/blog/nextjs-starter-template-guide":
    "/zh/blog/jujutsu-infinite-content-creator-guide",
  "/ja/blog/nextjs-starter-template-guide":
    "/ja/blog/jujutsu-infinite-content-creator-guide",
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const target = PERMANENT_REDIRECTS[pathname];

  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|zh|ja)/:path*",
    "/((?!api|_next|_vercel|.*\\.|favicon.ico).*)",
  ],
};
