// src/components/Nav.jsx
import { Link, NavLink, useLocation } from "react-router-dom";

// Simulated user state for demonstration
// In a real app, you'd get this from auth context or API
const user = {
  isLoggedIn: true, // change to false to test logged-out view
  role: "volunteer", // "volunteer" or "organization"
};

export default function Nav() {
  const location = useLocation();

  // Optional: show a small page label (feels "app-like")
  const pageLabelMap = {
    "/": "Home",
    "/login": "Login",
    "/register": "Create account",
    "/opportunities": "Opportunities",
    "/organization": "Organization",
    "/dashboard": "Dashboard",
  };

  const pageLabel = pageLabelMap[location.pathname] || "Volunteer Connect";

  return (
    <header className="nav-wrap">
      <div className="container nav">
        <div className="nav-left">
          <Link to="/" className="brand">
            <span className="brand-dot" />
            Volunteer<span className="brand-accent">Connect</span>
          </Link>

          <span className="nav-divider" />

          <span className="nav-label">{pageLabel}</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Home
          </NavLink>

          {user.isLoggedIn && user.role === "volunteer" && (
            <>
              <NavLink
                to="/opportunities"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Opportunities
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Dashboard
              </NavLink>
            </>
          )}

          {user.isLoggedIn && user.role === "organization" && (
            <>
              <NavLink
                to="/organization"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Organization
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Dashboard
              </NavLink>
            </>
          )}

          {!user.isLoggedIn && (
            <div className="nav-cta">
              <NavLink
                to="/login"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Login
              </NavLink>

              <NavLink to="/register" className="btn btn-primary">
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}