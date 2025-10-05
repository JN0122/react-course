import { StaticImageData } from "next/image";

export type Meal = {
  id: number;
  title: string;
  slug: string;
  image: StaticImageData;
  summary: string;
  creator: string;
};
