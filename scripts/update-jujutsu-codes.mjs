import fs from "node:fs/promises";
import path from "node:path";

const DATA_FILE = path.join(process.cwd(), "data", "jujutsu-infinite", "snapshots.json");

const SOURCE_DEFINITIONS = [
  { name: "tryhardguides", url: "https://tryhardguides.com/jujutsu-infinite-codes/", weight: 3 },
  { name: "beebom", url: "https://beebom.com/roblox-jujutsu-infinite-codes/", weight: 2 },
  { name: "dexerto", url: "https://www.dexerto.com/roblox/jujutsu-infinite-codes/", weight: 2 },
  { name: "pcgamer", url: "https://www.pcgamer.com/roblox/jujutsu-infinite-codes/", weight: 1 },
];

const FALLBACK_ACTIVE_CODES = [];

const CODE_PATTERN = /\b[A-Z0-9][A-Z0-9!_-]{4,19}\b/g;
const MAX_ACTIVE_CODES = 20;
const MAX_EXPIRED_CODES = 40;
const MAX_SNAPSHOTS = 180;
const MAX_OCCURRENCES_PER_SOURCE = 8;

const BLACKLIST = new Set([
  "ROBLOX",
  "CODES",
  "JUJUTSU",
  "INFINITE",
  "THE",
  "BETA",
  "FEBRUARY",
  "JANUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
  "UPDATED",
  "GUIDE",
  "GUIDES",
  "WORKING",
  "ACTIVE",
  "EXPIRED",
  "REWARDS",
  "REDEEM",
  "YOUTUBE",
  "TWITTER",
  "FACEBOOK",
  "DISCORD",
  "TRYHARD",
  "BEEBOM",
  "DEXERTO",
  "PCGAMER",
  "ADVERTISEMENT",
  "COPY",
  "LOGIN",
  "SIGNUP",
  "DOWNLOAD",
  "ARTICLE",
  "RELATED",
  "LATEST",
  "UPDATE",
  "UPDATEDON",
  "STATUS",
  "BROWSER",
  "MOBILE",
  "DESKTOP",
  "PRIVACY",
  "TERMS",
  "COOKIE",
  "CONTENT",
  "SOURCE",
  "SOURCES",
  "AUTOCOLLECTED",
  "HTTP",
  "HTTPS",
  "GAMING",
  "GAMES",
  "POLICY",
  "ABOUT",
  "ANIME",
  "COMMUNITY",
  "COMMENT",
  "REVIEWS",
  "REVIEW",
  "MOVIES",
  "GAMER",
  "CROSSWORD",
  "ITEMS",
  "RSQUO",
  "NDASH",
  "EXPIRES",
  "EXIST",
  "PROBABLY",
  "SPACE",
  "MEANS",
  "FORGE",
  "FORGED",
  "FORGER",
  "FORGERS",
]);

const ACTIVE_HINTS = ["ACTIVE", "WORKING", "NEW", "LATEST", "VALID", "REDEEM"];
const EXPIRED_HINTS = ["EXPIRED", "NOT WORKING", "NO LONGER", "INVALID"];

function toIsoDate(input) {
  return input.toISOString().slice(0, 10);
}

function formatUtcStamp(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
}

function formatReadableUtc(date) {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).replace(",", "") + " UTC";
}

function sanitizeToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelyGameCode(code) {
  if (code.length < 5 || code.length > 20) {
    return false;
  }
  if (BLACKLIST.has(code)) {
    return false;
  }
  if (/^\d+$/.test(code)) {
    return false;
  }
  if (!/[A-Z]/.test(code)) {
    return false;
  }
  if (/(.)\1{4,}/.test(code)) {
    return false;
  }
  if (/(HTTP|HTTPS|WWW|\.COM|\.NET|\.ORG)/.test(code)) {
    return false;
  }
  if (code.includes("__") || code.includes("--")) {
    return false;
  }
  const hasStrongSignal =
    /[0-9!]/.test(code) ||
    code.startsWith("JUJUTSU") ||
    code.startsWith("JJK") ||
    code.startsWith("JI") ||
    code.includes("SPIN") ||
    code.includes("CURSED") ||
    code.includes("DOMAIN") ||
    code.includes("YEN") ||
    code.includes("TECHNIQUE") ||
    code.includes("INNATE") ||
    code.includes("SORCERER") ||
    code.includes("CLAN") ||
    code.includes("EVENT") ||
    code.includes("UPDATE") ||
    code.includes("BOOST") ||
    code.includes("WEEKEND") ||
    code.includes("WINTER") ||
    code.includes("XMAS") ||
    code.includes("NEWYEAR") ||
    code.includes("RELAUNCH") ||
    code.includes("RELEASE") ||
    code.includes("FREESPIN") ||
    code.includes("LIKES") ||
    code.includes("VISITS");
  if (!hasStrongSignal) {
    return false;
  }
  return true;
}

function countHintHits(context, hints) {
  let score = 0;
  for (const hint of hints) {
    if (context.includes(hint)) {
      score += 1;
    }
  }
  return score;
}

function extractCodesFromText(text, sourceWeight) {
  const aggregate = new Map();
  const uppercaseText = text.toUpperCase();
  const occurrences = new Map();
  let match;

  CODE_PATTERN.lastIndex = 0;
  while ((match = CODE_PATTERN.exec(uppercaseText)) !== null) {
    const code = match[0].trim();
    if (!isLikelyGameCode(code)) {
      continue;
    }

    const seen = occurrences.get(code) ?? 0;
    if (seen >= MAX_OCCURRENCES_PER_SOURCE) {
      continue;
    }
    occurrences.set(code, seen + 1);

    const start = Math.max(0, match.index - 140);
    const end = Math.min(uppercaseText.length, match.index + code.length + 140);
    const context = uppercaseText.slice(start, end);
    const activeHits = countHintHits(context, ACTIVE_HINTS);
    const expiredHits = countHintHits(context, EXPIRED_HINTS);

    const existing = aggregate.get(code) ?? {
      activeScore: 0,
      expiredScore: 0,
      sourceCount: 0,
    };

    if (expiredHits > activeHits) {
      existing.expiredScore += sourceWeight * (expiredHits + 1);
    } else {
      existing.activeScore += sourceWeight * (activeHits + 1);
    }

    existing.sourceCount += 1;
    aggregate.set(code, existing);
  }

  return aggregate;
}

function pickCodesFromAggregate(aggregateMap) {
  const records = [...aggregateMap.entries()].map(([code, metrics]) => ({
    code,
    ...metrics,
  }));

  const active = records
    .filter((item) => item.activeScore >= item.expiredScore)
    .sort((a, b) => {
      if (b.sourceCount !== a.sourceCount) return b.sourceCount - a.sourceCount;
      if (b.activeScore !== a.activeScore) return b.activeScore - a.activeScore;
      return a.code.localeCompare(b.code);
    });

  const expired = records
    .filter((item) => item.expiredScore > item.activeScore)
    .sort((a, b) => {
      if (b.sourceCount !== a.sourceCount) return b.sourceCount - a.sourceCount;
      if (b.expiredScore !== a.expiredScore) return b.expiredScore - a.expiredScore;
      return a.code.localeCompare(b.code);
    });

  return {
    activeCodes: active.map((item) => item.code),
    expiredCodes: expired.map((item) => item.code),
  };
}

async function fetchSource(source, nowIso) {
  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; jujutsuinfinitecodes-bot/1.0; +https://jujutsuinfinitecodes.app)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const text = sanitizeToText(html);
    const parsedCodes = extractCodesFromText(text, source.weight);

    return {
      ...source,
      ok: true,
      fetchedAt: nowIso,
      parsedCodes,
      foundCodes: parsedCodes.size,
    };
  } catch (error) {
    return {
      ...source,
      ok: false,
      fetchedAt: nowIso,
      parsedCodes: new Map(),
      foundCodes: 0,
      error: error instanceof Error ? error.message : "unknown-error",
    };
  }
}

function createPreviousCodeLookup(snapshot) {
  const lookup = new Map();
  if (!snapshot) {
    return lookup;
  }

  for (const code of [...snapshot.activeCodes, ...snapshot.expiredCodes]) {
    lookup.set(code.code, code);
  }

  return lookup;
}

function buildCodeEntries({
  codes,
  status,
  previousLookup,
  sourceMap,
  timestamp,
}) {
  return codes.map((code) => {
    const previous = previousLookup.get(code);
    const sourceList = [...(sourceMap.get(code) ?? [])];

    return {
      code,
      reward: previous?.reward ?? "Reward not listed by source pages",
      status,
      lastTested: timestamp,
      source: sourceList.length > 0 ? sourceList.join(", ") : "Auto-collected",
      note:
        status === "active"
          ? "Auto-collected from public pages. Verify in-game before use."
          : undefined,
    };
  });
}

function buildUpdateLog({
  nowStamp,
  previousSnapshot,
  activeCodes,
  expiredCodes,
}) {
  const logs = [];
  const prevActive = new Set(previousSnapshot?.activeCodes.map((item) => item.code) ?? []);

  for (const item of activeCodes) {
    logs.push({
      time: nowStamp,
      event: prevActive.has(item.code) ? "retested" : "added",
      code: item.code,
      summary: prevActive.has(item.code)
        ? "Still listed as active in latest source refresh."
        : "Newly detected from latest source refresh.",
    });
  }

  for (const oldCode of prevActive) {
    if (activeCodes.some((item) => item.code === oldCode)) {
      continue;
    }
    if (!expiredCodes.some((item) => item.code === oldCode)) {
      continue;
    }

    logs.push({
      time: nowStamp,
      event: "expired",
      code: oldCode,
      summary: "Moved to expired after latest source refresh.",
    });
  }

  return logs.slice(0, 40);
}

async function readSnapshotStore() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    parsed.snapshots = Array.isArray(parsed.snapshots) ? parsed.snapshots : [];
    return parsed;
  } catch (error) {
    return {
      version: 1,
      trackedKeywords: 890,
      monthlySearchEstimate: "660K",
      snapshots: [],
    };
  }
}

async function writeSnapshotStore(store) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function mergeWithPreviousExpired(previousSnapshot, freshExpired, freshActive) {
  const activeSet = new Set(freshActive.map((item) => item.code));
  const merged = [...freshExpired];

  if (!previousSnapshot) {
    return merged;
  }

  for (const item of previousSnapshot.expiredCodes) {
    if (!isLikelyGameCode(item.code)) {
      continue;
    }
    if (activeSet.has(item.code)) {
      continue;
    }
    if (merged.some((entry) => entry.code === item.code)) {
      continue;
    }
    merged.push(item);
  }

  return merged;
}

async function main() {
  const now = new Date();
  const today = toIsoDate(now);
  const nowIso = now.toISOString();
  const nowStamp = formatUtcStamp(now);
  const readableStamp = formatReadableUtc(now);

  const store = await readSnapshotStore();
  const sortedSnapshots = [...store.snapshots].sort((a, b) => a.date.localeCompare(b.date));
  const previousSnapshot = sortedSnapshots[sortedSnapshots.length - 1];
  const previousLookup = createPreviousCodeLookup(previousSnapshot);

  const sourceResults = await Promise.all(
    SOURCE_DEFINITIONS.map((source) => fetchSource(source, nowIso))
  );

  const globalAggregate = new Map();
  const sourceMap = new Map();

  for (const source of sourceResults) {
    for (const [code, metrics] of source.parsedCodes.entries()) {
      const existing = globalAggregate.get(code) ?? {
        activeScore: 0,
        expiredScore: 0,
        sourceCount: 0,
      };
      existing.activeScore += metrics.activeScore;
      existing.expiredScore += metrics.expiredScore;
      existing.sourceCount += metrics.sourceCount;
      globalAggregate.set(code, existing);

      const codeSources = sourceMap.get(code) ?? new Set();
      codeSources.add(source.name);
      sourceMap.set(code, codeSources);
    }
  }

  const { activeCodes: rawActive, expiredCodes: rawExpired } =
    pickCodesFromAggregate(globalAggregate);

  let activeCandidates = rawActive.slice(0, MAX_ACTIVE_CODES);
  if (activeCandidates.length < 3) {
    const previousStrongCodes = (previousSnapshot?.activeCodes ?? [])
      .map((item) => item.code)
      .filter((code) => isLikelyGameCode(code));
    activeCandidates = [
      ...new Set([...activeCandidates, ...FALLBACK_ACTIVE_CODES, ...previousStrongCodes]),
    ].slice(0, MAX_ACTIVE_CODES);
  }

  const filteredExpiredCandidates = rawExpired
    .filter((code) => !activeCandidates.includes(code))
    .slice(0, MAX_EXPIRED_CODES);

  const activeEntries = buildCodeEntries({
    codes: activeCandidates,
    status: "active",
    previousLookup,
    sourceMap,
    timestamp: nowStamp,
  });

  const freshExpiredEntries = buildCodeEntries({
    codes: filteredExpiredCandidates,
    status: "expired",
    previousLookup,
    sourceMap,
    timestamp: nowStamp,
  });

  const expiredEntries = mergeWithPreviousExpired(
    previousSnapshot,
    freshExpiredEntries,
    activeEntries
  ).slice(0, MAX_EXPIRED_CODES);

  const updateLog = buildUpdateLog({
    nowStamp,
    previousSnapshot,
    activeCodes: activeEntries,
    expiredCodes: expiredEntries,
  });

  const newSnapshot = {
    date: today,
    generatedAt: nowIso,
    lastVerified: readableStamp,
    activeCodes: activeEntries,
    expiredCodes: expiredEntries,
    updateLog,
    sources: sourceResults.map((source) => ({
      name: source.name,
      url: source.url,
      ok: source.ok,
      fetchedAt: source.fetchedAt,
      foundCodes: source.foundCodes,
      ...(source.error ? { error: source.error } : {}),
    })),
  };

  const withoutToday = sortedSnapshots.filter((snapshot) => snapshot.date !== today);
  const nextSnapshots = [...withoutToday, newSnapshot]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-MAX_SNAPSHOTS);

  const nextStore = {
    version: store.version ?? 1,
    trackedKeywords: store.trackedKeywords ?? 890,
    monthlySearchEstimate: store.monthlySearchEstimate ?? "660K",
    snapshots: nextSnapshots,
  };

  await writeSnapshotStore(nextStore);

  const okSources = sourceResults.filter((source) => source.ok).length;
  console.log(
    `[jujutsu-update] ${today} active=${activeEntries.length} expired=${expiredEntries.length} okSources=${okSources}/${sourceResults.length}`
  );
}

await main();
