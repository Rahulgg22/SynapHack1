import React, { useState } from "react";
import { registerUser } from "../api/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", university: "", organization: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill all required fields");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await registerUser({ name: form.name, email: form.email, password: form.password, university: form.university, organization: form.organization });
      setSuccess("Registered successfully. You can now log in.");
    } catch (e) {
      setError(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#111118] py-12">
      <div className="bg-white dark:bg-[#23232b] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#111118] dark:text-white">Sign up for DevARENA</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="Enter your password" />
          </div>
          <div className="mb-6">
            <label className="block text-[#111118] dark:text-white mb-2">Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="Confirm your password" />
          </div>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="Your name" />
          </div>
          <div className="mb-4">
            <label className="block text-[#111118] dark:text-white mb-2">University</label>
            <input name="university" value={form.university} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="University (optional)" />
          </div>
          <div className="mb-6">
            <label className="block text-[#111118] dark:text-white mb-2">Organization</label>
            <input name="organization" value={form.organization} onChange={handleChange} className="w-full px-3 py-2 border border-[#dcdce5] dark:border-[#2a2a30] rounded focus:outline-none focus:ring" placeholder="Organization (optional)" />
          </div>
          {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center mb-2">{success}</div>}
          <button type="submit" disabled={loading} className="w-full bg-[#686aed] text-white py-2 rounded font-bold hover:bg-[#5756c9] transition-colors disabled:opacity-60">{loading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
}
