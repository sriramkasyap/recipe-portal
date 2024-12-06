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

export const getMealPlan = async (): Promise<MealPlan> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/mealplan`, {
    credentials: "include",
  });

  let result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.mealPlan;
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

export const removeRecipeFromMealPlan = async (recipeId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/mealplan/recipe`,
    {
      method: "DELETE",
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

export const markGroceryListItem = async (
  ingredientSlug: string,
  checked: boolean
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/mealplan/grocery`,
    {
      method: "PUT",
      body: JSON.stringify({ ingredientSlug, checked }),
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

  return result.mealPlan;
};
