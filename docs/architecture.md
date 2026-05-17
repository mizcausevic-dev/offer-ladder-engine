# Architecture

## Core idea

`offer-ladder-engine` models monetization through three linked views:
- audience-specific offer paths
- behavior-driven conversion branches
- session-level trust and intent signals

## Surface model

- overview
  - ladder count, conversion posture, revenue lift, branch health, and recommendation
- offer paths
  - segment, channel, entry offer, upsell, conversion, AOV, and health
- conversion branches
  - behavior triggers, next-best offers, revenue-per-session, and failure explanations
- verification
  - claims about monetization logic and session-aware branching

## Data model

- `OfferPath`
  - segment
  - UTM source
  - entry offer
  - upsell offer
  - fallback offer
  - landing path
  - conversion rate
  - average order value
  - revenue lift
  - health
  - explanation
- `ConversionBranch`
  - branch
  - trigger
  - next offer
  - observed conversion
  - revenue per session
  - health
  - explanation
- `SessionSignal`
  - session type
  - intent signal
  - recommended ladder
  - primary CTA
  - health
  - explanation

## Commercial value

The point is not just to display pricing options. The point is to show how different audience lanes should move through different commercial paths so revenue growth does not depend on one generic offer.
