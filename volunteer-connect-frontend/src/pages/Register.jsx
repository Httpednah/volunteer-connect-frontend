import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "volunteer" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRoleChange = (role) => setForm({ ...form, role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await registerUser(form);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="Join Volunteer Connect"
      subtitle="Sign up to browse or post opportunities and make an impact!"
    >
      <Card className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <input
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              required
            />
            <p className="text-sm text-slate-500 mt-1">
              Use at least 8 characters.
            </p>
          </div>

          {/* Role selection */}
          <div>
            <label className="block font-semibold mb-2">Account Type</label>
            <div className="flex gap-2">
              {["volunteer", "organization"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`flex-1 py-2 rounded-lg font-medium transition ${
                    form.role === role
                      ? "bg-blue-500 text-white shadow-lg"
                      : "border bg-white dark:bg-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {form.role === "volunteer"
                ? "Browse opportunities and apply with a message."
                : "Post opportunities and manage applicants."}
            </p>
          </div>

          {/* Error / Success */}
          {error && <p className="text-red-500 font-medium">{error}</p>}
          {success && <p className="text-green-500 font-medium">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm mt-3 text-slate-600 dark:text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </PageLayout>
  );
}
