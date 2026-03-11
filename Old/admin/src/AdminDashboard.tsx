import React from "react";

export default function AdminDashboard() {
  return (
    <div className="vw-dashboard vw-dashboard-patriotic">
      <header className="vw-header">
        <div className="vw-logo">
          <span className="vw-flag">🇺🇸</span>
          <span className="vw-title">Valor Wave Admin</span>
        </div>
        <nav className="vw-nav">
          <button className="vw-nav-item active">Overview</button>
          <button className="vw-nav-item">Pages</button>
          <button className="vw-nav-item">CMS</button>
          <button className="vw-nav-item">Analytics</button>
        </nav>
      </header>

      <div className="vw-wave-top" />

      <main className="vw-main">
        <section className="vw-grid">
          <div className="vw-card primary">
            <h2>Mission Status</h2>
            <p>All systems operational. Content pipeline is green.</p>
          </div>
          <div className="vw-card">
            <h3>Drafts</h3>
            <p>7 pages in draft</p>
          </div>
          <div className="vw-card">
            <h3>Published</h3>
            <p>24 live pages</p>
          </div>
          <div className="vw-card">
            <h3>Deploys</h3>
            <p>Last deploy: 12 minutes ago</p>
          </div>
        </section>

        <section className="vw-grid wide">
          <div className="vw-card">
            <h3>Service Areas</h3>
            <ul className="vw-list">
              <li>Chattanooga, TN</li>
              <li>North Georgia</li>
              <li>Southeast Tennessee</li>
            </ul>
          </div>
          <div className="vw-card">
            <h3>SEO & Analytics</h3>
            <p>Google Analytics connected</p>
            <p>Search Console verified</p>
          </div>
        </section>
      </main>

      <div className="vw-wave-bottom" />
    </div>
  );
}