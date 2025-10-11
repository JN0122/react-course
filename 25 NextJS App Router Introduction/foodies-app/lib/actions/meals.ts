"use server";

import { UploadedMeal } from "@/types/meal";
import { insertMeal } from "../db/meals";
import { redirect } from "next/navigation";
import { isValidMeal } from "../validation/meals";
import { FormState } from "@/types/form";
import { revalidatePath } from "next/cache";

export async function shareMeal(
  state: FormState,
  payload: FormData
): Promise<FormState> {
  const meal: UploadedMeal = {
    title: payload.get("title")?.toString(),
    summary: payload.get("summary")?.toString(),
    instructions: payload.get("instructions")?.toString(),
    image: payload.get("image") as File,
    creator: payload.get("name")?.toString(),
    creator_email: payload.get("email")?.toString(),
  };

  if (!isValidMeal(meal))
    return { message: "Invalid input - please check your data." };

  await insertMeal(meal);

  revalidatePath("/meals", "page");

  redirect("/meals");
}
