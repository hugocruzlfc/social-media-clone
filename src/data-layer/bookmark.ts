import "server-only";

import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";

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

export async function getBookmarks(userId: string, cursor?: string) {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
    include: {
      post: {
        include: getPostDataInclude(userId),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const nextCursor =
    bookmarks.length > PAGE_SIZE ? bookmarks[PAGE_SIZE].id : null;

  const data: PostsPage = {
    posts: bookmarks.slice(0, PAGE_SIZE).map((bookmark) => bookmark.post),
    nextCursor,
  };

  return data;
}
