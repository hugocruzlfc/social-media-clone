import { deleteMedias, getMedias } from "@/data-layer/media";
import { env } from "@/env";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return Response.json(
        { message: "Invalid authorization header" },
        { status: 401 },
      );
    }

    const unusedMedia = await getMedias();

    new UTApi().deleteFiles(unusedMedia.map((m) => m.url));

    await deleteMedias(unusedMedia);

    return Response.json(
      {
        message: "Unused media deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
