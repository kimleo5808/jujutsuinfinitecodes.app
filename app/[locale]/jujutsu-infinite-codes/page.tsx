import JujutsuHubPage from "@/components/jujutsu/JujutsuHubPage";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "JujutsuInfiniteCodes" });

  return constructMetadata({
    page: "JujutsuInfiniteCodes",
    title: t("title"),
    description: t("description"),
    keywords: [
      "jujutsu infinite codes", "jujutsu infinite codes today", "jujutsu infinite roblox codes",
      "codes for jujutsu infinite roblox", "jujutsu infinite codes list", "jujutsu infinite active codes",
    ],
    locale: locale as Locale,
    path: "/jujutsu-infinite-codes",
    canonicalUrl: "/jujutsu-infinite-codes",
  });
}

export default function JujutsuInfiniteCodesPage() {
  return <JujutsuHubPage />;
}
