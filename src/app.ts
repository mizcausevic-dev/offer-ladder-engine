import express from "express";

import {
  conversionBranchLane,
  offerPaths,
  payload,
  sessionSignals,
  summary,
  verification
} from "./services/offerLadderService";
import {
  renderConversionBranches,
  renderDocs,
  renderOfferPaths,
  renderOverview,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5310);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/offer-paths", (_req, res) => res.type("html").send(renderOfferPaths()));
app.get("/conversion-branches", (_req, res) => res.type("html").send(renderConversionBranches()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/offer-paths", (_req, res) => res.json(offerPaths()));
app.get("/api/conversion-branches", (_req, res) => res.json(conversionBranchLane()));
app.get("/api/session-signals", (_req, res) => res.json(sessionSignals()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Offer Ladder Engine listening on http://127.0.0.1:${port}`);
  });
}

export default app;
