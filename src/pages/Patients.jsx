function Patients() {
  return (
    <div className="page">

      <h2 className="page-title">Patient Records</h2>

      <p className="page-description">
        View and manage registered patients.
      </p>

      <div className="page-card">

        <table>

          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Vaccine</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5" className="empty-message">
                Patient data will appear here.
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Patients;