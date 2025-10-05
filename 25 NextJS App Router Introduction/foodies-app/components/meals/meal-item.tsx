import Link from "next/link";
import Image from "next/image";

import { Meal } from "@/types/meal";
import classes from "./meal-item.module.css";

type Props = {
  meal: Omit<Meal, "creator_email" | "instructions">;
};

export default function MealItem({ meal }: Props) {
  const { title, image, summary, creator, slug } = meal;
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

