import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });

      if (res.error) {
        setError(res.error);
        return;
      }

      // Save user info to localStorage (optional)
      localStorage.setItem("user", JSON.stringify(res));

      // Redirect based on role
      if (res.role === "volunteer") {
        navigate("/volunteer-dashboard");
      } else if (res.role === "organization") {
        navigate("/organization-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-slate-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Login</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}


