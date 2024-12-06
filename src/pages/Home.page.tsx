import AutoCompleteRecipe from "../components/AutoCompleteRecipe";
import RecipeCard from "../components/RecipeCard";

const HomeScreen = () => {
  return (
    <div className="flex w-full h-screen flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold text-center">Welcome to VivaRecipes</h1>
      <p className="text-lg text-center">
        Search your favorite recipes and add them to your meal plan
      </p>
      <AutoCompleteRecipe />
      <RecipeCard />
    </div>
  );
};

export default HomeScreen;
