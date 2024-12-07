import { FaSpinner } from "react-icons/fa";
import { useAppContext } from "../contexts/App.context";
import AutoCompleteRecipe from "./AutoCompleteRecipe";
import RecipeCard from "./RecipeCard";

const SearchColumn = () => {
  const { recipeInFocus, handleLogout, verifyingUser } = useAppContext();

  return (
    <div className="h-full md:h-screen w-full md:flex-[3]">
      <div className="flex flex-row gap-4 p-5">
        <button
          onClick={handleLogout}
          disabled={verifyingUser}
          className=" text-gray-600 px-4 py-2 rounded-md hover:text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
        >
          {verifyingUser ? <FaSpinner /> : "Logout"}
        </button>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center p-4 pb-10 md:pb-96 h-full">
        <img src="/VivaRecipe.png" alt="Viva Recipes" className="w-48" />
        <h1 className="md:text-4xl text-3xl font-bold text-center">
          Welcome to VivaRecipe
        </h1>
        <p className="md:text-lg text-sm text-center">
          Search your favorite dishes and add them to your meal plan
        </p>
        <AutoCompleteRecipe />
        {recipeInFocus ? <RecipeCard /> : <></>}
      </div>
    </div>
  );
};

export default SearchColumn;
