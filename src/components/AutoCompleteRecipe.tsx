import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../contexts/App.context";
import useGenerateRecipe from "../hooks/useGenerateRecipe";
import { getRecipes } from "../services/API.service";
import { Recipe } from "../types/Recipe.type";

const AutoCompleteRecipe = () => {
  const [inputText, setInputText] = useState("");
  const [showGenerateRecipe, setShowGenerateRecipe] = useState(false);
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setRecipeInFocus } = useAppContext();

  const { generatingRecipe, handleGenerateRecipe } =
    useGenerateRecipe(inputText);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputText(value);

    if (!value || value.trim().length < 3) {
      setSuggestions([]);
      setShowGenerateRecipe(false);
      return;
    }

    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setShowGenerateRecipe(false);
      if (value) {
        const recipes = await getRecipes(value.trim());

        setSuggestions(recipes);

        if (recipes.length === 0) {
          setShowGenerateRecipe(true);
        }
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-md my-5">
      <input
        type="text"
        ref={inputRef}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Hot and Sour Soup, Lauki Kofta Curry..."
        className={
          "w-full p-2 md:p-3 border text-center text-lg md:text-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
          (suggestions.length > 0
            ? "rounded-tr-3xl rounded-tl-3xl"
            : "rounded-3xl")
        }
      />

      {isLoading && (
        <div className="absolute right-4 top-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}

      {suggestions.length > 0 ? (
        <div className="absolute w-full mx-auto bg-white border border-gray-300 rounded-br-2xl rounded-bl-2xl shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer text-center border-gray-300"
              onClick={() => {
                setRecipeInFocus(suggestion);
                setSuggestions([]);
                setInputText("");
              }}
            >
              <p className="text-center">{suggestion.title}</p>
            </div>
          ))}
        </div>
      ) : (
        showGenerateRecipe && (
          <>
            <div className="flex flex-col gap-4 items-center my-4">
              <p className="text-lg text-center">
                Didn't find the dish you are looking for?
              </p>
              <div className="my-2 flex flex-col gap-4 items-center w-full">
                <button
                  onClick={async () => {
                    await handleGenerateRecipe();
                    setInputText("");
                    setShowGenerateRecipe(false);
                  }}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={generatingRecipe}
                >
                  {generatingRecipe ? "Generating..." : "Generate Recipe"}
                </button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AutoCompleteRecipe;
