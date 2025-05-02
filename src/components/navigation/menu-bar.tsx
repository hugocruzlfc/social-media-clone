import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { getUnreadNotificationsCountByUserId } from "@/data-layer/notifications";
import streamServerClient from "@/lib/stream";
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";
import MessagesButton from "../buttons/messages-button";
import NotificationsButton from "../buttons/notifications-button";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
    getUnreadNotificationsCountByUserId(user.id),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home className="size-5" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark className="size-5" />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
