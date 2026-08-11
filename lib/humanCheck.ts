// توقيع وتحقق كوكي "human_verified" بدون أي مكتبات خارجية
// عشان يشتغل جوه middleware (Edge Runtime) لازم نستخدم Web Crypto فقط

const COOKIE_NAME = "human_verified";
const MAX_AGE_SECONDS = 60 * 60 * 12; // صالحة 12 ساعة

async function getKey() {
  const secret = process.env.HUMAN_CHECK_SECRET;
  if (!secret) throw new Error("HUMAN_CHECK_SECRET غير معرّف في متغيرات البيئة");
  const enc = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createHumanToken(): Promise<string> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${expires}`;
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

export async function isValidHumanToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const key = await getKey();
  const expectedSig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toHex(expectedSig) === sig;
}

export const HUMAN_COOKIE_NAME = COOKIE_NAME;
export const HUMAN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
