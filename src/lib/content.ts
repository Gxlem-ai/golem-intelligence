/**
 * Single source of truth for all marketing copy and structured data.
 * Keeping content here keeps the section components presentational and clean.
 */

export const nav = {
  brand: "Golem AI",
  links: [
    { label: "Why Golem", href: "#map" },
    { label: "The data", href: "#data" },
    { label: "Straight answers", href: "#honesty" },
  ],
  cta: { label: "Request a pilot", href: "#pilot" },
} as const;

export const hero = {
  eyebrow: "Independent AI for cannabis retail",
  titleLead: "Seed",
  titleMid: "Sale",
  titleAccent: "in natural language",
  lede: "Golem is an AI operations layer that sits across your register, your local market, and your compliance exposure — it answers any question about your store, shows you the source of every number, and acts only when you approve.",
  primaryCta: { label: "Request a pilot", href: "#pilot" },
  secondaryCta: { label: "See where we sit", href: "#map" },
  chips: [
    { label: "register · agnostic", tone: "leaf" as const },
    { label: "built for modern commerce", tone: "market" as const },
    {
      label: "execute / simulate · evidence-grounded",
      tone: "copper" as const,
    },
  ],
} as const;

export type ExchangeChip = {
  label: string;
  tone: "leaf" | "market" | "copper";
};

export const exchange = {
  title: "ASKGOLEM",
  userMessage:
    "What will I run out of before the 20th — and how am I priced against the shops near me?",
  golemMessage:
    "Three SKUs stock out by the 20th at current velocity. On the two you can reorder today, you're $7 above the nearest shop on Main St for the identical product.",
  highlight: "$7 above",
  chips: [
    { label: "your register · 10:42 AM", tone: "leaf" },
    { label: "4 local menus · today", tone: "market" },
  ] satisfies ExchangeChip[],
  approve: {
    text: "Draft reorder for 3 SKUs — ready for your review",
    pill: "Approve",
  },
  done: "✓ PO drafted · Slack alert sent",
} as const;

export const principles = [
  {
    title: "Independent",
    body: "We host no register and sell no POS. Golem can sit across all of them because our only customer is you.",
  },
  {
    title: "Grounded",
    body: "Every figure carries its source and timestamp. If a number is stale or estimated, the receipt says so — plainly.",
  },
  {
    title: "Approval-first",
    body: "Golem drafts the reorder, the alert, the price move. Nothing happens until you approve it in ten seconds.",
  },
] as const;

export const map = {
  eyebrow: "The map",
  title: "Every AI in cannabis fits on one picture. One corner is empty.",
  body: "Left to right: who the AI works for. Bottom to top: whether it just reports, or can act. The top-right corner isn't empty because nobody thought of it — it's empty because no POS vendor can enter it without competing with itself.",
  quadrants: {
    tl: "Acts · captive",
    tr: "Acts · independent",
    bl: "Read-only · captive",
    br: "Read-only · independent",
  },
  axis: {
    left: "← Captive to one POS",
    right: "Independent, cross-source →",
  },
  players: [
    {
      name: "Vendor AIs",
      note: "Vendor stores only",
      top: 14,
      left: 6,
      golem: false,
    },
    {
      name: "IndicaOnline AI",
      note: "IndicaOnline POS only",
      top: 33,
      left: 18,
      golem: false,
    },
    {
      name: "Budtender bots",
      note: "Consumer, not operator",
      top: 80,
      left: 6,
      golem: false,
    },
    {
      name: "CannMenus, Headset",
      note: "Market data, bring your own AI",
      top: 74,
      left: 56,
      golem: false,
    },
    {
      name: "Golem",
      note: "Acts, with receipts",
      top: 17,
      left: 64,
      golem: true,
    },
  ],
  notes: {
    title: "Why the corner stays empty",
    items: [
      {
        lead: "Vendor AIs like IndicaOnline ship real AI",
        rest: " — inside their own walls. Their assistants will never reason over a competitor's store, never flag their own platform's fees, never serve an owner who leaves. The AI exists to defend the POS.",
      },
      {
        lead: "Market-research providers like CannMenus are data companies.",
        rest: " Excellent market data, no store data, no actions, no one accountable for the answer. They're our supplier, not our rival.",
      },
      {
        lead: "Golem's seat is structural.",
        rest: " We host no register and sell no POS, so we can sit across all of them — and our only customer is you.",
      },
    ],
  },
} as const;

export const edges = {
  eyebrow: "The edge, ranked",
  title: "Three advantages.",
  body: "Most pitches lead with the flashiest claim. We rank ours by durability.",
  items: [
    {
      rank: "01",
      title: "Structural independence",
      body: "A POS vendor's AI cannot serve stores on rival systems, surface insights that cost its platform revenue, or follow you if you switch. Not won't — can't, without dismantling its own business. Golem has no such conflict, on any POS, ever.",
      aside: "It's a property of who we are, not what we built.",
    },
    {
      rank: "02",
      title: "Register-grade fusion",
      body: "Golem matches the market's messy menu listings to your exact SKUs, joins them to your real sales and margins, and audits every claim back to a source row. Every confirmed match and every real question makes the system sharper — an asset that compounds and can't be subscribed to.",
      aside: "Compounds with every question you ask.",
    },
    {
      rank: "03",
      title: "Named-neighbor pricing",
      body: 'Not "you\'re in the 70th percentile." The actual shops near you, by name, with their listed price on the products you both carry — and what the gap costs you at your real velocity. Possible because public menus were never confidential.',
      aside: "Real names, real prices, real velocity.",
    },
  ],
} as const;

export const tripod = {
  eyebrow: "The data tripod",
  title: "Three kinds of truth, under contract today.",
  body: "Every rival on the map holds exactly one of these. The questions that keep an owner up at night need all three at once.",
  legs: [
    {
      source: "Register",
      tone: "leaf" as const,
      title: "Your operational truth",
      body: "Your products, inventory, sales, and margins — full fidelity, straight from your POS, with your authorization. What's actually selling, how fast, and at what profit.",
      truthLead: "Private by design.",
      truthRest:
        " Your register data is yours. It is never aggregated into anyone else's market view.",
    },
    {
      source: "Market",
      tone: "market" as const,
      title: "Your neighborhood's truth",
      body: "Live menus across e-commerce platforms — not just one vendor's network. What every shop near you lists, charges, and stocks, updated continuously, named store by store.",
      truthLead: "Honestly labeled.",
      truthRest:
        " We show what competitors charge and stock — never what they sell. Nobody can see that, and anyone who claims to is making it up.",
    },
    {
      source: "Compliance",
      tone: "copper" as const,
      title: "Your regulatory truth",
      body: "Recalls and regulatory actions matched against your actual shelf, SKU by SKU — plus answers grounded in your state's regulations, with citations.",
      truthLead: "Pushed, not pulled.",
      truthRest:
        " A recall on your shelf finds you before a customer or an inspector does.",
    },
  ],
} as const;

export const honesty = {
  eyebrow: "Straight answers",
  title: "What Golem will never tell you",
  body: "In an industry full of vendors overselling AI, our sharpest feature is what we refuse to claim.",
  cards: [
    {
      strike: "competitor's sales numbers",
      prefix: "We will never show you a ",
      body: "Real sell-through lives behind each store's POS login. No outside party can see it — not us, not anyone. ",
      bold: "We show what they charge and stock, and we say so plainly.",
    },
    {
      strike: "number without a source",
      prefix: "We will never give you a ",
      body: "Every figure carries where it came from and when. If the data is stale, partial, or estimated, the receipt says so. ",
      bold: 'An honest "lower confidence" beats a confident guess.',
    },
    {
      strike: "act without your approval",
      prefix: "We will never ",
      body: "Golem drafts the reorder, the alert, the price move. Every action waits behind an approval you can read in ten seconds. ",
      bold: "You stay the operator. Golem stays the operator's brain.",
    },
    {
      strike: "feed your data to a platform",
      prefix: "We will never ",
      body: "Your register data trains no one else's benchmarks and pads no one else's network effect. ",
      bold: "It works for exactly one business: yours.",
    },
  ],
} as const;

export const cta = {
  eyebrow: "Founding pilots · Massachusetts",
  title: "The first AI in cannabis that works for the dispensary.",
  body: "We're onboarding a small group of Massachusetts founding pilots on their live store data this summer. If you run a dispensary and want an AI that answers to you — let's talk.",
  button: { label: "Request a pilot", href: "mailto:pilots@golem.ai" },
} as const;

export const footer = {
  left: "Golem AI · Massachusetts",
  right: "independent · grounded · approval-first",
} as const;
