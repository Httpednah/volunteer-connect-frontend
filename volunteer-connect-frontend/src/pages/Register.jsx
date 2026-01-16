import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await registerUser(form);
    alert(JSON.stringify(res));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="volunteer">Volunteer</option>
        <option value="organization">Organization</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
