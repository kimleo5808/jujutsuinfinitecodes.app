import HistoryMonthGroup, {
  SnapshotCard,
} from "@/components/jujutsu/HistoryMonthGroup";
import { BASE_URL } from "@/config/site";
import { jujutsuDailySnapshots } from "@/lib/jujutsu-data";
import { Locale } from "@/i18n/routing";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { CalendarClock, Database, Flame } from "lucide-react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "History" });

  return constructMetadata({
    page: "History",
    title: t("title"),
    description: t("description"),
    keywords: [
      "jujutsu infinite codes history", "jujutsu infinite codes archive", "jujutsu infinite codes daily snapshot",
      "jujutsu infinite roblox codes history", "jujutsu infinite past codes", "jujutsu infinite expired codes list",
    ],
    locale: locale as Locale,
    path: "/jujutsu-infinite-codes-history",
    canonicalUrl: "/jujutsu-infinite-codes-history",
  });
}

function formatMonthLabel(monthKey: string, locale: string) {
  const [year, month] = monthKey.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  const localeMap: Record<string, string> = { en: "en-US", zh: "zh-CN", ja: "ja-JP" };
  return d.toLocaleDateString(localeMap[locale] || "en-US", { month: "long", year: "numeric" });
}

export default async function JujutsuHistoryPage() {
  const t = await getTranslations("HistoryPage");
  const locale = await getLocale();
  // Build snapshots sorted newest first
  const allSnapshots = [...jujutsuDailySnapshots].reverse();
  const latestDate = allSnapshots[0]?.date ?? "";

  // Group by month (YYYY-MM)
  const monthGroups = new Map<string, SnapshotCard[]>();
  for (const snap of allSnapshots) {
    const monthKey = snap.date.slice(0, 7);
    if (!monthGroups.has(monthKey)) {
      monthGroups.set(monthKey, []);
    }
    monthGroups.get(monthKey)!.push({
      date: snap.date,
      activeCount: snap.activeCodes.length,
      expiredCount: snap.expiredCodes.length,
    });
  }

  const monthEntries = [...monthGroups.entries()];

  // Stats
  const totalSnapshots = allSnapshots.length;
  const totalCodesTracked = new Set(
    allSnapshots.flatMap((s) => [
      ...s.activeCodes.map((c) => c.code),
      ...s.expiredCodes.map((c) => c.code),
    ])
  ).size;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "jujutsu infinite codes History", url: `${BASE_URL}/jujutsu-infinite-codes-history` },
        ])}
      />
      {/* Hero */}
      <header className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-violet-50 to-purple-50 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <h1 className="relative font-heading text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="relative mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
          Every daily snapshot of Jujutsu Infinite Codes, organized by month. Browse
          past days to see when codes were added, when they expired, and compare
          changes across the full archive.
        </p>

        {/* Stats */}
        <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-violet-200/60 bg-white/90 p-4 dark:border-violet-900/40 dark:bg-slate-900/80">
            <CalendarClock className="h-5 w-5 shrink-0 text-violet-500" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("totalSnapshots")}
              </p>
              <p className="font-heading text-2xl font-bold text-violet-600 dark:text-violet-400">
                {totalSnapshots}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-violet-200/60 bg-white/90 p-4 dark:border-violet-900/40 dark:bg-slate-900/80">
            <Database className="h-5 w-5 shrink-0 text-violet-500" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("uniqueCodesTracked")}
              </p>
              <p className="font-heading text-2xl font-bold text-violet-600 dark:text-violet-400">
                {totalCodesTracked}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-violet-200/60 bg-white/90 p-4 dark:border-violet-900/40 dark:bg-slate-900/80">
            <Flame className="h-5 w-5 shrink-0 text-red-500" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("latestSnapshot")}
              </p>
              <p className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
                {latestDate}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link
            href="/jujutsu-infinite-codes"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-600"
          >
            <span className="relative z-10">{t("viewLiveCodes")}</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/jujutsu-infinite-codes/february-2026"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition-all hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:bg-slate-900 dark:text-violet-300"
          >
            {t("february2026Summary")}
          </Link>
        </div>
      </header>

      {/* Monthly groups */}
      {monthEntries.map(([monthKey, snapshots], index) => (
        <HistoryMonthGroup
          key={monthKey}
          monthLabel={formatMonthLabel(monthKey, locale)}
          snapshots={snapshots}
          latestDate={latestDate}
          defaultOpen={index === 0}
          locale={locale}
          labels={{
            snapshotCount: t("snapshotCount"),
            snapshotsCount: t("snapshotsCount"),
            latest: t("latest"),
            active: t("active"),
            expired: t("expired"),
            viewDetails: t("viewDetails"),
            showMore: t("showMore"),
            showLess: t("showLess"),
          }}
        />
      ))}

      {/* SEO Content */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why We Keep a Daily Archive of Jujutsu Infinite Codes
        </h2>
        <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Most Jujutsu Infinite Codes tracking sites only show the current list. When a
            code expires, it simply disappears. This creates a problem for players
            who want to verify whether a code they found on social media has already
            been retired, or who want to check what rewards were available last
            week. Our daily snapshot archive solves this by preserving every single
            day&apos;s state as a permanent, browsable record.
          </p>
          <p>
            Each snapshot page captures the exact active and expired codes for that
            day, along with timestamps, sources, and update logs. This means you
            can compare two consecutive days to see precisely which Jujutsu Infinite Codes
            changed status. If a code worked on Monday but fails on Wednesday, the
            archive lets you pinpoint the exact day it expired — no guesswork
            required.
          </p>
          <p>
            Over time, this archive grows into a complete historical database of
            every Jujutsu Infinite Codes release. Monthly summaries like our{" "}
            <Link
              href="/jujutsu-infinite-codes/february-2026"
              className="font-semibold text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
            >
              February 2026 report
            </Link>{" "}
            aggregate these daily records into trend analysis, showing patterns
            like how long codes typically last and which reward types appear most
            frequently.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
          How to Use Jujutsu Infinite Codes History
        </h2>
        <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            The archive is organized by month with the most recent month expanded
            by default. Each card shows one day&apos;s snapshot with the number of
            active and expired codes. Click any card to open the full daily page
            with complete code tables, reward details, and source information.
          </p>
          <h3 className="font-heading text-lg font-bold text-violet-700 dark:text-violet-400">
            Common use cases for Jujutsu Infinite Codes history
          </h3>
          <ul className="ml-4 list-disc space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Verify expiration</strong> — check which day a specific code
              stopped working by comparing adjacent snapshots
            </li>
            <li>
              <strong>Missed codes</strong> — browse days you were not online to
              see if any short-lived codes appeared and expired while you were away
            </li>
            <li>
              <strong>Reward research</strong> — look at past active codes to
              understand the pattern of reward types (rerolls, boosts, gems) and
              plan your play sessions accordingly
            </li>
            <li>
              <strong>Dispute resolution</strong> — if someone claims a code
              existed on a certain date, the archive provides a verifiable record
            </li>
          </ul>
          <p>
            As more daily snapshots are added, older months automatically collapse
            to keep the page fast and scannable. Use the &quot;Show More&quot;
            button within any month to reveal all available days. For the complete
            live list with real-time status, visit the{" "}
            <Link
              href="/jujutsu-infinite-codes"
              className="font-semibold text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
            >
              live codes hub
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
