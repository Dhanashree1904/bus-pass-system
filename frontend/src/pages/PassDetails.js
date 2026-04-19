import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import "../styles/PassDetails.css";

const PassDetails = () => {
  const { passId } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState({
    _id: passId,
    passType: "monthly",
    price: 1200,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "active",
    tripsUsed: 23,
    maxTrips: 60,
    qrCode: JSON.stringify({ passId, validUntil: new Date() }),
  });

  const tripPercentage = (pass.tripsUsed / pass.maxTrips) * 100;
  const daysLeft = Math.ceil(
    (pass.validUntil - new Date()) / (1000 * 60 * 60 * 24)
  );

  const handleDownloadReceipt = () => {
    const receipt = `
    ===== BUS PASS RECEIPT =====
    Pass Type: ${pass.passType.toUpperCase()}
    Price: ₹${pass.price}
    Valid From: ${new Date(pass.validFrom).toLocaleDateString("en-IN")}
    Valid Until: ${new Date(pass.validUntil).toLocaleDateString("en-IN")}
    Status: ${pass.status.toUpperCase()}
    Trips Used: ${pass.tripsUsed}/${pass.maxTrips}
    ============================
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(receipt)
    );
    element.setAttribute("download", `receipt_${passId}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="pass-details-container">
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>Pass Details</h1>
      </div>

      <div className="details-content">
        {/* Main Card */}
        <div className="detail-card main-card">
          <div className="card-header">
            <div className="pass-type-info">
              <div className="pass-type-icon"><i className="fas fa-chart-bar"></i></div>
              <div>
                <h2>{pass.passType.toUpperCase()} PASS</h2>
                <p className={`status ${pass.status}`}>{pass.status}</p>
              </div>
            </div>
            <div className="pass-price">₹{pass.price}</div>
          </div>

          <div className="validity-dates">
            <div className="date-item">
              <label>Valid From</label>
              <p>{new Date(pass.validFrom).toLocaleDateString("en-IN")}</p>
            </div>
            <div className="date-item">
              <label>Valid Until</label>
              <p>{new Date(pass.validUntil).toLocaleDateString("en-IN")}</p>
            </div>
            <div className="date-item">
              <label>Days Left</label>
              <p className="days-left">{daysLeft} days</p>
            </div>
          </div>

          <div className="qr-display">
            <p>Your Pass QR Code</p>
            <QRCode value={pass.qrCode} size={150} level="H" />
            <p className="qr-instruction">Show this QR code to the conductor</p>
          </div>
        </div>

        {/* Trip Counter */}
        <div className="detail-card">
          <h3>Trip Usage</h3>
          <div className="trip-counter">
            <div className="trips-used">
              <div className="trip-number">{pass.tripsUsed}</div>
              <p>Trips Used</p>
            </div>
            <div className="progress-section">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${tripPercentage}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {pass.tripsUsed} of {pass.maxTrips} trips
              </p>
            </div>
            <div className="trips-remaining">
              <div className="trip-number">{pass.maxTrips - pass.tripsUsed}</div>
              <p>Trips Left</p>
            </div>
          </div>
        </div>

        {/* Trip History */}
        <div className="detail-card">
          <h3>Recent Trips</h3>
          <div className="trip-history">
            {[
              { date: "2026-04-19", time: "08:30 AM", route: "Route 5" },
              { date: "2026-04-19", time: "06:15 PM", route: "Route 5" },
              { date: "2026-04-18", time: "08:45 AM", route: "Route 3" },
              { date: "2026-04-18", time: "05:50 PM", route: "Route 5" },
              { date: "2026-04-17", time: "08:35 AM", route: "Route 5" },
            ].map((trip, idx) => (
              <div key={idx} className="trip-item">
                <div className="trip-info">
                  <p className="trip-date">
                    {new Date(trip.date).toLocaleDateString("en-IN")}
                  </p>
                  <p className="trip-route">{trip.route}</p>
                </div>
                <div className="trip-time">{trip.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="detail-card actions">
          <button className="download-btn" onClick={handleDownloadReceipt}>
            📥 Download Receipt
          </button>
          <button className="extend-btn">📅 Extend Pass</button>
        </div>
      </div>
    </div>
  );
};

export default PassDetails;
