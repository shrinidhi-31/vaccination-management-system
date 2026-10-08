import { Link } from "react-router-dom";
import {
  CalendarCheck,
  FileText,
  Bell,
  MapPin,
  Clock,
  Syringe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function PatientDashboard() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-greeting">Good morning 👋</p>
          <h1>Welcome back, Patient</h1>
          <p className="dashboard-subtitle">
            Keep track of your vaccination journey from one place.
          </p>
        </div>

        <Link to="/patient/book-appointment" className="dashboard-book-button">
          <CalendarCheck size={18} />
          Book Appointment
        </Link>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-main-card">
          <div className="card-heading">
            <div>
              <span className="section-label">UPCOMING APPOINTMENT</span>
              <h2>COVID-19 Vaccination</h2>
            </div>

            <span className="status-badge">Confirmed</span>
          </div>

          <div className="appointment-details">
            <div>
              <CalendarCheck size={19} />
              <span>15 October 2026</span>
            </div>

            <div>
              <Clock size={19} />
              <span>10:30 AM</span>
            </div>

            <div>
              <MapPin size={19} />
              <span>City Health Centre</span>
            </div>
          </div>

          <div className="dose-info">
            <div className="dose-icon">
              <Syringe size={22} />
            </div>

            <div>
              <strong>Dose 2 of 2</strong>
              <p>Your final scheduled dose</p>
            </div>
          </div>
        </div>

        <div className="next-dose-card">
          <div className="next-dose-icon">
            <Bell size={24} />
          </div>

          <span className="section-label">NEXT DOSE</span>

          <h2>Due in 12 days</h2>

          <p>
            Your next vaccination dose is scheduled for 15 October 2026.
          </p>

          <Link to="/patient/records">
            View vaccination history
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="quick-section">
        <div className="section-title">
          <h2>Quick Actions</h2>
          <p>Manage your vaccination needs quickly.</p>
        </div>

        <div className="quick-actions">
          <Link to="/patient/book-appointment" className="quick-card">
            <div className="quick-icon">
              <CalendarCheck size={23} />
            </div>

            <div>
              <h3>Book Appointment</h3>
              <p>Find a centre and reserve a vaccination slot.</p>
            </div>

            <ArrowRight size={19} />
          </Link>

          <Link to="/patient/records" className="quick-card">
            <div className="quick-icon">
              <FileText size={23} />
            </div>

            <div>
              <h3>Vaccination Records</h3>
              <p>View your complete vaccination history.</p>
            </div>

            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <section className="progress-section">
        <div className="section-title">
          <h2>Vaccination Journey</h2>
          <p>Track your completed vaccination milestones.</p>
        </div>

        <div className="progress-card">
          <div className="progress-step completed">
            <CheckCircle2 size={22} />
            <div>
              <strong>Registration</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-line completed-line"></div>

          <div className="progress-step completed">
            <CheckCircle2 size={22} />
            <div>
              <strong>Dose 1</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step current">
            <div className="progress-number">3</div>
            <div>
              <strong>Dose 2</strong>
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientDashboard;