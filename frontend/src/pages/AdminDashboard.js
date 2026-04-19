import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalUsers: 1250,
    activeUsers: 845,
    totalRevenue: 342500,
    activePasses: 2100,
    passTypes: {
      daily: 450,
      weekly: 380,
      monthly: 820,
      quarterly: 280,
      annual: 170,
    },
  };

  const recentUsers = [
    { id: 1, name: "Raj Kumar", email: "raj@example.com", joinDate: "2026-04-19", passes: 2 },
    { id: 2, name: "Priya Singh", email: "priya@example.com", joinDate: "2026-04-18", passes: 1 },
    { id: 3, name: "Amit Patel", email: "amit@example.com", joinDate: "2026-04-17", passes: 3 },
    { id: 4, name: "Neha Sharma", email: "neha@example.com", joinDate: "2026-04-16", passes: 2 },
    { id: 5, name: "Vikram Das", email: "vikram@example.com", joinDate: "2026-04-15", passes: 1 },
  ];

  const topRoutes = [
    { route: "Route 5", trips: 1240, revenue: 45000 },
    { route: "Route 3", trips: 980, revenue: 35000 },
    { route: "Route 7", trips: 850, revenue: 32000 },
    { route: "Route 2", trips: 720, revenue: 28000 },
    { route: "Route 9", trips: 610, revenue: 22000 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>🔐 Admin Dashboard</h1>
      </div>

      <div className="admin-nav">
        <button
          className={`admin-nav-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "routes" ? "active" : ""}`}
          onClick={() => setActiveTab("routes")}
        >
          Routes
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      <div className="admin-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="tab-content">
            <h2>System Overview</h2>

            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <p>Total Users</p>
                  <h3>{stats.totalUsers}</h3>
                  <span className="stat-change">+12 this week</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <p>Active Users</p>
                  <h3>{stats.activeUsers}</h3>
                  <span className="stat-change">{((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <p>Total Revenue</p>
                  <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                  <span className="stat-change">+₹45000 this month</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">🎫</div>
                <div className="stat-info">
                  <p>Active Passes</p>
                  <h3>{stats.activePasses}</h3>
                  <span className="stat-change">+180 today</span>
                </div>
              </div>
            </div>

            <div className="overview-grid">
              <div className="chart-card">
                <h3>Pass Type Distribution</h3>
                <div className="pass-distribution">
                  {Object.entries(stats.passTypes).map(([type, count]) => (
                    <div key={type} className="distribution-item">
                      <div className="distribution-bar">
                        <div
                          className="distribution-fill"
                          style={{
                            width: `${(count / Math.max(...Object.values(stats.passTypes))) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="distribution-label">{type}</span>
                      <span className="distribution-value">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h3>Revenue by Pass Type</h3>
                <div className="revenue-breakdown">
                  {Object.entries({
                    daily: 450 * 50,
                    weekly: 380 * 250,
                    monthly: 820 * 1200,
                    quarterly: 280 * 3000,
                    annual: 170 * 10000,
                  }).map(([type, revenue]) => (
                    <div key={type} className="revenue-item">
                      <span>{type}</span>
                      <span className="revenue-amount">₹{revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="tab-content">
            <h2>Recent Users</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Active Passes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.joinDate).toLocaleDateString("en-IN")}</td>
                      <td>
                        <span className="pass-badge">{user.passes}</span>
                      </td>
                      <td>
                        <button className="action-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === "routes" && (
          <div className="tab-content">
            <h2>Top Routes</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Trips</th>
                    <th>Revenue</th>
                    <th>Avg Trip Value</th>
                  </tr>
                </thead>
                <tbody>
                  {topRoutes.map((route, idx) => (
                    <tr key={idx}>
                      <td>{route.route}</td>
                      <td>{route.trips.toLocaleString()}</td>
                      <td>₹{route.revenue.toLocaleString()}</td>
                      <td>₹{(route.revenue / route.trips).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="tab-content">
            <h2>Reports & Analytics</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>📊 Monthly Report</h3>
                <p>View detailed monthly statistics and trends</p>
                <button className="report-btn">Generate Report</button>
              </div>
              <div className="report-card">
                <h3>💾 Data Export</h3>
                <p>Export user data, transactions, and reports</p>
                <button className="report-btn">Export Data</button>
              </div>
              <div className="report-card">
                <h3>🔍 Audit Log</h3>
                <p>View system activities and user actions</p>
                <button className="report-btn">View Logs</button>
              </div>
              <div className="report-card">
                <h3>⚙️ Settings</h3>
                <p>Configure system settings and policies</p>
                <button className="report-btn">Go to Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
