/**
 * React Chat Widget Component
 * Provides a floating chat interface with streaming responses
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message, Citation, MessageRole } from '@/lib/chat/types';

interface ChatWidgetProps {
  initialLanguage?: 'tr' | 'en';
  assistantId?: string;
}

interface ChatResponseEvent {
  type: 'content' | 'citation' | 'thread_id' | 'error' | 'done';
  content?: string;
  citation?: Citation;
  threadId?: string;
  error?: string;
}

export default function ChatWidget({
  initialLanguage = 'tr',
  assistantId = 'asst_v1gZYfAo9yWmfOVetaZkMf1n',
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'tr' | 'en'>(initialLanguage);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [currentCitations, setCurrentCitations] = useState<Citation[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionRequestRef = useRef<Promise<string> | null>(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'system',
      content:
        language === 'tr'
          ? 'Merhaba! 👋 Ben FRC 2026 REBUILT sezonu için eğitilmiş bir yapay zeka asistanıyım. Oyun kılavuzu, FIRST kuralları ve teknik detaylar hakkında sorularınızı yanıtlamak için buradayım.'
          : 'Hello! 👋 I am an AI assistant trained for the FRC 2026 REBUILT season. I am here to answer your questions about the game manual, FIRST rules, and technical details.',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const fetchChatSession = useCallback(async () => {
    if (sessionRequestRef.current) {
      return sessionRequestRef.current;
    }

    sessionRequestRef.current = (async () => {
      const response = await fetch('/api/chat-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error('Session request failed');
      }

      const data = await response.json();
      if (!data?.token) {
        throw new Error('Session token missing');
      }

      setSessionToken(data.token);
      return data.token;
    })();

    try {
      return await sessionRequestRef.current;
    } finally {
      sessionRequestRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchChatSession().catch((error) => {
      console.error('Failed to initialize chat session:', error);
    });
  }, [fetchChatSession]);

  // Filter out reasoning sections from assistant responses
  const filterResponseContent = (content: string): string => {
    // Remove the "### Reasoning:" section and everything up to "### Conclusion:"
    const reasoningRegex = /###\s*Reasoning:.*?(?=###\s*Conclusion:|$)/gs;
    let filtered = content.replace(reasoningRegex, '');

    // Remove "### Conclusion:" header but keep the content after it
    const conclusionRegex = /###\s*Conclusion:\s*/gs;
    filtered = filtered.replace(conclusionRegex, '');

    // Clean up extra whitespace
    filtered = filtered.trim().replace(/^\n+/, '');

    return filtered;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentCitations([]);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const ensureSessionToken = async () => {
        if (sessionToken) {
          return sessionToken;
        }
        return fetchChatSession();
      };

      const sendChatRequest = async (token: string) => {
        return fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Chat-Session': token,
          },
          body: JSON.stringify({
            message: userMessage.content,
            threadId,
            language,
          }),
          signal: abortControllerRef.current.signal,
          credentials: 'same-origin',
        });
      };

      let token = await ensureSessionToken();
      let response = await sendChatRequest(token);

      if (response.status === 401) {
        token = await fetchChatSession();
        response = await sendChatRequest(token);
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let assistantContent = '';
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data: ChatResponseEvent = JSON.parse(line.slice(6));

              switch (data.type) {
                case 'thread_id':
                  if (data.threadId) {
                    setThreadId(data.threadId);
                  }
                  break;

                case 'content':
                  if (data.content) {
                    assistantContent += data.content;
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessage.id
                          ? { ...msg, content: assistantContent }
                          : msg
                      )
                    );
                  }
                  break;

                case 'citation':
                  if (data.citation) {
                    setCurrentCitations((prev) => [...prev, data.citation!]);
                  }
                  break;

                case 'error':
                  console.error('Chat error:', data.error);
                  setMessages((prev) => [
                    ...prev.slice(0, -1),
                    {
                      id: `error-${Date.now()}`,
                      role: 'system',
                      content:
                        language === 'tr'
                          ? `Bir hata oluştu: ${data.error}`
                          : `An error occurred: ${data.error}`,
                      timestamp: new Date(),
                    },
                  ]);
                  break;

                case 'done':
                  // Stream completed
                  break;
              }
            } catch (parseError) {
              // Ignore incomplete JSON chunks
              console.debug('Parse error (expected):', parseError);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, do nothing
        return;
      }

      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'system',
          content:
            language === 'tr'
              ? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
              : 'An error occurred. Please try again later.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setThreadId(null);
    setCurrentCitations([]);
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'system',
      content:
        language === 'tr'
          ? 'Merhaba! 👋 Ben FRC 2026 REBUILT sezonu için eğitilmiş bir yapay zeka asistanıyım. Oyun kılavuzu, FIRST kuralları ve teknik detaylar hakkında sorularınızı yanıtlamak için buradayım.'
          : 'Hello! 👋 I am an AI assistant trained for the FRC 2026 REBUILT season. I am here to answer your questions about the game manual, FIRST rules, and technical details.',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setInput('');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
  };

  const getMessageStyle = (role: MessageRole) => {
    switch (role) {
      case 'user':
        return 'bg-gradient-to-r from-[#512f75] to-[#673a8e] text-white rounded-2xl rounded-tr-sm';
      case 'assistant':
        return 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm';
      case 'system':
        return 'bg-blue-50 text-blue-900 rounded-lg text-sm';
      default:
        return 'bg-gray-100 text-gray-800 rounded-lg';
    }
  };

  const getMessageIcon = (role: MessageRole) => {
    switch (role) {
      case 'user':
        return '<i class="fas fa-user"></i>';
      case 'assistant':
        return '<i class="fas fa-robot"></i>';
      case 'system':
        return '<i class="fas fa-info-circle"></i>';
      default:
        return '';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#512f75] to-[#673a8e] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        aria-label={language === 'tr' ? 'Sohbeti aç' : 'Open chat'}
      >
        <i className="fas fa-comments text-2xl"></i>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
        isMinimized ? 'w-80' : 'w-96 max-w-[calc(100vw-3rem)]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#512f75] to-[#673a8e] text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-semibold">
                {language === 'tr' ? 'FRC 2026 Asistanı' : 'FRC 2026 Assistant'}
              </h3>
              <p className="text-xs text-white/80">
                {language === 'tr' ? 'AI destekli' : 'AI Powered'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 bg-white/20 rounded-lg text-xs font-medium hover:bg-white/30 transition"
              title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded-lg transition"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              <i className={`fas fa-chevron-${isMinimized ? 'up' : 'down'}`}></i>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition"
              title={language === 'tr' ? 'Kapat' : 'Close'}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`max-w-[80%] ${getMessageStyle(msg.role)} px-4 py-2`}>
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 text-xs opacity-70"
                      dangerouslySetInnerHTML={{ __html: getMessageIcon(msg.role) }}
                    />
                    <div className={`flex-1 prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="text-sm leading-relaxed mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside text-sm mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside text-sm mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          code: ({node, inline, ...props}) => inline
                            ? <code className="bg-gray-200 px-1 py-0.5 rounded text-xs" {...props} />
                            : <code className="block bg-gray-200 p-2 rounded text-xs my-2" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-3 italic text-xs" {...props} />,
                        }}
                      >
                        {msg.role === 'assistant' ? filterResponseContent(msg.content) : msg.content}
                      </ReactMarkdown>
                      <span className="text-xs opacity-60 mt-2 block">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Citations */}
            {currentCitations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <i className="fas fa-bookmark text-blue-600 text-sm"></i>
                  <p className="text-xs font-semibold text-blue-800">
                    {language === 'tr' ? 'Kaynaklar:' : 'Sources:'}
                  </p>
                </div>
                {currentCitations.map((cit, i) => (
                  <div
                    key={i}
                    className="text-xs text-blue-700 flex items-start gap-2"
                  >
                    <span className="text-blue-400">•</span>
                    <span>{cit.filename}</span>
                  </div>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {language === 'tr' ? 'Düşünüyorum...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === 'tr' ? 'Bir soru sorun...' : 'Ask a question...'
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#512f75] focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-[#512f75] to-[#673a8e] text-white rounded-lg hover:from-[#673a8e] hover:to-[#7e46a8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                title={language === 'tr' ? 'Gönder' : 'Send'}
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
              <button
                type="button"
                onClick={clearChat}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                title={language === 'tr' ? 'Sohbeti temizle' : 'Clear chat'}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
