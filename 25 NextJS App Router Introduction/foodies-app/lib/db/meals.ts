import { Meal } from "@/types/meal";
import sql from "better-sqlite3";

const db = sql("data/meals.db");

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // for loading simulation
  const meals = db
    .prepare<[], Meal>(
      "SELECT id, title, slug, image, summary, creator FROM meals"
    )
    .all();
  return meals;
}
