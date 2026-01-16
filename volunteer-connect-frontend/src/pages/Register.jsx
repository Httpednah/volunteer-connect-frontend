import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

/**
 * Register Page: Allows new users to create an account.
 * Demonstrates: Role selection and multi-field form state.
 */
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(form);
      if (res.error) {
        setError(res.error);
      } else {
        // Success: navigate to login
        navigate("/login");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Create an account</h2>
        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Enter your details to register.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
              required
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Role selection */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleRoleChange("volunteer")}
              className={`w-full px-4 py-2 rounded ${
                form.role === "volunteer"
                  ? "bg-blue-500 text-white"
                  : "border bg-white dark:bg-slate-700 dark:text-white"
              }`}
            >
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("organization")}
              className={`w-full px-4 py-2 rounded ${
                form.role === "organization"
                  ? "bg-blue-500 text-white"
                  : "border bg-white dark:bg-slate-700 dark:text-white"
              }`}
            >
              Organization
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
