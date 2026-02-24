import {
  activeJujutsuCodes,
  expiredJujutsuCodes,
  jujutsuEditorialGuide,
  jujutsuKeywordNarrative,
  JujutsuNarrativeSection,
  jujutsuOperationsManual,
  jujutsuRecentSnapshots,
  jujutsuSiteFacts,
  jujutsuUpdateLog,
  JujutsuCode,
  UpdateLogItem,
} from "@/lib/jujutsu-data";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CircleX,
  Flame,
  Gift,
  Hammer,
  History,
  SearchCheck,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";

/* ------------------------------------------------------------------ */
/*  Code Table                                                         */
/* ------------------------------------------------------------------ */

type CodeTableProps = {
  title: string;
  description: string;
  codes: JujutsuCode[];
  statusLabels: { active: string; expired: string };
};

function CodeTable({ title, description, codes, statusLabels }: CodeTableProps) {
  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {codes.map((item) => (
          <div
            key={item.code}
            className={`group relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md ${
              item.status === "active"
                ? "border-green-200 bg-gradient-to-br from-white to-green-50/30 hover:border-green-300 dark:border-green-900/40 dark:from-slate-900 dark:to-green-950/20 dark:hover:border-green-700"
                : "border-slate-200 bg-gradient-to-br from-white to-slate-50/30 hover:border-slate-300 dark:border-slate-800 dark:from-slate-900 dark:to-slate-800/20 dark:hover:border-slate-700"
            }`}
          >
            <div className="p-4">
              {/* Code and Copy Button */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-2xl font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300 break-all">
                    {item.code}
                  </p>
                </div>
                <CopyCodeButton code={item.code} />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 dark:from-violet-900 dark:via-violet-800 dark:to-violet-900 mb-3" />

              {/* Status */}
              <div className="flex items-center gap-2 mb-2">
                {item.status === "active" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {statusLabels.active}
                    </span>
                  </>
                ) : (
                  <>
                    <CircleX className="h-4 w-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {statusLabels.expired}
                    </span>
                  </>
                )}
              </div>

              {/* Last Tested */}
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.lastTested}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: event badge                                                */
/* ------------------------------------------------------------------ */

function eventBadge(event: UpdateLogItem["event"]) {
  if (event === "added") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  }
  if (event === "expired") {
    return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
  }
  return "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300";
}

function getEventLabel(event: UpdateLogItem["event"], labels: { added: string; expired: string; retested: string }) {
  if (event === "added") return labels.added;
  if (event === "expired") return labels.expired;
  return labels.retested;
}

/* ------------------------------------------------------------------ */
/*  Narrative Section renderer (H2 + H3 subsections)                   */
/* ------------------------------------------------------------------ */

function NarrativeSection({ data }: { data: JujutsuNarrativeSection }) {
  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        {data.title}
      </h2>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{data.intro}</p>

      <div className="mt-6 space-y-8">
        {data.subsections.map((sub, i) => (
          <div
            key={i}
            className={`rounded-xl p-5 ${
              i % 2 === 0
                ? "bg-slate-50 dark:bg-slate-900/50"
                : "bg-white dark:bg-slate-950"
            }`}
          >
            {sub.h3 && (
              <h3 className="font-heading text-lg font-semibold text-violet-700 dark:text-violet-300">
                {sub.h3}
              </h3>
            )}
            <div className={sub.h3 ? "mt-3 space-y-3" : "space-y-3"}>
              {sub.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-slate-700 leading-relaxed dark:text-slate-300"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export async function JujutsuHero() {
  const t = await getTranslations("JujutsuInfiniteSections");

  return (
    <section className="w-full">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50 via-white to-violet-50 px-6 py-12 shadow-sm dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-800/20" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-800/20" />

        <div className="relative flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-white/80 px-3 py-1 dark:border-violet-800 dark:bg-slate-900/80">
            <Flame className="h-3.5 w-3.5" />
            jujutsuinfinitecodes.app
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-white/80 px-3 py-1 dark:border-violet-800 dark:bg-slate-900/80">
            <CalendarClock className="h-3.5 w-3.5" />
            {t("hero.lastVerified", { time: jujutsuSiteFacts.lastVerified })}
          </span>
        </div>

        <h1 className="relative mt-6 max-w-4xl font-heading text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          {t("hero.heading")}
        </h1>
        <p
          className="relative mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: t("hero.description") }}
        />

        {/* Stats cards */}
        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: t("hero.activeCodes"),
              value: jujutsuSiteFacts.activeCount,
              color: "text-emerald-600 dark:text-emerald-400",
            },
            {
              label: t("hero.expiredTracked"),
              value: jujutsuSiteFacts.expiredCount,
              color: "text-red-500 dark:text-red-400",
            },
            {
              label: t("hero.relatedKeywords"),
              value: jujutsuSiteFacts.trackedKeywords,
              color: "text-violet-600 dark:text-violet-400",
            },
            {
              label: t("hero.avgMonthlyVolume"),
              value: jujutsuSiteFacts.monthlySearchEstimate,
              color: "text-violet-600 dark:text-violet-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-violet-200/60 bg-white/90 p-4 transition-shadow hover:shadow-md dark:border-violet-900/40 dark:bg-slate-900/80"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className={`mt-1 font-heading text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Link
            href="#active-jujutsu-codes"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("hero.viewActiveBtn")}
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/how-to-redeem-jujutsu-infinite-codes"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:bg-slate-900 dark:text-violet-300 dark:hover:bg-slate-800"
          >
            {t("hero.redeemGuideBtn")}
            <Hammer className="h-4 w-4" />
          </Link>
        </div>
        <p className="relative mt-4 text-sm text-slate-600 dark:text-slate-300">
          {t("hero.disclaimer")}
        </p>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-violet-200/60 dark:border-violet-900/40">
          <Image
            src="/images/all-jujutsu-infinite-codes-free-spins.webp"
            alt="All Jujutsu Infinite codes for free spins showing the in-game spin menu with 2227 spins and innate technique slots"
            width={1280}
            height={720}
            className="w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Overview: Active + Expired Code Tables                             */
/* ------------------------------------------------------------------ */

export async function JujutsuOverviewSections() {
  const t = await getTranslations("JujutsuInfiniteSections");
  const statusLabels = {
    active: t("statusLabels.active"),
    expired: t("statusLabels.expired"),
  };

  return (
    <div className="w-full space-y-8">
      <div id="active-jujutsu-codes">
        <CodeTable
          title={t("activeTable.title")}
          description={t("activeTable.description")}
          codes={activeJujutsuCodes}
          statusLabels={statusLabels}
        />
      </div>

      <CodeTable
        title={t("expiredTable.title")}
        description={t("expiredTable.description")}
        codes={expiredJujutsuCodes}
        statusLabels={statusLabels}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Redeem Steps (full-width, 4-col grid)                              */
/* ------------------------------------------------------------------ */

export async function JujutsuRedeemSection() {
  const t = await getTranslations("JujutsuInfiniteSections");

  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        <Gift className="h-5 w-5 text-violet-500" />
        {t("redeem.title")}
      </h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">
        {t("redeem.description")}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="rounded-xl border border-violet-100 bg-violet-50/40 p-5 dark:border-violet-900/50 dark:bg-slate-900"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
              {index + 1}
            </div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {t(`redeemSteps.${index}.title`)}
            </p>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              {t(`redeemSteps.${index}.detail`)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-violet-100 dark:border-violet-900/40">
          <Image
            src="/images/jujutsu-infinite-codes-settings-panel-pc.webp"
            alt="Jujutsu Infinite Codes redemption panel in Settings menu with arrows pointing to the codes input field on PC"
            width={1024}
            height={576}
            className="w-full object-cover"
          />
          <p className="bg-violet-50/60 px-4 py-2 text-xs text-slate-600 dark:bg-violet-950/30 dark:text-slate-400">
            {t("redeem.pcCaption")}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-violet-100 dark:border-violet-900/40">
          <Image
            src="/images/jujutsu-infinite-codes-settings-mobile.webp"
            alt="Jujutsu Infinite Codes menu on mobile device showing the codes input field highlighted for touch screen redemption"
            width={800}
            height={450}
            className="w-full object-cover"
          />
          <p className="bg-violet-50/60 px-4 py-2 text-xs text-slate-600 dark:bg-violet-950/30 dark:text-slate-400">
            {t("redeem.mobileCaption")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Troubleshooting (full-width, accordion)                            */
/* ------------------------------------------------------------------ */

export async function JujutsuTroubleshootSection() {
  const t = await getTranslations("JujutsuInfiniteSections");

  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        <AlertTriangle className="h-5 w-5 text-rose-500" />
        {t("troubleshoot.title")}
      </h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">
        {t("troubleshoot.description")}
      </p>
      <div className="mt-5 space-y-3">
        {[0, 1, 2, 3].map((index) => (
          <details
            key={index}
            className="group rounded-xl border border-violet-100 dark:border-violet-900/50"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
              {t(`troubleshootItems.${index}.question`)}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-700 dark:text-slate-300">
              {t(`troubleshootItems.${index}.answer`)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Update Log (full-width, timeline style)                            */
/* ------------------------------------------------------------------ */

export async function JujutsuUpdateLogSection() {
  const t = await getTranslations("JujutsuInfiniteSections");
  const eventLabels = {
    added: t("statusLabels.added"),
    expired: t("statusLabels.expired"),
    retested: t("statusLabels.retested"),
  };

  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        <History className="h-5 w-5 text-violet-500" />
        {t("updateLog.title")}
      </h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">
        {t("updateLog.description")}
      </p>
      <div className="relative mt-5 ml-4 border-l-2 border-violet-200 pl-6 dark:border-violet-800">
        {jujutsuUpdateLog.map((item) => (
          <div
            key={`${item.time}-${item.code}`}
            className="relative mb-6 last:mb-0"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-violet-400 bg-white dark:border-violet-500 dark:bg-slate-950" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.time}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${eventBadge(
                  item.event
                )}`}
              >
                {getEventLabel(item.event, eventLabels)}
              </span>
              <span className="font-mono text-xs text-violet-700 dark:text-violet-300">
                {item.code}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ (full-width, accordion)                                        */
/* ------------------------------------------------------------------ */

export async function JujutsuFaqSection() {
  const t = await getTranslations("JujutsuInfiniteSections");

  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        <SearchCheck className="h-5 w-5 text-violet-500" />
        {t("faq.title")}
      </h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">
        {t("faq.description")}
      </p>
      <div className="mt-5 space-y-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <details
            key={index}
            className="group rounded-xl border border-violet-100 dark:border-violet-900/50"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
              {t(`faqItems.${index}.question`)}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-700 dark:text-slate-300">
              {t(`faqItems.${index}.answer`)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SEO Narrative Sections (with H2/H3 structure)                      */
/* ------------------------------------------------------------------ */

export function JujutsuRelatedGameImage() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-violet-100 shadow-sm dark:border-violet-900/40">
      <Image
        src="/images/blue-lock-rivals-roblox-game-cover.webp"
        alt="Blue Lock Rivals Roblox game cover art featuring anime soccer players with cursed energy abilities in a dark arena"
        width={1200}
        height={675}
        className="w-full object-cover"
      />
      <div className="bg-white p-4 dark:bg-slate-950">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Blue Lock Rivals — Trending anime Roblox game with redeemable codes
        </p>
      </div>
    </div>
  );
}

export function JujutsuKeywordNarrativeSection() {
  return <NarrativeSection data={jujutsuKeywordNarrative} />;
}

export function JujutsuEditorialGuideSection() {
  return <NarrativeSection data={jujutsuEditorialGuide} />;
}

export function JujutsuOperationsManualSection() {
  return <NarrativeSection data={jujutsuOperationsManual} />;
}

/* ------------------------------------------------------------------ */
/*  Daily Snapshot Sidebar                                             */
/* ------------------------------------------------------------------ */

type JujutsuDailySnapshotArchiveProps = {
  currentDate?: string;
};

function formatRecentDate(dateText: string) {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function JujutsuDailySnapshotArchive({
  currentDate,
}: JujutsuDailySnapshotArchiveProps) {
  const t = await getTranslations("JujutsuInfiniteSections");

  return (
    <aside className="rounded-xl border border-violet-200/70 bg-white p-4 shadow-sm dark:border-violet-900/40 dark:bg-slate-950">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/jujutsu-infinite-codes"
          className="rounded-md bg-violet-600 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-violet-700"
        >
          {t("sidebar.latest")}
        </Link>
        <Link
          href="/jujutsu-infinite-codes-history"
          className="rounded-md bg-violet-600 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-violet-700"
        >
          {t("sidebar.history")}
        </Link>
      </div>

      <h2 className="mt-4 font-heading text-3xl font-black text-slate-900 dark:text-slate-100">
        {t("sidebar.recentCodes")}
      </h2>

      <div className="mt-3 overflow-hidden rounded-lg border border-violet-100 dark:border-violet-900/50">
        {jujutsuRecentSnapshots.slice(0, 7).map((item) => (
          <Link
            key={item.date}
            href={`/jujutsu-infinite-codes/${item.date}`}
            className={`block border-b border-violet-100 px-3 py-3 text-sm transition last:border-b-0 dark:border-violet-900/50 ${
              currentDate === item.date
                ? "bg-violet-100/70 font-semibold text-slate-900 dark:bg-violet-900/30 dark:text-slate-100"
                : "text-slate-700 hover:bg-violet-50 dark:text-slate-300 dark:hover:bg-violet-900/10"
            }`}
          >
            <p>
              Jujutsu Infinite Codes ({formatRecentDate(item.date)})
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-emerald-600 dark:text-emerald-400">
                {item.activeCodes.length} {t("sidebar.active")}
              </span>{" "}
              ·{" "}
              <span className="text-red-500 dark:text-red-400">
                {item.expiredCodes.length} {t("sidebar.expired")}
              </span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <Link
          href="/jujutsu-infinite-codes-history"
          className="flex items-center justify-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
        >
          {t("sidebar.viewAllHistory")}
        </Link>
      </div>
    </aside>
  );
}
