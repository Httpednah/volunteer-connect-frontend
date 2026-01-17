// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          {/* Left */}
          <div className="hero-content">
            <span className="badge badge-primary">Volunteer Platform</span>

            <h1 className="h1 hero-title">
              Volunteer <span className="accent">Connect</span>
            </h1>

            <p className="hero-text">
              Connecting passionate volunteers with organizations that need real
              impact. Discover opportunities, apply easily, and make a
              difference in your community.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hero-card">
            <div className="stat">
              <span className="stat-number">120+</span>
              <span className="stat-label">Opportunities</span>
            </div>
            <div className="stat">
              <span className="stat-number">45</span>
              <span className="stat-label">Organizations</span>
            </div>
            <div className="stat">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Volunteers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
