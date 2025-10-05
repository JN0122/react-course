import MealItem from "./meal-item";

import { Meal } from "@/types/meal";
import classes from "./meals-grid.module.css";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLUListElement> & {
  meals: Omit<Meal, "creator_email" | "instructions">[];
};

const MealsGrid = ({ meals, ...rest }: Props) => {
  return (
    <ul className={classes.meals} {...rest}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
