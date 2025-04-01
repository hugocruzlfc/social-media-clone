"use server";

import { validateRequest } from "@/auth";
import { updateUserProfile } from "@/data-layer/user";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validations";

export async function updateUserProfileAction(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await updateUserProfile(user.id, validatedValues);

  return updatedUser;
}
