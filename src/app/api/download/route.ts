import { NextResponse } from "next/server";
import crypto from "crypto";

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

    // Backend Email regex verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || name.length < 2) {
      return NextResponse.json({ error: "Invalid name or email format" }, { status: 400 });
    }

    // 3. Backend client analytics gathering
    const timestamp = new Date().toISOString();
    const country = request.headers.get("x-vercel-ip-country") || "Localhost";
    
    // IP Hash generation (Anonymized SHA-256)
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(clientIp).digest("hex").slice(0, 8);

    // User-Agent Parsing (macOS Version & Browser)
    const userAgent = request.headers.get("user-agent") || "";
    
    let macosVersion = "Unknown macOS";
    const macRegex = /Mac OS X ([\d_.]+)/i;
    const macMatch = userAgent.match(macRegex);
    if (macMatch && macMatch[1]) {
      macosVersion = `macOS ${macMatch[1].replace(/_/g, ".")}`;
    } else if (/macintosh/i.test(userAgent)) {
      macosVersion = "macOS";
    }

    let browser = "Unknown Browser";
    if (/chrome|crios/i.test(userAgent) && !/edge|edg/i.test(userAgent) && !/opr/i.test(userAgent)) {
      browser = "Chrome";
    } else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) {
      browser = "Safari";
    } else if (/firefox|fxios/i.test(userAgent)) {
      browser = "Firefox";
    } else if (/edge|edg/i.test(userAgent)) {
      browser = "Edge";
    } else if (/opr/i.test(userAgent)) {
      browser = "Opera";
    }

    const downloadCount = 1;

    // 4. Setup Google Sheets integration
    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    const payload = {
      // camelCase keys
      name,
      email,
      timestamp,
      country,
      ipHash,
      macosVersion,
      downloadCount,
      browser,
      // Capitalized Column-matching keys (bulletproof compatibility)
      "Name": name,
      "Email": email,
      "Timestamp": timestamp,
      "Country": country,
      "IP Hash": ipHash,
      "macOS Version": macosVersion,
      "Download Count": downloadCount,
      "Browser": browser
    };

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
        payload
      );
    }

    return NextResponse.json({ success: true, message: "Subscription captured successfully" });
  } catch (error) {
    console.error("Critical server error in /api/download:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
