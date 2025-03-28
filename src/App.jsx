import React from "react";
import { Dashboard, Login, Register } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { APP_URL } from "./config";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: token } = useQuery({
    queryKey: ["auth"],
    queryFn: () => localStorage.getItem("token"),
    staleTime: Infinity,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_URL.DASHBOARD}
          element={
            !!token ? <Dashboard /> : <Navigate to={APP_URL.LOGIN} replace />
          }
        />
        <Route
          path={APP_URL.LOGIN}
          element={
            !!token ? <Navigate to={APP_URL.DASHBOARD} replace /> : <Login />
          }
        />
        <Route path={APP_URL.REGISTER} element={<Register />} />
        <Route
          path="*"
          element={
            <Navigate
              to={!!token ? APP_URL.DASHBOARD : APP_URL.LOGIN}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
