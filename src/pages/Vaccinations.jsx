function Vaccinations() {
  return (
    <div className="page">

      <h2 className="page-title">Vaccinations</h2>

      <p className="page-description">
        Track patient vaccination status.
      </p>

      <div className="page-card">

        <table>

          <thead>
            <tr>
              <th>Patient</th>
              <th>Vaccine</th>
              <th>Dose</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5" className="empty-message">
                Vaccination data will appear here.
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Vaccinations;