import { Resend } from "resend";
import { site } from "@/data/site";
import { checkContactBot, validateContact } from "@/lib/contact";
import {
  createRateLimiter,
  getClientIdentifier,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";
import { readJson, RequestError } from "@/lib/server/request";

const limitContact = createRateLimiter(5, 60_000, "contact");

export async function POST(request: Request) {
  const limit = await limitContact(getClientIdentifier(request));
  if (!limit.success) {
    return Response.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) },
    );
  }
  try {
    const body = await readJson(request, 16_384);
    const input = validateContact(body);
    if (!input.success)
      return Response.json(
        { success: false, message: input.error },
        { status: 400 },
      );
    const bot = checkContactBot(body);
    // Autofill can fill the honeypot for a real visitor, so never report success
    // for a message that was dropped. Point them to the email address instead.
    if (bot === "honeypot")
      return Response.json(
        {
          success: false,
          message:
            "Your message could not be sent. Please use the email address on this page.",
        },
        { status: 400 },
      );
    if (bot === "too-fast")
      return Response.json(
        {
          success: false,
          message: "That was very fast. Please wait a moment and try again.",
        },
        { status: 400 },
      );
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        {
          success: false,
          message:
            "Email is temporarily unavailable. Please use the email address or LinkedIn link on this page.",
        },
        { status: 503 },
      );
    }
    const { name, email, message } = input.data;
    const { data, error } = await new Resend(apiKey).emails.send({
      from: process.env.EMAIL_FROM || `noreply@${new URL(site.url).hostname}`,
      to: process.env.EMAIL_TO || site.email,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      // Plain text preserves the visitor's message without interpreting submitted HTML.
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error || !data?.id) {
      console.error(
        "Contact email rejected:",
        error?.name || "No delivery result",
      );
      return Response.json(
        {
          success: false,
          message: "Your message could not be sent. Please try again later.",
        },
        { status: 502 },
      );
    }
    return Response.json({
      success: true,
      message: "Your message was sent successfully!",
    });
  } catch (error) {
    if (error instanceof RequestError) {
      return Response.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }
    console.error("Contact email request failed");
    return Response.json(
      {
        success: false,
        message: "Your message could not be sent. Please try again later.",
      },
      { status: 502 },
    );
  }
}
