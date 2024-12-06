import { GroceryList } from "../types/Recipe.type";

import { MealPlan } from "../types/Recipe.type";

export const getRecipes = async (title: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recipes?title=${title}`,
    {
      credentials: "include",
    }
  );

  let result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.recipes;
};

export const getMealPlanAndGroceryList = async (): Promise<{
  mealPlan: MealPlan;
  groceryList: GroceryList;
}> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/mealplan`, {
    credentials: "include",
  });

  let result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};

export const addRecipeToMealPlan = async (recipeId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/mealplan/recipe`,
    {
      method: "POST",
      body: JSON.stringify({ recipeId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};
