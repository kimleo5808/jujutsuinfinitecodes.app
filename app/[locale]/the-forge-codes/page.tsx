import ForgeHubPage from "@/components/forge/ForgeHubPage";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    page: "TheForgeCodes",
    title: "The Forge Codes: Latest Active & Expired Auto-Collected List",
    description:
      "Get the latest the forge codes with auto-collected active and expired status, timestamps, redeem steps, and daily archive links.",
    locale: locale as Locale,
    path: "/the-forge-codes",
    canonicalUrl: "/the-forge-codes",
  });
}

export default function TheForgeCodesPage() {
  return <ForgeHubPage />;
}
