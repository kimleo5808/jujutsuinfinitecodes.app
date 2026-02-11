import { forgeRecentSnapshots, forgeSiteFacts } from "@/lib/forge-data";
import { ArrowRight, CalendarClock, Flame, ListChecks } from "lucide-react";
import Link from "next/link";

const latestSnapshot = forgeRecentSnapshots[0];
const latestActivePreview = (latestSnapshot?.activeCodes ?? []).slice(0, 6);

export default function HomeComponent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-orange-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 shadow-sm dark:border-orange-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <p className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-700 dark:border-orange-800 dark:bg-slate-900/80 dark:text-orange-300">
          <Flame className="h-3.5 w-3.5" />
          theforgecodes.app
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          The Forge Codes Hub
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
          Use the main codes hub for the full active and expired list, daily
          snapshots, and troubleshooting guides. This homepage is the fast
          entry point.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/the-forge-codes"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            Open The Forge Codes Page
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/the-forge-codes-history"
            className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-orange-100 dark:border-orange-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            View Code History
            <ListChecks className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/40 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">Active codes</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {forgeSiteFacts.activeCount}
          </p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/40 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">Expired tracked</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {forgeSiteFacts.expiredCount}
          </p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/40 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest snapshot</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {forgeSiteFacts.latestSnapshotDate}
          </p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/40 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Avg monthly search
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {forgeSiteFacts.monthlySearchEstimate}
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Latest Active Preview
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Quick preview only. Open the full page to see complete context,
          source logs, and daily archive navigation.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {latestActivePreview.map((item) => (
            <div
              key={item.code}
              className="rounded-xl border border-orange-100 p-4 dark:border-orange-900/50"
            >
              <p className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                {item.code}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                {item.reward}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/the-forge-codes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
          >
            See full active/expired tables and recent code pages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/40 dark:bg-slate-950">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          <CalendarClock className="h-5 w-5 text-orange-500" />
          Start Here
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/the-forge-codes"
            className="rounded-xl border border-orange-100 p-4 transition hover:border-orange-300 hover:bg-orange-50/40 dark:border-orange-900/50 dark:hover:bg-orange-900/10"
          >
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Main Codes Hub
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Full daily-updating list and long-form guidance.
            </p>
          </Link>
          <Link
            href="/how-to-redeem-the-forge-codes"
            className="rounded-xl border border-orange-100 p-4 transition hover:border-orange-300 hover:bg-orange-50/40 dark:border-orange-900/50 dark:hover:bg-orange-900/10"
          >
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Redeem Guide
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Step-by-step flow for redemption on desktop and mobile.
            </p>
          </Link>
          <Link
            href="/the-forge-codes-faq"
            className="rounded-xl border border-orange-100 p-4 transition hover:border-orange-300 hover:bg-orange-50/40 dark:border-orange-900/50 dark:hover:bg-orange-900/10"
          >
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              FAQ & Fixes
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Common failure reasons and quick troubleshooting checks.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
