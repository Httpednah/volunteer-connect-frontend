// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

/**
 * Register Page: Allows new users to create an account.
 * Handles role selection, validation, and backend connection.
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
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
        setLoading(false);
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
    <div className="page">
      <div className="container auth-wrap">
        <div className="auth-card card">
          <div className="auth-head">
            <h2 className="h2">Create an account</h2>
            <p className="p-muted">Enter your details to register.</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div>
              <label className="label">Name</label>
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="input"
                required
              />
              <p className="hint">Use at least 8 characters.</p>
            </div>

            {/* Role selection */}
            <div>
              <label className="label">Account type</label>
              <div className="segmented">
                <button
                  type="button"
                  onClick={() => handleRoleChange("volunteer")}
                  className={`segmented-btn ${
                    form.role === "volunteer" ? "active" : ""
                  }`}
                >
                  Volunteer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("organization")}
                  className={`segmented-btn ${
                    form.role === "organization" ? "active" : ""
                  }`}
                >
                  Organization
                </button>
              </div>
              <p className="hint">
                {form.role === "volunteer"
                  ? "Browse opportunities and apply with a message."
                  : "Post opportunities and manage applicants."}
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <p className="auth-foot">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
