"use server";
import { POSTS_PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

import { unstable_cache } from "next/cache";

export async function getPosts(userId: string, cursor?: string) {
  const posts = await prisma.post.findMany({
    include: getPostDataInclude(userId),
    orderBy: { createdAt: "desc" },
    take: POSTS_PER_PAGE + 1,
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

export async function createPost(content: string, userId: string) {
  return await prisma.post.create({
    data: {
      content,
      userId,
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
    take: POSTS_PER_PAGE + 1,
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
    take: POSTS_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,
    include: getPostDataInclude(loggedUserId),
  });

  return posts;
}
