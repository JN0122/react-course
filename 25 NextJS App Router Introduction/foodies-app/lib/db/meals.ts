import fs from "node:fs";

import sql from "better-sqlite3";
import xss from "xss";
import slugify from "slugify";

import { Meal, UploadedMeal } from "@/types/meal";

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

export async function insertMeal(meal: UploadedMeal) {
  const slug = slugify(meal.title || "", { lower: true, strict: true });
  const sanitizedInstructions = xss(meal.instructions || "");

  const imageExtension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${imageExtension}`;

  const imageUrlPath = `/images/meals/${fileName}`;
  const stream = fs.createWriteStream(`public${imageUrlPath}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error: Error | null) => {
    if (error) throw new Error("Failed to save image.");
  });

  db.prepare<[string, string, string, string, string, string, string]>(
    "INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(
    meal.title,
    slug,
    imageUrlPath,
    meal.summary,
    sanitizedInstructions,
    meal.creator,
    meal.creator_email
  );
}
