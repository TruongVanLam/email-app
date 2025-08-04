import { useState } from "react";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
