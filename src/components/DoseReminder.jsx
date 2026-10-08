import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../lib/supabase";

function DoseReminder() {
  const [vaccine, setVaccine] = useState("");
  const [dose, setDose] = useState("");
  const [date, setDate] = useState("");

  const [vaccines, setVaccines] = useState([]);
  const [reminders, setReminders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadVaccines();
    loadReminders();
  }, []);

  // Load vaccines from Supabase
  const loadVaccines = async () => {
    const { data, error } = await supabase
      .from("vaccines")
      .select("id, name");

    if (error) {
      setError(error.message);
      return;
    }

    // Remove duplicate vaccine names
    const uniqueVaccines = Array.from(
      new Map(
        (data || []).map((item) => [item.name, item])
      ).values()
    );

    setVaccines(uniqueVaccines);
  };

  // Load patient's reminders
  const loadReminders = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login to manage your reminders.");
      setLoading(false);
      return;
    }

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

    const { data, error: reminderError } = await supabase
      .from("dose_reminders")
      .select("*")
      .eq("patient_id", patient.id)
      .order("reminder_date", { ascending: true });

    if (reminderError) {
      setError(reminderError.message);
      setLoading(false);
      return;
    }

    setReminders(data || []);
    setLoading(false);
  };

  const handleReminder = async () => {
    setError("");
    setSuccess("");

    if (!vaccine || !dose || !date) {
      setError("Please fill all details.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login to set a reminder.");
      return;
    }

    setSaving(true);

    const { data: patient, error: patientError } = await supabase
      .from("patients")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (patientError) {
      setError(patientError.message);
      setSaving(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("dose_reminders")
      .insert({
        patient_id: patient.id,
        vaccine_name: vaccine,
        dose_number: dose,
        reminder_date: date,
      });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    setSuccess("Reminder set successfully! 🔔");

    setVaccine("");
    setDose("");
    setDate("");

    setSaving(false);

    loadReminders();
  };

  const deleteReminder = async (id) => {
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("dose_reminders")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess("Reminder deleted successfully.");

    loadReminders();
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    return new Date(dateValue + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div className="dose-reminder">
      <h1>🔔 Smart Dose Reminder</h1>

      <p>Set a reminder for your next vaccine dose</p>

      <div className="reminder-box">
        <label>Vaccine Name</label>

        <select
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
        >
          <option value="">Select vaccine</option>

          {vaccines.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Dose Number</label>

        <select
          value={dose}
          onChange={(e) => setDose(e.target.value)}
        >
          <option value="">Select dose</option>
          <option value="Dose 1">Dose 1</option>
          <option value="Dose 2">Dose 2</option>
          <option value="Dose 3">Dose 3</option>
        </select>

        <label>Next Dose Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleReminder} disabled={saving}>
          {saving ? "Saving..." : "Set Reminder"}
        </button>
      </div>

      {error && (
        <div className="reminder-success">
          <p style={{ color: "#b42318" }}>
            ❌ {error}
          </p>
        </div>
      )}

      {success && (
        <div className="reminder-success">
          <h2>✅ {success}</h2>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <h2>Your Reminders</h2>

        {loading ? (
          <p>Loading reminders...</p>
        ) : reminders.length === 0 ? (
          <p>No reminders set yet.</p>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="reminder-success"
              style={{ marginTop: "15px" }}
            >
              <h3>💉 {reminder.vaccine_name}</h3>

              <p>
                Dose: <strong>{reminder.dose_number}</strong>
              </p>

              <p>
                Reminder Date:{" "}
                <strong>
                  {formatDate(reminder.reminder_date)}
                </strong>
              </p>

              <button
                className="reminder-delete-btn"
                onClick={() => deleteReminder(reminder.id)}
              >
                Delete Reminder
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoseReminder;