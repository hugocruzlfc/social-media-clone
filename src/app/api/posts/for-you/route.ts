import { validateRequest } from "@/auth";
import { getPosts } from "@/data-layer/posts";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const posts = await getPosts(user.id, cursor);

    const nextCursor =
      posts.length > POSTS_PER_PAGE ? posts[POSTS_PER_PAGE].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, POSTS_PER_PAGE),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
