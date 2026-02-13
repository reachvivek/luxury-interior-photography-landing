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
    // DB unavailable — fall through to env vars
  }

  return {
    authSecret: process.env.AUTH_SECRET || "",
    googleId: process.env.AUTH_GOOGLE_ID || "",
    googleSecret: process.env.AUTH_GOOGLE_SECRET || "",
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

export const handlers = {
  async GET(req: NextRequest) {
    const inst = await getInstance();
    return inst.handlers.GET(req);
  },
  async POST(req: NextRequest) {
    const inst = await getInstance();
    return inst.handlers.POST(req);
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
