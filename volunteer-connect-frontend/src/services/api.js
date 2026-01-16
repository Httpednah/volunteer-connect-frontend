const BASE_URL = "http://127.0.0.1:5000";

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getOpportunities() {
  const res = await fetch(`${BASE_URL}/opportunities`);
  return res.json();
}

export async function createOpportunity(data) {
  const res = await fetch(`${BASE_URL}/opportunities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getOrganizations() {
  const res = await fetch(`${BASE_URL}/organizations`);
  return res.json();
}

export async function applyForOpportunity(data) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
