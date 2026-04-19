import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="home-navbar">
        <div className="nav-container">
          <h1 className="logo"><i className="fas fa-bus"></i> BusPass</h1>
          <div className="nav-links">
            {user ? (
              <>
                <button onClick={() => navigate("/dashboard")} className="nav-btn">
                  Dashboard
                </button>
                <button onClick={() => navigate("/profile")} className="nav-btn">
                  Profile
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="nav-btn">
                  Login
                </button>
                <button onClick={() => navigate("/register")} className="nav-btn primary">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Smart Bus Pass System</h1>
          <p>Affordable, Convenient, Digital - Your Travel Companion</p>
          {!user && (
            <button onClick={() => navigate("/register")} className="hero-btn">
              Get Started Today
            </button>
          )}
        </div>
        <div className="hero-image"><i className="fas fa-ticket"></i></div>
      </div>

      {/* Pass Types Section */}
      <div className="passes-showcase">
        <h2>Choose Your Pass</h2>
        <div className="pass-types">
          <div className="pass-type-card">
            <div className="pass-icon"><i className="fas fa-calendar-days"></i></div>
            <h3>Daily Pass</h3>
            <p className="price">₹50</p>
            <p>Perfect for occasional travelers</p>
            <ul>
              <li>✓ 24-hour validity</li>
              <li>✓ Unlimited trips</li>
              <li>✓ All routes</li>
            </ul>
          </div>

          <div className="pass-type-card">
            <div className="pass-icon"><i className="fas fa-calendar-week"></i></div>
            <h3>Weekly Pass</h3>
            <p className="price">₹250</p>
            <p>Great for commuters</p>
            <ul>
              <li>✓ 7-day validity</li>
              <li>✓ Unlimited trips</li>
              <li>✓ All routes</li>
            </ul>
          </div>

          <div className="pass-type-card featured">
            <div className="badge">POPULAR</div>
            <div className="pass-icon"><i className="fas fa-chart-bar"></i></div>
            <h3>Monthly Pass</h3>
            <p className="price">₹1200</p>
            <p>Best value for regular commuters</p>
            <ul>
              <li>✓ 30-day validity</li>
              <li>✓ Unlimited trips</li>
              <li>✓ All routes</li>
            </ul>
          </div>

          <div className="pass-type-card">
            <div className="pass-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Quarterly Pass</h3>
            <p className="price">₹3000</p>
            <p>For long-term commuters</p>
            <ul>
              <li>✓ 90-day validity</li>
              <li>✓ Unlimited trips</li>
              <li>✓ All routes</li>
            </ul>
          </div>

          <div className="pass-type-card">
            <div className="pass-icon"><i className="fas fa-bullseye"></i></div>
            <h3>Annual Pass</h3>
            <p className="price">₹10,000</p>
            <p>Maximum savings</p>
            <ul>
              <li>✓ 365-day validity</li>
              <li>✓ Unlimited trips</li>
              <li>✓ All routes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Why Choose BusPass?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-mobile"></i></div>
            <h3>Digital & Mobile</h3>
            <p>Manage your pass entirely on your phone</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-wallet"></i></div>
            <h3>Save Money</h3>
            <p>Up to 40% cheaper than daily tickets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-bolt"></i></div>
            <h3>Instant Activation</h3>
            <p>Get your pass immediately after purchase</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Track Usage</h3>
            <p>Monitor your trips and spending in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-lock"></i></div>
            <h3>Secure & Safe</h3>
            <p>Your data is encrypted and protected</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>All Routes</h3>
            <p>Valid on all buses in our network</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free BusPass account</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Pass</h3>
            <p>Select the pass type that fits your needs</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Purchase</h3>
            <p>Make secure payment online</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Travel</h3>
            <p>Show QR code on your phone to the conductor</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 BusPass System. All rights reserved.</p>
        <div className="footer-links">
          <button onClick={() => navigate("/faqs")} className="footer-link">
            FAQs
          </button>
          <button onClick={() => navigate("/support")} className="footer-link">
            Support
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
