import { NextPage } from "next";

import classes from "./loading-meals.module.css";

const LoadingMealsPage: NextPage = () => {
  return <p className={classes.loading}>Fetching meals...</p>;
};

export default LoadingMealsPage;
