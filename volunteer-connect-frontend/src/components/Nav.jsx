// src/components/Nav.jsx
import { Link, useLocation } from "react-router-dom";

// Simulated user state for demonstration
// In a real app, you'd get this from auth context or API
const user = {
  isLoggedIn: true, // change to false to test logged-out view
  role: "volunteer", // "volunteer" or "organization"
};

export default function Nav() {
  const location = useLocation();

  const linkStyle = (path) => ({
    marginRight: "1rem",
    textDecoration: location.pathname === path ? "underline" : "none",
  });

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "2rem" }}>
      <Link to="/" style={linkStyle("/")}>Home</Link>

      {user.isLoggedIn && user.role === "volunteer" && (
        <>
          <Link to="/opportunities" style={linkStyle("/opportunities")}>Opportunities</Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
        </>
      )}

      {user.isLoggedIn && user.role === "organization" && (
        <>
          <Link to="/organization" style={linkStyle("/organization")}>Organization</Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
        </>
      )}

      {!user.isLoggedIn && (
        <>
          <Link to="/login" style={linkStyle("/login")}>Login</Link>
          <Link to="/register" style={linkStyle("/register")}>Register</Link>
        </>
      )}
    </nav>
  );
}
