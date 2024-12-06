import { useRef } from "react";
import useGenerateRecipe from "../hooks/useGenerateRecipe";
const GenerateRecipeBlock = () => {
  const titleRef = useRef<HTMLInputElement>(null);

  const { generatingRecipe, handleGenerateRecipe } =
    useGenerateRecipe(titleRef);

  return (
    <>
      <div className="w-full h-[1px] bg-gray-200"></div>

      <div className="flex flex-col gap-4 items-center my-4">
        <p className="text-lg text-center">
          Didn't find the dish you are looking for?
        </p>
        <div className="my-2 flex flex-col gap-4 items-center w-full">
          <input
            ref={titleRef}
            type="text"
            placeholder="Enter the dish name"
            className="w-full p-2 border text-center text-base border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-3xl"
          />
          <button
            onClick={handleGenerateRecipe}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={generatingRecipe}
          >
            {generatingRecipe ? "Generating..." : "Generate Recipe"}
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateRecipeBlock;
