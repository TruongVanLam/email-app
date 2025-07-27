import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../api/api";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      const token = result.access_token;
      onLoginSuccess(token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", result.email);
      localStorage.setItem("role", result.role);
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-full">
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
