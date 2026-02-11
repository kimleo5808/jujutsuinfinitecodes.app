import {
  JujutsuDailySnapshotArchive,
  JujutsuEditorialGuideSection,
  JujutsuFaqSection,
  JujutsuHero,
  JujutsuKeywordNarrativeSection,
  JujutsuOperationsManualSection,
  JujutsuOverviewSections,
  JujutsuRedeemSection,
  JujutsuRelatedGameImage,
  JujutsuTroubleshootSection,
  JujutsuUpdateLogSection,
} from "@/components/jujutsu/JujutsuSections";

export default function JujutsuHubPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="flex flex-col gap-8">
          <JujutsuHero />
          <JujutsuOverviewSections />
          <JujutsuRedeemSection />
          <JujutsuTroubleshootSection />
          <JujutsuUpdateLogSection />
          <JujutsuFaqSection />
          <JujutsuRelatedGameImage />
          <JujutsuKeywordNarrativeSection />
          <JujutsuEditorialGuideSection />
          <JujutsuOperationsManualSection />
        </div>

        <div className="lg:sticky lg:top-20">
          <JujutsuDailySnapshotArchive />
        </div>
      </div>
    </div>
  );
}
