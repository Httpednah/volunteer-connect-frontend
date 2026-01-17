// src/pages/VolunteerDashboard.jsx
import { useEffect, useState } from "react";
import { getOpportunities } from "../services/api";
import { Link } from "react-router-dom";

export default function VolunteerDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const data = await getOpportunities();
        setOpportunities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
        setError(err?.message || "Failed to load opportunities.");
      } finally {
        setLoading(false);
      }
    }
    fetchOpportunities();
  }, []);

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="dash-head">
          <div>
            <h1 className="h2">Volunteer Dashboard</h1>
            <p className="p-muted">
              Track opportunities and take action quickly.
            </p>
          </div>

          <div className="dash-actions">
            <Link to="/" className="btn btn-ghost">
              Home
            </Link>
            <Link to="/opportunities" className="btn btn-primary">
              Browse Opportunities
            </Link>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-3">
          <div className="card mini-stat">
            <div className="mini-stat-top">
              <span className="mini-stat-label">Available</span>
              <span className="badge badge-primary">Live</span>
            </div>
            <div className="mini-stat-value">
              {loading ? "…" : opportunities.length}
            </div>
            <div className="mini-stat-sub p-muted">
              Opportunities you can apply to
            </div>
          </div>

          <div className="card mini-stat">
            <div className="mini-stat-top">
              <span className="mini-stat-label">Applications</span>
              <span className="badge">Coming soon</span>
            </div>
            <div className="mini-stat-value">—</div>
            <div className="mini-stat-sub p-muted">
              Status tracking will appear here
            </div>
          </div>

          <div className="card mini-stat">
            <div className="mini-stat-top">
              <span className="mini-stat-label">Payments</span>
              <span className="badge">Coming soon</span>
            </div>
            <div className="mini-stat-value">—</div>
            <div className="mini-stat-sub p-muted">
              Confirm paid registrations
            </div>
          </div>
        </div>

        <div style={{ height: 16 }} />

        {/* Opportunities list */}
        <div className="card">
          <div className="section-head">
            <h3 className="section-title">Available Opportunities</h3>
            <span className="p-muted" style={{ fontSize: 13 }}>
              Showing latest posts
            </span>
          </div>

          {loading && (
            <div className="grid grid-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card skeleton-card" />
              ))}
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              Error fetching opportunities: {error}
            </div>
          )}

          {!loading && !error && opportunities.length === 0 && (
            <div className="empty">
              <h3 style={{ marginTop: 0 }}>No opportunities available yet</h3>
              <p className="p-muted">
                Check back later — organizations will be posting soon.
              </p>
              <Link to="/opportunities" className="btn btn-primary">
                Refresh list
              </Link>
            </div>
          )}

          {!loading && !error && opportunities.length > 0 && (
            <div className="dash-list">
              {opportunities.slice(0, 8).map((opp) => (
                <div key={opp.id} className="dash-item">
                  <div className="dash-item-main">
                    <h4 className="dash-item-title">{opp.title}</h4>
                    <div className="dash-meta">
                      <span className="badge">
                        {opp.location || "Location TBA"}
                      </span>
                      <span className="dash-dot">•</span>
                      <span className="p-muted" style={{ fontSize: 13 }}>
                        {opp.duration
                          ? `${opp.duration} hour(s)`
                          : "Flexible duration"}
                      </span>
                    </div>
                  </div>

                  <div className="dash-item-actions">
                    <Link to="/opportunities" className="btn btn-ghost btn-sm">
                      View
                    </Link>
                    <button className="btn btn-primary btn-sm">Apply</button>
                  </div>
                </div>
              ))}

              <div className="dash-footer">
                <Link to="/opportunities" className="btn btn-ghost">
                  View all opportunities →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
