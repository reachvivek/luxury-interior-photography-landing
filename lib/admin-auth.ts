import crypto from "crypto";

const ADMIN_SECRET =
  process.env.ADMIN_SECRET || "nashray-change-this-secret-in-env";
const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export { COOKIE_NAME, SESSION_DURATION_MS };

export function generateSessionToken(): string {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET);
  hmac.update(timestamp);
  const signature = hmac.digest("hex");
  return `${timestamp}.${signature}`;
}

export function validateSessionToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [timestamp, signature] = parts;
    if (!timestamp || !signature) return false;

    // Check expiry
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (isNaN(tokenAge) || tokenAge > SESSION_DURATION_MS) return false;

    // Verify HMAC signature
    const hmac = crypto.createHmac("sha256", ADMIN_SECRET);
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

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "nashray2024";
  // Constant-time comparison to prevent timing attacks
  const inputBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(adminPassword);

  if (inputBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}
