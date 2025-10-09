"use server";

import { UploadedMeal } from "@/types/meal";
import { insertMeal } from "../db/meals";
import { redirect } from "next/navigation";

export async function shareMeal(formData: FormData) {
  const meal: UploadedMeal = {
    title: formData.get("title")?.toString(),
    summary: formData.get("summary")?.toString(),
    instructions: formData.get("instructions")?.toString(),
    image: formData.get("image") as File,
    creator: formData.get("name")?.toString(),
    creator_email: formData.get("email")?.toString(),
  };

  await insertMeal(meal);

  redirect("/meals");
}
