import { useState } from "react";
import {
  Calendar,
  Bell,
  ChevronDown,
  Search,
  ArrowRight,
  Menu,
  X,
  Download,
  Check,
} from "lucide-react";
import "./App.css";

const appDownloadUrl = `${import.meta.env.BASE_URL}application-733191c0-8b6a-43de-b61a-75e06033452e.apk`;

export default function App() {
  // Navigation & Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion State (Kept exactly as requested)
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="smartmeet-app">
      <header className="navbar" onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenuOpen) {
          setMobileMenuOpen(false);
          document.getElementById("mobile-menu-toggle")?.focus();
        }
      }}>
        <div className="container navbar-container">
          <a href="#" className="brand-logo" id="nav-brand-logo">
            <img
              src="/smartmeet-icon.png"
              alt="SmartMeet Logo"
              className="brand-logo-img"
            />
            <div className="brand-title-wrap">
              <span className="brand-title">
                SmartMeet
                <span className="brand-tag">Campus</span>
              </span>
            </div>
          </a>

          <nav
            id="primary-navigation"
            aria-label="Main navigation"
            className={`primary-navigation${mobileMenuOpen ? " is-open" : ""}`}
            onClick={(event) => {
              if (event.target.closest("a")) setMobileMenuOpen(false);
            }}
          >
            <ul className="nav-links">
              <li>
                <a href="#overview" className="nav-link active">
                  Overview
                </a>
              </li>
              <li>
                <a href="#portals" className="nav-link">
                  Students & Lecturers
                </a>
              </li>
              <li>
                <a href="#features" className="nav-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="nav-link">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="nav-link">
                  FAQ
                </a>
              </li>
              <li className="mobile-download-link">
                <a href={appDownloadUrl} download="SmartMeet.apk" className="btn btn-primary">
                  <Download size={16} /> Download App
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href={appDownloadUrl}
              download="SmartMeet.apk"
              className="btn btn-primary btn-sm"
              id="nav-btn-download"
            >
              <Download size={16} />
              <span>Download App</span>
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}

      <section className="hero-section" id="overview">
        <div className="container">
          <div className="hero-content-grid">
            <div className="hero-text-content">
              <h1 className="hero-title">
                Book appointments with your lecturers, without the
                back-and-forth.
              </h1>
              <p className="hero-description">
                SmartMeet makes it easy for university students to find
                lecturers, check open office hours, and book consultations.
                Lecturers can set their weekly availability and manage requests
                in one place.
              </p>

              <div className="hero-cta-group">
                <a
                  href={appDownloadUrl}
                  download="SmartMeet.apk"
                  className="btn btn-hero-primary"
                  id="hero-cta-download"
                >
                  <Download size={18} />
                  <span>Download App</span>
                </a>
                <a
                  href="#how-it-works"
                  className="btn btn-hero-secondary"
                  id="hero-cta-how"
                >
                  <span>How it works</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* SmartMeet app screenshot */}
            <div className="hero-mockup-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}hero.jpeg`}
                alt="SmartMeet student dashboard with consultation booking and upcoming appointments"
                className="hero-app-screenshot"
                width={540}
                height={1102}
                fetchPriority="high"
              />
              <div className="hero-feature-card hero-feature-booking">
                <Calendar size={20} aria-hidden="true" />
                <div>
                  <strong>Book consultations</strong>
                  <span>Find a time that works</span>
                </div>
              </div>
              <div className="hero-feature-card hero-feature-reminder">
                <Bell size={20} aria-hidden="true" />
                <div>
                  <strong>Appointment reminders</strong>
                  <span>Stay on top of your schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Portals Section (Clear Side-by-Side - No AI Slop)
          ========================================================================= */}
      <section className="section section-bg-alt" id="portals">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Campus Portals</span>
            <h2 className="section-title">Built for students and lecturers</h2>
            <p className="section-subtitle">
              Dedicated tools for students booking help and lecturers organizing
              their office hours.
            </p>
          </div>

          <div className="roles-grid">
            <div className="role-box">
              <span className="role-badge">For Students</span>
              <h3 className="role-title">Book consultations easily</h3>
              <ul className="role-list">
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Faculty Directory:</strong> Search lecturers by
                    name, department, or office room.
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Check Office Hours:</strong> See when your lecturer
                    is available before requesting.
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>State Purpose:</strong> Add your meeting reason
                    (e.g. project supervision, grades, or exam review).
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Status Updates:</strong> Get notified once your
                    appointment is approved or rescheduled.
                  </span>
                </li>
              </ul>
            </div>

            <div className="role-box">
              <span className="role-badge">For Lecturers</span>
              <h3 className="role-title">Organize your schedule</h3>
              <ul className="role-list">
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Set Weekly Availability:</strong> Configure the days
                    and time blocks you are open for meetings.
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Review Requests:</strong> View student information
                    and consultation topics before approving.
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Prevent Clashes:</strong> Confirmed slots are locked
                    so appointments never overlap.
                  </span>
                </li>
                <li className="role-list-item">
                  <Check size={18} className="role-check-icon" />
                  <span>
                    <strong>Consultation History:</strong> Keep a record of past
                    student visits and notes.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">
              Everything you need for consultations
            </h2>
            <p className="section-subtitle">
              Simple and reliable features designed specifically for campus
              communication.
            </p>
          </div>

          <div className="features-grid-simple">
            <div className="feature-simple-card">
              <div className="feature-icon-circle">
                <Search size={22} />
              </div>
              <h3 className="feature-simple-title">Lecturer Directory</h3>
              <p className="feature-simple-desc">
                Browse verified campus lecturers, departments, and office room
                locations in seconds.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-icon-circle">
                <Calendar size={22} />
              </div>
              <h3 className="feature-simple-title">Real-Time Schedule</h3>
              <p className="feature-simple-desc">
                View updated time slots and book without sending multiple emails
                back and forth.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-icon-circle">
                <Bell size={22} />
              </div>
              <h3 className="feature-simple-title">Timely Notifications</h3>
              <p className="feature-simple-desc">
                Get notified on status changes, upcoming appointments, and
                reminder alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works  */}
      <section className="section section-bg-alt" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Seamless 3-Step Process</span>
            <h2 className="section-title">How SmartMeet Works</h2>
            <p className="section-subtitle">
              From discovering your advisor to wrapping up the consultation in 3
              simple steps.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Discover & Filter Faculty</h3>
              <p className="step-desc">
                Browse your department’s verified faculty directory. Check
                course specialties, office room locations, and active
                consultation windows.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Select Opening & Agenda</h3>
              <p className="step-desc">
                Pick an open slot that fits your schedule, specify your
                discussion topic (e.g. thesis review or grade query), and submit
                your request.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Meet, Consult & Log Remarks</h3>
              <p className="step-desc">
                Receive automated reminders before your slot. Meet in office or
                online, and maintain an ongoing record of academic guidance and
                next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}

      <section className="section section-bg-alt" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about setting up and using SmartMeet.
            </p>
          </div>

          <div className="faq-wrap">
            {[
              {
                q: "How does SmartMeet prevent conflicting appointments?",
                a: "SmartMeet uses an atomic booking engine that evaluates lecturer availability in real-time. Once a slot is requested or approved, that time block plus buffer time is immediately hidden from other students, guaranteeing zero double-bookings.",
              },
              {
                q: "Can lecturers set custom office hours and minimum notice periods?",
                a: "Yes. Lecturers can define weekly recurring office hours (e.g. Tuesdays 10:00 AM - 1:00 PM), slot increments (15, 30, or 45 minutes), and specify advance notice requirements (e.g. minimum 24 hours prior to booking).",
              },
              {
                q: "What platforms is SmartMeet available on?",
                a: "SmartMeet is built for mobile devices with instant push notification support, as well as desktop web browsers for seamless access from computer labs and offices.",
              },
              {
                q: "What happens if a lecturer needs to reschedule due to an emergency?",
                a: "Lecturers can reschedule or cancel an appointment with a single tap. The affected student receives an instant push notification explaining the update, along with priority options to select an alternative opening.",
              },
              {
                q: "How are student consultation requests and remarks stored?",
                a: "All data is secured through verified student and lecturer authentication, providing a private consultation trail for academic advisory and accreditation.",
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  id={`faq-item-${index}`}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className="faq-icon-chevron" size={20} />
                  </button>
                  {isOpen && <div className="faq-content">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}

      <section className="section" id="download">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-grid">
              <div>
                <h2 className="cta-title">Get SmartMeet on Your Device</h2>
                <p className="cta-desc">
                  Never miss an office hour again. Download SmartMeet to book
                  consultations, receive reminders, and connect with your
                  lecturers directly from your phone.
                </p>
                <div className="cta-actions">
                  <a
                    href={appDownloadUrl}
                    download="SmartMeet.apk"
                    className="btn-download-main"
                    id="download-app-btn"
                  >
                    <Download size={20} />
                    <span>Download SmartMeet</span>
                  </a>
                </div>
              </div>

              <div className="qr-code-box">
                <div className="qr-graphic">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#003F78",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        padding: 8,
                        borderRadius: 6,
                      }}
                    >
                      <img
                        src="/smartmeet-icon.png"
                        alt="SmartMeet"
                        style={{ width: 48, height: 48, display: "block" }}
                      />
                    </div>
                  </div>
                </div>
                <span className="qr-caption">Mobile Installation</span>
                <span
                  style={{
                    fontSize: "0.74rem",
                    color: "#cbd5e1",
                    marginTop: 4,
                  }}
                >
                  Install directly on your phone
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content-clean">
            <div className="footer-brand-simple">
              <img
                src="/smartmeet-icon.png"
                alt="SmartMeet"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  backgroundColor: "#fff",
                }}
              />
              <span
                style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}
              >
                SmartMeet
              </span>
            </div>

            <ul className="footer-nav-simple">
              <li>
                <a href="#overview">Overview</a>
              </li>
              <li>
                <a href="#portals">Portals</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href={appDownloadUrl} download="SmartMeet.apk">
                  Download
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom-simple">
            <span>
              &copy; {new Date().getFullYear()} SmartMeet. All rights reserved.
            </span>
            <span>Academic Consultation & Scheduling Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
