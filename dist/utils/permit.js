"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permitio_1 = require("permitio");
const permit = new permitio_1.Permit({
    pdp: 'https://cloudpdp.api.permit.io', // Default Permit.io PDP URL
    token: process.env.PERMIT_API_KEY, // Store your API key in .env
});
exports.default = permit;
