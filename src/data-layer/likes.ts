import "server-only";

import prisma from "@/lib/prisma";

export async function upsertLike(postId: string, loggedInUserId: string) {
  await prisma.like.upsert({
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
  });
}

export async function deleteManyLikes(postId: string, loggedInUserId: string) {
  await prisma.like.deleteMany({
    where: {
      userId: loggedInUserId,
      postId,
    },
  });
}
