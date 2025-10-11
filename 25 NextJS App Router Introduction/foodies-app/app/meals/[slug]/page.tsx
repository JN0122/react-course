import { Metadata, NextPage } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/db/meals";

import classes from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meal = getMeal(slug);

  if (!meal) notFound();

  return {
    title: `Share ${meal.title}`,
    description: meal.summary,
  };
}

const MealDetails: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;

  const meal = getMeal(slug);

  if (!meal) {
    notFound();
  }

  const parsedInstructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt="" fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: parsedInstructions }}
        ></p>
      </main>
    </>
  );
};

export default MealDetails;
