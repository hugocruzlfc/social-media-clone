"use server";

import { validateRequest } from "@/auth";
import { createPost } from "@/data-layer/posts";
import { createPostSchema } from "@/lib/validations";

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
