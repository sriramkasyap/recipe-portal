import GroceryListColumn from "../components/GroceryListColumn";
import SearchColumn from "../components/SearchColumn";
import { useAppContext } from "../contexts/App.context";

const HomeScreen = () => {
  const { mealPlan } = useAppContext();
  return (
    <div className="flex w-full h-screen flex-row justify-center items-stretch gap-10">
      <SearchColumn />
      {mealPlan && mealPlan.recipes.length > 0 && <GroceryListColumn />}
    </div>
  );
};

export default HomeScreen;
