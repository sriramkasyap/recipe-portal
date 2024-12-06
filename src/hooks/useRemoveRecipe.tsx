import { useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { removeRecipeFromMealPlan } from "../services/API.service";

const useRemoveRecipe = () => {
  const [removingRecipe, setRemovingRecipe] = useState(false);
  const { refetchMealData } = useAppContext();

  const handleRemoveRecipe = async (recipeId: string) => {
    setRemovingRecipe(true);
    await removeRecipeFromMealPlan(recipeId);
    await refetchMealData();
    setRemovingRecipe(false);
  };

  return { handleRemoveRecipe, removingRecipe };
};

export default useRemoveRecipe;
