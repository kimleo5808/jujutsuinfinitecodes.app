import MDXComponents from "@/components/mdx/MDXComponents";
import { BASE_URL } from "@/config/site";
import { Locale, LOCALES } from "@/i18n/routing";
import { breadcrumbSchema, howToSchema, JsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import fs from "fs/promises";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import path from "path";
import remarkGfm from "remark-gfm";

const options = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

async function getMDXContent(locale: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "how-to-redeem-jujutsu-infinite-codes",
    `${locale}.mdx`
  );
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading MDX file: ${error}`);
    return "";
  }
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RedeemGuide" });

  return constructMetadata({
    page: "RedeemGuide",
    title: t("title"),
    description: t("description"),
    keywords: [
      "how to redeem codes in jujutsu infinite", "where to put codes in jujutsu infinite",
      "how to enter codes in jujutsu infinite", "jujutsu infinite codes redeem",
      "how to use codes in jujutsu infinite", "jujutsu infinite roblox redeem guide",
    ],
    locale: locale as Locale,
    path: "/how-to-redeem-jujutsu-infinite-codes",
    canonicalUrl: "/how-to-redeem-jujutsu-infinite-codes",
  });
}

export default async function RedeemGuidePage({
  params,
}: {
  params: Params;
}) {
  const { locale } = await params;
  const content = await getMDXContent(locale);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={howToSchema(
          "How to Redeem Codes in Jujutsu Infinite",
          "Step-by-step guide for redeeming codes in Jujutsu Infinite on Roblox across all devices.",
          [
            { name: "Launch Jujutsu Infinite", text: "Open Roblox and search for Jujutsu Infinite. Click Play and wait until your character fully loads into the game world." },
            { name: "Find the codes panel", text: "Look at the left side of your screen for a gift box or Twitter/X icon. Tap or click this icon to open the code redemption panel." },
            { name: "Enter the code exactly", text: "Type or paste the code into the text input field. Codes are case-sensitive — copy-paste to avoid typos." },
            { name: "Confirm the reward", text: "Tap Redeem and check your inventory for the reward. Common rewards include rerolls, luck totems, gems, and boosts." },
          ]
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "How to Redeem Jujutsu Infinite Codes", url: `${BASE_URL}/how-to-redeem-jujutsu-infinite-codes` },
        ])}
      />
      {/* Hero */}
      <header className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-violet-50 to-purple-50 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <h1 className="relative font-heading text-3xl font-black text-slate-900 dark:text-slate-100 sm:text-4xl">
          How to Redeem Codes in Jujutsu Infinite
        </h1>
        <p className="relative mt-4 text-slate-700 dark:text-slate-300">
          Complete 2026 guide covering how to redeem Jujutsu Infinite Codes on every
          device, what rewards you get, troubleshooting common errors, and where
          to find new codes.
        </p>
      </header>

      {/* MDX Content */}
      <article className="rounded-2xl border border-violet-100 bg-white p-6 dark:border-violet-900/40 dark:bg-slate-950 sm:p-8">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={options}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
