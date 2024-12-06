import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../contexts/App.context";
import { getRecipes } from "../services/Recipe.service";
import { Recipe } from "../types/Recipe.type";

const AutoCompleteRecipe = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<any>();
  const { setRecipeInFocus } = useAppContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (value) {
        const recipes = await getRecipes(value);

        setSuggestions(recipes);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        placeholder="Hot and Sour Soup, Lauki Kofta Curry..."
        className={
          "w-full p-3 border text-center text-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
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

      {suggestions.length > 0 && (
        <div className="absolute w-full mx-auto bg-white border border-gray-300 rounded-br-2xl rounded-bl-2xl shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer text-center border-gray-300"
              onClick={() => {
                setRecipeInFocus(suggestion);
                setSuggestions([]);
                inputRef.current && (inputRef.current.value = "");
              }}
            >
              <p className="text-center">{suggestion.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteRecipe;
