import { useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { generateRecipe } from "../services/API.service";

const useGenerateRecipe = (inputText: string) => {
  const { setRecipeInFocus } = useAppContext();
  const [generatingRecipe, setGeneratingRecipe] = useState(false);

  const handleGenerateRecipe = async () => {
    if (!inputText || inputText.trim() === "") return;

    setGeneratingRecipe(true);

    const recipe = await generateRecipe(inputText);
    setGeneratingRecipe(false);
    setRecipeInFocus(recipe);
  };

  return { generatingRecipe, handleGenerateRecipe };
};

export default useGenerateRecipe;
