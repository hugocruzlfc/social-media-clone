import "server-only";

import prisma from "@/lib/prisma";

export async function deleteManyLikes(postId: string, loggedInUserId: string) {
  return prisma.like.deleteMany({
    where: {
      userId: loggedInUserId,
      postId,
    },
  });
}

export async function createLikeWithNotifications(
  postId: string,
  loggedInUserId: string,
  userIdByPost: string,
) {
  return prisma.$transaction([
    prisma.like.upsert({
      where: {
        userId_postId: {
          userId: loggedInUserId,
          postId,
        },
      },
      create: {
        userId: loggedInUserId,
        postId,
      },
      update: {},
    }),
    ...(loggedInUserId !== userIdByPost
      ? [
          prisma.notification.create({
            data: {
              issuerId: loggedInUserId,
              recipientId: userIdByPost,
              postId,
              type: "LIKE",
            },
          }),
        ]
      : []),
  ]);
}

export async function deleteNotificationsWithLikes(
  postId: string,
  loggedInUserId: string,
  userIdByPost: string,
) {
  return prisma.$transaction([
    prisma.like.deleteMany({
      where: {
        userId: loggedInUserId,
        postId,
      },
    }),
    prisma.notification.deleteMany({
      where: {
        issuerId: loggedInUserId,
        recipientId: userIdByPost,
        postId,
        type: "LIKE",
      },
    }),
  ]);
}
