// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

/**
 * Generic request function to handle fetch calls
 * @param {string} path - API endpoint path
 * @param {object} options - Fetch options
 * @param {object} query - Optional query parameters
 * @returns {Promise<any>} - Parsed JSON response
 */
async function request(path, options = {}, query = {}) {
  // Build query string if provided
  const queryString = Object.keys(query).length
    ? "?" +
      Object.entries(query)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&")
    : "";

  const url = `${BASE_URL}${path}${queryString}`;

  // Add default headers
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  // Try parsing JSON
  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    console.warn("Non-JSON response", err);
  }

  if (!res.ok) {
    const message = data?.error || data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

// ---------- AUTH ----------
export function registerUser(payload) {
  return request("/register", { method: "POST", body: JSON.stringify(payload) });
}

export function loginUser(payload) {
  return request("/login", { method: "POST", body: JSON.stringify(payload) });
}

// ---------- OPPORTUNITIES ----------
export function getOpportunities(query = {}) {
  return request("/opportunities", {}, query);
}

export function createOpportunity(payload) {
  return request("/opportunities", { method: "POST", body: JSON.stringify(payload) });
}

export function updateOpportunity(id, payload) {
  return request(`/opportunities/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteOpportunity(id) {
  return request(`/opportunities/${id}`, { method: "DELETE" });
}

// ---------- APPLICATIONS ----------
export function getApplications(query = {}) {
  return request("/applications", {}, query);
}

export function getApplication(id) {
  return request(`/applications/${id}`);
}

export function createApplication(payload) {
  return request("/applications", { method: "POST", body: JSON.stringify(payload) });
}

// ---------- PAYMENTS ----------
export function createPayment(payload) {
  return request("/payments", { method: "POST", body: JSON.stringify(payload) });
}

// ---------- ORGANIZATIONS ----------
export function getOrganizations() {
  return request("/organizations");
}

export function createOrganization(payload) {
  return request("/organizations", { method: "POST", body: JSON.stringify(payload) });
}
