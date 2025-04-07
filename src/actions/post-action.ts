"use server";

import { validateRequest } from "@/auth";
import { createPost, removePost } from "@/data-layer/posts";
import { createPostSchema } from "@/lib/validations";

export async function deletePostAction(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  return await removePost(id, user.id);
}

export async function submitPostAction(input: {
  content: string;
  mediaIds: string[];
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await createPost(content, mediaIds, user.id);

  return newPost;
}
