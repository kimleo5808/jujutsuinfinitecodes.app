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
  ArrowRight,
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function StepHeader({
  step,
  icon: Icon,
  title,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
        {step}
      </div>
      <Icon className="size-8 text-violet-500" />
      <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
    </div>
  );
}

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

function TipCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
      <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
        <span className="font-bold">{title}:</span> {content}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function BeginnerGuidePage({
  params,
}: {
  params: Params;
}) {
  const { locale } = await params;
  const t = await getTranslations("BeginnerGuide");

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={articleSchema({
          title:
            "Jujutsu Infinite Beginner Guide 2026 - Complete Starter Tutorial",
          description:
            "Complete beginner's guide to Jujutsu Infinite. Learn how to start, redeem codes, get your first technique, level up fast, and avoid common mistakes.",
          url: `${BASE_URL}/jujutsu-infinite-beginner-guide`,
          datePublished: new Date().toISOString(),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          {
            name: "Beginner Guide",
            url: `${BASE_URL}/jujutsu-infinite-beginner-guide`,
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

      {/* Progress Steps Overview */}
      <nav className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
          {t("progressSteps.title")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { icon: Download, key: "installation", step: 1 },
              { icon: PlayCircle, key: "tutorial", step: 2 },
              { icon: Gift, key: "codes", step: 3 },
              { icon: Sparkles, key: "firstSpin", step: 4 },
              { icon: TrendingUp, key: "leveling", step: 5 },
              { icon: Users, key: "community", step: 6 },
            ] as const
          ).map(({ icon: Icon, key, step }) => (
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
          <StepHeader step={1} icon={Download} title={t("steps.installation.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.installation.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.installation.findGame.title")} content={t("steps.installation.findGame.content")} />
              <InfoCard title={t("steps.installation.accountSecurity.title")} content={t("steps.installation.accountSecurity.content")} />
              <InfoCard title={t("steps.installation.firstLogin.title")} content={t("steps.installation.firstLogin.content")} />
            </div>
          </div>
        </section>

        {/* Step 2: Tutorial */}
        <section
          id="step2"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <StepHeader step={2} icon={PlayCircle} title={t("steps.tutorial.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.tutorial.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.tutorial.controls.title")} content={t("steps.tutorial.controls.content")} />
              <InfoCard title={t("steps.tutorial.firstBattles.title")} content={t("steps.tutorial.firstBattles.content")} />
              <InfoCard title={t("steps.tutorial.rewards.title")} content={t("steps.tutorial.rewards.content")} />
            </div>
          </div>
        </section>

        {/* Step 3: Codes */}
        <section
          id="step3"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <StepHeader step={3} icon={Gift} title={t("steps.codes.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.codes.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.codes.whyImportant.title")} content={t("steps.codes.whyImportant.content")} />
              <InfoCard title={t("steps.codes.howToRedeem.title")} content={t("steps.codes.howToRedeem.content")} />
              <InfoCard title={t("steps.codes.priority.title")} content={t("steps.codes.priority.content")} />
              <InfoCard title={t("steps.codes.whereToFind.title")} content={t("steps.codes.whereToFind.content")} />
            </div>
            <div className="mt-4">
              <Link
                href="/jujutsu-infinite-codes"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                {t("relatedLinks.liveCodes.title")}
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
          <StepHeader step={4} icon={Sparkles} title={t("steps.firstSpin.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.firstSpin.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.firstSpin.whenToSpin.title")} content={t("steps.firstSpin.whenToSpin.content")} />
              <InfoCard title={t("steps.firstSpin.whatToAimFor.title")} content={t("steps.firstSpin.whatToAimFor.content")} />
              <InfoCard title={t("steps.firstSpin.badLuck.title")} content={t("steps.firstSpin.badLuck.content")} />
              <InfoCard title={t("steps.firstSpin.goodLuck.title")} content={t("steps.firstSpin.goodLuck.content")} />
            </div>
          </div>
        </section>

        {/* Step 5: Leveling */}
        <section
          id="step5"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <StepHeader step={5} icon={TrendingUp} title={t("steps.leveling.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.leveling.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.leveling.bestQuests.title")} content={t("steps.leveling.bestQuests.content")} />
              <InfoCard title={t("steps.leveling.farmingSpots.title")} content={t("steps.leveling.farmingSpots.content")} />
              <InfoCard title={t("steps.leveling.xpBoosts.title")} content={t("steps.leveling.xpBoosts.content")} />
              <InfoCard title={t("steps.leveling.whenPvP.title")} content={t("steps.leveling.whenPvP.content")} />
            </div>
          </div>
        </section>

        {/* Step 6: Community */}
        <section
          id="step6"
          className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8"
        >
          <StepHeader step={6} icon={Users} title={t("steps.community.title")} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              {t("steps.community.intro")}
            </p>
            <div className="mt-6 space-y-4">
              <InfoCard title={t("steps.community.discord.title")} content={t("steps.community.discord.content")} />
              <InfoCard title={t("steps.community.clans.title")} content={t("steps.community.clans.content")} />
              <InfoCard title={t("steps.community.clanBenefits.title")} content={t("steps.community.clanBenefits.content")} />
              <InfoCard title={t("steps.community.youtube.title")} content={t("steps.community.youtube.content")} />
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="rounded-2xl border border-red-100 bg-white p-6 dark:border-red-900/40 dark:bg-slate-950 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle className="size-8 text-red-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("mistakes.title")}
            </h2>
          </div>
          <p className="mb-6 text-slate-700 dark:text-slate-300">
            {t("mistakes.intro")}
          </p>
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-red-100 p-4 dark:border-red-900/50"
              >
                <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                    {t(`mistakes.list.${i}.mistake`)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`mistakes.list.${i}.why`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className="rounded-2xl border border-green-100 bg-white p-6 dark:border-green-900/40 dark:bg-slate-950 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle className="size-8 text-green-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("tips.title")}
            </h2>
          </div>
          <p className="mb-6 text-slate-700 dark:text-slate-300">
            {t("tips.intro")}
          </p>
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-green-100 p-4 dark:border-green-900/50"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                    {t(`tips.list.${i}.tip`)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`tips.list.${i}.why`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <ArrowRight className="size-8 text-violet-500" />
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("nextSteps.title")}
            </h2>
          </div>
          <p className="mb-6 text-slate-700 dark:text-slate-300">
            {t("nextSteps.intro")}
          </p>
          <ul className="mb-8 space-y-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-violet-500" />
                {t(`nextSteps.goals.${i}`)}
              </li>
            ))}
          </ul>

          {/* Related Links */}
          <h3 className="mb-4 font-heading text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("relatedLinks.title")}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/jujutsu-infinite-codes"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.liveCodes.title")}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.liveCodes.description")}
              </p>
            </Link>
            <Link
              href="/how-to-redeem-jujutsu-infinite-codes"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.redeemGuide.title")}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.redeemGuide.description")}
              </p>
            </Link>
            <Link
              href="/jujutsu-infinite-game-guide"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.gameGuide.title")}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("relatedLinks.gameGuide.description")}
              </p>
            </Link>
            <Link
              href="/jujutsu-infinite-codes-faq"
              className="rounded-lg border border-violet-200 p-4 transition-colors hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
            >
              <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                {t("relatedLinks.faq.title")}
              </h4>
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
