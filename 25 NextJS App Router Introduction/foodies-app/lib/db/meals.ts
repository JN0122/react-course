import { Meal } from "@/types/meal";
import sql from "better-sqlite3";

const db = sql("data/meals.db");

export async function getMeals(): Promise<
  Omit<Meal, "creator_email" | "instructions">[]
> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // for loading simulation
  const meals = db
    .prepare<[], Omit<Meal, "creator_email" | "instructions">>(
      "SELECT id, title, slug, image, summary, creator FROM meals"
    )
    .all();
  return meals;
}

export function getMeal(slug: string): Meal | undefined {
  const meal = db
    .prepare<[string], Meal | undefined>(
      "SELECT id, title, slug, image, summary, creator, creator_email, instructions FROM meals WHERE slug = ?"
    )
    .get(slug);
  return meal;
}
