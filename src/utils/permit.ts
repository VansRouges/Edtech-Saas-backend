import { Permit } from 'permitio';

const permit = new Permit({
  pdp: 'https://cloudpdp.api.permit.io', // Default Permit.io PDP URL
  token: process.env.PERMIT_API_KEY, // Store your API key in .env
});

export default permit;
