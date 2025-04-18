"use server";

import { validateRequest } from "@/auth";
import {
  createCommentWithNotifications,
  getCommentById,
  removeComment,
} from "@/data-layer/comment";
import { createCommentSchema } from "@/lib/validations";
import { Post } from "@prisma/client";

export async function submitComment({
  post,
  content,
}: {
  post: Post;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const newComment = await createCommentWithNotifications(
    post,
    user.id,
    contentValidated,
  );

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const comment = await getCommentById(id);

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deletedComment = await removeComment(id, user.id);

  return deletedComment;
}
