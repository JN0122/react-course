import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/db/meals";

const Meals = async () => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};

export default Meals;
