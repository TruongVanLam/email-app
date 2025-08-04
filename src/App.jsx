import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";

import "./App.css";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />} />

      <Route
        path="/"
        element={token ? <MainLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
