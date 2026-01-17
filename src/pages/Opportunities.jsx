// src/pages/Opportunities.jsx
import { useEffect, useState } from "react";
import { getOpportunities } from "../services/api";

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpportunities()
      .then((data) => setOpps(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-head">
          <h2 className="h2">Volunteer Opportunities</h2>
          <p className="p-muted">
            Browse available opportunities and apply to make an impact.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card skeleton-card" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && opps.length === 0 && (
          <div className="empty card">
            <h3>No opportunities yet</h3>
            <p className="p-muted">
              Check back later — organizations will be posting soon.
            </p>
          </div>
        )}

        {/* Opportunities */}
        {!loading && opps.length > 0 && (
          <div className="grid grid-3">
            {opps.map((o) => (
              <div key={o.id} className="card opportunity-card">
                <div className="opportunity-head">
                  <h3 className="opportunity-title">{o.title}</h3>
                  <span className="badge">{o.location}</span>
                </div>

                <p className="p-muted opportunity-desc">
                  {o.description || "No description provided."}
                </p>

                <div className="opportunity-foot">
                  <span className="opportunity-meta">
                    ⏱ {o.duration ? `${o.duration} hrs` : "Flexible"}
                  </span>
                  <button className="btn btn-primary btn-sm">Apply</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
