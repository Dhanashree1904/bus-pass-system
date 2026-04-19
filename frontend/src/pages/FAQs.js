import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FAQs.css";

const FAQs = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      question: "What is a BusPass?",
      answer:
        "BusPass is a digital pass system that allows you to travel on buses without buying individual tickets. Simply purchase a pass, and you can travel unlimited trips within the validity period.",
    },
    {
      question: "How long does a pass remain valid?",
      answer:
        "Daily passes are valid for 24 hours, Weekly passes for 7 days, Monthly passes for 30 days, Quarterly passes for 90 days, and Annual passes for 365 days from the date of purchase.",
    },
    {
      question: "Can I use my pass on all routes?",
      answer:
        "Yes, all BusPass types are valid on all routes within our network. You can travel on any bus, anytime, during the validity period.",
    },
    {
      question: "How do I show my pass to the conductor?",
      answer:
        "Simply open the BusPass app on your phone and navigate to your active pass. Show the QR code displayed on your screen to the conductor. They'll scan it, and you're good to go!",
    },
    {
      question: "What if my phone battery dies?",
      answer:
        "You can take a screenshot of your QR code before your battery dies. The screenshot will work just as well as the live QR code.",
    },
    {
      question: "Can I refund my pass?",
      answer:
        "Refunds are available within 24 hours of purchase for unused passes. After that, no refunds are permitted, but you can cancel the pass anytime.",
    },
    {
      question: "Is my personal data safe?",
      answer:
        "Yes, we use industry-standard encryption to protect your personal and payment information. Your data is never shared with third parties.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit cards, debit cards, net banking, and digital wallets like Google Pay and PayTM.",
    },
    {
      question: "Can I gift a pass to someone?",
      answer:
        "Currently, passes are linked to individual accounts. However, you can purchase passes for family members by creating separate accounts for them.",
    },
    {
      question: "How can I track my trips?",
      answer:
        "Your trip history is automatically tracked in your Pass Details page. You can see all recent trips, dates, times, and routes used.",
    },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <div className="faqs-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about BusPass</p>
      </div>

      <div className="faqs-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${expanded === index ? "expanded" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleExpand(index)}
              >
                <span className="question-text">{faq.question}</span>
                <span className="toggle-icon">
                  {expanded === index ? "−" : "+"}
                </span>
              </div>
              {expanded === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-sidebar">
          <div className="help-card">
            <div className="icon">💬</div>
            <h3>Still Have Questions?</h3>
            <p>
              Can't find what you're looking for? Reach out to our support team.
            </p>
            <button
              className="contact-btn"
              onClick={() => navigate("/support")}
            >
              Contact Support
            </button>
          </div>

          <div className="help-card">
            <div className="icon">📱</div>
            <h3>Download Our App</h3>
            <p>Get BusPass on your phone for easy access on the go.</p>
            <div className="app-links">
              <button className="app-link">App Store</button>
              <button className="app-link">Play Store</button>
            </div>
          </div>

          <div className="help-card">
            <div className="icon">🕐</div>
            <h3>Support Hours</h3>
            <p>Monday - Sunday: 6:00 AM - 11:00 PM</p>
            <p className="support-email">support@buspass.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
