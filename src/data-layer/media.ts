"use server";
import prisma from "@/lib/prisma";
import { MediaType } from "@prisma/client";

export async function mediaCreate(url: string, fileType: string) {
  return await prisma.media.create({
    data: {
      url,
      type: fileType.startsWith("image") ? MediaType.IMAGE : MediaType.VIDEO,
    },
  });
}

export async function getMedias() {
  return await prisma.media.findMany({
    where: {
      postId: null,
      ...(process.env.NODE_ENV === "production"
        ? {
            createdAt: {
              lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
            },
          }
        : {}),
    },
    select: {
      id: true,
      url: true,
    },
  });
}

export async function deleteMedias(unusedMedia: { id: string }[]) {
  await prisma.media.deleteMany({
    where: {
      id: {
        in: unusedMedia.map((m) => m.id),
      },
    },
  });
}
