import { createContext, useContext, useEffect, useState } from "react";
import { getMealPlan, markGroceryListItem } from "../services/API.service";
import { login, logout, verifyUser } from "../services/Auth.service";
import { MealPlan, Recipe } from "../types/Recipe.type";
import { CredentialResponse, User } from "../types/User.type";
type AppContextType = {
  user: User | null;
  verifyingUser: boolean;
  handleAuthSuccess: (credentialResponse: any) => void;
  handleAuthError: () => void;
  recipeInFocus: Recipe | null;
  setRecipeInFocus: (recipe: Recipe | null) => void;
  mealPlan: MealPlan | null;
  refetchMealData: () => Promise<void>;
  handleGroceryListCheck: (key: string, checked: boolean) => void;
  handleLogout: () => Promise<void>;
};

const AppContext = createContext<AppContextType>({
  user: null,
  verifyingUser: true,
  handleAuthSuccess: () => {},
  handleAuthError: () => {},
  recipeInFocus: null,
  setRecipeInFocus: () => {},
  mealPlan: null,
  handleGroceryListCheck: () => {},
  refetchMealData: async () => {},
  handleLogout: async () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [verifyingUser, setVerifyingUser] = useState(true);
  const [recipeInFocus, setRecipeInFocus] = useState<Recipe | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

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
    const mealPlan = await getMealPlan();
    setMealPlan(mealPlan);
  };

  const handleGroceryListCheck = async (key: string, checked: boolean) => {
    if (!mealPlan) {
      return;
    }
    const newMealPlan = { ...mealPlan };
    if (newMealPlan?.groceryList) {
      newMealPlan.groceryList[key].checked = checked;
    }

    setMealPlan(newMealPlan);

    await markGroceryListItem(key, checked);
    await refetchMealData();
  };

  const handleLogout = async () => {
    setVerifyingUser(true);
    await logout();
    await refetchMealData();
    setCurrentUser(null);
    setVerifyingUser(false);
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
    refetchMealData,
    handleGroceryListCheck,
    handleLogout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
