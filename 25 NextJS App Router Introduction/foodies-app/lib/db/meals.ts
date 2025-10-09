import { Meal } from "@/types/meal";
import sql from "better-sqlite3";

const db = sql("data/meals.db");

export async function getMeals(): Promise<Meal[] | []> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // for loading simulation
  const meals = db
    .prepare<[], Meal>(
      "SELECT id, title, slug, image, summary, creator, creator_email, instructions FROM meals"
    )
    .all();
  return meals;
}

export function getMeal(slug: string): Meal | null {
  const meal = db
    .prepare<[string], Meal | null>(
      "SELECT id, title, slug, image, summary, creator, creator_email, instructions FROM meals WHERE slug = ?"
    )
    .get(slug);
  return meal;
}
