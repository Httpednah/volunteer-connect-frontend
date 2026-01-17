const BASE_URL = "http://127.0.0.1:5000";

// ---------- AUTH ----------
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to register");
  }
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to login");
  }
  return res.json();
}

// ---------- OPPORTUNITIES ----------
export async function getOpportunities() {
  const res = await fetch(`${BASE_URL}/opportunities`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch opportunities");
  }
  return res.json();
}

export async function createOpportunity(data) {
  const res = await fetch(`${BASE_URL}/opportunities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create opportunity");
  }
  return res.json();
}
