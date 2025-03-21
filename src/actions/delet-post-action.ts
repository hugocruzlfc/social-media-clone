"use server";

import { validateRequest } from "@/auth";
import { removePost } from "@/data-layer/posts";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  return await removePost(id, user.id);
}
