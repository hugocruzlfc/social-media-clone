"use server";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return posts;
}
