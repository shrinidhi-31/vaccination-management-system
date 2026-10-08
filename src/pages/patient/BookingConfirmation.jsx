import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Clock,
  Syringe,
  ArrowRight,
} from "lucide-react";

function BookingConfirmation() {
  const location = useLocation();

  const booking = location.state || {
    vaccine: "COVID-19 Vaccine",
    center: "City Health Centre",
    date: "15 October 2026",
    slot: "10:30 AM",
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">
          <CheckCircle2 size={48} />
        </div>

        <span className="confirmation-label">BOOKING CONFIRMED</span>

        <h1>Your appointment is confirmed!</h1>

        <p>
          Your vaccination appointment has been successfully reserved.
          Please arrive a few minutes before your scheduled time.
        </p>

        <div className="confirmation-details">
          <div>
            <Syringe size={19} />
            <span>
              <small>Vaccine</small>
              <strong>{booking.vaccine}</strong>
            </span>
          </div>

          <div>
            <MapPin size={19} />
            <span>
              <small>Vaccination Centre</small>
              <strong>{booking.center}</strong>
            </span>
          </div>

          <div>
            <CalendarDays size={19} />
            <span>
              <small>Date</small>
              <strong>{booking.date}</strong>
            </span>
          </div>

          <div>
            <Clock size={19} />
            <span>
              <small>Time</small>
              <strong>{booking.slot}</strong>
            </span>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/patient/dashboard" className="primary-button">
            Go to Dashboard
            <ArrowRight size={17} />
          </Link>

          <Link to="/patient/records" className="secondary-button">
            View Records
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;