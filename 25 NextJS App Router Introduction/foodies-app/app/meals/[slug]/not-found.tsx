import { NextPage } from "next";

const MealNotFound: NextPage = () => {
  return (
    <main className="not-found">
      <h1>Meal Not Found</h1>
      <p>We could not found requested meal!</p>
    </main>
  );
};

export default MealNotFound;
