"use server";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";

export async function getUserToFollow(userId: string) {
  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    select: userDataSelect,
    take: 5,
  });

  return usersToFollow;
}
