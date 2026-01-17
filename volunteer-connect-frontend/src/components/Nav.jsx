import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/opportunities" style={{ marginRight: "1rem" }}>Opportunities</Link>
      <Link to="/create-opportunity" style={{ marginRight: "1rem" }}>Create Opportunity</Link>
      <Link to="/organization" style={{ marginRight: "1rem" }}>Organization</Link>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
    </nav>
  );
}
