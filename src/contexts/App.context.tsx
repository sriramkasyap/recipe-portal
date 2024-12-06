import { createContext, useContext, useEffect, useState } from "react";
import { getMealPlanAndGroceryList } from "../services/API.service";
import { login, verifyUser } from "../services/Auth.service";
import { GroceryList, MealPlan, Recipe } from "../types/Recipe.type";
import { CredentialResponse, User } from "../types/User.type";
type AppContextType = {
  user: User | null;
  verifyingUser: boolean;
  handleAuthSuccess: (credentialResponse: any) => void;
  handleAuthError: () => void;
  recipeInFocus: Recipe | null;
  setRecipeInFocus: (recipe: Recipe | null) => void;
  mealPlan: MealPlan | null;
  groceryList: GroceryList | null;
  refetchMealData: () => Promise<void>;
};

const AppContext = createContext<AppContextType>({
  user: null,
  verifyingUser: true,
  handleAuthSuccess: () => {},
  handleAuthError: () => {},
  recipeInFocus: null,
  setRecipeInFocus: () => {},
  mealPlan: null,
  groceryList: null,
  refetchMealData: async () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [verifyingUser, setVerifyingUser] = useState(true);
  const [recipeInFocus, setRecipeInFocus] = useState<Recipe | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryList | null>(null);

  const handleAuthSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      return;
    }

    setVerifyingUser(true);

    login(credentialResponse).then(async (user: User) => {
      await refetchMealData();
      setCurrentUser(user);
      setVerifyingUser(false);
    });
  };

  const handleAuthError = () => {
    console.log("Google Login Failed");
  };

  const refetchMealData = async () => {
    const { mealPlan, groceryList } = await getMealPlanAndGroceryList();
    setMealPlan(mealPlan);
    setGroceryList(groceryList);
  };

  useEffect(() => {
    verifyUser().then(async (user: User) => {
      if (user) {
        await refetchMealData();
        setCurrentUser(user);
      }
      setVerifyingUser(false);
    });
  }, []);

  const value: AppContextType = {
    user: currentUser,
    verifyingUser,
    handleAuthSuccess,
    handleAuthError,
    recipeInFocus,
    setRecipeInFocus,
    mealPlan,
    groceryList,
    refetchMealData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
