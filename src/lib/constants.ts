export const API_URL = {
  FOR_YOU_POTS: "/api/posts/for-you",
  FOLLOWING_POSTS: "/api/posts/following",
  FOLLOWERS_BY_USER: (userId: string) =>
    `/api/users/${userId}/followers` as const,
};

export const POSTS_PER_PAGE = 10;
