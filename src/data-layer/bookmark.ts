"use server";

import prisma from "@/lib/prisma";

export async function getBookmark(postId: string, loggedInUserId: string) {
  return prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        userId: loggedInUserId,
        postId,
      },
    },
  });
}

export async function upsertBookmark(postId: string, loggedInUserId: string) {
  return prisma.bookmark.upsert({
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

export async function deleteManyBookmarks(
  postId: string,
  loggedInUserId: string,
) {
  return prisma.bookmark.deleteMany({
    where: {
      userId: loggedInUserId,
      postId,
    },
  });
}
