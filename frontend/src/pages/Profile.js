import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{user?.name?.charAt(0).toUpperCase()}</span>
          </div>

          <div className="profile-info">
            <div className="info-section">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="info-input"
                />
              ) : (
                <p className="info-value">{user?.name}</p>
              )}
            </div>

            <div className="info-section">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="info-input"
                />
              ) : (
                <p className="info-value">{user?.email}</p>
              )}
            </div>

            <div className="info-section">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="info-input"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="info-value">{user?.phone || "Not provided"}</p>
              )}
            </div>

            <div className="button-group">
              {!isEditing ? (
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="account-stats">
          <h2>Account Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎫</div>
              <h3>Active Passes</h3>
              <p className="stat-value">3</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <h3>Total Spent</h3>
              <p className="stat-value">₹1,450</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚌</div>
              <h3>Trips Used</h3>
              <p className="stat-value">47</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <h3>Member Since</h3>
              <p className="stat-value">Mar 2026</p>
            </div>
          </div>
        </div>

        <div className="danger-zone">
          <h2>Account Actions</h2>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
          <button className="delete-btn">
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
