import { FaSpinner } from "react-icons/fa";
import GroceryListColumn from "../components/GroceryListColumn";
import SearchColumn from "../components/SearchColumn";
import { useAppContext } from "../contexts/App.context";

const HomeScreen = () => {
  const { mealPlan, handleLogout, verifyingUser } = useAppContext();
  return (
    <div className="flex w-full h-screen flex-row justify-center items-stretch gap-10">
      <div className="flex flex-row justify-center items-center gap-4 absolute top-5 left-5">
        <button
          onClick={handleLogout}
          disabled={verifyingUser}
          className=" text-gray-600 px-4 py-2 rounded-md hover:text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-300"
        >
          {verifyingUser ? <FaSpinner /> : "Logout"}
        </button>
      </div>
      <SearchColumn />
      {mealPlan && mealPlan.recipes.length > 0 && <GroceryListColumn />}
    </div>
  );
};

export default HomeScreen;
