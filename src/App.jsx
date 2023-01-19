import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { routes } from "./routes";
import Err404 from "./components/pages/Err404";
import Home from "./components/pages/Home";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          if (route.auth && !isAuth) {
            return <Route path="*" element={<Err404 />} key="Not-found" />;
          }

          if (route.path === "/auth" && isAuth) {
            return <Route path="*" element={<Err404 />} key="Not-found" />;
          }

          return (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
