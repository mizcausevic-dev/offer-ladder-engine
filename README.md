# Offer Ladder Engine

Board-ready offer sequencing surface for session-aware pricing ladders, conversion branching, and revenue-yield posture.

- Live target: [http://offers.kineticgain.com/](http://offers.kineticgain.com/)
- Repo: [mizcausevic-dev/offer-ladder-engine](https://github.com/mizcausevic-dev/offer-ladder-engine)

## Why this exists

One pricing page is almost never the right pricing system:
- partner referrals can absorb a high-intent offer immediately
- paid traffic often needs a lighter first transaction before trust exists
- organic research traffic converts better when proof comes before pitch
- social curiosity gets burned when the ladder jumps straight to a sales call

`offer-ladder-engine` keeps those dynamics visible in one operator-facing surface so Growth, RevOps, and monetization teams can see which ladders are compounding revenue and which ones are flattening it.

## Routes

- `/`
- `/offer-paths`
- `/conversion-branches`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/offer-paths`
- `/api/conversion-branches`
- `/api/session-signals`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Offer paths](./screenshots/02-offer-paths-proof.png)
![Conversion branches](./screenshots/03-conversion-branches-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd offer-ladder-engine
npm install
npm run verify
npm run prerender
npm run render:assets
```

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
