import { payload, summary } from "../src/services/offerLadderService";

console.log("offer-ladder-engine demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().offerPaths, null, 2));
