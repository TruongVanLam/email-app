import InputField from "./InputField";
import SocialButton from "./SocialButton";

import google from "../assets/google-icon.png";
import apple from "../assets/apple-icon.png";
import twitter from "../assets/twitter-icon.png";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-white space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-500 text-2xl font-bold">🌐</span>
        </div>
        <div className="mt-4 text-2xl font-bold text-black">Welcome back</div>
        <p className="text-gray-500 text-sm">
          Please enter your details to sign in.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <SocialButton icon={apple} alt="Apple" />
        <SocialButton icon={google} alt="Google" />
        <SocialButton icon={twitter} alt="Twitter" />
      </div>

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="px-2 text-xs text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <InputField
          label="E-Mail Address"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              id="chekc-remember"
              type="checkbox"
              className="form-checkbox color-gray"
            />
            Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-black to-gray-800 text-white py-2 rounded-md font-semibold shadow hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account yet?{" "}
        <a href="#" className="text-black font-medium hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
