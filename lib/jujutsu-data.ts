import snapshotStoreJson from "@/data/jujutsu-infinite/snapshots.json";

export type CodeStatus = "active" | "expired";

export type JujutsuCode = {
  code: string;
  reward: string;
  status: CodeStatus;
  lastTested: string;
  source: string;
  note?: string;
};

export type UpdateLogItem = {
  time: string;
  event: "added" | "expired" | "retested";
  code: string;
  summary: string;
};

export type JujutsuSourceHealth = {
  name: string;
  url: string;
  ok: boolean;
  fetchedAt: string;
  foundCodes: number;
  error?: string;
};

export type JujutsuDailySnapshot = {
  date: string;
  generatedAt: string;
  lastVerified: string;
  activeCodes: JujutsuCode[];
  expiredCodes: JujutsuCode[];
  updateLog: UpdateLogItem[];
  sources: JujutsuSourceHealth[];
};

type JujutsuSnapshotStore = {
  version: number;
  trackedKeywords?: number;
  monthlySearchEstimate?: string;
  snapshots: JujutsuDailySnapshot[];
};

const snapshotStore = snapshotStoreJson as JujutsuSnapshotStore;

const fallbackSnapshot: JujutsuDailySnapshot = {
  date: "2026-02-10",
  generatedAt: "2026-02-10T10:00:00.000Z",
  lastVerified: "February 10, 2026, 10:00 UTC",
  activeCodes: [],
  expiredCodes: [],
  updateLog: [],
  sources: [],
};

const sortedSnapshots = [...(snapshotStore.snapshots ?? [])].sort((a, b) =>
  a.date.localeCompare(b.date)
);

export const jujutsuDailySnapshots: JujutsuDailySnapshot[] =
  sortedSnapshots.length > 0 ? sortedSnapshots : [fallbackSnapshot];

export const jujutsuLatestSnapshot: JujutsuDailySnapshot =
  jujutsuDailySnapshots[jujutsuDailySnapshots.length - 1];

export const jujutsuRecentSnapshots = [...jujutsuDailySnapshots]
  .reverse()
  .slice(0, 30);

export const activeJujutsuCodes: JujutsuCode[] = jujutsuLatestSnapshot.activeCodes;
export const expiredJujutsuCodes: JujutsuCode[] = jujutsuLatestSnapshot.expiredCodes;
export const jujutsuUpdateLog: UpdateLogItem[] = jujutsuLatestSnapshot.updateLog;

export function getJujutsuSnapshotByDate(date: string): JujutsuDailySnapshot | null {
  return jujutsuDailySnapshots.find((item) => item.date === date) ?? null;
}

export function getJujutsuMonthSnapshots(monthPrefix: string): JujutsuDailySnapshot[] {
  return jujutsuDailySnapshots.filter((item) => item.date.startsWith(monthPrefix));
}

export const jujutsuSiteFacts = {
  lastVerified: jujutsuLatestSnapshot.lastVerified,
  activeCount: activeJujutsuCodes.length,
  expiredCount: expiredJujutsuCodes.length,
  trackedKeywords: snapshotStore.trackedKeywords ?? 1231,
  monthlySearchEstimate: snapshotStore.monthlySearchEstimate ?? "421K",
  latestSnapshotDate: jujutsuLatestSnapshot.date,
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type RedeemStep = {
  title: string;
  detail: string;
};

export const jujutsuRedeemSteps: RedeemStep[] = [
  {
    title: "Open Jujutsu Infinite in Roblox",
    detail:
      "Launch the game on PC or mobile and wait until your character fully loads.",
  },
  {
    title: "Open the Codes panel",
    detail:
      "Find the reward or gift icon in the UI. This is where to put codes in jujutsu infinite.",
  },
  {
    title: "Paste the code exactly",
    detail:
      "Enter the code with the same capitalization and symbols, then tap redeem.",
  },
  {
    title: "Confirm reward message",
    detail:
      "If the code is active, the reward appears instantly in your inventory or spin balance.",
  },
];

export const jujutsuTroubleshooting: FAQItem[] = [
  {
    question: "Why are jujutsu infinite codes not working for me?",
    answer:
      "Most failures come from expiration, wrong capitalization, or extra spaces when pasting.",
  },
  {
    question: "Can I redeem the same code twice?",
    answer:
      "No. Most jujutsu infinite codes are one-time use per account and will fail after redemption.",
  },
  {
    question: "How often do new codes for jujutsu infinite appear?",
    answer:
      "This site auto-collects updates from multiple public sources several times per day.",
  },
  {
    question: "Do jujutsu infinite roblox codes work on all devices?",
    answer:
      "Yes. The same code usually works on PC and mobile as long as your game build is current.",
  },
];

export const jujutsuFaq: FAQItem[] = [
  {
    question: "What are the latest jujutsu infinite codes right now?",
    answer:
      "Use the active table at the top of the page. Codes are auto-collected from public sources and updated daily.",
  },
  {
    question: "What is the difference between active and expired jujutsu infinite codes?",
    answer:
      "Active codes are currently marked as working by source consensus. Expired jujutsu infinite codes are repeatedly flagged as unavailable.",
  },
  {
    question: "How to redeem codes in jujutsu infinite quickly?",
    answer:
      "Open the code menu, paste the exact code, and redeem. The redeem guide section shows each step.",
  },
  {
    question: "Where to put codes in jujutsu infinite?",
    answer:
      "Enter them in the in-game codes box, not on Roblox catalog pages.",
  },
  {
    question: "Why keep expired codes for jujutsu infinite?",
    answer:
      "Keeping expired entries prevents repeated failed attempts and keeps historical transparency.",
  },
  {
    question: "How is this page different from other jujutsu infinite codes roblox pages?",
    answer:
      "This page keeps a date-by-date snapshot archive and rolls updates from multiple sources into one feed.",
  },
];

export type JujutsuNarrativeSubsection = {
  h3?: string;
  paragraphs: string[];
};

export type JujutsuNarrativeSection = {
  title: string;
  intro: string;
  subsections: JujutsuNarrativeSubsection[];
};

export const jujutsuKeywordNarrative: JujutsuNarrativeSection = {
  title: "Complete Guide to Jujutsu Infinite on Roblox",
  intro:
    "Everything you need to know about Jujutsu Infinite — from game mechanics and Spins to Innate Techniques and progression. Whether you are a new player or grinding for rare abilities, this guide covers the essentials.",
  subsections: [
    {
      h3: "What Is Jujutsu Infinite?",
      paragraphs: [
        "Jujutsu Infinite is a Roblox experience inspired by the popular anime and manga series Jujutsu Kaisen. Players explore an open world, unlock powerful Innate Techniques, train their Cursed Energy, and battle other players or NPCs. The game features a deep progression system where your combat style depends on the abilities you roll through the Spin mechanic.",
      ],
    },
    {
      h3: "How Spins Work in Jujutsu Infinite",
      paragraphs: [
        "Spins are the primary gacha mechanic in Jujutsu Infinite. Each Spin randomly assigns you an Innate Technique — the core ability that defines your combat playstyle. Techniques range from Common to Mythic rarity, with rarer techniques offering dramatically stronger movesets. Codes frequently reward free Spins, making them one of the most valuable resources in the game.",
      ],
    },
    {
      h3: "Understanding Innate Techniques and Rarity Tiers",
      paragraphs: [
        "Innate Techniques in Jujutsu Infinite mirror abilities from the Jujutsu Kaisen anime. Higher-rarity techniques like Domain Expansion variants, Limitless, and Cursed Speech are extremely powerful but have very low drop rates. The rarity tiers typically follow Common, Uncommon, Rare, Epic, Legendary, and Mythic — with Mythic abilities having less than 1% chance per Spin. This is why free Spin codes are so sought after by the community.",
      ],
    },
    {
      h3: "Cursed Energy and Combat System",
      paragraphs: [
        "Cursed Energy is the resource that powers your techniques in battle. As you level up and train, your Cursed Energy pool grows, allowing you to use stronger moves more frequently. The combat system combines melee attacks with technique-based specials, and skilled players can chain combos using their Innate Technique abilities. PvP arenas and boss fights are the primary endgame activities.",
      ],
    },
    {
      h3: "Yen Currency and In-Game Economy",
      paragraphs: [
        "Yen is the main in-game currency in Jujutsu Infinite. You earn Yen by defeating enemies, completing quests, and redeeming codes. Yen can be spent on Spins, cosmetics, and various upgrades from NPC shops throughout the game world. Some codes give direct Yen rewards, which let you buy additional Spins or gear without grinding.",
      ],
    },
    {
      h3: "Why Jujutsu Infinite Codes Matter for Progression",
      paragraphs: [
        "Codes are the fastest way to accelerate your progression in Jujutsu Infinite. A single code drop can give you multiple free Spins — chances to roll for Mythic-tier Innate Techniques that would otherwise require hours of Yen farming. Codes also grant XP boosts, Yen, and limited-time event rewards. Staying on top of active codes gives you a significant advantage, especially during game updates when developers release celebration codes.",
      ],
    },
    {
      h3: "Tips for New Jujutsu Infinite Players",
      paragraphs: [
        "If you are just starting out, redeem all available codes immediately for free Spins and Yen. Use your Spins to try for a strong Innate Technique before investing time in leveling. Focus on completing early quests to build up your Cursed Energy and learn the combat system. Join the official Discord server to stay informed about new codes, game updates, and community events.",
        "Bookmark this page and check back daily — we track every known code and update status multiple times per day so you never miss a free Spin or Yen drop.",
      ],
    },
  ],
};

export const jujutsuEditorialGuide: JujutsuNarrativeSection = {
  title: "Jujutsu Infinite Spin Strategy and Progression Guide",
  intro:
    "A practical guide to maximizing your Spins, choosing the right Innate Techniques, and progressing efficiently through Jujutsu Infinite.",
  subsections: [
    {
      h3: "How to Maximize Your Free Spins",
      paragraphs: [
        "Free Spins from codes are your best opportunity to land a high-rarity Innate Technique without spending Yen. The key strategy is simple: redeem every active code as soon as it drops. Codes can expire within hours during high-traffic events, and missing a 5-Spin code means losing five chances at a Mythic ability. Check this page daily, especially after game updates and milestone celebrations when developers typically release multiple codes at once.",
      ],
    },
    {
      h3: "Innate Technique Tier List Overview",
      paragraphs: [
        "Not all Innate Techniques are created equal. Mythic-tier abilities like Limitless and Malevolent Shrine dominate PvP and boss fights thanks to their wide area-of-effect and high damage multipliers. Legendary techniques such as Cursed Speech and Blood Manipulation offer strong utility with crowd control and sustain. For new players, even a Rare-tier technique can carry you through early content — do not feel pressured to reroll immediately if you land something decent on your first few Spins.",
      ],
    },
    {
      h3: "When to Save vs Spend Your Spins",
      paragraphs: [
        "A common mistake is burning all your Spins the moment you get them. Consider saving Spins for events that boost rare drop rates — Jujutsu Infinite occasionally runs limited-time events where Mythic and Legendary rates are doubled. If the game announces an upcoming rate-up event, hold your code-redeemed Spins until the event goes live. However, if you are a new player with a Common technique, spending Spins immediately to get any upgrade is usually the better choice.",
      ],
    },
    {
      h3: "Leveling and Cursed Energy Training",
      paragraphs: [
        "Once you have a technique you want to keep, focus on leveling your character and training Cursed Energy. Higher Cursed Energy lets you use more abilities per fight and unlocks advanced moves within your technique tree. The fastest way to level is to complete story quests while running an XP boost from codes. Combine code-granted XP boosts with high-level grinding zones for maximum efficiency.",
      ],
    },
    {
      h3: "PvP Tips for Jujutsu Infinite",
      paragraphs: [
        "PvP combat in Jujutsu Infinite rewards timing and combo knowledge over raw stats. Learn your technique's full combo chain and practice canceling into different moves. Melee attacks can be chained into technique specials for burst damage, and blocking at the right moment can open counterattack windows. Higher-rarity techniques have stronger PvP potential, but a skilled player with a Rare technique can outplay someone with a Legendary if their fundamentals are solid.",
      ],
    },
    {
      h3: "Boss Fights and PvE Content",
      paragraphs: [
        "Boss fights are the primary source of endgame rewards in Jujutsu Infinite. Each boss has specific attack patterns and weak phases that you need to learn. Bring a team for higher-difficulty bosses — some fights are designed for group play and are nearly impossible to solo without a Mythic technique. Code rewards like Yen and XP boosts make boss grinding more efficient, so always redeem before starting a boss run session.",
      ],
    },
    {
      h3: "Building Your Character for Endgame",
      paragraphs: [
        "Endgame progression in Jujutsu Infinite revolves around three pillars: your Innate Technique rarity, your Cursed Energy level, and your combat skill. Focus on getting the best technique you can through Spins, then train your Cursed Energy through repetitive combat practice. Join a clan or group for team content and share code information with your community. The strongest players are not just those with Mythic techniques — they are the ones who understand game mechanics deeply and stay consistent with daily code redemptions and training.",
      ],
    },
  ],
};

export const jujutsuOperationsManual: JujutsuNarrativeSection = {
  title: "Jujutsu Infinite Game Mechanics Deep Dive",
  intro:
    "An in-depth look at the core systems in Jujutsu Infinite — from the Spin gacha system and technique awakening to clan mechanics and seasonal events.",
  subsections: [
    {
      h3: "The Spin Gacha System Explained",
      paragraphs: [
        "The Spin system is the heart of character building in Jujutsu Infinite. Each Spin draws from a weighted pool of Innate Techniques, with rarity determining both power level and drop chance. Common techniques have roughly a 50% chance per Spin, while Mythic techniques sit below 0.5%. This means on average you need 200+ Spins to land a Mythic ability — which is exactly why free Spin codes are so valuable. Every code you miss is a lost opportunity at hitting those rare odds.",
      ],
    },
    {
      h3: "Technique Awakening and Skill Trees",
      paragraphs: [
        "Once you roll an Innate Technique, you can develop it further through the awakening system. As you gain experience and train your Cursed Energy, new moves unlock within your technique's skill tree. A fully awakened Mythic technique has access to its complete moveset including an ultimate ability. Even lower-rarity techniques become significantly stronger when fully awakened, so do not dismiss a Rare technique just because it is not Mythic — a fully awakened Rare can outperform an un-awakened Legendary in many situations.",
      ],
    },
    {
      h3: "Clans and Group Content",
      paragraphs: [
        "Jujutsu Infinite features a clan system where players can team up for group content. Clans unlock exclusive missions, boss raids, and territory control events. Being part of an active clan gives you access to shared resources and code information — clan members often share new codes in clan chat before they spread publicly. If you are serious about progression, joining a clan is one of the best moves you can make.",
      ],
    },
    {
      h3: "Seasonal Events and Limited-Time Codes",
      paragraphs: [
        "The developers of Jujutsu Infinite regularly run seasonal events tied to anime milestones, holidays, and player count achievements. These events often introduce limited-time Innate Techniques that cannot be obtained through regular Spins. Event codes are especially valuable because they may grant exclusive cosmetics, event-only currency, or boosted Spin rates. Events typically last one to two weeks, and their codes expire when the event ends — making it critical to redeem them quickly.",
      ],
    },
    {
      h3: "Understanding the Rarity System",
      paragraphs: [
        "Jujutsu Infinite uses a six-tier rarity system: Common, Uncommon, Rare, Epic, Legendary, and Mythic. Each tier has its own visual indicator and power ceiling. Common and Uncommon techniques are functional but lack the flashy movesets and damage scaling of higher tiers. Rare and Epic techniques are solid for mid-game content and PvP. Legendary techniques are elite-tier with strong area damage and utility. Mythic techniques are the pinnacle — they feature unique animations, devastating combos, and often reference iconic abilities from the Jujutsu Kaisen anime.",
      ],
    },
    {
      h3: "Yen Farming Strategies",
      paragraphs: [
        "Yen is essential for buying Spins, equipment, and consumables. The most efficient Yen farming methods include completing daily quests, grinding high-level mob zones, and participating in boss raids. Code-granted Yen provides a significant boost to your farming routine. For optimal efficiency, stack Yen farming with XP boost codes — this way you level up and earn currency simultaneously. Some players focus exclusively on boss raids for Yen since bosses drop large lump sums compared to regular enemies.",
      ],
    },
    {
      h3: "Code Release Patterns and When to Expect New Codes",
      paragraphs: [
        "Through tracking hundreds of code releases, we have identified common patterns. New codes typically drop during: game updates and patches, player count milestones (every 100K likes or visits), seasonal holidays, anime episode premieres, and developer streams. The most generous code drops happen during major game updates when developers want to attract returning players. Following the official Discord and social media accounts ensures you hear about codes within minutes of release.",
      ],
    },
    {
      h3: "Common Mistakes New Players Make",
      paragraphs: [
        "The biggest mistake new players make is spending all their Yen on cosmetics before securing a strong Innate Technique. Prioritize Spins over everything else in the early game. Another common error is ignoring Cursed Energy training — your technique is only as strong as the energy pool powering it. Finally, many new players skip codes because they do not know where to find them. Bookmark this page and check daily to ensure you never miss free Spins, Yen, or event rewards. A few minutes of code checking each day can save you hours of grinding.",
      ],
    },
  ],
};
