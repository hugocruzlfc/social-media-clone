import { validateRequest } from "@/auth";
import {
  createLikeWithNotifications,
  deleteNotificationsWithLikes,
} from "@/data-layer/likes";
import { getPostByUserId, getPostWithLikes } from "@/data-layer/posts";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    const postData = await getPostWithLikes(postId, loggedInUser.id);

    if (!postData) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(postData);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    const post = await getPostByUserId(postId);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    await createLikeWithNotifications(postId, loggedInUser.id, post.userId);

    return Response.json({ message: "Like added" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    const post = await getPostByUserId(postId);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    await deleteNotificationsWithLikes(postId, loggedInUser.id, post.userId);

    return Response.json({ message: "Likes removed" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
