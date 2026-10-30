"use client";

import { useState, type FormEvent, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { fieldClasses } from "@/components/ui/fieldStyles";
import {
  chatLimits,
  readChatStream,
  trimChatHistory,
  type ChatMessage as ConversationMessage,
} from "@/lib/chat";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Message extends ConversationMessage {
  id: string;
  isError?: boolean;
}

const ChatMessage = dynamic(() => import("./ChatMessage"));

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  // Auto-scroll til bunnen når nye meldinger kommer
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus tilbake til input når AI-en er ferdig
  useEffect(() => {
    if (!isLoading && isOpen) {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen]);

  const clearChat = () => {
    if (confirm("Er du sikker på at du vil slette hele samtalen?")) {
      setMessages([]);
      setInput("");
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: crypto.randomUUID(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    const assistantId = crypto.randomUUID();

    const controller = new AbortController();
    requestRef.current = controller;
    // AbortSignal.any/timeout are missing in older Safari and Chrome.
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 45_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: trimChatHistory([
            ...messages.filter((m) => !m.isError && m.content.trim()),
            userMessage,
          ]).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            "Chatten er midlertidig utilgjengelig. Prøv igjen senere.",
        );
      }

      if (!response.body)
        throw new Error("Fikk ikke svar fra chatten. Prøv igjen.");
      let assistantMessage = "";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: assistantId },
      ]);
      for await (const text of readChatStream(response.body)) {
        assistantMessage += text;
        const content = assistantMessage;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, content } : message,
          ),
        );
      }
      if (!assistantMessage.trim())
        throw new Error("Fikk et tomt svar fra chatten. Prøv igjen.");
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return;
      const errorMessage = timedOut
        ? "Svaret tok for lang tid. Prøv igjen om litt."
        : error instanceof Error && !(error instanceof TypeError)
          ? error.message
          : "Beklager, noe gikk galt. Prøv igjen senere.";
      setMessages((prev) => [
        ...prev
          .filter((m) => m.id !== assistantId || m.content.trim())
          .map((m) => (m.id === assistantId ? { ...m, isError: true } : m)),
        {
          role: "assistant",
          content: errorMessage,
          id: crypto.randomUUID(),
          isError: true,
        },
      ]);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-accent hover:bg-accent-strong text-on-accent p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open chat with AI assistant"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat med Andreas AI"
          lang="no"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeChat();
          }}
          className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:bottom-6 sm:right-6 sm:w-[460px] h-[600px] max-h-[80dvh] bg-surface text-foreground rounded-lg shadow-2xl flex flex-col z-50 border border-border-control"
        >
          {/* Header */}
          <div className="bg-surface-raised border-b border-border p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Chat med Andreas AI</h3>
                <p className="text-xs text-muted">
                  Spør meg om Andreas sitt arbeid
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  disabled={isLoading}
                  className="hover:bg-surface rounded-full p-1 transition-colors"
                  aria-label="Clear chat history"
                  title="Slett samtale"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={closeChat}
                className="hover:bg-surface rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4 bg-background"
            aria-busy={isLoading}
          >
            {messages.length === 0 && (
              <div className="text-center text-muted mt-8">
                <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  Hei! Jeg er en AI-assistent.
                </p>
                <p className="text-xs mt-1">
                  Jeg kan svare på spørsmål om Andreas, hans prosjekter og
                  erfaring.
                </p>
                <p className="text-xs mt-2 italic">
                  ⚠️ Jeg er en AI, ikke Andreas selv
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`min-w-0 rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "max-w-[85%] bg-accent text-on-accent"
                      : "max-w-full bg-surface text-foreground border border-border"
                  }`}
                >
                  {message.role === "assistant" && !message.isError ? (
                    <ChatMessage content={message.content} />
                  ) : (
                    <p
                      className="text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]"
                      role={message.isError ? "alert" : undefined}
                    >
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface text-foreground border border-border rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-surface rounded-b-lg"
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv en melding..."
                className={`${fieldClasses} min-w-0 flex-1 rounded-full px-4`}
                disabled={isLoading}
                maxLength={chatLimits.user}
                aria-label="Melding til AI-assistenten"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-accent not-disabled:hover:bg-accent-strong text-on-accent p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
