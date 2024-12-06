import { useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { generateRecipe } from "../services/API.service";

const useGenerateRecipe = (titleRef: React.RefObject<HTMLInputElement>) => {
  const { setRecipeInFocus } = useAppContext();
  const [generatingRecipe, setGeneratingRecipe] = useState(false);

  const handleGenerateRecipe = async () => {
    if (!titleRef.current?.value || titleRef.current?.value.trim() === "")
      return;

    setGeneratingRecipe(true);

    const recipe = await generateRecipe(titleRef.current.value);
    console.log({ recipe });
    setGeneratingRecipe(false);
    setRecipeInFocus(recipe);
  };

  return { generatingRecipe, handleGenerateRecipe };
};

export default useGenerateRecipe;
