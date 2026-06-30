import { NextResponse } from "next/server";

// Simple helper to sanitize strings and prevent control character injection
function sanitizeString(str: string, maxLength: number): string {
  return str
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    // 1. Safe JSON parsing
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const rawName = body?.name;
    const rawEmail = body?.email;

    // 2. Strict Input validation
    if (!rawName || typeof rawName !== "string" || !rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json({ error: "Name and Email are required fields" }, { status: 400 });
    }

    const name = sanitizeString(rawName, 100);
    const email = sanitizeString(rawEmail, 254);

    // Backend Email regex verification (Never trust the client alone!)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || name.length < 2) {
      return NextResponse.json({ error: "Invalid name or email format" }, { status: 400 });
    }

    // 3. Setup Google Sheets integration
    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error("Google Sheets webhook returned error status:", response.status);
        }
      } catch (err) {
        console.error("Failed to forward lead to Google Sheets webhook:", err);
      }
    } else {
      // If webhook is not set, log to console for local developer debugging
      console.warn(
        "Warning: GOOGLE_SHEETS_WEBHOOK_URL environment variable is not configured. Details logged locally:",
        { name, email }
      );
    }

    return NextResponse.json({ success: true, message: "Subscription captured successfully" });
  } catch (error) {
    console.error("Critical server error in /api/download:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
