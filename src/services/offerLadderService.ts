import { conversionBranches, offerPaths as offerPathData, sessionSignals as sessionSignalData } from "../data/sampleOffers";

export function summary() {
  const averageConversionPct = Math.round(
    offerPathData.reduce((total, path) => total + path.conversionRatePct, 0) / offerPathData.length
  );
  const averageRevenueLiftPct = Math.round(
    offerPathData.reduce((total, path) => total + path.revenueLiftPct, 0) / offerPathData.length
  );
  const healthyLadders = offerPathData.filter((path) => path.health === "healthy").length;
  const criticalBranches = conversionBranches.filter((branch) => branch.health === "critical").length;
  const topRevenuePerSessionUsd = Math.max(...conversionBranches.map((branch) => branch.revenuePerSessionUsd));

  return {
    ladderCount: offerPathData.length,
    averageConversionPct,
    averageRevenueLiftPct,
    healthyLadders,
    criticalBranches,
    topRevenuePerSessionUsd,
    recommendation:
      "Keep the referral and founder-led ladders high intent, but slow the cold social branch down before it absorbs more traffic than it can monetize."
  };
}

export function offerPaths() {
  return offerPathData;
}

export function conversionBranchLane() {
  return conversionBranches;
}

export function sessionSignals() {
  return sessionSignalData;
}

export function verification() {
  return [
    "Offer ladders are modeled with UTM source, entry offer, upsell path, fallback path, and commercial yield in one surface.",
    "Conversion branches connect behavior triggers to next-best offers so monetization decisions stay tied to session intent instead of guesswork.",
    "Session signals make it clear which audiences should accelerate toward revenue and which ones need a lighter trust-building path first."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    offerPaths: offerPaths(),
    conversionBranches: conversionBranchLane(),
    sessionSignals: sessionSignals(),
    verification: verification()
  };
}
