import { jujutsuRecentSnapshots, jujutsuSiteFacts } from "@/lib/jujutsu-data";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  CircleDot,
  Flame,
  Gift,
  ListChecks,
  SearchCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

const latestSnapshot = jujutsuRecentSnapshots[0];
const latestActivePreview = (latestSnapshot?.activeCodes ?? []).slice(0, 8);

/* keywordSignalCards moved to translation files: HomePage.signalCards */

/* homepageSections and faqItems moved to translation files: HomePage.sections / HomePage.faqItems */

type RecentListProps = {
  currentDate?: string;
  labels: {
    liveHub: string;
    history: string;
    recentCodes: string;
    viewAllHistory: string;
    active: string;
    expired: string;
  };
  locale: string;
};

function formatRecentDate(dateText: string, locale: string) {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }

  const localeMap: Record<string, string> = { en: "en-US", zh: "zh-CN", ja: "ja-JP" };
  return date.toLocaleDateString(localeMap[locale] || "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function RecentCodesList({ currentDate, labels, locale }: RecentListProps) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-lg dark:border-violet-900/40 dark:bg-slate-950">
      <div className="grid grid-cols-2 gap-2 p-4">
        <Link
          href="/jujutsu-infinite-codes"
          className="rounded-lg bg-violet-600 px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-violet-700"
        >
          {labels.liveHub}
        </Link>
        <Link
          href="/jujutsu-infinite-codes-history"
          className="rounded-lg bg-violet-600 px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-violet-700"
        >
          {labels.history}
        </Link>
      </div>

      <div className="px-4 pb-2">
        <h2 className="font-heading text-2xl text-slate-900 dark:text-slate-100">
          {labels.recentCodes}
        </h2>
      </div>

      <div className="border-t border-violet-100 dark:border-violet-900/50">
        {jujutsuRecentSnapshots.slice(0, 7).map((item) => (
          <Link
            key={item.date}
            href={`/jujutsu-infinite-codes/${item.date}`}
            className={`block border-b border-violet-50 px-4 py-3 text-sm transition-colors last:border-b-0 dark:border-violet-900/30 ${
              currentDate === item.date
                ? "bg-violet-50 font-semibold text-violet-900 dark:bg-violet-900/30 dark:text-violet-200"
                : "text-slate-700 hover:bg-violet-50/60 dark:text-slate-300 dark:hover:bg-violet-900/10"
            }`}
          >
            <p>Jujutsu Infinite Codes ({formatRecentDate(item.date, locale)})</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.activeCodes.length}</span> {labels.active} |{" "}
              <span className="font-semibold text-red-500">{item.expiredCodes.length}</span> {labels.expired}
            </p>
          </Link>
        ))}
      </div>

      <div className="border-t border-violet-100 px-4 py-3 dark:border-violet-900/50">
        <Link
          href="/jujutsu-infinite-codes-history"
          className="flex items-center justify-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
        >
          {labels.viewAllHistory}
        </Link>
      </div>
    </aside>
  );
}

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-violet-100 transition-colors open:bg-violet-50/40 dark:border-violet-900/40 dark:open:bg-violet-900/10">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 transition-colors hover:text-violet-700 dark:text-slate-100 dark:hover:text-violet-400 [&::-webkit-details-marker]:hidden">
        <h3 className="text-[0.95rem] leading-snug">{question}</h3>
        <ChevronDown className="h-4 w-4 shrink-0 text-violet-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-4">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {answer}
        </p>
      </div>
    </details>
  );
}

export default async function HomeComponent() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="flex flex-col gap-8">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-white to-violet-50 p-8 shadow-md dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/50">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-600/10" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-600/10" />

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:border-violet-800 dark:bg-slate-900/80 dark:text-violet-300">
                <Flame className="h-3.5 w-3.5" />
                jujutsuinfinitecodes.app
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-4xl tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                {t("hero.title")}
              </h1>
              <p
                className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 [&_strong]:text-slate-800 dark:[&_strong]:text-slate-100"
                dangerouslySetInnerHTML={{ __html: t("hero.description1") }}
              />
              <p
                className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 [&_strong]:text-slate-800 dark:[&_strong]:text-slate-100"
                dangerouslySetInnerHTML={{ __html: t("hero.description2") }}
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/jujutsu-infinite-codes"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-600 hover:shadow-red-500/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.openLiveHub")}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/jujutsu-infinite-codes-history"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition-all hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:bg-slate-900 dark:text-violet-300 dark:hover:bg-violet-950/50"
                >
                  {t("hero.browseHistory")}
                  <ListChecks className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-violet-200/60 dark:border-violet-900/40">
                <Image
                  src="/images/jujutsu-infinite-roblox-game-cover.webp"
                  alt="Jujutsu Infinite Roblox game cover art featuring anime-style sorcerer characters with cursed energy effects"
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Keyword Signal Cards */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <article
                key={index}
                className="rounded-2xl border-l-4 border-l-violet-500 border-t border-r border-b border-t-slate-100 border-r-slate-100 border-b-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-t-slate-800 dark:border-r-slate-800 dark:border-b-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  {t(`signalCards.${index}.label`)}
                </p>
                <p className="mt-1 font-heading text-3xl text-violet-600 dark:text-violet-400">
                  {index === 0 ? jujutsuSiteFacts.activeCount : t(`signalCards.${index}.value`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(`signalCards.${index}.note`)}
                </p>
              </article>
            ))}
          </section>

          {/* Quick Active Preview */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 font-heading text-2xl text-slate-900 dark:text-slate-100">
              <Gift className="h-5 w-5 text-violet-500" />
              {t("quickPreview.title")}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: t("quickPreview.description") }}>

            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {latestActivePreview.map((item) => (
                <div
                  key={item.code}
                  className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-violet-800"
                >
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-3 w-3 text-emerald-500" />
                    <p className="font-mono text-sm font-bold text-violet-700 dark:text-violet-300">
                      {item.code}
                    </p>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    {item.reward}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/jujutsu-infinite-codes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
              >
                {t("quickPreview.seeFullTables")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Operational Snapshot */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 font-heading text-2xl text-slate-900 dark:text-slate-100">
              <CalendarClock className="h-5 w-5 text-violet-500" />
              {t("snapshot.title")}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("snapshot.activeCodes")}
                </p>
                <p className="mt-1 font-heading text-3xl text-emerald-600 dark:text-emerald-400">
                  {jujutsuSiteFacts.activeCount}
                </p>
              </article>
              <article className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("snapshot.expiredTracked")}
                </p>
                <p className="mt-1 font-heading text-3xl text-red-500">
                  {jujutsuSiteFacts.expiredCount}
                </p>
              </article>
              <article className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("snapshot.latestSnapshot")}
                </p>
                <p className="mt-1 font-heading text-3xl text-violet-600 dark:text-violet-400">
                  {jujutsuSiteFacts.latestSnapshotDate}
                </p>
              </article>
              <article className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("snapshot.avgSearch")}
                </p>
                <p className="mt-1 font-heading text-3xl text-violet-600 dark:text-violet-400">
                  {jujutsuSiteFacts.monthlySearchEstimate}
                </p>
              </article>
            </div>
          </section>

          {/* Related Game */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm dark:border-slate-800">
            <Image
              src="/images/jujutsu-zero-roblox-game-cover.webp"
              alt="Jujutsu Zero Roblox game cover art featuring Gojo Satoru with blue cursed energy and Sukuna in a red domain"
              width={1200}
              height={675}
              className="w-full object-cover"
            />
            <div className="bg-white p-4 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Jujutsu Zero — Another popular Jujutsu Kaisen-inspired Roblox game
              </p>
            </div>
          </div>

          {/* SEO Content Sections */}
          {[0, 1, 2, 3, 4].map((sectionIndex) => {
            const sectionId = t(`sections.${sectionIndex}.id`);
            const subsectionKeys = sectionIndex === 0 ? [0, 1, 2] : sectionIndex === 1 ? [0, 1, 2, 3] : [0, 1];
            return (
              <section
                key={sectionId}
                id={sectionId}
                className={`rounded-2xl border border-slate-100 p-6 shadow-sm dark:border-slate-800 ${
                  sectionIndex % 2 === 0
                    ? "bg-white dark:bg-slate-950"
                    : "bg-slate-50/70 dark:bg-slate-900/50"
                }`}
              >
                <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl text-slate-900 dark:text-slate-100">
                  {t(`sections.${sectionIndex}.title`)}
                </h2>
                <div className="mt-5 space-y-5">
                  {subsectionKeys.map((si) => {
                    const h3Key = `sections.${sectionIndex}.subsections.${si}.h3`;
                    const h3Text = t.has(h3Key) ? t(h3Key) : null;
                    return (
                      <div key={si}>
                        {h3Text && (
                          <h3 className="mb-3 text-lg font-bold text-violet-700 dark:text-violet-400">
                            {h3Text}
                          </h3>
                        )}
                        {(() => {
                          const paragraphs: string[] = [];
                          for (let pi = 0; pi < 5; pi++) {
                            const pKey = `sections.${sectionIndex}.subsections.${si}.paragraphs.${pi}`;
                            if (t.has(pKey)) paragraphs.push(t(pKey));
                            else break;
                          }
                          return paragraphs.map((paragraph, pi) => (
                            <p
                              key={pi}
                              className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 first:mt-0 dark:text-slate-300"
                            >
                              {paragraph}
                            </p>
                          ));
                        })()}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* FAQ Accordion */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="flex items-center gap-2 font-heading text-2xl text-slate-900 dark:text-slate-100">
              <SearchCheck className="h-5 w-5 text-violet-500" />
              {t("faq.title")}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: t("faq.description") }}>

            </p>
            <div className="mt-5 flex flex-col gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <FaqAccordionItem
                  key={index}
                  question={t(`faqItems.${index}.question`)}
                  answer={t(`faqItems.${index}.answer`)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-20">
          <RecentCodesList
            locale={locale}
            labels={{
              liveHub: t("sidebar.liveHub"),
              history: t("sidebar.history"),
              recentCodes: t("sidebar.recentCodes"),
              viewAllHistory: t("sidebar.viewAllHistory"),
              active: t("sidebar.active"),
              expired: t("sidebar.expired"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
