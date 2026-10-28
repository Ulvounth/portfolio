export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 1000 },
} as const;

// Real visitors need a few seconds to write a message. Scripts post immediately.
export const contactMinFillMs = 3000;

export type BotCheck = "ok" | "honeypot" | "too-fast";

// The field name avoids words like "website" that autofill tends to fill in.
export const contactHoneypotField = "ref_code";

/**
 * Checks the hidden honeypot field and how long the form was open. The client
 * sends a duration, not a timestamp, so clock differences do not matter. Both
 * values come from the client, so this only stops scripts that do not read the form.
 */
export function checkContactBot(input: unknown): BotCheck {
  const fields = (input ?? {}) as Record<string, unknown>;
  const honeypot = fields[contactHoneypotField];
  if (typeof honeypot === "string" && honeypot.trim()) return "honeypot";
  if (
    typeof fields.elapsedMs !== "number" ||
    fields.elapsedMs < contactMinFillMs
  )
    return "too-fast";
  return "ok";
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

type ContactValidation =
  { success: true; data: ContactInput } | { success: false; error: string };

export function validateContact(input: unknown): ContactValidation {
  if (!input || typeof input !== "object") {
    return { success: false, error: "All fields are required." };
  }
  const fields = input as Record<string, unknown>;
  if (
    [fields.name, fields.email, fields.message].some(
      (value) => typeof value !== "string",
    )
  ) {
    return { success: false, error: "All fields must be text." };
  }
  const name = (fields.name as string).trim();
  const email = (fields.email as string).trim();
  const message = (fields.message as string).trim();
  if (
    name.length < contactLimits.name.min ||
    name.length > contactLimits.name.max ||
    /[\r\n]/.test(name)
  ) {
    return {
      success: false,
      error: "Name must be between 2 and 100 characters and on a single line.",
    };
  }
  if (
    email.length > contactLimits.email.max ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (
    message.length < contactLimits.message.min ||
    message.length > contactLimits.message.max
  ) {
    return {
      success: false,
      error: "Message must be between 10 and 1000 characters.",
    };
  }
  return { success: true, data: { name, email, message } };
}
