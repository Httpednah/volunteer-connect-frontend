import React from "react";
import { Link } from "react-router-dom";

/**
 * Volunteer Dashboard: Shows the volunteer's specialized view.
 * Demonstrates: A simple styled placeholder for future expansion.
 */
export default function VolunteerDashboard() {
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
        <section className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Welcome to your dashboard!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This area will eventually show the volunteer opportunities you've applied for.
          </p>
          <Link
            to="/opportunities"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Browse More Opportunities
          </Link>
        </section>
      </div>
    </div>
  );
}
