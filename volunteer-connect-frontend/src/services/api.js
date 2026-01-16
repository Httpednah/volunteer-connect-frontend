/**
 * This file contains all the functions to communicate with our Backend (Flask API).
 * We use 'fetch' to send HTTP requests.
 */

const BASE_URL = "http://127.0.0.1:5000";

/**
 * Sends user data to the server to create a new account.
 * @param {Object} data - Contains name, email, password, and role.
 */
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Authenticates a user with email and password.
 * @param {Object} data - Contains email and password.
 */
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Fetches the list of all volunteer opportunities from the database.
 */
export async function getOpportunities() {
  const res = await fetch(`${BASE_URL}/opportunities`);
  return res.json();
}

/**
 * Used by Organizations to create a new volunteer work post.
 * @param {Object} data - Title, description, location, duration, etc.
 */
export async function createOpportunity(data) {
  const res = await fetch(`${BASE_URL}/opportunities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Retrieves a list of all organizations.
 */
export async function getOrganizations() {
  const res = await fetch(`${BASE_URL}/organizations`);
  return res.json();
}

/**
 * Sends a request for a volunteer to join an opportunity.
 * @param {Object} data - User ID and Opportunity ID.
 */
export async function applyForOpportunity(data) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
