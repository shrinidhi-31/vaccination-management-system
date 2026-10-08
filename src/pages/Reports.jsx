function Reports() {
  return (
    <div className="page">

      <h2 className="page-title">Reports</h2>

      <p className="page-description">
        Healthcare vaccination statistics and reports.
      </p>

      <div className="report-grid">

        <div className="report-card">
          <h3>Total Patients</h3>
          <strong>--</strong>
        </div>

        <div className="report-card">
          <h3>Vaccinated</h3>
          <strong>--</strong>
        </div>

        <div className="report-card">
          <h3>Pending</h3>
          <strong>--</strong>
        </div>

        <div className="report-card">
          <h3>Appointments</h3>
          <strong>--</strong>
        </div>

      </div>

      <div className="page-card">

        <h3>Vaccination Rate</h3>

        <div className="large-number">
          --
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: "0%" }}
          ></div>
        </div>

      </div>

    </div>
  );
}

export default Reports;