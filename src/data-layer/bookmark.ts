import "server-only";

import { POSTS_PER_PAGE } from "@/lib/constants";
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
    take: POSTS_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const nextCursor =
    bookmarks.length > POSTS_PER_PAGE ? bookmarks[POSTS_PER_PAGE].id : null;

  const data: PostsPage = {
    posts: bookmarks.slice(0, POSTS_PER_PAGE).map((bookmark) => bookmark.post),
    nextCursor,
  };

  return data;
}
