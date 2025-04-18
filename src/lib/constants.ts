export const API_URL = {
  FOR_YOU_POTS: "/api/posts/for-you",
  FOLLOWING_POSTS: "/api/posts/following",
  FOLLOWERS_BY_USER: (userId: string) =>
    `/api/users/${userId}/followers` as const,
  POST_BY_USER: (userId: string) => `/api/users/${userId}/posts` as const,
  USER_BY_USERNAME: (username: string) =>
    `/api/users/username/${username}` as const,
  LIKES_BY_POST: (postId: string) => `/api/posts/${postId}/likes` as const,
  BOOKMARK_BY_POST: (postId: string) =>
    `/api/posts/${postId}/bookmark` as const,
  BOOKMARKS: "/api/posts/bookmarked",
  COMMENTS_BY_POST: (postId: string) =>
    `/api/posts/${postId}/comments` as const,
  NOTIFICATIONS: "/api/notifications" as const,
  NOTIFICATIONS_MARK_AS_READ: "/api/notifications/mark-as-read" as const,
  UNREAD_NOTIFICATION_COUNT: "/api/notifications/unread-count" as const,
};

export const ROUTES = {};

export const PAGE_SIZE = 10;
