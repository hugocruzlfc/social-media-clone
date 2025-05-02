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
  NOTIFICATIONS: "/api/notifications",
  NOTIFICATIONS_MARK_AS_READ: "/api/notifications/mark-as-read",
  UNREAD_NOTIFICATION_COUNT: "/api/notifications/unread-count",
  GET_STREAM_TOKEN: "/api/get-token",
  MESSAGES_UNREAD_COUNT: "/api/messages/unread-count",
  GOOGLE_OAUTH: "https://www.googleapis.com/oauth2/v1/userinfo",
};

export const ROUTES = {
  GOOGLE_SIGN_IN: "/login/google",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const PAGE_SIZE = 10;
