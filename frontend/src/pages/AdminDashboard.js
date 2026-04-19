import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    // TODO: Fetch these from /api/admin/stats endpoint
    totalUsers: null,
    activeUsers: null,
    totalRevenue: null,
    activePasses: null,
    passTypes: {},
  };

  // TODO: Fetch recent users from /api/admin/users endpoint
  const recentUsers = [];

  // TODO: Fetch top routes from /api/admin/routes endpoint
  const topRoutes = [];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1><i className="fas fa-shield-alt"></i> Admin Dashboard</h1>
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
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-info">
                  <p>Total Users</p>
                  <h3>{stats.totalUsers || "N/A"}</h3>
                  <span className="stat-change">Loading data...</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
                <div className="stat-info">
                  <p>Active Users</p>
                  <h3>{stats.activeUsers || "N/A"}</h3>
                  <span className="stat-change">Loading data...</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon"><i className="fas fa-wallet"></i></div>
                <div className="stat-info">
                  <p>Total Revenue</p>
                  <h3>{stats.totalRevenue ? "₹" + stats.totalRevenue.toLocaleString() : "N/A"}</h3>
                  <span className="stat-change">Loading data...</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon"><i className="fas fa-ticket-alt"></i></div>
                <div className="stat-info">
                  <p>Active Passes</p>
                  <h3>{stats.activePasses || "N/A"}</h3>
                  <span className="stat-change">Loading data...</span>
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
                <h3><i className="fas fa-chart-bar"></i> Monthly Report</h3>
                <p>View detailed monthly statistics and trends</p>
                <button className="report-btn">Generate Report</button>
              </div>
              <div className="report-card">
                <h3><i className="fas fa-database"></i> Data Export</h3>
                <p>Export user data, transactions, and reports</p>
                <button className="report-btn">Export Data</button>
              </div>
              <div className="report-card">
                <h3><i className="fas fa-search"></i> Audit Log</h3>
                <p>View system activities and user actions</p>
                <button className="report-btn">View Logs</button>
              </div>
              <div className="report-card">
                <h3><i className="fas fa-cog"></i> Settings</h3>
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
