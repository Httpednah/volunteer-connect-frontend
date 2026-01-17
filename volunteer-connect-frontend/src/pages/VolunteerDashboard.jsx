import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOpportunities } from "../services/api";

export default function VolunteerDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
        setError("Could not load opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold dark:text-white">Volunteer Dashboard</h1>
          <div className="flex gap-4 items-center">
            <Link
              to="/"
              className="px-4 py-2 border rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Home
            </Link>
          </div>
        </header>

        {/* Dashboard Section */}
        <section className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Available Volunteer Opportunities
          </h2>

          {loading ? (
            <p className="text-slate-600 dark:text-slate-400">Loading opportunities...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : opportunities.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No opportunities available yet.</p>
          ) : (
            <ul className="space-y-4">
              {opportunities.map((opp) => (
                <li
                  key={opp.id}
                  className="p-4 border rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <h3 className="text-lg font-semibold dark:text-white">{opp.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{opp.location}</p>
                  <Link
                    to={`/opportunities/${opp.id}`}
                    className="mt-2 inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
