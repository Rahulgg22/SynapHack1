
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const data = await loginUser({ email: form.email, password: form.password });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data?.user?.id) localStorage.setItem("userId", String(data.user.id));
        setSuccess("Logged in successfully.");
        navigate("/");
      }
    } catch (e) {
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#111118] py-12" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="bg-white dark:bg-[#23232b] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#111118] dark:text-white text-center">Log in to DevARENA</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">Email</label>
            <input
              placeholder="Email"
              className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring text-[#111118] dark:text-white bg-[#f0f0f4] dark:bg-[#23232b] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6]"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">Password</label>
            <input
              placeholder="Password"
              className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring text-[#111118] dark:text-white bg-[#f0f0f4] dark:bg-[#23232b] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6]"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-5 w-5 rounded border-[#dcdce5] dark:border-[#2a2a30] border-2 bg-transparent text-[#686aed] checked:bg-[#686aed] checked:border-[#686aed] focus:ring-0 focus:ring-offset-0 focus:border-[#dcdce5] focus:outline-none"
              />
              <span className="ml-2 text-[#111118] dark:text-white text-base font-normal leading-normal">Remember me</span>
            </label>
            <span className="text-[#636388] dark:text-[#b3b3c6] text-sm font-normal leading-normal underline cursor-pointer">Forgot password?</span>
          </div>
          {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center mb-2">{success}</div>}
          <button
            type="submit"
            className="w-full bg-[#686aed] text-white py-2 rounded font-bold hover:bg-[#5756c9] transition-colors mb-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-normal leading-normal pt-2 text-center">
          Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
