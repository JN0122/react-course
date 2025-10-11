import { Suspense } from "react";
import { Metadata, NextPage } from "next";
import Link from "next/link";

import LoadingMealsPage from "./_meals/loading-meals";

import classes from "./page.module.css";
import Meals from "./_meals/meals";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Delicious meals, created by you.",
};

const MealsPage: NextPage = async ({}) => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, craeted{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<LoadingMealsPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
