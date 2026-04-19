import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { passAPI } from "../services/api";
import QRCode from "qrcode.react";
import "../styles/Dashboard.css";

const passIcons = {
  daily: "fa-calendar-days",
  weekly: "fa-calendar-week",
  monthly: "fa-chart-bar",
  quarterly: "fa-chart-line",
  annual: "fa-bullseye",
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPassType, setSelectedPassType] = useState("daily");

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const { data } = await passAPI.getUserPasses();
      setPasses(data.passes);
    } catch (error) {
      console.error("Error fetching passes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyPass = async () => {
    try {
      const { data } = await passAPI.createPass({
        passType: selectedPassType,
        routes: [],
      });
      setPasses([...passes, data.pass]);
      alert("Pass purchased successfully!");
    } catch (error) {
      alert("Error purchasing pass: " + error.response?.data?.message);
    }
  };

  const handleCancelPass = async (passId) => {
    if (window.confirm("Are you sure you want to cancel this pass?")) {
      try {
        await passAPI.cancelPass(passId);
        setPasses(passes.filter((p) => p._id !== passId));
        alert("Pass cancelled successfully!");
      } catch (error) {
        alert("Error cancelling pass");
      }
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-content">
          <h1>Bus Pass System</h1>
          <div className="nav-links">
            <span>Welcome, {user?.name}</span>
            <button onClick={() => navigate("/profile")} className="nav-link-btn">
              <i className="fas fa-user"></i> Profile
            </button>
            <button onClick={() => navigate("/faqs")} className="nav-link-btn">
              <i className="fas fa-question-circle"></i> FAQs
            </button>
            <button onClick={() => navigate("/support")} className="nav-link-btn">
              <i className="fas fa-comments"></i> Support
            </button>
            <button onClick={() => navigate("/admin")} className="nav-link-btn">
              <i className="fas fa-cog"></i> Admin
            </button>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="buy-pass-section">
          <h2>Buy New Pass</h2>
          <select
            value={selectedPassType}
            onChange={(e) => setSelectedPassType(e.target.value)}
          >
            <option value="daily">Daily - ₹50</option>
            <option value="weekly">Weekly - ₹250</option>
            <option value="monthly">Monthly - ₹1200</option>
            <option value="quarterly">Quarterly - ₹3000</option>
            <option value="annual">Annual - ₹10000</option>
          </select>
          <button onClick={handleBuyPass} className="buy-btn">
            Purchase Pass
          </button>
        </div>

        <div className="passes-section">
          <h2>Your Passes</h2>
          {loading ? (
            <p>Loading...</p>
          ) : passes.length === 0 ? (
            <p>No passes yet</p>
          ) : (
            <div className="passes-grid">
              {passes.map((pass) => (
                <div key={pass._id} className="pass-card">
                  <div className="pass-header">
                    <span className="pass-icon"><i className={`fas ${passIcons[pass.passType]}`}></i></span>
                    <h3>{pass.passType.toUpperCase()}</h3>
                    <span className={`status-badge ${pass.status}`}>
                      {pass.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="pass-details">
                    <p className="price">₹{pass.price}</p>
                    <p className="validity">
                      <strong>Valid:</strong> {" "}
                      {new Date(pass.validFrom).toLocaleDateString("en-IN")} to{" "}
                      {new Date(pass.validUntil).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  {pass.qrCode && (
                    <div className="qr-code">
                      <QRCode 
                        value={pass.qrCode} 
                        size={120}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  )}
                  {pass.status === "active" && (
                    <button
                      onClick={() => handleCancelPass(pass._id)}
                      className="cancel-btn"
                    >
                      Cancel Pass
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
