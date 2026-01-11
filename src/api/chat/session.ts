import { randomUUID } from 'crypto';

const SESSION_TTL_MS = 10 * 60 * 1000;
const sessionStore = new Map<string, number>();

const cleanupExpiredSessions = () => {
  const now = Date.now();
  for (const [token, expiresAt] of sessionStore.entries()) {
    if (expiresAt <= now) {
      sessionStore.delete(token);
    }
  }
};

export const createChatSession = (ttlMs: number = SESSION_TTL_MS): string => {
  cleanupExpiredSessions();
  const token = randomUUID();
  sessionStore.set(token, Date.now() + ttlMs);
  return token;
};

export const isChatSessionValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  cleanupExpiredSessions();
  const expiresAt = sessionStore.get(token);
  if (!expiresAt || expiresAt <= Date.now()) {
    sessionStore.delete(token);
    return false;
  }
  return true;
};

export const buildChatSessionCookie = (token: string, ttlMs: number = SESSION_TTL_MS): string => {
  const maxAge = Math.floor(ttlMs / 1000);
  const secureFlag = import.meta.env.PROD ? '; Secure' : '';
  return `chat_session=${token}; Path=/; Max-Age=${maxAge}; SameSite=Strict; HttpOnly${secureFlag}`;
};
