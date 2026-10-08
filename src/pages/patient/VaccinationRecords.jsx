import {
  FileText,
  Syringe,
  CalendarDays,
  MapPin,
  CheckCircle2,
  Download,
} from "lucide-react";

function VaccinationRecords() {
  const records = [
    {
      vaccine: "COVID-19 Vaccine",
      dose: "Dose 1",
      date: "18 September 2026",
      centre: "City Health Centre",
      status: "Completed",
    },
    {
      vaccine: "Influenza Vaccine",
      dose: "Annual Dose",
      date: "10 August 2026",
      centre: "REVA Community Clinic",
      status: "Completed",
    },
  ];

  return (
    <div className="records-page">
      <div className="page-top">
        <div>
          <span className="section-label">HEALTH RECORD</span>
          <h1>Vaccination Records</h1>
          <p>
            View your vaccination history and completed doses.
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
          <strong>2</strong>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <CheckCircle2 size={22} />
          </div>
          <span>Completed Doses</span>
          <strong>2</strong>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <CalendarDays size={22} />
          </div>
          <span>Upcoming Doses</span>
          <strong>1</strong>
        </div>
      </div>

      <div className="records-card">
        <div className="records-heading">
          <div>
            <h2>Vaccination History</h2>
            <p>Your recorded vaccination details.</p>
          </div>

          <FileText size={24} />
        </div>

        <div className="records-list">
          {records.map((record, index) => (
            <div className="record-row" key={index}>
              <div className="record-vaccine-icon">
                <Syringe size={21} />
              </div>

              <div className="record-main">
                <h3>{record.vaccine}</h3>
                <span>{record.dose}</span>
              </div>

              <div className="record-detail">
                <CalendarDays size={16} />
                {record.date}
              </div>

              <div className="record-detail">
                <MapPin size={16} />
                {record.centre}
              </div>

              <span className="record-status">
                <CheckCircle2 size={15} />
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VaccinationRecords;