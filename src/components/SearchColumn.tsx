import { useRef, useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { generateRecipe } from "../services/API.service";
import AutoCompleteRecipe from "./AutoCompleteRecipe";
import RecipeCard from "./RecipeCard";

const SearchColumn = () => {
  const { recipeInFocus, setRecipeInFocus } = useAppContext();
  const titleRef = useRef<HTMLInputElement>(null);
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
  return (
    <div className="flex flex-col gap-10 flex-[3] justify-center items-center pb-48">
      <h1 className="text-4xl font-bold text-center">Welcome to VivaRecipes</h1>
      <p className="text-lg text-center">
        Search your favorite dishes and add them to your meal plan
      </p>
      <AutoCompleteRecipe />
      {recipeInFocus ? (
        <RecipeCard />
      ) : (
        <>
          <div className="w-full h-[1px] bg-gray-200"></div>

          <div className="flex flex-col gap-4 items-center my-4">
            <p className="text-lg text-center">
              Didn't find the dish you are looking for?
            </p>
            <div className="my-2 flex flex-col gap-4 items-center w-full">
              <input
                ref={titleRef}
                type="text"
                placeholder="Enter the dish name"
                className="w-full p-2 border text-center text-base border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-3xl"
              />
              <button
                onClick={handleGenerateRecipe}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={generatingRecipe}
              >
                {generatingRecipe ? "Generating..." : "Generate Recipe"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchColumn;
