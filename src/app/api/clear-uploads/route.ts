import { deleteMedias, getMedias } from "@/data-layer/media";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        { message: "Invalid authorization header" },
        { status: 401 },
      );
    }

    const unusedMedia = await getMedias();

    new UTApi().deleteFiles(unusedMedia.map((m) => m.url));
    // new UTApi().deleteFiles(
    //   unusedMedia.map(
    //     (m) =>
    //       m.url.split(`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`)[1],
    //   ),
    // );

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
