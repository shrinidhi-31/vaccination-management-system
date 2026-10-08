import { useState } from "react";
import "../App.css";

function DoseReminder() {
  const [vaccine, setVaccine] = useState("");
  const [dose, setDose] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleReminder = () => {
    if (!vaccine || !dose || !date) {
      alert("Please fill all details");
      return;
    }

    setReminder(true);
  };

  return (
    <div className="dose-reminder">
      <h1>🔔 Smart Dose Reminder</h1>

      <p>Set a reminder for your next vaccine dose</p>

      <div className="reminder-box">
        <label>Vaccine Name</label>

        <input
          type="text"
          placeholder="Enter vaccine name"
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
        />

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

        <button onClick={handleReminder}>
          Set Reminder
        </button>
      </div>

      {reminder && (
        <div className="reminder-success">
          <h2>✅ Reminder Set Successfully!</h2>

          <p>
            Vaccine: <strong>{vaccine}</strong>
          </p>

          <p>
            Dose: <strong>{dose}</strong>
          </p>

          <p>
            Next Dose Date: <strong>{date}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default DoseReminder;