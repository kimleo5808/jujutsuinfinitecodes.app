import { jujutsuFaq, jujutsuTroubleshooting } from "@/lib/jujutsu-data";
import { Locale } from "@/i18n/routing";
import { faqPageSchema, JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { BASE_URL } from "@/config/site";
import { ChevronDown } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type FAQTranslatedItem = { question: string; answer: string };

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQ" });

  return constructMetadata({
    page: "FAQ",
    title: t("title"),
    description: t("description"),
    keywords: [
      "jujutsu infinite codes faq", "jujutsu infinite codes not working", "why are jujutsu infinite Codes not working",
      "jujutsu infinite roblox codes help", "jujutsu infinite codes expired", "jujutsu infinite codes troubleshooting",
    ],
    locale: locale as Locale,
    path: "/jujutsu-infinite-codes-faq",
    canonicalUrl: "/jujutsu-infinite-codes-faq",
  });
}

export default async function JujutsuFaqPage() {
  const t = await getTranslations("FaqPage");
  const ft = await getTranslations("JujutsuInfiniteSections");

  const translatedFaqItems: FAQTranslatedItem[] = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: ft(`faqItems.${i}.question`),
    answer: ft(`faqItems.${i}.answer`),
  }));
  const translatedTroubleshootItems: FAQTranslatedItem[] = [0, 1, 2, 3].map((i) => ({
    question: ft(`troubleshootItems.${i}.question`),
    answer: ft(`troubleshootItems.${i}.answer`),
  }));
  // Keep original English data for JSON-LD structured data (SEO)
  const allFaqItems = [...jujutsuFaq, ...jujutsuTroubleshooting];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={faqPageSchema(allFaqItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "jujutsu infinite codes FAQ", url: `${BASE_URL}/jujutsu-infinite-codes-faq` },
        ])}
      />
      {/* Hero */}
      <header className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-violet-50 to-purple-50 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <h1 className="relative font-heading text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="relative mt-4 text-slate-700 dark:text-slate-300">
          This FAQ is built for Jujutsu Infinite Codes search intent. It answers why
          codes fail, how expiration works, and what to do before retrying.
        </p>
      </header>

      {/* Core FAQ accordion */}
      <section className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950">
        <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
          {t("coreFaq")}
        </h2>
        <div className="mt-6 space-y-3">
          {translatedFaqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-violet-100 dark:border-violet-900/50"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-violet-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-violet-50 px-4 py-3 text-sm text-slate-600 dark:border-violet-900/30 dark:text-slate-300">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Fast failure checklist accordion */}
      <section className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950">
        <h2 className="border-l-4 border-violet-500 pl-4 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">
          {t("failureChecklist")}
        </h2>
        <div className="mt-6 space-y-3">
          {translatedTroubleshootItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-violet-100 dark:border-violet-900/50"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-violet-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-violet-50 px-4 py-3 text-sm text-slate-600 dark:border-violet-900/30 dark:text-slate-300">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
