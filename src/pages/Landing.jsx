import { Link } from "react-router-dom";
import { CalendarCheck, ShieldCheck, FileText, Bell } from "lucide-react";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <Navbar />

      <main className="landing-page">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              <ShieldCheck size={16} />
              Smart Vaccination Management
            </span>

            <h1>
              Your Vaccination
              <span> Journey, Simplified.</span>
            </h1>

            <p>
              Book vaccination appointments, manage your records,
              and stay updated about your next dose — all in one place.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button">
                Book an Appointment
              </Link>

              <Link to="/login" className="secondary-button">
                View My Records
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-icon">
              <CalendarCheck size={32} />
            </div>

            <h3>Upcoming Vaccination</h3>
            <p>COVID-19 • Dose 2</p>

            <div className="appointment-date">
              <strong>15</strong>
              <span>OCT<br />2026</span>
            </div>

            <small>City Health Centre • 10:30 AM</small>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <CalendarCheck size={28} />
            <h3>Easy Appointment Booking</h3>
            <p>
              Find a vaccination centre and book an available slot easily.
            </p>
          </div>

          <div className="feature-card">
            <FileText size={28} />
            <h3>Digital Records</h3>
            <p>
              Keep your vaccination history safely accessible in one place.
            </p>
          </div>

          <div className="feature-card">
            <Bell size={28} />
            <h3>Dose Reminders</h3>
            <p>
              Never miss your next vaccination dose with timely reminders.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Landing;