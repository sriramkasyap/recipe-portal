import { useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { removeRecipeFromMealPlan } from "../services/API.service";

const useRemoveRecipe = () => {
  const [removingRecipe, setRemovingRecipe] = useState<string | null>(null);
  const { refetchMealData } = useAppContext();

  const handleRemoveRecipe = async (recipeId: string) => {
    setRemovingRecipe(recipeId);
    await removeRecipeFromMealPlan(recipeId);
    await refetchMealData();
    setRemovingRecipe(null);
  };

  return { handleRemoveRecipe, removingRecipe };
};

export default useRemoveRecipe;
