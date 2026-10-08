import { useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState("Home");
  const [reportSent, setReportSent] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const menu = [
    "Home",
    "Report Incident",
    "Walking Buddy",
    "Community",
    "Emergency Contacts",
  ];

  const reports = [
    {
      type: "Harassment",
      location: "Andheri West",
      status: "Under Review",
      date: "08 Oct 2026",
    },
    {
      type: "Unsafe Area",
      location: "Bandra East",
      status: "Resolved",
      date: "06 Oct 2026",
    },
    {
      type: "Stalking",
      location: "Dadar",
      status: "Under Review",
      date: "04 Oct 2026",
    },
  ];

  const buddies = [
    {
      name: "Ananya Sharma",
      area: "Andheri",
      distance: "1.2 km",
      verified: true,
    },
    {
      name: "Priya Mehta",
      area: "Bandra",
      distance: "2.4 km",
      verified: true,
    },
    {
      name: "Sneha Patil",
      area: "Juhu",
      distance: "3.1 km",
      verified: true,
    },
  ];

  const communities = [
    {
      name: "Andheri Women Safety Network",
      members: 248,
      description: "Local safety alerts and community support.",
    },
    {
      name: "Mumbai Safe Walkers",
      members: 516,
      description: "Verified walking buddies across Mumbai.",
    },
    {
      name: "Student Safety Community",
      members: 182,
      description: "Safety updates and support for students.",
    },
  ];

  const renderPage = () => {
    if (active === "Report Incident") {
      return (
        <section className="page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">SAFETY REPORTING</span>
              <h1>Report an Incident</h1>
              <p>
                Submit a harassment or safety incident anonymously.
              </p>
            </div>
          </div>

          <div className="form-card">
            {reportSent ? (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h2>Report Submitted</h2>
                <p>
                  Your report has been submitted anonymously and will be
                  reviewed by the safety team.
                </p>
                <button
                  onClick={() => setReportSent(false)}
                  className="secondary-btn"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <div className="field">
                    <label>Incident Type</label>
                    <select>
                      <option>Harassment</option>
                      <option>Stalking</option>
                      <option>Unsafe Area</option>
                      <option>Assault</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Enter incident location"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Date & Time</label>
                  <input type="datetime-local" />
                </div>

                <div className="field">
                  <label>Describe the Incident</label>
                  <textarea
                    rows="6"
                    placeholder="Describe what happened..."
                  ></textarea>
                </div>

                <div className="anonymous-note">
                  <span>🔒</span>
                  <div>
                    <strong>Your identity remains anonymous</strong>
                    <p>
                      Personal information is not displayed with the report.
                    </p>
                  </div>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => setReportSent(true)}
                >
                  Submit Anonymous Report
                </button>
              </>
            )}
          </div>
        </section>
      );
    }

    if (active === "Walking Buddy") {
      return (
        <section className="page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">COMMUNITY SAFETY</span>
              <h1>Find a Walking Buddy</h1>
              <p>
                Connect with verified volunteers in your area.
              </p>
            </div>
          </div>

          <div className="buddy-search">
            <div>
              <strong>Where are you walking?</strong>
              <input placeholder="Enter starting location" />
            </div>

            <div>
              <strong>Destination</strong>
              <input placeholder="Enter destination" />
            </div>

            <button className="primary-btn">Find Buddies</button>
          </div>

          <h2 className="section-title">Verified Volunteers Near You</h2>

          <div className="buddy-grid">
            {buddies.map((buddy) => (
              <div className="buddy-card" key={buddy.name}>
                <div className="avatar">
                  {buddy.name.charAt(0)}
                </div>

                <div className="buddy-info">
                  <h3>{buddy.name}</h3>
                  <p>{buddy.area}</p>

                  {buddy.verified && (
                    <span className="verified">✓ Verified Volunteer</span>
                  )}

                  <span className="distance">
                    {buddy.distance} away
                  </span>
                </div>

                <button className="outline-btn">Request Buddy</button>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (active === "Community") {
      return (
        <section className="page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">LOCAL NETWORK</span>
              <h1>Safety Communities</h1>
              <p>
                Join verified neighbourhood groups and share safety updates.
              </p>
            </div>

            <button className="primary-btn">+ Create Community</button>
          </div>

          <div className="community-grid">
            {communities.map((community) => (
              <div className="community-card" key={community.name}>
                <div className="community-icon">🛡</div>
                <h2>{community.name}</h2>
                <p>{community.description}</p>

                <div className="community-bottom">
                  <span>{community.members} members</span>
                  <button className="outline-btn">Join Group</button>
                </div>
              </div>
            ))}
          </div>

          <div className="community-feed">
            <h2>Recent Community Alerts</h2>

            <div className="alert-item">
              <span className="alert-dot"></span>
              <div>
                <strong>Safety Alert — Andheri West</strong>
                <p>
                  Members reported suspicious activity near the station.
                </p>
              </div>
              <small>15 min ago</small>
            </div>

            <div className="alert-item">
              <span className="alert-dot"></span>
              <div>
                <strong>Safe Route Update</strong>
                <p>
                  Community members recommended an alternate route.
                </p>
              </div>
              <small>1 hr ago</small>
            </div>
          </div>
        </section>
      );
    }

    if (active === "Emergency Contacts") {
      return (
        <section className="page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">EMERGENCY SUPPORT</span>
              <h1>Emergency Contacts</h1>
              <p>
                Keep trusted contacts ready for emergency situations.
              </p>
            </div>
          </div>

          <div className="emergency-layout">
            <div className="sos-card">
              <div className="sos-symbol">SOS</div>
              <h2>Emergency Alert</h2>
              <p>
                Press the button to activate an emergency alert and share
                your current location.
              </p>

              <button
                className={`sos-btn ${sosActive ? "active" : ""}`}
                onClick={() => setSosActive(!sosActive)}
              >
                {sosActive ? "SOS ACTIVE" : "ACTIVATE SOS"}
              </button>

              {sosActive && (
                <div className="sos-status">
                  ⚠ Emergency alert activated. Your trusted contacts
                  have been notified.
                </div>
              )}
            </div>

            <div className="contacts-card">
              <h2>Trusted Contacts</h2>

              <div className="contact">
                <div className="contact-avatar">M</div>
                <div>
                  <strong>Mom</strong>
                  <p>Emergency Contact</p>
                </div>
                <button>Call</button>
              </div>

              <div className="contact">
                <div className="contact-avatar">D</div>
                <div>
                  <strong>Dad</strong>
                  <p>Emergency Contact</p>
                </div>
                <button>Call</button>
              </div>

              <button className="add-contact">
                + Add Emergency Contact
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="page">
        <div className="hero">
          <div className="hero-content">
            <span className="eyebrow">COMMUNITY SAFETY PLATFORM</span>

            <h1>
              Safer communities,
              <br />
              <span>stronger together.</span>
            </h1>

            <p>
              A community-driven platform that helps women report
              harassment anonymously, find verified walking buddies,
              connect with local communities and access emergency support.
            </p>

            <div className="hero-actions">
              <button
                className="primary-btn"
                onClick={() => setActive("Walking Buddy")}
              >
                Find a Walking Buddy
              </button>

              <button
                className="secondary-btn"
                onClick={() => setActive("Report Incident")}
              >
                Report an Incident
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="shield">🛡</div>
            <div className="location-card">
              <span className="live-dot"></span>
              <div>
                <strong>Community Protected</strong>
                <p>Live safety network active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div>
            <strong>1,240+</strong>
            <span>Verified Volunteers</span>
          </div>

          <div>
            <strong>520+</strong>
            <span>Safety Reports</span>
          </div>

          <div>
            <strong>36</strong>
            <span>Local Communities</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Emergency Support</span>
          </div>
        </div>

        <div className="home-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Anonymous Reporting</h3>
            <p>
              Report harassment and unsafe situations without revealing
              your identity.
            </p>
            <button onClick={() => setActive("Report Incident")}>
              Report Incident →
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Walking Buddy</h3>
            <p>
              Find verified volunteers who can accompany you during
              your commute.
            </p>
            <button onClick={() => setActive("Walking Buddy")}>
              Find a Buddy →
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Local Communities</h3>
            <p>
              Connect with women in your neighbourhood and share safety
              alerts.
            </p>
            <button onClick={() => setActive("Community")}>
              Explore Communities →
            </button>
          </div>

          <div className="feature-card emergency-feature">
            <div className="feature-icon">🚨</div>
            <h3>SOS & Emergency</h3>
            <p>
              Quickly alert trusted contacts and share your location
              during emergencies.
            </p>
            <button onClick={() => setActive("Emergency Contacts")}>
              Emergency Support →
            </button>
          </div>
        </div>

        <div className="recent-section">
          <div className="section-header">
            <div>
              <span className="eyebrow">SAFETY NETWORK</span>
              <h2>Recent Reports</h2>
            </div>

            <button
              className="outline-btn"
              onClick={() => setActive("Report Incident")}
            >
              Report Incident
            </button>
          </div>

          <div className="report-table">
            <div className="table-head">
              <span>Incident</span>
              <span>Location</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            {reports.map((report) => (
              <div className="table-row" key={report.date}>
                <strong>{report.type}</strong>
                <span>{report.location}</span>
                <span
                  className={
                    report.status === "Resolved"
                      ? "status resolved"
                      : "status review"
                  }
                >
                  {report.status}
                </span>
                <span>{report.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🛡</div>
          <div>
            <strong>SafeCircle</strong>
            <span>Women Safety Network</span>
          </div>
        </div>

        <nav>
          {menu.map((item) => (
            <button
              key={item}
              className={active === item ? "nav-active" : ""}
              onClick={() => setActive(item)}
            >
              <span>
                {item === "Home" && "⌂"}
                {item === "Report Incident" && "◉"}
                {item === "Walking Buddy" && "♧"}
                {item === "Community" && "◎"}
                {item === "Emergency Contacts" && "!"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy">
            <span>🔐</span>
            <div>
              <strong>Privacy First</strong>
              <p>Your safety and privacy matter.</p>
            </div>
          </div>

          <div className="profile">
            <div className="profile-avatar">A</div>
            <div>
              <strong>Anonymous User</strong>
              <span>Protected Account</span>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <span className="mobile-brand">SafeCircle</span>
          </div>

          <div className="top-actions">
            <span className="location">
              📍 Mumbai, India
            </span>

            <button className="notification">🔔</button>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default App;