// Quick script to verify environment variables
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

config({ path: envPath });

console.log('Environment Variables Check');
console.log('===========================');
console.log('PUBLIC_PORTAL_PASS:', process.env.PUBLIC_PORTAL_PASS);
console.log('PORTAL_PASS:', process.env.PORTAL_PASS);
console.log('');
console.log('Astro expects: PUBLIC_PORTAL_PASS');
console.log('Current value:', process.env.PUBLIC_PORTAL_PASS || '(not set)');
