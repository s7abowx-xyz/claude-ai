import { NextRequest, NextResponse } from "next/server";
import { HUMAN_COOKIE_NAME, isValidHumanToken } from "@/lib/humanCheck";

// المسارات المسموح بيها بدون تحقق (صفحة التحقق نفسها + الملفات الثابتة)
const PUBLIC_PATHS = ["/verify", "/api/verify"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic =
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(png|jpg|jpeg|svg|webp|ico|css|js)$/.test(pathname);

  if (isPublic) return NextResponse.next();

  const token = req.cookies.get(HUMAN_COOKIE_NAME)?.value;

  let valid = false;
  try {
    valid = await isValidHumanToken(token);
  } catch {
    // HUMAN_CHECK_SECRET غير معرّف - نعتبره غير متحقق بدل ما نطيح الموقع كله
    valid = false;
  }

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/verify";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
