import { StaticImageData } from "next/image";

export type MealItem = {
  id: string;
  title: string;
  slug: string;
  image: StaticImageData;
  summary: string;
  creator: string;
};
