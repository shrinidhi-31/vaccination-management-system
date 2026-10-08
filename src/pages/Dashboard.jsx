function Dashboard() {
  return (
    <div className="dashboard-page">

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>Total Patients</h3>
          <h2>--</h2>
          <p>Registered patients</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <h3>Today's Appointments</h3>
          <h2>--</h2>
          <p>Appointments today</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💉</div>
          <h3>Vaccinated</h3>
          <h2>--</h2>
          <p>Completed vaccinations</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <h3>Pending</h3>
          <h2>--</h2>
          <p>Pending appointments</p>
        </div>

      </section>

      <section className="dashboard-section">

        <h2>Today's Appointments</h2>

        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Vaccine</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="4" className="empty-message">
                No appointment data available
              </td>
            </tr>
          </tbody>
        </table>

      </section>

      <section className="dashboard-section">

        <h2>Vaccine Stock</h2>

        <div className="stock-item">
          <div className="stock-header">
            <span>Covaxin</span>
            <strong>-- doses</strong>
          </div>

          <div className="progress">
            <div className="progress-bar" style={{ width: "0%" }}></div>
          </div>
        </div>

        <div className="stock-item">
          <div className="stock-header">
            <span>Covishield</span>
            <strong>-- doses</strong>
          </div>

          <div className="progress">
            <div className="progress-bar" style={{ width: "0%" }}></div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;