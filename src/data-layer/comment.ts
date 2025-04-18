import "server-only";

import prisma from "@/lib/prisma";
import { CommentsPage, getCommentDataInclude } from "@/lib/types";
import { Post } from "@prisma/client";

export async function createCommentWithNotifications(
  postI: Post,
  loggedInUserId: string,
  content: string,
) {
  return prisma.$transaction([
    prisma.comment.create({
      data: {
        content,
        postId: postI.id,
        userId: loggedInUserId,
      },
      include: getCommentDataInclude(loggedInUserId),
    }),
    ...(postI.userId !== loggedInUserId
      ? [
          prisma.notification.create({
            data: {
              issuerId: loggedInUserId,
              recipientId: postI.userId,
              postId: postI.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);
}

export async function getCommentById(commentId: string) {
  return prisma.comment.findUnique({
    where: { id: commentId },
  });
}

export async function removeComment(commentId: string, userId: string) {
  return prisma.comment.delete({
    where: { id: commentId },
    include: getCommentDataInclude(userId),
  });
}

export async function getCommentsByPostId(
  postId: string,
  userId: string,
  cursor?: string,
) {
  const PAGE_SIZE = 5;

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: getCommentDataInclude(userId),
    orderBy: { createdAt: "asc" },
    take: -PAGE_SIZE - 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const previousCursor = comments.length > PAGE_SIZE ? comments[0].id : null;

  const data: CommentsPage = {
    comments: comments.length > PAGE_SIZE ? comments.slice(1) : comments,
    previousCursor,
  };

  return data;
}
