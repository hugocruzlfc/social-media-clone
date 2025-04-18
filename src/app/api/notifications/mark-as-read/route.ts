import { validateRequest } from "@/auth";
import { updateManyNotificationsRead } from "@/data-layer/notifications";

export async function PATCH() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await updateManyNotificationsRead(user.id);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
