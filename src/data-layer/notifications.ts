import "server-only";

import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { notificationsInclude, NotificationsPage } from "@/lib/types";

export async function getNotifications(userId: string, cursor?: string) {
  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: userId,
    },
    include: notificationsInclude,
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const nextCursor =
    notifications.length > PAGE_SIZE ? notifications[PAGE_SIZE].id : null;

  const data: NotificationsPage = {
    notifications: notifications.slice(0, PAGE_SIZE),
    nextCursor,
  };

  return data;
}
