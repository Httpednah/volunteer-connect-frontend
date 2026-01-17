// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(res));

      // Match your App.jsx routes
      if (res.role === "volunteer") navigate("/dashboard");
      else if (res.role === "organization") navigate("/organization");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container auth-wrap">
        <div className="auth-card card">
          <div className="auth-head">
            <h2 className="h2">Welcome back</h2>
            <p className="p-muted">
              Login to continue volunteering and managing opportunities.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="auth-foot">
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
