import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/* ------------------------------------------------------------------ */
/*  Credential fetching from MongoDB (same pattern as Cloudinary)     */
/* ------------------------------------------------------------------ */

interface AuthCreds {
  authSecret: string;
  googleId: string;
  googleSecret: string;
}

let _cached: { creds: AuthCreds; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getAuthCreds(): Promise<AuthCreds> {
  if (_cached && Date.now() - _cached.ts < CACHE_TTL) return _cached.creds;

  // Try env vars FIRST (zero latency). Only fall through to MongoDB if env is
  // incomplete — otherwise a cold Atlas cluster makes every /api/auth/session
  // request hang for ~30s waiting for the connection.
  const envSecret = process.env.AUTH_SECRET;
  const envGoogleId = process.env.AUTH_GOOGLE_ID;
  const envGoogleSecret = process.env.AUTH_GOOGLE_SECRET;
  if (envSecret && envGoogleId && envGoogleSecret) {
    const creds = { authSecret: envSecret, googleId: envGoogleId, googleSecret: envGoogleSecret };
    _cached = { creds, ts: Date.now() };
    return creds;
  }

  try {
    const row = await prisma.contentSection.findUnique({
      where: { section: "auth-credentials" },
    });

    if (row?.data && typeof row.data === "object") {
      const d = row.data as Record<string, string>;
      if (d.authSecret && d.googleId && d.googleSecret) {
        const creds = {
          authSecret: d.authSecret,
          googleId: d.googleId,
          googleSecret: d.googleSecret,
        };
        _cached = { creds, ts: Date.now() };
        return creds;
      }
    }
  } catch {
    // DB unavailable — fall through to (possibly partial) env vars below
  }

  return {
    authSecret: envSecret || "",
    googleId: envGoogleId || "",
    googleSecret: envGoogleSecret || "",
  };
}

/* ------------------------------------------------------------------ */
/*  Lazy NextAuth instance — created on first request, then cached    */
/* ------------------------------------------------------------------ */

type AuthInstance = ReturnType<typeof NextAuth>;
let _instance: AuthInstance | null = null;

async function getInstance(): Promise<AuthInstance> {
  if (_instance) return _instance;

  const creds = await getAuthCreds();

  // Don't cache an instance with empty secret — retry on next request once creds are available
  if (!creds.authSecret) {
    throw new Error(
      "AUTH_SECRET missing. Set in MongoDB `auth-credentials` section or as AUTH_SECRET env var.",
    );
  }

  _instance = NextAuth({
    secret: creds.authSecret,
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: { signIn: "/auth/signin" },
    providers: [
      Google({
        clientId: creds.googleId,
        clientSecret: creds.googleSecret,
      }),
      Credentials({
        name: "Email",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user?.password) return null;

          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!valid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user && token.id) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  });

  return _instance;
}

/* ------------------------------------------------------------------ */
/*  Exports — same interface as before, but lazily initialized        */
/* ------------------------------------------------------------------ */

/**
 * Returns an empty session JSON response. Used as a safe fallback when
 * NextAuth fails to initialize (e.g., missing AUTH_SECRET), so that
 * <SessionProvider> on the client treats the user as anonymous instead
 * of throwing and breaking hydration / client-side navigation.
 */
function emptySessionResponse(): Response {
  // Returns `{}` (not `null`). NextAuth's React client calls Object.keys()
  // on the parsed body — null would throw TypeError and crash <SessionProvider>,
  // taking the whole client tree with it (broken nav, dead clicks).
  return new Response("{}", {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export const handlers = {
  async GET(req: NextRequest) {
    try {
      const inst = await getInstance();
      return inst.handlers.GET(req);
    } catch (err) {
      console.error("[auth] init failed:", err);
      // For /session — return empty session so SessionProvider doesn't break the page
      if (req.nextUrl.pathname.endsWith("/session")) {
        return emptySessionResponse();
      }
      return new Response(
        JSON.stringify({ error: "auth_not_configured" }),
        { status: 503, headers: { "content-type": "application/json" } },
      );
    }
  },
  async POST(req: NextRequest) {
    try {
      const inst = await getInstance();
      return inst.handlers.POST(req);
    } catch (err) {
      console.error("[auth] init failed:", err);
      return new Response(
        JSON.stringify({ error: "auth_not_configured" }),
        { status: 503, headers: { "content-type": "application/json" } },
      );
    }
  },
};

export async function auth() {
  const inst = await getInstance();
  return inst.auth();
}

export async function signIn(...args: Parameters<AuthInstance["signIn"]>) {
  const inst = await getInstance();
  return inst.signIn(...args);
}

export async function signOut(...args: Parameters<AuthInstance["signOut"]>) {
  const inst = await getInstance();
  return inst.signOut(...args);
}
