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

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function PatientDashboard() {
  const [patientName, setPatientName] = useState("Patient");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please login to view your dashboard.");
        setLoading(false);
        return;
      }

      // Get patient profile
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("id, full_name")
        .eq("user_id", user.id)
        .single();

      if (patientError) {
        setError(patientError.message);
        setLoading(false);
        return;
      }

      setPatientName(patient.full_name || "Patient");

      // Get latest appointment
      const { data: appointments, error: appointmentError } =
        await supabase
          .from("appointments")
          .select(`
            id,
            status,
            vaccines (
              name
            ),
            centers (
              name,
              location
            ),
            slots (
              date,
              start_time
            )
          `)
          .eq("patient_id", patient.id)
          .order("created_at", { ascending: false })
          .limit(1);

      if (appointmentError) {
        setError(appointmentError.message);
        setLoading(false);
        return;
      }

      setAppointment(appointments?.[0] || null);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "Time not available";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getDaysUntil = (date) => {
    if (!date) return null;

    const today = new Date();
    const appointmentDate = new Date(date + "T00:00:00");

    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);

    const difference =
      appointmentDate.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const daysUntil = appointment
    ? getDaysUntil(appointment.slots?.date)
    : null;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-greeting">
            Good morning 👋
          </p>

          <h1>
            Welcome back, {patientName}
          </h1>

          <p className="dashboard-subtitle">
            Keep track of your vaccination journey from one place.
          </p>
        </div>

        <Link
          to="/patient/book-appointment"
          className="dashboard-book-button"
        >
          <CalendarCheck size={18} />
          Book Appointment
        </Link>
      </header>

      {loading ? (
        <p>Loading your vaccination details...</p>
      ) : error ? (
        <p style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : (
        <>
          <section className="dashboard-grid">
            <div className="dashboard-main-card">
              <div className="card-heading">
                <div>
                  <span className="section-label">
                    UPCOMING APPOINTMENT
                  </span>

                  <h2>
                    {appointment?.vaccines?.name ||
                      "No Upcoming Appointment"}
                  </h2>
                </div>

                {appointment && (
                  <span className="status-badge">
                    {appointment.status === "scheduled"
                      ? "Confirmed"
                      : appointment.status}
                  </span>
                )}
              </div>

              {appointment ? (
                <>
                  <div className="appointment-details">
                    <div>
                      <CalendarCheck size={19} />
                      <span>
                        {formatDate(appointment.slots?.date)}
                      </span>
                    </div>

                    <div>
                      <Clock size={19} />
                      <span>
                        {formatTime(
                          appointment.slots?.start_time
                        )}
                      </span>
                    </div>

                    <div>
                      <MapPin size={19} />
                      <span>
                        {appointment.centers?.name ||
                          "Centre not available"}
                      </span>
                    </div>
                  </div>

                  <div className="dose-info">
                    <div className="dose-icon">
                      <Syringe size={22} />
                    </div>

                    <div>
                      <strong>Vaccination Appointment</strong>

                      <p>
                        Your vaccination slot is confirmed.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="dose-info">
                  <div className="dose-icon">
                    <Syringe size={22} />
                  </div>

                  <div>
                    <strong>No appointment booked</strong>

                    <p>
                      Book your vaccination appointment to get started.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="next-dose-card">
              <div className="next-dose-icon">
                <Bell size={24} />
              </div>

              <span className="section-label">
                NEXT DOSE
              </span>

              {appointment && daysUntil !== null ? (
                <>
                  <h2>
                    {daysUntil < 0
                      ? "Appointment passed"
                      : daysUntil === 0
                      ? "Today"
                      : `Due in ${daysUntil} days`}
                  </h2>

                  <p>
                    Your vaccination is scheduled for{" "}
                    {formatDate(appointment.slots?.date)}.
                  </p>
                </>
              ) : (
                <>
                  <h2>No upcoming dose</h2>

                  <p>
                    You currently have no scheduled vaccination.
                  </p>
                </>
              )}

              <Link to="/patient/records">
                View vaccination history
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </>
      )}

      <section className="quick-section">
        <div className="section-title">
          <h2>Quick Actions</h2>
          <p>Manage your vaccination needs quickly.</p>
        </div>

        <div className="quick-actions">
          <Link
            to="/patient/book-appointment"
            className="quick-card"
          >
            <div className="quick-icon">
              <CalendarCheck size={23} />
            </div>

            <div>
              <h3>Book Appointment</h3>
              <p>
                Find a centre and reserve a vaccination slot.
              </p>
            </div>

            <ArrowRight size={19} />
          </Link>

          <Link
            to="/patient/records"
            className="quick-card"
          >
            <div className="quick-icon">
              <FileText size={23} />
            </div>

            <div>
              <h3>Vaccination Records</h3>
              <p>
                View your complete vaccination history.
              </p>
            </div>

            <ArrowRight size={19} />
          </Link>

          <Link
            to="/center-finder"
            className="quick-card"
          >
            <div className="quick-icon">
              <MapPin size={23} />
            </div>

            <div>
              <h3>Find Vaccination Center</h3>
              <p>
                Find vaccination centers near your location.
              </p>
            </div>

            <ArrowRight size={19} />
          </Link>

          <Link
            to="/dose-reminder"
            className="quick-card"
          >
            <div className="quick-icon">
              <Bell size={23} />
            </div>

            <div>
              <h3>Dose Reminder</h3>
              <p>
                Set a reminder for your next vaccine dose.
              </p>
            </div>

            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <section className="progress-section">
        <div className="section-title">
          <h2>Vaccination Journey</h2>
          <p>Track your vaccination milestones.</p>
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

          <div className="progress-step current">
            <div className="progress-number">
              2
            </div>

            <div>
              <strong>Appointment</strong>
              <span>
                {appointment ? "Confirmed" : "Pending"}
              </span>
            </div>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <div className="progress-number">
              3
            </div>

            <div>
              <strong>Vaccination</strong>
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientDashboard;