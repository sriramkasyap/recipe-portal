import { useAppContext } from "../contexts/App.context";
import AutoCompleteRecipe from "./AutoCompleteRecipe";
import RecipeCard from "./RecipeCard";

const SearchColumn = () => {
  const { recipeInFocus } = useAppContext();

  return (
    <div className="flex flex-col gap-10 flex-[3] justify-center items-center pb-48">
      <h1 className="text-4xl font-bold text-center">Welcome to VivaRecipes</h1>
      <p className="text-lg text-center">
        Search your favorite dishes and add them to your meal plan
      </p>
      <AutoCompleteRecipe />
      {recipeInFocus ? <RecipeCard /> : <></>}
    </div>
  );
};

export default SearchColumn;