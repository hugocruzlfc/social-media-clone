import { google } from "@/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies as cookiesPromise } from "next/headers";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const scopes = ["profile", "email"];

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  const cookies = await cookiesPromise();

  cookies.set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookies.set("code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
