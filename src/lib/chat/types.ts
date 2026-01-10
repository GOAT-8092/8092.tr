/**
 * Chat system type definitions
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  fileId: string;
  filename: string;
  index?: number;
  start?: number;
  end?: number;
  text?: string;
}

export interface ChatRequest {
  message: string;
  threadId?: string | null;
  language: 'tr' | 'en';
}

export interface ChatResponse {
  type: 'content' | 'citation' | 'thread_id' | 'error' | 'done';
  content?: string;
  citation?: Citation;
  threadId?: string;
  error?: string;
}

export interface ChatStreamEvent {
  event: string;
  data: ChatResponse;
}
