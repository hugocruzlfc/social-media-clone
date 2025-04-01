"use server";

import { validateRequest } from "@/auth";
import { createPost } from "@/data-layer/posts";
import { createPostSchema } from "@/lib/validations";

export async function submitPostAction(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await createPost(content, user.id);

  return newPost;
}
