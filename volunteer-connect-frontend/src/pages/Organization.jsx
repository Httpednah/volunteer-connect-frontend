import React, { useState } from "react";
import { createOpportunity } from "../services/api";
import { Link } from "react-router-dom";

/**
 * Organization Dashboard: Allows organizations to post new opportunities.
 * Demonstrates: Simple form with title, description, location, and duration.
 */
export default function Organization() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Simulated user: In real app, fetch from auth context or localStorage
  const user = { id: 1, role: "organization" }; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!user || user.role !== "organization") {
      setError("Unauthorized: You must be an organization to create opportunities.");
      return;
    }

    try {
      const payload = { ...form, organization_id: user.id };
      const res = await createOpportunity(payload);
      if (res.id) {
        setSuccess("Opportunity created successfully!");
        setForm({ title: "", description: "", location: "", duration: "" });
      } else {
        setError("Failed to create opportunity.");
      }
    } catch {
      setError("An error occurred while creating the opportunity.");
    }
  };

  // Show access denied if user is not an organization
  if (!user || user.role !== "organization") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50 dark:bg-slate-900 px-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Access Denied</h1>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          You must be logged in as an Organization to view this page.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 border rounded hover:bg-slate-200 dark:hover:bg-slate-700">
            Login
          </Link>
          <Link to="/" className="px-4 py-2 border rounded hover:bg-slate-200 dark:hover:bg-slate-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 dark:text-white">Organization Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded shadow-md border border-slate-200 dark:border-slate-700">
          <input
            name="title"
            placeholder="Opportunity Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
            required
          />
          <textarea
            name="description"
            placeholder="Detailed Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            name="duration"
            type="number"
            placeholder="Estimated Duration (hours)"
            value={form.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
            required
          />

          {success && <p className="text-green-600 dark:text-green-400">{success}</p>}
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
