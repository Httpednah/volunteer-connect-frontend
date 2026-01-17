// src/components/Nav.jsx
import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkStyle = ({ isActive }) => ({
    marginRight: "1rem",
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#2563EB" : "#000", // blue for active
  });

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/opportunities" style={linkStyle}>
        Opportunities
      </NavLink>
      <NavLink to="/articles" style={linkStyle}>
        Articles
      </NavLink>
      <NavLink to="/create-opportunity" style={linkStyle}>
        Create Opportunity
      </NavLink>
      <NavLink to="/organization" style={linkStyle}>
        Organization
      </NavLink>
      <NavLink to="/dashboard" style={linkStyle}>
        Dashboard
      </NavLink>
      <NavLink to="/payments" style={linkStyle}>
        Payments
      </NavLink>
      <NavLink to="/login" style={linkStyle}>
        Login
      </NavLink>
      <NavLink to="/register" style={linkStyle}>
        Register
      </NavLink>
    </nav>
  );
}
