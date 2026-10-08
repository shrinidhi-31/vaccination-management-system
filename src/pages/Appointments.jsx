function Appointments() {
  return (
    <div className="page">

      <h2 className="page-title">Appointments</h2>

      <p className="page-description">
        Manage patient appointments.
      </p>

      <div className="page-card">

        <table>

          <thead>
            <tr>
              <th>Patient</th>
              <th>Vaccine</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5" className="empty-message">
                Appointment data will appear here.
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Appointments;