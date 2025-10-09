import { StaticImageData } from "next/image";

export type Meal = {
  id: number;
  title: string;
  slug: string;
  image: StaticImageData;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
};

export type UploadedMeal = Pick<
  Meal,
  "title" | "summary" | "instructions" | "image" | "creator" | "creator_email"
>;
