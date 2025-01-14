import { GoogleLogin } from "@react-oauth/google";
import { useAppContext } from "../contexts/App.context";

const LoginScreen = () => {
  const { handleAuthSuccess, handleAuthError } = useAppContext();

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col p-1 gap-5">
      <img src="/VivaRecipe.png" alt="Viva Recipes" className="w-48 " />
      <h1 className="text-4xl font-bold text-center">Welcome to VivaRecipe</h1>
      <div className="flex flex-col gap-5 items-center justify-center">
        <p className="text-2xl font-medium text-center">
          Sign in to your account to get started
        </p>
        <div className="w-full my-10 flex justify-center">
          <GoogleLogin
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
            size="large"
            theme="filled_black"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
