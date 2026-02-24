import { Locale } from "@/i18n/routing";
import { articleSchema, JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { BASE_URL } from "@/config/site";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Download,
  PlayCircle,
  Gift,
  Sparkles,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight
} from "lucide-react";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BeginnerGuide" });

  return constructMetadata({
    page: "BeginnerGuide",
    title: t("title"),
    description: t("description"),
    keywords: [
      "jujutsu infinite beginner guide",
      "how to start jujutsu infinite",
      "jujutsu infinite tips for new players",
      "jujutsu infinite tutorial",
      "jujutsu infinite new player guide",
      "jujutsu infinite getting started",
      "jujutsu infinite first steps",
    ],
    locale: locale as Locale,
    path: "/jujutsu-infinite-beginner-guide",
    canonicalUrl: "/jujutsu-infinite-beginner-guide",
  });
}

export default async function BeginnerGuidePage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations("BeginnerGuide");

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={articleSchema({
          title: "Jujutsu Infinite Beginner Guide 2026 - Complete Starter Tutorial",
          description: "Complete beginner's guide to Jujutsu Infinite. Learn how to start, redeem codes, get your first technique, level up fast, and avoid common mistakes.",
          url: `${BASE_URL}/jujutsu-infinite-beginner-guide`,
          datePublished: new Date().toISOString()
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Beginner Guide", url: `${BASE_URL}/jujutsu-infinite-beginner-guide` },
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

      {/* Progress Steps Overview */}
      <nav className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
          {t("progressSteps.title")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Download, key: "installation", step: 1 },
            { icon: PlayCircle, key: "tutorial", step: 2 },
            { icon: Gift, key: "codes", step: 3 },
            { icon: Sparkles, key: "firstSpin", step: 4 },
            { icon: TrendingUp, key: "leveling", step: 5 },
            { icon: Users, key: "community", step: 6 },
          ].map(({ icon: Icon, key, step }) => (
            <a
              key={key}
              href={`#step${step}`}
              className="flex items-center gap-3 rounded-lg border border-violet-100 p-3 transition-colors hover:bg-violet-50 dark:border-violet-900/50 dark:hover:bg-slate-900"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                {step}
              </div>
              <Icon className="size-5 text-violet-500" />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {t(`progressSteps.${key}`)}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <article className="space-y-8">
        {/* Step 1: Installation */}
        <section
          id="step1"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              1
            </div>
            <Download className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.installation.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.installation.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.installation.findGame.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.installation.findGame.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.installation.accountSecurity.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.installation.accountSecurity.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.installation.firstLogin.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.installation.firstLogin.content")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Tutorial */}
        <section
          id="step2"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              2
            </div>
            <PlayCircle className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.tutorial.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.tutorial.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.tutorial.basics.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.tutorial.basics.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.tutorial.rewards.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.tutorial.rewards.content")}
                </p>
              </div>

              <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                <p className="text-sm font-medium text-violet-900 dark:text-violet-200">
                  <AlertCircle className="mr-2 inline size-4" />
                  {t("steps.tutorial.tip")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Redeem Codes */}
        <section
          id="step3"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              3
            </div>
            <Gift className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.codes.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.codes.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.codes.whyImportant.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.codes.whyImportant.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.codes.howToRedeem.title")}
                </h3>
                <ol className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>{t("steps.codes.howToRedeem.step1")}</li>
                  <li>{t("steps.codes.howToRedeem.step2")}</li>
                  <li>{t("steps.codes.howToRedeem.step3")}</li>
                  <li>{t("steps.codes.howToRedeem.step4")}</li>
                </ol>
              </div>

              <div className="rounded-lg border-2 border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
                <h3 className="mb-2 font-semibold text-violet-900 dark:text-violet-200">
                  {t("steps.codes.priority.title")}
                </h3>
                <ol className="mt-2 space-y-1 text-sm text-violet-800 dark:text-violet-300">
                  <li>1. {t("steps.codes.priority.item1")}</li>
                  <li>2. {t("steps.codes.priority.item2")}</li>
                  <li>3. {t("steps.codes.priority.item3")}</li>
                </ol>
              </div>

              <Link
                href="/jujutsu-infinite-codes"
                className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
              >
                {t("steps.codes.viewCodesButton")}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Step 4: First Spin */}
        <section
          id="step4"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              4
            </div>
            <Sparkles className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.firstSpin.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.firstSpin.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.firstSpin.whenToSpin.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.firstSpin.whenToSpin.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.firstSpin.whatToExpect.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.firstSpin.whatToExpect.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.firstSpin.lowRarity.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.firstSpin.lowRarity.content")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: Leveling */}
        <section
          id="step5"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              5
            </div>
            <TrendingUp className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.leveling.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.leveling.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.leveling.bestLocations.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.leveling.bestLocations.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.leveling.quests.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.leveling.quests.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.leveling.pvp.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.leveling.pvp.content")}
                </p>
              </div>

              <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                <p className="text-sm font-medium text-violet-900 dark:text-violet-200">
                  <AlertCircle className="mr-2 inline size-4" />
                  {t("steps.leveling.tip")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6: Community */}
        <section
          id="step6"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              6
            </div>
            <Users className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("steps.community.title")}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.community.intro")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.community.joinClan.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.community.joinClan.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.community.discord.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.community.discord.content")}
                </p>
              </div>

              <div className="rounded-lg border border-violet-100 p-4 dark:border-violet-900/50">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  {t("steps.community.resources.title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("steps.community.resources.content")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="rounded-2xl border border-red-100 bg-white p-6 dark:border-red-900/40 dark:bg-slate-950 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <AlertCircle className="size-8 text-red-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("mistakes.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex gap-3 rounded-lg border border-red-100 p-4 dark:border-red-900/50"
              >
                <XCircle className="size-5 shrink-0 text-red-500" />
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                    {t(`mistakes.mistake${num}.wrong`)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`mistakes.mistake${num}.right`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="rounded-2xl border border-green-100 bg-white p-6 dark:border-green-900/40 dark:bg-slate-950 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle className="size-8 text-green-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("nextSteps.title")}
            </h2>
          </div>

          <p className="mb-6 text-slate-700 dark:text-slate-300">
            {t("nextSteps.description")}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/jujutsu-infinite-codes"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("nextSteps.liveCodes.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("nextSteps.liveCodes.description")}
              </p>
            </Link>

            <Link
              href="/jujutsu-infinite-game-guide"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("nextSteps.gameGuide.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("nextSteps.gameGuide.description")}
              </p>
            </Link>

            <Link
              href="/jujutsu-infinite-codes-faq"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                {t("nextSteps.faq.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("nextSteps.faq.description")}
              </p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
