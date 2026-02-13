import crypto from "crypto";
import { prisma } from "./prisma";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export { COOKIE_NAME, SESSION_DURATION_MS };

/* eslint-disable @typescript-eslint/no-explicit-any */

async function getAdminSecret(): Promise<string> {
  try {
    const record = await prisma.contentSection.findUnique({
      where: { section: "admin-auth" },
    });
    const password = (record?.data as any)?.password;
    if (password) {
      return crypto.createHash("sha256").update(password).digest("hex");
    }
  } catch {
    // fall through to default
  }
  return crypto
    .createHash("sha256")
    .update("nashray2024")
    .digest("hex");
}

export async function generateSessionToken(): Promise<string> {
  const secret = await getAdminSecret();
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(timestamp);
  const signature = hmac.digest("hex");
  return `${timestamp}.${signature}`;
}

export async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [timestamp, signature] = parts;
    if (!timestamp || !signature) return false;

    // Check expiry
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (isNaN(tokenAge) || tokenAge > SESSION_DURATION_MS) return false;

    // Verify HMAC signature
    const secret = await getAdminSecret();
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(timestamp);
    const expectedSignature = hmac.digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

/** Shared helper — checks admin session cookie on an incoming request */
export async function isAuthenticated(request: {
  cookies: { get(name: string): { value: string } | undefined };
}): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const record = await prisma.contentSection.findUnique({
      where: { section: "admin-auth" },
    });
    const adminPassword =
      (record?.data as any)?.password || "nashray2024";

    // Constant-time comparison to prevent timing attacks
    const inputBuffer = Buffer.from(password);
    const expectedBuffer = Buffer.from(adminPassword);

    if (inputBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
