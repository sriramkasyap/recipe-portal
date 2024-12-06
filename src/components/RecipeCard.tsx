import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../contexts/App.context";
import useAddRecipeToMeal from "../hooks/useAddRecipeToMeal";

const RecipeCard = () => {
  const { recipeInFocus, setRecipeInFocus } = useAppContext();

  const { handleAddToMealPlan, addingToMealPlan } = useAddRecipeToMeal();

  return (
    recipeInFocus && (
      <div className="w-full max-w-md">
        <div className="p-4 rounded-lg shadow-lg border border-gray-200 bg-opacity-50 backdrop-blur-md bg-gray-100">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 hover:bg-gray-200 rounded-full p-1"
            onClick={() => setRecipeInFocus(null)}
          >
            <FaTimes color="gray" size={18} />
          </button>
          <h5 className="text-xl text-center font-bold border-b border-gray-200 pb-3">
            {recipeInFocus?.title}
          </h5>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-base font-medium text-gray-700 mt-2 mb-1 text-center underline underline-offset-4 decoration-gray-400">
              Ingredients
            </p>
            <div className="flex flex-col gap-2 items-center">
              {Object.values(recipeInFocus?.ingredients).map((ingredient) => (
                <p
                  key={ingredient._id || ingredient.name}
                  className="text-sm text-gray-500"
                >
                  {ingredient.name}{" "}
                  {ingredient.quantity &&
                    ingredient.quantity > 0 &&
                    `x ${ingredient.quantity}`}
                  {ingredient.units && ` ${ingredient.units}`}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-2 my-2">
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors duration-300"
                onClick={handleAddToMealPlan}
                disabled={addingToMealPlan}
              >
                {addingToMealPlan ? "Adding..." : "Add to Meal Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RecipeCard;
