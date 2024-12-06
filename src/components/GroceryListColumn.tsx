import { useState } from "react";
import GroceryListCard from "./GroceryListCard";
import MealPlanCard from "./MealPlanCard";

const GroceryListColumn = () => {
  const [activeTab, setActiveTab] = useState<"mealPlan" | "groceryList">(
    "mealPlan"
  );
  return (
    <div className=" border-l border-gray-300 px-2  flex-[2] bg-gray-100 py-24 flex flex-col items-center">
      <div className="flex flex-row gap-4 justify-center">
        <button
          className={`text-sm px-4 py-1 rounded-2xl cursor-pointer border-blue-500 border ${
            activeTab === "mealPlan" ? "text-white bg-blue-500" : ""
          }`}
          onClick={() => setActiveTab("mealPlan")}
        >
          Meal Plan
        </button>
        <button
          className={`text-sm px-4 py-1 rounded-2xl cursor-pointer border-blue-500 border ${
            activeTab === "groceryList" ? "text-white bg-blue-500" : ""
          }`}
          onClick={() => setActiveTab("groceryList")}
        >
          Grocery List
        </button>
      </div>
      {activeTab === "mealPlan" && <MealPlanCard />}
      {activeTab === "groceryList" && <GroceryListCard />}
    </div>
  );
};

export default GroceryListColumn;
