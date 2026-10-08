import {
  FileText,
  Syringe,
  CalendarDays,
  MapPin,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function VaccinationRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecords = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please login to view your vaccination records.");
        setLoading(false);
        return;
      }

      // Find the logged-in patient's profile
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (patientError) {
        setError(patientError.message);
        setLoading(false);
        return;
      }

      // Get the patient's appointments
      const { data, error: appointmentError } = await supabase
        .from("appointments")
        .select(`
          id,
          status,
          created_at,
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
        .order("created_at", { ascending: false });

      if (appointmentError) {
        setError(appointmentError.message);
        setLoading(false);
        return;
      }

      setRecords(data || []);
      setLoading(false);
    };

    loadRecords();
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
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const completedRecords = records.filter(
    (record) => record.status === "completed"
  );

  const upcomingRecords = records.filter(
    (record) => record.status === "scheduled"
  );

  return (
    <div className="records-page">
      <div className="page-top">
        <div>
          <span className="section-label">HEALTH RECORD</span>

          <h1>Vaccination Records</h1>

          <p>
            View your vaccination history and scheduled doses.
          </p>
        </div>

        <button className="download-button">
          <Download size={17} />
          Download Record
        </button>
      </div>

      <div className="record-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <Syringe size={22} />
          </div>

          <span>Total Vaccinations</span>

          <strong>{records.length}</strong>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <CheckCircle2 size={22} />
          </div>

          <span>Completed Doses</span>

          <strong>{completedRecords.length}</strong>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <CalendarDays size={22} />
          </div>

          <span>Upcoming Doses</span>

          <strong>{upcomingRecords.length}</strong>
        </div>
      </div>

      <div className="records-card">
        <div className="records-heading">
          <div>
            <h2>Vaccination History</h2>

            <p>
              Your vaccination appointments and completed doses.
            </p>
          </div>

          <FileText size={24} />
        </div>

        <div className="records-list">
          {loading ? (
            <p>Loading vaccination records...</p>
          ) : error ? (
            <p style={{ color: "#b42318" }}>
              {error}
            </p>
          ) : records.length === 0 ? (
            <p>
              No vaccination records found. Book an appointment to get
              started.
            </p>
          ) : (
            records.map((record) => (
              <div className="record-row" key={record.id}>
                <div className="record-vaccine-icon">
                  <Syringe size={21} />
                </div>

                <div className="record-main">
                  <h3>
                    {record.vaccines?.name || "Vaccine"}
                  </h3>

                  <span>
                    {record.status === "completed"
                      ? "Completed"
                      : "Scheduled"}
                  </span>
                </div>

                <div className="record-detail">
                  <CalendarDays size={16} />

                  {formatDate(record.slots?.date)}

                  {record.slots?.start_time && (
                    <>
                      <Clock size={15} />
                      {formatTime(record.slots.start_time)}
                    </>
                  )}
                </div>

                <div className="record-detail">
                  <MapPin size={16} />

                  {record.centers?.name || "Centre not available"}
                </div>

                <span
                  className="record-status"
                  style={{
                    color:
                      record.status === "completed"
                        ? "#167c4a"
                        : "#9a6700",
                  }}
                >
                  {record.status === "completed" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Clock size={15} />
                  )}

                  {record.status === "completed"
                    ? "Completed"
                    : "Scheduled"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VaccinationRecords;