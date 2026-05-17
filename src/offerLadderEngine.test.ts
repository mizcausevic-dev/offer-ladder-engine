import { describe, expect, it } from "vitest";

import { conversionBranchLane, offerPaths, payload, sessionSignals, summary } from "./services/offerLadderService";

describe("offer-ladder-engine", () => {
  it("summary exposes monetization posture", () => {
    const result = summary();

    expect(result.ladderCount).toBeGreaterThan(0);
    expect(result.averageConversionPct).toBeGreaterThan(0);
    expect(result.recommendation).toContain("social");
  });

  it("offer paths and conversion branches stay commercially legible", () => {
    expect(offerPaths().length).toBeGreaterThan(1);
    expect(conversionBranchLane().some((branch) => branch.explanation.includes("offer"))).toBe(true);
    expect(sessionSignals().some((signal) => signal.primaryCta.includes("scorecard"))).toBe(true);
  });

  it("payload bundles the full monetization surface", () => {
    const result = payload();

    expect(result.dashboard.ladderCount).toBe(result.offerPaths.length);
    expect(result.conversionBranches.length).toBeGreaterThan(0);
    expect(result.sessionSignals.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
