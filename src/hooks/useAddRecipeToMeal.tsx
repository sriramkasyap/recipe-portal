import { useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { addRecipeToMealPlan } from "../services/API.service";

const useAddRecipeToMeal = () => {
  const [addingToMealPlan, setAddingToMealPlan] = useState(false);
  const { recipeInFocus, refetchMealData, setRecipeInFocus } = useAppContext();

  const handleAddToMealPlan = async () => {
    if (!recipeInFocus) return;
    setAddingToMealPlan(true);
    await addRecipeToMealPlan(recipeInFocus._id);
    await refetchMealData();
    setRecipeInFocus(null);
    setAddingToMealPlan(false);
  };

  return { handleAddToMealPlan, addingToMealPlan };
};

export default useAddRecipeToMeal;
