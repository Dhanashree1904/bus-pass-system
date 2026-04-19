import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Support.css";

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h1>Support Center</h1>
        <p>We're here to help! Contact us with any questions or issues.</p>
      </div>

      <div className="support-content">
        <div className="support-form-section">
          <h2>Send us a Message</h2>

          {submitted && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We'll get
              back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief subject"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="refund">Refund Request</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Please describe your issue or question in detail..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="support-sidebar">
          <div className="contact-card">
            <div className="icon">📞</div>
            <h3>Call Us</h3>
            <p>Available 6 AM - 11 PM, 7 days a week</p>
            <a href="tel:+919876543210" className="contact-link">
              +91 9876 543 210
            </a>
          </div>

          <div className="contact-card">
            <div className="icon">✉️</div>
            <h3>Email Us</h3>
            <p>Response within 24 hours</p>
            <a href="mailto:support@buspass.com" className="contact-link">
              support@buspass.com
            </a>
          </div>

          <div className="contact-card">
            <div className="icon">💬</div>
            <h3>Live Chat</h3>
            <p>Chat with us in real-time</p>
            <button className="contact-link">Start Chat</button>
          </div>

          <div className="contact-card">
            <div className="icon">📍</div>
            <h3>Visit Us</h3>
            <p>
              BusPass India Pvt. Ltd.
              <br />
              123 Tech Street, Bangalore
              <br />
              Karnataka 560001
            </p>
          </div>

          <div className="faq-link-card">
            <p>👉 Can't find your answer?</p>
            <button
              className="faq-link"
              onClick={() => navigate("/faqs")}
            >
              Check our FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
