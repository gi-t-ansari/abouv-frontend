import React from "react";
import { Dashboard, Login, Register } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { APP_URL } from "./config";

function App() {
  const authToken = localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_URL.DASHBOARD}
          element={
            !!authToken ? (
              <Dashboard />
            ) : (
              <Navigate to={APP_URL.LOGIN} replace />
            )
          }
        />
        <Route
          path={APP_URL.LOGIN}
          element={
            !!authToken ? <Navigate to={APP_URL.HOME} replace /> : <Login />
          }
        />
        <Route path={APP_URL.REGISTER} element={<Register />} />
        <Route
          path="*"
          element={
            <Navigate
              to={!!authToken ? APP_URL.DASHBOARD : APP_URL.LOGIN}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
