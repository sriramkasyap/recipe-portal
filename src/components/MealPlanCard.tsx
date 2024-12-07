import { FaTrashAlt } from "react-icons/fa";

import { FaSpinner } from "react-icons/fa";
import { useAppContext } from "../contexts/App.context";
import useRemoveRecipe from "../hooks/useRemoveRecipe";

const MealPlanCard = () => {
  const { mealPlan } = useAppContext();
  const { handleRemoveRecipe, removingRecipe } = useRemoveRecipe();
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <h3 className="text-2xl font-bold text-center my-2">Meal Plan</h3>

      <div className="flex flex-col gap-2 justify-center items-center p-4">
        {mealPlan?.recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border border-gray-300 rounded-md py-2 px-3 bg-white flex flex-row justify-between items-center gap-4 max-w-fit min-w-72"
          >
            <p className="text-base font-medium">{recipe.title}</p>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleRemoveRecipe(recipe._id)}
              disabled={removingRecipe}
            >
              {removingRecipe ? <FaSpinner /> : <FaTrashAlt />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanCard;
