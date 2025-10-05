"use client";

import { NextPage } from "next";

const MealsErrorPage: NextPage = () => {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Could not fetch meal data. Please try again later.</p>
    </main>
  );
};

export default MealsErrorPage;
