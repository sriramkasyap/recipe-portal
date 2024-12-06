import { createContext, useContext, useEffect, useState } from "react";
import { login, verifyUser } from "../services/Auth.service";
import { Recipe } from "../types/Recipe.type";
import { CredentialResponse, User } from "../types/User.type";
type AppContextType = {
  user: User | null;
  verifyingUser: boolean;
  handleAuthSuccess: (credentialResponse: any) => void;
  handleAuthError: () => void;
  recipeInFocus: Recipe | null;
  setRecipeInFocus: (recipe: Recipe | null) => void;
};

const AppContext = createContext<AppContextType>({
  user: null,
  verifyingUser: true,
  handleAuthSuccess: () => {},
  handleAuthError: () => {},
  recipeInFocus: null,
  setRecipeInFocus: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [verifyingUser, setVerifyingUser] = useState(true);
  const [recipeInFocus, setRecipeInFocus] = useState<Recipe | null>(null);

  const handleAuthSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      return;
    }

    setVerifyingUser(true);

    login(credentialResponse).then((user: User) => {
      setCurrentUser(user);
      setVerifyingUser(false);
    });
  };

  const handleAuthError = () => {
    console.log("Google Login Failed");
  };

  useEffect(() => {
    verifyUser().then((user: User) => {
      setCurrentUser(user);
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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
