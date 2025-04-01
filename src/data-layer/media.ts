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
