"use server";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function getUserToFollow(userId: string) {
  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
      followers: {
        none: {
          followerId: userId,
        },
      },
    },
    select: getUserDataSelect(userId),
    take: 5,
  });

  return usersToFollow;
}

export async function getUserWithFollowers(
  userId: string,
  loggedUserId: string,
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      followers: {
        where: {
          followerId: loggedUserId,
        },
        select: {
          followerId: true,
        },
      },
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  return user;
}
