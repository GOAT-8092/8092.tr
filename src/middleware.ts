import { defineMiddleware } from 'astro:middleware';
import type { Language } from './lib/i18n';

export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  const url = new URL(request.url);
  const langMatch = url.pathname.match(/^\/([a-z]{2})\//);
  const lang: Language = (langMatch?.[1] as Language) || 'tr';

  // Set the language in locals
  locals.lang = lang;

  // Continue with the request
  return next();
});
