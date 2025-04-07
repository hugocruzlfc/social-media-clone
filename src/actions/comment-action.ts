"use server";

import { validateRequest } from "@/auth";
import {
  createComment,
  getCommentById,
  removeComment,
} from "@/data-layer/comment";
import { createCommentSchema } from "@/lib/validations";

export async function submitComment({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const newComment = await createComment(postId, user.id, contentValidated);

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
