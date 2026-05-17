import { conversionBranchLane, offerPaths, sessionSignals, summary, verification } from "./offerLadderService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/offer-paths", label: "Offer Paths" },
    { href: "/conversion-branches", label: "Conversion Branches" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #0d1320;
        --panel: rgba(20, 26, 40, 0.92);
        --line: rgba(255, 195, 99, 0.16);
        --text: #f6f3ed;
        --muted: #b8b0a1;
        --accent: #ffb84f;
        --accent-strong: #ff7c66;
        --good: #39d98a;
        --watch: #f1bd55;
        --critical: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(255, 184, 79, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(255, 124, 102, 0.16), transparent 26%),
          linear-gradient(180deg, #0a101a 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line);
        background: rgba(12, 16, 26, 0.9); border-radius: 24px;
      }
      .brand { display: flex; gap: 14px; align-items: center; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
        color: #2c1405;
      }
      .eyebrow {
        margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em;
        text-transform: uppercase; color: #ffd18f;
      }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(21, 28, 42, 0.95); color: #f2e8d6; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(255, 184, 79, 0.96), rgba(255, 124, 102, 0.94));
        border-color: transparent; color: #281208; box-shadow: 0 10px 24px rgba(255, 146, 90, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(19, 25, 39, 0.96), rgba(15, 20, 31, 0.93));
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 950px;
        font-size: clamp(38px, 4.3vw, 60px); line-height: 1.01; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 20px; line-height: 1.5; color: #d3c9b7; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel); }
      .metric-label { color: #f3c98a; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(243, 201, 138, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #f3c98a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #f2ede4; font-size: 14px; line-height: 1.45; }
      .tag {
        display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px;
        font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      }
      .healthy { background: rgba(57, 217, 138, 0.15); color: var(--good); }
      .watch { background: rgba(241, 189, 85, 0.15); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.15); color: var(--critical); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #efe8db; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      code { background: rgba(21, 28, 42, 0.95); padding: 2px 6px; border-radius: 8px; }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">OL</div>
          <div>
            <p class="eyebrow">GTM Systems &amp; Growth</p>
            <h1 class="brand-title">Offer Ladder Engine</h1>
            <p class="brand-subtitle">Session-aware pricing paths, offer branching, and conversion yield in one operator view.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const signalList = sessionSignals()
    .map((signal) => `<li><strong>${signal.sessionType}</strong> — ${signal.explanation}</li>`)
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Offer Control Plane</p>
      <h1>Offer ladders should change with intent, trust, and channel quality instead of forcing one path on every buyer.</h1>
      <p>Model entry offers, upsells, fallback paths, and behavior-triggered branches so pricing architecture supports revenue growth instead of flattening it.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Ladders</div>
          <div class="metric-value">${stats.ladderCount}</div>
          <div class="metric-copy">Modeled pricing and offer paths across core audience lanes.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Avg Conversion</div>
          <div class="metric-value">${stats.averageConversionPct}%</div>
          <div class="metric-copy">Blended conversion rate across the active offer ladders.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Revenue Lift</div>
          <div class="metric-value">${stats.averageRevenueLiftPct}%</div>
          <div class="metric-copy">Average upside from using the right ladder instead of a flat pricing page.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Healthy Ladders</div>
          <div class="metric-value">${stats.healthyLadders}</div>
          <div class="metric-copy">Offer lanes currently matching audience intent with the right commercial next step.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Top Session Yield</div>
          <div class="metric-value">$${stats.topRevenuePerSessionUsd}</div>
          <div class="metric-copy">Highest modeled revenue per session from a behavior-triggered conversion branch.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to fix first</h2>
          <p class="section-copy">${stats.recommendation}</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Session Signals</p>
          <h2 class="section-title">Where pricing and trust should diverge</h2>
          <ul class="clean">${signalList}</ul>
        </article>
      </div>
    </section>`;

  return layout("Offer Ladder Engine", "/", body);
}

export function renderOfferPaths() {
  const rows = offerPaths()
    .map(
      (path) => `
      <tr>
        <td>${path.segment}</td>
        <td>${path.utmSource}</td>
        <td>${path.entryOffer}</td>
        <td>${path.upsellOffer}</td>
        <td>${path.conversionRatePct}%</td>
        <td>$${path.averageOrderValueUsd}</td>
        <td><span class="tag ${path.health}">${path.health}</span></td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Offer Paths</p>
      <h1>Every acquisition channel deserves its own first offer, escalation path, and fallback motion.</h1>
      <p>This lane shows which audience segments are monetizing through the right structure and which ones are getting pushed into offers that arrive too heavy or too early.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Offer Path Matrix</p>
        <h2 class="section-title">Entry offer, upsell, and yield by audience lane.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>UTM</th>
              <th>Entry Offer</th>
              <th>Upsell</th>
              <th>Conversion</th>
              <th>AOV</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Offer Ladder Engine - Offer Paths", "/offer-paths", body);
}

export function renderConversionBranches() {
  const branchRows = conversionBranchLane()
    .map(
      (branch) => `
      <tr>
        <td>${branch.branch}</td>
        <td>${branch.trigger}</td>
        <td>${branch.nextOffer}</td>
        <td>${branch.observedConversionPct}%</td>
        <td>$${branch.revenuePerSessionUsd}</td>
        <td><span class="tag ${branch.health}">${branch.health}</span></td>
        <td>${branch.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Conversion Branches</p>
      <h1>Behavior should decide the next offer, not just the channel that delivered the visit.</h1>
      <p>This surface turns session triggers into next-best commercial moves so conversion logic can follow intent instead of treating all traffic as equally ready.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Branch Matrix</p>
        <h2 class="section-title">Trigger, next offer, and yield by conversion branch.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Trigger</th>
              <th>Next Offer</th>
              <th>Conversion</th>
              <th>Yield</th>
              <th>Health</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>${branchRows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Offer Ladder Engine - Conversion Branches", "/conversion-branches", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves monetization should branch with behavior, not collapse into one static pricing path.</h1>
      <p>The point is not just displaying offers. The point is connecting acquisition source, trust level, and session behavior to commercial next steps that preserve conversion yield.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Offer Ladder Engine - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a monetization control plane for Growth, RevOps, and pricing-aware demand teams.</h1>
      <p>This repo combines audience lanes, offer branches, and session signals so teams can see why some offers accelerate revenue and others quietly flatten it.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and monetization posture</li>
            <li><code>/offer-paths</code> audience and pricing ladder view</li>
            <li><code>/conversion-branches</code> behavior-triggered offer routing view</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/offer-paths</code></li>
            <li><code>/api/conversion-branches</code></li>
            <li><code>/api/session-signals</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Offer Ladder Engine - Docs", "/docs", body);
}
