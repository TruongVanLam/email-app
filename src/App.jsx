import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const tokenFromStorage = localStorage.getItem("token");
  const [token, setToken] = useState(tokenFromStorage || null);

  return (
    <div className="w-full">
      {!token ? <Login onLoginSuccess={(t) => setToken(t)} /> : <Dashboard />}
    </div>
  );
}
