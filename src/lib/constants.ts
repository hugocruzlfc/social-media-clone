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
};

export const POSTS_PER_PAGE = 10;
