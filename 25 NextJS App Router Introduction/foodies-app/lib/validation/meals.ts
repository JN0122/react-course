import { UploadedMeal } from "@/types/meal";
import { isValidEmail, isValidFile, isValidText } from "./util";

export function isValidMeal(meal: UploadedMeal) {
  if (
    isValidText(meal.title) ||
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidFile(meal.image) ||
    isValidText(meal.creator) ||
    isValidEmail(meal.creator_email)
  )
    return true;
  return false;
}
