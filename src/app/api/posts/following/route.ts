import { validateRequest } from "@/auth";
import { getPostsWithFollowers } from "@/data-layer/posts";
import { PostsPage } from "@/lib/types";
import { formatPostData } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await getPostsWithFollowers(user.id, cursor);

    const data: PostsPage = formatPostData(posts);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
