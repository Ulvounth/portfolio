import { NextResponse } from "next/server";
import { Resend } from "resend";
// Rate limiting map
const rateLimit = new Map();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Rate limiting
  // Get IP from headers (Next.js 15 removed request.ip)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0]
    : request.headers.get("x-real-ip") || "127.0.0.1";

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const max = 5; // 5 requests per minute

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const data = rateLimit.get(ip);
    if (now > data.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      data.count++;
      if (data.count > max) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many requests. Please try again later.",
          },
          { status: 429 }
        );
      }
    }
  }
  try {
    const { name, email, message } = await request.json();

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be between 2 and 100 characters",
        },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be between 10 and 1000 characters",
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const fromEmail = process.env.EMAIL_FROM || "noreply@andreasulvund.no";
    const toEmail = process.env.EMAIL_TO || "contact@andreasulvund.no";

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
      await resend.emails.send(mailOptions);
      return NextResponse.json({
        success: true,
        message: "Email sent successfully!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
