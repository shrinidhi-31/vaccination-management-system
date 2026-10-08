import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Syringe,
  MapPin,
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

function BookAppointment() {
  const navigate = useNavigate();

  const [vaccines, setVaccines] = useState([]);
  const [centers, setCenters] = useState([]);
  const [slots, setSlots] = useState([]);

  const [formData, setFormData] = useState({
    vaccine: "",
    center: "",
    date: "",
    slot: "",
  });

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  // Load vaccines and centers
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      const [vaccineResult, centerResult] = await Promise.all([
        supabase
          .from("vaccines")
          .select("id, name"),

        supabase
          .from("centers")
          .select("id, name, location")
          .eq("is_active", true),
      ]);

      if (vaccineResult.error) {
        setError(vaccineResult.error.message);
        setLoading(false);
        return;
      }

      if (centerResult.error) {
        setError(centerResult.error.message);
        setLoading(false);
        return;
      }

      const uniqueVaccines = Array.from(
  new Map(
    (vaccineResult.data || []).map((item) => [
      item.name,
      item,
    ])
  ).values()
);

const uniqueCenters = Array.from(
  new Map(
    (centerResult.data || []).map((item) => [
      `${item.name}-${item.location}`,
      item,
    ])
  ).values()
);

setVaccines(uniqueVaccines);
setCenters(uniqueCenters);

      setLoading(false);
    };

    loadData();
  }, []);

  // Load slots whenever center + date are selected
  useEffect(() => {
    const loadSlots = async () => {
      if (!formData.center || !formData.date) {
        setSlots([]);
        return;
      }

      setError("");

      const { data, error } = await supabase
        .from("slots")
        .select("id, date, start_time, end_time, capacity, booked_count")
        .eq("center_id", formData.center)
        .eq("date", formData.date)
        .order("start_time");

      if (error) {
        setError(error.message);
        return;
      }

      // Only show slots that still have capacity
      const availableSlots = (data || []).filter(
        (slot) => slot.booked_count < slot.capacity
      );

      setSlots(availableSlots);

      // Clear previously selected slot
      setFormData((prev) => ({
        ...prev,
        slot: "",
      }));
    };

    loadSlots();
  }, [formData.center, formData.date]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vaccine || !formData.center || !formData.date || !formData.slot) {
      setError("Please select all appointment details.");
      return;
    }

    setBooking(true);
    setError("");

    try {
      // Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please login before booking an appointment.");
        setBooking(false);
        return;
      }

      // Find patient's database record
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (patientError || !patient) {
        setError("Patient profile not found.");
        setBooking(false);
        return;
      }

      // Create appointment
      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          patient_id: patient.id,
          vaccine_id: formData.vaccine,
          center_id: formData.center,
          slot_id: formData.slot,
          status: "scheduled",
        })
        .select()
        .single();

      if (appointmentError) {
        setError(appointmentError.message);
        setBooking(false);
        return;
      }

      // Increase booked count
      const selectedSlot = slots.find(
        (slot) => slot.id === formData.slot
      );

      if (selectedSlot) {
        const { error: slotUpdateError } = await supabase
  .from("slots")
  .update({
    booked_count: selectedSlot.booked_count + 1,
  })
  .eq("id", selectedSlot.id);

if (slotUpdateError) {
  setError(slotUpdateError.message);
  setBooking(false);
  return;
}
      }

      // Get names for confirmation page
      const selectedVaccine = vaccines.find(
        (vaccine) => vaccine.id === formData.vaccine
      );

      const selectedCenter = centers.find(
        (center) => center.id === formData.center
      );

      navigate("/patient/booking-confirmation", {
        state: {
          appointmentId: appointment.id,
          vaccine: selectedVaccine?.name || "Vaccine",
          center: selectedCenter?.name || "Vaccination Centre",
          date: formData.date,
          slot: formatTime(selectedSlot.start_time),
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }

    setBooking(false);
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

      {error && (
        <div
          style={{
            background: "#fff1f2",
            color: "#b42318",
            padding: "12px 16px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div className="booking-layout">
        <form onSubmit={handleSubmit} className="booking-card">

          {/* STEP 1 */}
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
                  disabled={loading}
                >
                  <option value="">
                    {loading ? "Loading vaccines..." : "Select vaccine"}
                  </option>

                  {vaccines.map((vaccine) => (
                    <option key={vaccine.id} value={vaccine.id}>
                      {vaccine.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
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
                  disabled={loading}
                >
                  <option value="">
                    {loading ? "Loading centres..." : "Select centre"}
                  </option>

                  {centers.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name} — {center.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
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

          {/* STEP 4 */}
          <div className="booking-step">
            <div className="step-number">4</div>

            <div className="step-content">
              <label>Select Time Slot</label>
              <p>Choose an available appointment time.</p>

              <div className="slot-grid">
                {slots.length === 0 ? (
                  <p style={{ opacity: 0.7 }}>
                    Select a centre and date to see available slots.
                  </p>
                ) : (
                  slots.map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      className={`slot-button ${
                        formData.slot === slot.id
                          ? "selected-slot"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          slot: slot.id,
                        })
                      }
                    >
                      <Clock size={16} />
                      {formatTime(slot.start_time)} -{" "}
                      {formatTime(slot.end_time)}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="booking-submit"
            disabled={booking}
          >
            {booking ? "Booking..." : "Confirm Appointment"}
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