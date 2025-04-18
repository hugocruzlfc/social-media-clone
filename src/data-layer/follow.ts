import "server-only";

import prisma from "@/lib/prisma";

export async function upsertFollow(userId: string, loggedUserId: string) {
  return prisma.$transaction([
    prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedUserId,
          followingId: userId,
        },
      },
      create: {
        followerId: loggedUserId,
        followingId: userId,
      },
      update: {},
    }),
    prisma.notification.create({
      data: {
        issuerId: loggedUserId,
        recipientId: userId,
        type: "FOLLOW",
      },
    }),
  ]);
}

export async function deleteManyFollowers(
  userId: string,
  loggedUserId: string,
) {
  await prisma.follow.deleteMany({
    where: {
      followerId: loggedUserId,
      followingId: userId,
    },
  });
}
