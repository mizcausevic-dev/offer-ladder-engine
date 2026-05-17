export type Health = "healthy" | "watch" | "critical";

export interface OfferPath {
  segment: string;
  utmSource: string;
  entryOffer: string;
  upsellOffer: string;
  fallbackOffer: string;
  landingPath: string;
  conversionRatePct: number;
  averageOrderValueUsd: number;
  revenueLiftPct: number;
  health: Health;
  explanation: string;
}

export interface ConversionBranch {
  branch: string;
  trigger: string;
  nextOffer: string;
  observedConversionPct: number;
  revenuePerSessionUsd: number;
  health: Health;
  explanation: string;
}

export interface SessionSignal {
  sessionType: string;
  intentSignal: string;
  recommendedLadder: string;
  primaryCta: string;
  health: Health;
  explanation: string;
}

export const offerPaths: OfferPath[] = [
  {
    segment: "Founder-led B2B inbound",
    utmSource: "linkedin",
    entryOffer: "Free revenue architecture teardown",
    upsellOffer: "GTM systems sprint",
    fallbackOffer: "Diagnostic audit only",
    landingPath: "/founder/revenue-systems",
    conversionRatePct: 18,
    averageOrderValueUsd: 6800,
    revenueLiftPct: 29,
    health: "healthy",
    explanation:
      "Founder-led visitors convert best when the first offer feels advisory, then graduates into implementation once trust is established."
  },
  {
    segment: "Paid search operator",
    utmSource: "google-cpc",
    entryOffer: "Traffic integrity audit",
    upsellOffer: "Fraud + analytics hardening retainer",
    fallbackOffer: "Checklist download",
    landingPath: "/traffic-integrity/audit",
    conversionRatePct: 11,
    averageOrderValueUsd: 5400,
    revenueLiftPct: 21,
    health: "watch",
    explanation:
      "Paid traffic still converts, but the ladder gets weaker when pricing appears before the threat and attribution problem are framed clearly."
  },
  {
    segment: "SEO and content ops lead",
    utmSource: "organic",
    entryOffer: "AEO readiness scorecard",
    upsellOffer: "Answer-surface governance package",
    fallbackOffer: "Email course",
    landingPath: "/aeo-governance/scorecard",
    conversionRatePct: 14,
    averageOrderValueUsd: 6100,
    revenueLiftPct: 25,
    health: "healthy",
    explanation:
      "Organic sessions convert better when the ladder moves from self-assessment to governance help without forcing a premature sales call."
  },
  {
    segment: "Warm partner referral",
    utmSource: "partner",
    entryOffer: "Private strategy session",
    upsellOffer: "90-day operating buildout",
    fallbackOffer: "Async roadmap review",
    landingPath: "/partner/strategy-session",
    conversionRatePct: 26,
    averageOrderValueUsd: 9200,
    revenueLiftPct: 34,
    health: "healthy",
    explanation:
      "Referral traffic tolerates a higher-commitment ladder because trust arrives before the landing page does."
  },
  {
    segment: "Cold social curiosity",
    utmSource: "instagram",
    entryOffer: "Operator playbook",
    upsellOffer: "Office hours bundle",
    fallbackOffer: "Newsletter",
    landingPath: "/growth/playbook",
    conversionRatePct: 4,
    averageOrderValueUsd: 1700,
    revenueLiftPct: 8,
    health: "critical",
    explanation:
      "Low-intent social visitors need a slower ladder. Asking for a strategy call too early compresses both conversion and trust."
  }
];

export const conversionBranches: ConversionBranch[] = [
  {
    branch: "High-intent UTM + return session",
    trigger: "utm_campaign contains revops and session_count > 1",
    nextOffer: "Book paid diagnostic",
    observedConversionPct: 31,
    revenuePerSessionUsd: 214,
    health: "healthy",
    explanation:
      "Repeat sessions from explicit GTM problem framing tolerate the fastest path to a paid offer."
  },
  {
    branch: "Pricing hover with no CTA click",
    trigger: "pricing_viewed and cta_click = false",
    nextOffer: "Send comparison worksheet",
    observedConversionPct: 13,
    revenuePerSessionUsd: 74,
    health: "watch",
    explanation:
      "This branch works only when the worksheet reframes value. A generic follow-up email turns curiosity into drop-off."
  },
  {
    branch: "Threat signal traffic",
    trigger: "utm_source = google-cpc and scorecard_completed = true",
    nextOffer: "Traffic integrity sprint",
    observedConversionPct: 19,
    revenuePerSessionUsd: 156,
    health: "healthy",
    explanation:
      "Threat-aware sessions monetize well when the next offer is a contained sprint, not a broad transformation package."
  },
  {
    branch: "Low-intent content binge",
    trigger: "3+ articles and no offer interaction",
    nextOffer: "Newsletter plus case-study ladder",
    observedConversionPct: 6,
    revenuePerSessionUsd: 19,
    health: "critical",
    explanation:
      "The current branch harvests attention but not qualified demand. It needs a clearer bridge from learning to commercial action."
  }
];

export const sessionSignals: SessionSignal[] = [
  {
    sessionType: "Operator with immediate problem",
    intentSignal: "lands from named campaign and consumes pricing before docs",
    recommendedLadder: "Diagnostic -> sprint -> retainer",
    primaryCta: "Book a diagnostic",
    health: "healthy",
    explanation: "Fast-moving sessions want a scoped commercial next step, not a generic discovery call."
  },
  {
    sessionType: "Research-first evaluator",
    intentSignal: "reads docs, examples, and verification before pricing",
    recommendedLadder: "Scorecard -> audit -> implementation",
    primaryCta: "Start the scorecard",
    health: "healthy",
    explanation: "Trust grows when proof comes before pitch."
  },
  {
    sessionType: "Low-trust paid click",
    intentSignal: "short dwell, pricing glance, exit on first session",
    recommendedLadder: "Checklist -> workshop -> audit",
    primaryCta: "Download the checklist",
    health: "watch",
    explanation: "This audience needs a lighter first transaction before a strategic engagement feels credible."
  }
];
