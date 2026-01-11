const DEFAULT_ALLOWED_ORIGINS = new Set<string>(['http://localhost:4321', 'http://127.0.0.1:4321']);

const getAllowedOrigins = (requestUrl: string): Set<string> => {
  const allowed = new Set(DEFAULT_ALLOWED_ORIGINS);
  const siteUrl = import.meta.env.PUBLIC_SITE_URL;
  if (siteUrl) {
    allowed.add(siteUrl);
  }
  try {
    allowed.add(new URL(requestUrl).origin);
  } catch {
    // Ignore invalid request URLs.
  }
  return allowed;
};

export const isSameSiteRequest = (request: Request): boolean => {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (!fetchSite) {
    return true;
  }
  return fetchSite === 'same-origin' || fetchSite === 'same-site';
};

export const isAllowedOrigin = (request: Request): boolean => {
  const origin = request.headers.get('origin');
  if (!origin) {
    return false;
  }
  const allowedOrigins = getAllowedOrigins(request.url);
  return allowedOrigins.has(origin);
};

export const buildCorsHeaders = (request: Request): Record<string, string> => {
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins(request.url);
  const allowOrigin = origin && allowedOrigins.has(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    Vary: 'Origin',
  };
};
