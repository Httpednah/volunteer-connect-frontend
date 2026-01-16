import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Volunteer Connect</h1>
      <p>Connecting volunteers with organizations</p>
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </div>
  );
}
