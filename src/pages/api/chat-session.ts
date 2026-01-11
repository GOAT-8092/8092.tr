/**
 * Chat session bootstrap endpoint
 * POST /api/chat-session
 * Issues a short-lived session token for chat requests
 */

import type { APIRoute } from 'astro';
import { buildCorsHeaders, isAllowedOrigin, isSameSiteRequest } from '@/api/chat/security';
import { buildChatSessionCookie, createChatSession } from '@/api/chat/session';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!isSameSiteRequest(request) || !isAllowedOrigin(request)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        ...buildCorsHeaders(request),
      },
    });
  }

  const token = createChatSession();
  const cookie = buildChatSessionCookie(token);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Set-Cookie': cookie,
      ...buildCorsHeaders(request),
    },
  });
};

export const OPTIONS: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: {
      ...buildCorsHeaders(request),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Chat-Session',
    },
  });
};
