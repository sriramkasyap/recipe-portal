import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { AppContextProvider } from "./contexts/App.context";
import Router from "./Router";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

function App() {
  return (
    <AppContextProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Router />
      </GoogleOAuthProvider>
    </AppContextProvider>
  );
}

export default App;
