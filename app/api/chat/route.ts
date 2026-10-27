import Groq from "groq-sdk";
import { validateChat } from "@/lib/chat";
import { systemPrompt } from "@/lib/server/chat-prompt";
import {
  createRateLimiter,
  getClientIdentifier,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";
import { readJson, RequestError } from "@/lib/server/request";

const limitChat = createRateLimiter(5, 30_000);
const unavailable = "Chatten er midlertidig utilgjengelig. Prøv igjen senere.";

export async function POST(request: Request) {
  const limit = limitChat(getClientIdentifier(request));
  if (!limit.success) {
    return Response.json(
      { error: "For mange forespørsler. Prøv igjen om litt." },
      { status: 429, headers: rateLimitHeaders(limit) },
    );
  }
  try {
    const messages = validateChat(await readJson(request, 700_000));
    if (!messages)
      return Response.json(
        { error: "Ugyldig samtale eller for lange meldinger." },
        { status: 400 },
      );
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return Response.json({ error: unavailable }, { status: 503 });
    const groq = new Groq({ apiKey, timeout: 30_000, maxRetries: 1 });
    const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";
    const stream = await groq.chat.completions.create(
      {
        model,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.3,
        // Reasoning tokens count against this cap and are not forwarded, so keep
        // reasoning short and leave room for the visible answer.
        max_completion_tokens: 2048,
        ...(model.startsWith("openai/gpt-oss") && {
          reasoning_effort: "low" as const,
        }),
        stream: true,
      },
      { signal: request.signal },
    );
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
      cancel() {
        stream.controller.abort();
      },
    });
    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof RequestError)
      return Response.json({ error: error.message }, { status: error.status });
    console.error(
      "Chat API error:",
      error instanceof Groq.APIError ? error.status : "Unexpected error",
    );
    return Response.json(
      {
        error:
          error instanceof Groq.APIError && error.status === 429
            ? "AI-tjenesten er opptatt akkurat nå. Prøv igjen om litt."
            : unavailable,
      },
      { status: 503 },
    );
  }
}
