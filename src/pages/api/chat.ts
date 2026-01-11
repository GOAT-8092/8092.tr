/**
 * Chat API endpoint
 * POST /api/chat
 * Handles OpenAI Assistants API communication with SSE streaming
 */

import type { APIRoute } from 'astro';
import { AssistantManager } from '../../api/chat/assistants';
import type { ChatRequest } from '@/lib/chat/types';
import { buildCorsHeaders, isAllowedOrigin, isSameSiteRequest } from '@/api/chat/security';
import { isChatSessionValid } from '@/api/chat/session';

// Disable prerendering for API routes
export const prerender = false;

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const parseCookies = (cookieHeader: string | null): Record<string, string> => {
  if (!cookieHeader) {
    return {};
  }
  return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rawValue] = part.trim().split('=');
    if (!rawKey) {
      return acc;
    }
    acc[rawKey] = decodeURIComponent(rawValue.join('='));
    return acc;
  }, {});
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isSameSiteRequest(request) || !isAllowedOrigin(request)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      });
    }

    const cookies = parseCookies(request.headers.get('cookie'));
    const sessionToken = request.headers.get('x-chat-session');
    const cookieToken = cookies.chat_session;

    if (
      !sessionToken ||
      !cookieToken ||
      sessionToken !== cookieToken ||
      !isChatSessionValid(sessionToken)
    ) {
      return new Response(JSON.stringify({ error: 'Chat session expired' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      });
    }

    // Check rate limit
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...buildCorsHeaders(request),
        },
      });
    }

    // Parse request body
    const body = await request.json();
    const { message, threadId, language = 'tr' }: ChatRequest = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      });
    }

    if (!language || (language !== 'tr' && language !== 'en')) {
      return new Response(JSON.stringify({ error: 'Invalid language' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      });
    }

    // Get OpenAI API key from environment
    const apiKey = import.meta.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      });
    }

    // Initialize assistant manager
    const manager = new AssistantManager(apiKey);

    // Create or retrieve thread
    let thread;
    if (threadId) {
      try {
        thread = await manager.getThread(threadId);
      } catch {
        // Thread doesn't exist, create new one
        thread = await manager.createThread();
      }
    } else {
      thread = await manager.createThread();
    }

    // Add user message to thread
    await manager.addMessage(thread.id, message, language);

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send thread ID first
          const threadIdEvent = `data: ${JSON.stringify({
            type: 'thread_id',
            threadId: thread.id,
          })}\n\n`;
          controller.enqueue(encoder.encode(threadIdEvent));

          // Create run with streaming
          const runStream = await manager.createRun(thread.id);

          let fullContent = '';
          let currentRunId: string | null = null;

          for await (const event of runStream) {
            switch (event.event) {
              case 'thread.run.created':
                currentRunId = event.data.id;
                break;

              case 'thread.message.delta': {
                const content = event.data.delta.content?.[0];
                if (content?.type === 'text' && content.text?.value) {
                  const text = content.text.value;
                  fullContent += text;

                  const contentEvent = `data: ${JSON.stringify({
                    type: 'content',
                    content: text,
                  })}\n\n`;
                  controller.enqueue(encoder.encode(contentEvent));
                }
                break;
              }

              case 'thread.run.completed':
              case 'thread.run.failed': {
                // Try to extract citations when run completes
                if (currentRunId) {
                  try {
                    const citations = await manager.getCitations(currentRunId, thread.id);
                    if (citations.length > 0) {
                      for (const citation of citations) {
                        const citationEvent = `data: ${JSON.stringify({
                          type: 'citation',
                          citation,
                        })}\n\n`;
                        controller.enqueue(encoder.encode(citationEvent));
                      }
                    }
                  } catch (error) {
                    console.error('Error extracting citations:', error);
                  }
                }

                // Send done event
                const doneEvent = `data: ${JSON.stringify({
                  type: 'done',
                })}\n\n`;
                controller.enqueue(encoder.encode(doneEvent));
                break;
              }

              case 'thread.run.requires_action': {
                // Handle tool calls (file search is automatic, but other tools may need action)
                const run = event.data;
                if (run.required_action?.submit_tool_outputs?.tool_calls) {
                  const toolCalls = run.required_action.submit_tool_outputs.tool_calls;

                  // Submit tool outputs and continue streaming
                  const toolOutputs = toolCalls.map(tc => ({
                    tool_call_id: tc.id,
                    output: '',
                  }));

                  const continueStream = await manager.submitToolOutputs(
                    thread.id,
                    run.id,
                    toolOutputs
                  );

                  for await (const continueEvent of continueStream) {
                    if (continueEvent.event === 'thread.message.delta') {
                      const content = continueEvent.data.delta.content?.[0];
                      if (content?.type === 'text' && content.text?.value) {
                        const text = content.text.value;
                        fullContent += text;

                        const contentEvent = `data: ${JSON.stringify({
                          type: 'content',
                          content: text,
                        })}\n\n`;
                        controller.enqueue(encoder.encode(contentEvent));
                      }
                    }
                  }

                  const doneEvent = `data: ${JSON.stringify({
                    type: 'done',
                  })}\n\n`;
                  controller.enqueue(encoder.encode(doneEvent));
                }
                break;
              }

              case 'error': {
                const errorEvent = `data: ${JSON.stringify({
                  type: 'error',
                  error: event.data.message || 'An error occurred',
                })}\n\n`;
                controller.enqueue(encoder.encode(errorEvent));
                break;
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          const errorEvent = `data: ${JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
        ...buildCorsHeaders(request),
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request),
        },
      }
    );
  }
};

// Handle CORS preflight
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
