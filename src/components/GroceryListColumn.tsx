import { FaTrashAlt } from "react-icons/fa";
import { useAppContext } from "../contexts/App.context";

const GroceryListColumn = () => {
  const { mealPlan } = useAppContext();

  return (
    <div className="gap-10 border-l border-gray-300 px-2  flex-1 bg-gray-100 py-48">
      <h2 className="text-4xl font-bold text-center my-2">My Meal Plan</h2>

      <div className="flex flex-row flex-wrap gap-10 justify-center items-center my-10">
        {mealPlan?.recipes.map((recipe) => (
          <div className="border border-gray-300 rounded-md py-2 px-3 bg-white flex flex-row justify-between items-center gap-4">
            <p className="text-base font-medium">{recipe.title}</p>
            <button className="text-red-500 hover:text-red-600">
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryListColumn;
