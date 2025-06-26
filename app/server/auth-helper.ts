import { href, redirect } from "react-router";
import { auth } from "@/server/better-auth";
import { caller } from "@/server/trpc-caller";

export type BetterAuthResponse = {
  code: string;
  message: string;
};

export type BetterAuthResponseError = {
  status: string;
  statusCode: number;
  headers: Headers;
  body: BetterAuthResponse;
};

export type BetterAuthResponseSignOut = {
  success: string;
};

export type BetterAuthResponseOAuth = {
  url: string;
  redirect: boolean;
};

export async function requireSession(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

export async function requireAuthUserData(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };

  const api = await caller(request);
  const user = await api.auth.getUserComplete();
  const isAuthenticated = user !== null;

  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));

  return { isAuthenticated, user };
}

/**
 * Below are only getting the user data from session, not from the database.
 */

export async function requireAuthSession(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };
  return { isAuthenticated: true, user: session.user };
}

// Redirect to /signin if not authenticated
export async function requireAuthTrue(request: Request) {
  const { isAuthenticated, user } = await requireAuthSession(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

// Redirect to /dashboard if authenticated
export async function requireAuthFalse(request: Request) {
  const { isAuthenticated, user } = await requireAuthSession(request);
  if (isAuthenticated) return redirect(href("/dashboard"));
  if (user) return redirect(href("/dashboard"));
  return { isAuthenticated, user };
}
