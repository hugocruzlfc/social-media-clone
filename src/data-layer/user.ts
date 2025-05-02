import "server-only";

import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import { UpdateUserProfileValues } from "@/lib/validations";

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

export async function getUserFindFirst(
  username: string,
  loggedInUserId: string,
) {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  return user;
}

export async function updateUserProfile(
  userId: string,
  userData: Partial<UpdateUserProfileValues>,
) {
  return prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: userData,
      select: getUserDataSelect(userId),
    });
    await streamServerClient.partialUpdateUser({
      id: userId,
      set: {
        name: userData.displayName,
      },
    });

    return updatedUser;
  });
}

export async function createUser(
  userId: string,
  username: string,
  email: string,
  passwordHash: string,
) {
  return prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });
    await streamServerClient.upsertUser({
      id: userId,
      username,
      name: username,
    });
  });
}
