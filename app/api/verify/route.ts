import { NextRequest, NextResponse } from "next/server";
import { HUMAN_COOKIE_NAME, HUMAN_COOKIE_MAX_AGE, createHumanToken } from "@/lib/humanCheck";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, error: "لا يوجد توكن" }, { status: 400 });
  }

  // تحقق من التوكن مع سيرفرات Cloudflare Turnstile
  const cfRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: req.headers.get("x-forwarded-for") ?? undefined,
    }),
  });

  const cfData = await cfRes.json();

  if (!cfData.success) {
    return NextResponse.json({ success: false, error: "فشل التحقق" }, { status: 403 });
  }

  const humanToken = await createHumanToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(HUMAN_COOKIE_NAME, humanToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: HUMAN_COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
