import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";

const COOKIE_NAME = "personal_blog_admin";

function sign(value: string) {
  return createHmac("sha256", env.ADMIN_SESSION_SECRET).update(value).digest("hex");
}

function encodeSession(username: string) {
  const payload = `${username}:${sign(username)}`;
  return Buffer.from(payload).toString("base64url");
}

function decodeSession(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const [username, signature] = decoded.split(":");
    if (!username || !signature) {
      return null;
    }

    const expected = sign(username);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return null;
    }

    return { username };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return decodeSession(store.get(COOKIE_NAME)?.value);
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function createAdminSession(username: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function validateAdminCredentials(username: string, password: string) {
  return username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
}
