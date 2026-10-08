function VaccineStock() {
  return (
    <div className="page">

      <h2 className="page-title">Vaccine Stock</h2>

      <p className="page-description">
        Monitor available vaccine doses.
      </p>

      <div className="page-card">

        <div className="stock-item">

          <div className="stock-header">
            <span>Covaxin</span>
            <strong>-- doses</strong>
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: "0%" }}
            ></div>
          </div>

        </div>

        <div className="stock-item">

          <div className="stock-header">
            <span>Covishield</span>
            <strong>-- doses</strong>
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: "0%" }}
            ></div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default VaccineStock;