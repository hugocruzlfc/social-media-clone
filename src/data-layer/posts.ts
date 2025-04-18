import "server-only";

import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getPostDataInclude, LikeInfo } from "@/lib/types";

import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export async function getPosts(userId: string, cursor?: string) {
  const posts = await prisma.post.findMany({
    include: getPostDataInclude(userId),
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  return posts;
}

export const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

export async function createPost(
  content: string,
  mediaIds: string[],
  userId: string,
) {
  return await prisma.post.create({
    data: {
      content,
      userId,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(userId),
  });
}

export async function removePost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== userId) throw new Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id: postId },
    include: getPostDataInclude(userId),
  });

  return deletedPost;
}

export async function getPostsWithFollowers(userId: string, cursor?: string) {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE + 1,
    cursor: cursor ? { id: cursor } : undefined,
    include: getPostDataInclude(userId),
  });

  return posts;
}

export async function getPostsByUserId(
  loggedUserId: string,
  userId: string,
  cursor?: string,
) {
  const posts = await prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE + 1,
    cursor: cursor ? { id: cursor } : undefined,
    include: getPostDataInclude(loggedUserId),
  });

  return posts;
}

export const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

export async function getPostWithLikes(postId: string, loggedInUserId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      likes: {
        where: {
          userId: loggedInUserId,
        },
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!post) {
    return null;
  }

  const data: LikeInfo = {
    likes: post._count.likes,
    isLikedByUser: !!post.likes.length,
  };

  return data;
}

export async function getPostByUserId(postId: string) {
  return prisma.post.findUnique({
    where: { id: postId },
    select: {
      userId: true,
    },
  });
}
