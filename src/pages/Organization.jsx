// src/pages/Organization.jsx
import { useState } from "react";
import { createOpportunity } from "../services/api";
import { Link } from "react-router-dom";

/**
 * Organization Dashboard: Allows organizations to post new opportunities.
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
  const [loading, setLoading] = useState(false);

  // Simulated organization context
  // In a real app, you'd fetch the org by owner_id or store org info after login.
  const user = { isLoggedIn: true, role: "organization" };
  const org = { id: 1, name: "Helping Hands" };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!user?.isLoggedIn || user.role !== "organization") {
      setError(
        "Unauthorized: You must be an organization to create opportunities.",
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        organization_id: org.id,
      };

      const res = await createOpportunity(payload);

      if (res?.id) {
        setSuccess("Opportunity created successfully!");
        setForm({ title: "", description: "", location: "", duration: "" });
      } else {
        setError(res?.error || "Failed to create opportunity.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the opportunity.");
    } finally {
      setLoading(false);
    }
  };

  // Access denied
  if (!user?.isLoggedIn || user.role !== "organization") {
    return (
      <div className="page">
        <div className="container center-wrap">
          <div className="card center-card">
            <h1 className="h2">Access Denied</h1>
            <p className="p-muted">
              You must be logged in as an Organization to view this page.
            </p>
            <div
              className="row"
              style={{ justifyContent: "center", marginTop: 12 }}
            >
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/" className="btn btn-ghost">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="dash-head">
          <div>
            <h1 className="h2">Organization Dashboard</h1>
            <p className="p-muted">
              Post opportunities and manage volunteer applications.
            </p>
          </div>

          <div className="dash-actions">
            <Link to="/" className="btn btn-ghost">
              Home
            </Link>
            <Link to="/opportunities" className="btn btn-primary">
              View Opportunities
            </Link>
          </div>
        </div>

        <div className="grid grid-2">
          {/* Left: org summary */}
          <div className="card">
            <div className="section-head">
              <h3 className="section-title">Organization</h3>
              <span className="badge badge-primary">Active</span>
            </div>
            <div className="org-box">
              <div className="org-avatar">{org.name.slice(0, 1)}</div>
              <div>
                <div className="org-name">{org.name}</div>
                <div className="p-muted" style={{ fontSize: 13 }}>
                  Create volunteer opportunities for your community.
                </div>
              </div>
            </div>

            <hr className="hr" />

            <div className="grid grid-2">
              <div className="mini-stat card" style={{ padding: 14 }}>
                <div className="mini-stat-label">Posted</div>
                <div className="mini-stat-value" style={{ fontSize: 26 }}>
                  —
                </div>
                <div className="mini-stat-sub p-muted">Opportunities</div>
              </div>
              <div className="mini-stat card" style={{ padding: 14 }}>
                <div className="mini-stat-label">Applicants</div>
                <div className="mini-stat-value" style={{ fontSize: 26 }}>
                  —
                </div>
                <div className="mini-stat-sub p-muted">This week</div>
              </div>
            </div>
          </div>

          {/* Right: create opportunity form */}
          <div className="card">
            <div className="section-head">
              <h3 className="section-title">Post a new opportunity</h3>
              <span className="p-muted" style={{ fontSize: 13 }}>
                Takes ~30 seconds
              </span>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="form">
              <div>
                <label className="label">Title</label>
                <input
                  name="title"
                  placeholder="e.g. Beach Cleanup"
                  value={form.title}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  placeholder="What will volunteers do? What should they bring?"
                  value={form.description}
                  onChange={handleChange}
                  className="textarea"
                  required
                />
              </div>

              <div className="grid grid-2">
                <div>
                  <label className="label">Location</label>
                  <input
                    name="location"
                    placeholder="e.g. Nairobi"
                    value={form.location}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Duration (hours)</label>
                  <input
                    name="duration"
                    type="number"
                    min="1"
                    placeholder="e.g. 4"
                    value={form.duration}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Opportunity"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
