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
  ArrowRight
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

export default async function GameGuidePage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations("GameGuide");

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={articleSchema(
          "Complete Jujutsu Infinite Game Guide 2026",
          "Comprehensive guide covering game mechanics, techniques, resource optimization, PvP strategies, and how to maximize code rewards in Jujutsu Infinite.",
          `${BASE_URL}/jujutsu-infinite-game-guide`,
          new Date().toISOString()
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Game Guide", url: `${BASE_URL}/jujutsu-infinite-game-guide` },
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
          {[
            { icon: Sparkles, key: "techniques" },
            { icon: Zap, key: "cursedEnergy" },
            { icon: TrendingUp, key: "leveling" },
            { icon: Coins, key: "resources" },
            { icon: Swords, key: "combat" },
            { icon: Users, key: "social" },
            { icon: Calendar, key: "events" },
          ].map(({ icon: Icon, key }) => (
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.techniques.intro")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.techniques.raritySystem.title")}
            </h3>

            <div className="mt-4 space-y-4">
              {["common", "uncommon", "rare", "epic", "legendary", "mythic"].map((rarity) => (
                <div
                  key={rarity}
                  className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50"
                >
                  <h4 className="mb-2 font-semibold capitalize text-slate-900 dark:text-slate-100">
                    {t(`sections.techniques.raritySystem.${rarity}.name`)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`sections.techniques.raritySystem.${rarity}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
              <p className="text-sm font-medium text-violet-900 dark:text-violet-200">
                💡 {t("sections.techniques.tip")}
              </p>
            </div>
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.cursedEnergy.intro")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.cursedEnergy.howItWorks.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.cursedEnergy.howItWorks.description")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.cursedEnergy.training.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.cursedEnergy.training.description")}
            </p>

            <div className="mt-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                ⚠️ {t("sections.cursedEnergy.warning")}
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.leveling.intro")}
            </p>

            <div className="mt-6 space-y-4">
              {["early", "mid", "late"].map((stage) => (
                <div
                  key={stage}
                  className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50"
                >
                  <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                    {t(`sections.leveling.stages.${stage}.title`)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`sections.leveling.stages.${stage}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Resource Optimization */}
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.resources.yen.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.resources.yen.intro")}
            </p>

            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-violet-100 p-3 dark:border-violet-900/50"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                    {i}
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {t(`sections.resources.yen.methods.${i}`)}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.resources.spins.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.resources.spins.description")}
            </p>

            <h3 className="mt-8 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.resources.priority.title")}
            </h3>
            <ol className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="text-slate-700 dark:text-slate-300">
                  {t(`sections.resources.priority.items.${i}`)}
                </li>
              ))}
            </ol>
          </div>
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.combat.combos.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.combat.combos.description")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.combat.pvp.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.combat.pvp.description")}
            </p>

            <div className="mt-4 rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("sections.combat.pvp.topTier.title")}
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>{t(`sections.combat.pvp.topTier.traits.${i}`)}</li>
                ))}
              </ul>
            </div>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.combat.domain.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.combat.domain.description")}
            </p>
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.social.clans.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.social.clans.description")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.social.community.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.social.community.description")}
            </p>
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

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.events.seasonal.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.events.seasonal.description")}
            </p>

            <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("sections.events.codePatterns.title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("sections.events.codePatterns.intro")}
            </p>

            <ul className="mt-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="text-slate-700 dark:text-slate-300">
                  {t(`sections.events.codePatterns.patterns.${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      {/* CTA Section */}
      <section className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:to-slate-950">
        <h2 className="mb-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
          {t("cta.title")}
        </h2>
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          {t("cta.description")}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/jujutsu-infinite-codes"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
          >
            {t("cta.viewCodes")}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/how-to-redeem-jujutsu-infinite-codes"
            className="inline-flex items-center gap-2 rounded-lg border border-violet-300 bg-white px-6 py-3 font-semibold text-violet-700 transition-colors hover:bg-violet-50 dark:border-violet-700 dark:bg-slate-900 dark:text-violet-300 dark:hover:bg-slate-800"
          >
            {t("cta.howToRedeem")}
          </Link>
        </div>
      </section>
    </div>
  );
}
