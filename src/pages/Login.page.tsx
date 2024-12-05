import { GoogleLogin } from "@react-oauth/google";
import { useAppContext } from "../contexts/App.context";

const LoginScreen = () => {
  const { handleAuthSuccess, handleAuthError } = useAppContext();

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-20">
      <h1 className="text-4xl font-bold">Welcome to VivaRecipes</h1>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-bold text-center">
          Sign in to your account to continue
        </h2>
        <GoogleLogin
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          size="large"
          theme="filled_black"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
