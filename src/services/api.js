// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  // Try to parse JSON safely
  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore if response isn't JSON
  }

  if (!res.ok) {
    const message = data?.error || data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

// ---------- AUTH ----------
export function registerUser(payload) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---------- OPPORTUNITIES ----------
export function getOpportunities() {
  return request("/opportunities");
}

export function createOpportunity(payload) {
  return request("/opportunities", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
