"use server";

import { UploadedMeal } from "@/types/meal";

export async function shareMeal(formData: FormData) {
  const meal: UploadedMeal = {
    title: formData.get("title")?.toString(),
    summary: formData.get("summary")?.toString(),
    instructions: formData.get("instructions")?.toString(),
    image: formData.get("image")?.toString(),
    creator: formData.get("name")?.toString(),
    creator_email: formData.get("email")?.toString(),
  };

  console.log(meal);
}
