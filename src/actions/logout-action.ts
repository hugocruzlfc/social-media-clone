"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies as cookiesPromise } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  const cookies = await cookiesPromise();

  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}
