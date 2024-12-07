import GroceryListColumn from "../components/GroceryListColumn";
import SearchColumn from "../components/SearchColumn";
import { useAppContext } from "../contexts/App.context";

const HomeScreen = () => {
  const { mealPlan } = useAppContext();
  return (
    <div className="flex w-full min-h-screen flex-col md:flex-row md:justify-center items-stretch gap-10 md:gap-0">
      <SearchColumn />
      {mealPlan && mealPlan.recipes.length > 0 && <GroceryListColumn />}
    </div>
  );
};

export default HomeScreen;
