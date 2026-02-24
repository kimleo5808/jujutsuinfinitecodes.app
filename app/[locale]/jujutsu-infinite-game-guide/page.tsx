import { Locale } from "@/i18n/routing";
import { articleSchema, JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { BASE_URL } from "@/config/site";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Coins,
  Swords,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GameGuide" });

  return constructMetadata({
    page: "GameGuide",
    title: t("title"),
    description: t("description"),
    keywords: [
      "jujutsu infinite guide",
      "jujutsu infinite gameplay",
      "jujutsu infinite techniques",
      "how to get mythic techniques jujutsu infinite",
      "best yen farming jujutsu infinite",
      "jujutsu infinite pvp tips",
      "jujutsu infinite cursed energy",
      "jujutsu infinite rarity system",
    ],
    locale: locale as Locale,
    path: "/jujutsu-infinite-game-guide",
    canonicalUrl: "/jujutsu-infinite-game-guide",
  });
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
      <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{content}</p>
    </div>
  );
}

function TipBox({ content }: { content: string }) {
  return (
    <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
      <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
        {content}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function GameGuidePage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations("GameGuide");

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={articleSchema({
          title: "Complete Jujutsu Infinite Game Guide 2026",
          description:
            "Comprehensive guide covering game mechanics, techniques, resource optimization, PvP strategies, and how to maximize code rewards in Jujutsu Infinite.",
          url: `${BASE_URL}/jujutsu-infinite-game-guide`,
          datePublished: new Date().toISOString(),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Game Guide",
            url: `${BASE_URL}/jujutsu-infinite-game-guide`,
          },
        ])}
      />

      {/* Hero */}
      <header className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-violet-50 to-purple-50 p-8 dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <h1 className="relative font-heading text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="relative mt-4 text-lg text-slate-700 dark:text-slate-300">
          {t("subheading")}
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
          {t("quickNav.title")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { icon: Sparkles, key: "techniques" },
              { icon: Zap, key: "cursedEnergy" },
              { icon: TrendingUp, key: "leveling" },
              { icon: Coins, key: "resources" },
              { icon: Swords, key: "combat" },
              { icon: Users, key: "social" },
              { icon: Calendar, key: "events" },
            ] as const
          ).map(({ icon: Icon, key }) => (
            <a
              key={key}
              href={`#${key}`}
              className="flex items-center gap-3 rounded-lg border border-violet-100 p-3 transition-colors hover:bg-violet-50 dark:border-violet-900/50 dark:hover:bg-slate-900"
            >
              <Icon className="size-5 text-violet-500" />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {t(`quickNav.${key}`)}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <article className="space-y-8">
        {/* Section 1: Innate Techniques */}
        <section
          id="techniques"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.techniques.title")}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-slate-300">
            {t("sections.techniques.intro")}
          </p>

          <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
            {t("sections.techniques.raritySystem.title")}
          </h3>

          <div className="mt-4 space-y-4">
            {(
              ["common", "uncommon", "rare", "epic", "legendary", "mythic"] as const
            ).map((rarity) => (
              <div
                key={rarity}
                className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50"
              >
                <h4 className="mb-2 font-semibold capitalize text-slate-900 dark:text-slate-100">
                  {t(`sections.techniques.raritySystem.${rarity}.name`)}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t(
                    `sections.techniques.raritySystem.${rarity}.description`
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <InfoCard
              title={t("sections.techniques.spinStrategy.title")}
              content={t("sections.techniques.spinStrategy.content")}
            />
          </div>
        </section>

        {/* Section 2: Cursed Energy */}
        <section
          id="cursedEnergy"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Zap className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.cursedEnergy.title")}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-slate-300">
            {t("sections.cursedEnergy.intro")}
          </p>

          <div className="mt-6 space-y-4">
            <InfoCard
              title={t("sections.cursedEnergy.mechanics.title")}
              content={t("sections.cursedEnergy.mechanics.content")}
            />
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
              <h3 className="mb-2 font-semibold text-amber-800 dark:text-amber-300">
                {t("sections.cursedEnergy.commonMistake.title")}
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {t("sections.cursedEnergy.commonMistake.content")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Leveling */}
        <section
          id="leveling"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.leveling.title")}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-slate-300">
            {t("sections.leveling.intro")}
          </p>

          <div className="mt-6 space-y-4">
            {(["early", "mid", "late"] as const).map((phase) => (
              <InfoCard
                key={phase}
                title={t(`sections.leveling.phases.${phase}.title`)}
                content={t(`sections.leveling.phases.${phase}.content`)}
              />
            ))}
          </div>
        </section>

        {/* Section 4: Resources */}
        <section
          id="resources"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Coins className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.resources.title")}
            </h2>
          </div>

          {/* Yen Management */}
          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
            {t("sections.resources.yenManagement.title")}
          </h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {t("sections.resources.yenManagement.intro")}
          </p>
          <ul className="mt-4 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-violet-400" />
                {t(`sections.resources.yenManagement.methods.${i}`)}
              </li>
            ))}
          </ul>
          <TipBox content={t("sections.resources.yenManagement.priority")} />

          {/* Code Priority */}
          <h3 className="mt-8 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
            {t("sections.resources.codePriority.title")}
          </h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {t("sections.resources.codePriority.intro")}
          </p>
          <ol className="mt-4 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                  {i + 1}
                </span>
                {t(`sections.resources.codePriority.list.${i}`)}
              </li>
            ))}
          </ol>
        </section>

        {/* Section 5: Combat & PvP */}
        <section
          id="combat"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Swords className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.combat.title")}
            </h2>
          </div>

          <div className="space-y-4">
            <InfoCard
              title={t("sections.combat.comboSystem.title")}
              content={t("sections.combat.comboSystem.content")}
            />
            <InfoCard
              title={t("sections.combat.pvpMeta.title")}
              content={t("sections.combat.pvpMeta.content")}
            />
            <InfoCard
              title={t("sections.combat.domainExpansion.title")}
              content={t("sections.combat.domainExpansion.content")}
            />
          </div>
        </section>

        {/* Section 6: Social & Clans */}
        <section
          id="social"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Users className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.social.title")}
            </h2>
          </div>

          <div className="space-y-4">
            <InfoCard
              title={t("sections.social.clanBenefits.title")}
              content={t("sections.social.clanBenefits.content")}
            />
            <InfoCard
              title={t("sections.social.clanRaids.title")}
              content={t("sections.social.clanRaids.content")}
            />
            <InfoCard
              title={t("sections.social.community.title")}
              content={t("sections.social.community.content")}
            />
          </div>
        </section>

        {/* Section 7: Events & Updates */}
        <section
          id="events"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Calendar className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.events.title")}
            </h2>
          </div>

          <div className="space-y-4">
            <InfoCard
              title={t("sections.events.seasonalEvents.title")}
              content={t("sections.events.seasonalEvents.content")}
            />

            <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("sections.events.codePatterns.title")}
              </h3>
              <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                {t("sections.events.codePatterns.intro")}
              </p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-violet-400" />
                    {t(`sections.events.codePatterns.patterns.${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            <TipBox content={t("sections.events.codePatterns.tip")} />
          </div>
        </section>

        {/* Related Links */}
        <section className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8">
          <h2 className="mb-6 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("relatedLinks.title")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/jujutsu-infinite-codes"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.liveCodes.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.liveCodes.description")}
              </p>
            </Link>
            <Link
              href="/how-to-redeem-jujutsu-infinite-codes"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.redeemGuide.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.redeemGuide.description")}
              </p>
            </Link>
            <Link
              href="/jujutsu-infinite-codes-faq"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.faq.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.faq.description")}
              </p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
