// src/pages/Applications.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../services/api"; // make sure this exists

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getApplications(); // GET /applications
        console.log("Fetched applications:", data);
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
          <div className="flex gap-4 items-center">
            <Link
              to="/dashboard"
              className="px-4 py-2 border rounded hover:bg-pink-200"
            >
              Dashboard
            </Link>
          </div>
        </header>

        {/* Applications Section */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {loading && (
            <p className="text-gray-500">Loading applications...</p>
          )}

          {error && (
            <p className="text-red-500">Error fetching applications: {error}</p>
          )}

          {!loading && !error && applications.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              You haven't applied to any opportunities yet.
            </p>
          )}

          {!loading && !error && applications.length > 0 && (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li
                  key={app.id}
                  className="p-4 border rounded hover:bg-pink-100 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {app.opportunity_title || "Opportunity Title"}
                      </h3>
                      <p className="text-gray-600">{app.opportunity_location}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Applied on: {new Date(app.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Status:{" "}
                        <span className={`font-semibold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                          {app.status || "Pending"}
                        </span>
                      </p>
                    </div>
                    <Link
                      to={`/applications/${app.id}`}
                      className="px-3 py-1 bg-pink-400 text-white rounded hover:bg-pink-500"
                    >
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
