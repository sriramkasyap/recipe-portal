import { useAppContext } from "./contexts/App.context";
import HomeScreen from "./pages/Home.page";
import LoadingScreen from "./pages/Loading.page";
import LoginScreen from "./pages/Login.page";

const Router = () => {
  const { user, verifyingUser } = useAppContext();

  return verifyingUser ? (
    <LoadingScreen />
  ) : user ? (
    <HomeScreen />
  ) : (
    <LoginScreen />
  );
};

export default Router;
