import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Syringe,
  MapPin,
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

function BookAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vaccine: "",
    center: "",
    date: "",
    slot: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/patient/booking-confirmation", {
      state: formData,
    });
  };

  return (
    <div className="booking-page">
      <div className="page-top">
        <div>
          <span className="section-label">APPOINTMENT</span>
          <h1>Book a Vaccination</h1>
          <p>
            Choose your vaccine, centre, date and preferred time slot.
          </p>
        </div>
      </div>

      <div className="booking-layout">
        <form onSubmit={handleSubmit} className="booking-card">
          <div className="booking-step">
            <div className="step-number">1</div>

            <div className="step-content">
              <label>Select Vaccine</label>
              <p>Choose the vaccination you need.</p>

              <div className="select-wrapper">
                <Syringe size={19} />

                <select
                  name="vaccine"
                  value={formData.vaccine}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select vaccine</option>
                  <option value="COVID-19 Vaccine">
                    COVID-19 Vaccine
                  </option>
                  <option value="Influenza Vaccine">
                    Influenza Vaccine
                  </option>
                  <option value="Hepatitis B Vaccine">
                    Hepatitis B Vaccine
                  </option>
                  <option value="HPV Vaccine">
                    HPV Vaccine
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="booking-step">
            <div className="step-number">2</div>

            <div className="step-content">
              <label>Select Vaccination Centre</label>
              <p>Choose a convenient healthcare centre.</p>

              <div className="select-wrapper">
                <MapPin size={19} />

                <select
                  name="center"
                  value={formData.center}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select centre</option>
                  <option value="City Health Centre">
                    City Health Centre
                  </option>
                  <option value="REVA Community Clinic">
                    REVA Community Clinic
                  </option>
                  <option value="North Bengaluru Health Centre">
                    North Bengaluru Health Centre
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="booking-step">
            <div className="step-number">3</div>

            <div className="step-content">
              <label>Select Date</label>
              <p>Choose your preferred vaccination date.</p>

              <div className="input-wrapper booking-input">
                <CalendarDays size={19} />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="booking-step">
            <div className="step-number">4</div>

            <div className="step-content">
              <label>Select Time Slot</label>
              <p>Choose an available appointment time.</p>

              <div className="slot-grid">
                {[
                  "09:00 AM",
                  "10:30 AM",
                  "12:00 PM",
                  "02:30 PM",
                  "04:00 PM",
                ].map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`slot-button ${
                      formData.slot === slot ? "selected-slot" : ""
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        slot,
                      })
                    }
                  >
                    <Clock size={16} />
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="booking-submit">
            Confirm Appointment
            <ArrowRight size={18} />
          </button>
        </form>

        <aside className="booking-info">
          <div className="info-icon">
            <Syringe size={25} />
          </div>

          <h2>Vaccination made simple.</h2>

          <p>
            Select a vaccine, find a convenient centre and reserve your
            preferred time slot in just a few steps.
          </p>

          <div className="info-point">
            <span>✓</span>
            Choose from available vaccines
          </div>

          <div className="info-point">
            <span>✓</span>
            Select a nearby centre
          </div>

          <div className="info-point">
            <span>✓</span>
            Reserve your preferred slot
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/patient/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </aside>
      </div>
    </div>
  );
}

export default BookAppointment;