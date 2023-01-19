import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import App from "./../App";

const AppProviders = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <App />
    </AuthContext.Provider>
  );
};

export default AppProviders;
