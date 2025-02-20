"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permitio_1 = require("permitio");
// This line initializes the SDK and connects your Node.js app
// to the Permit.io PDP container you've set up in the previous step.
const permit = new permitio_1.Permit({
    // your API Key
    token: "permit_key_TLfne4MA2cfEdeYXoeBFA8pkpOmuKLvzTNC8aaSNVwWd4Wh10A9bpruKsAeM2xFmfZWvMozgiF4ammdol09aCZ", // Store your API key in .env
    // in production, you might need to change this url to fit your deployment
    pdp: 'https://cloudpdp.api.permit.io', // Default Permit.io PDP URL
    // if you want the SDK to emit logs, uncomment this:
    log: {
        level: "debug",
    },
    // The SDK returns false if you get a timeout / network error
    // if you want it to throw an error instead, and let you handle this, uncomment this:
    // throwOnError: true,
});
exports.default = permit;
