import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await apiLogin(email, password);
      const token = result.access_token;
      login(token);
      localStorage.setItem("email", result.email);
      localStorage.setItem("role", result.role);
      localStorage.setItem("user_id", result.user_id);

      navigate("/");
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
