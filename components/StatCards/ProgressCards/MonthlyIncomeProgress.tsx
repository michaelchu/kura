export default function MonthlyIncomeProgress() {
  return (
    <div className="card">
      <div className="card-body">
        <p className="mb-3">
          December Income Progress <strong>$3569.64 </strong>of $4,000
        </p>
        <div className="progress progress-separated mb-3">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: "44%" }}
          />
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: "19%" }}
          />
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "9%" }}
          />
        </div>
        <div className="row">
          <div className="col-auto d-flex align-items-center pe-2">
            <span className="legend me-2 bg-primary" />
            <span>Covered Call</span>
            <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
              $2141.45
            </span>
          </div>
          <div className="col-auto d-flex align-items-center px-2">
            <span className="legend me-2 bg-info" />
            <span>Short Put</span>
            <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
              $715.36
            </span>
          </div>
          <div className="col-auto d-flex align-items-center px-2">
            <span className="legend me-2 bg-success" />
            <span>Long Stock</span>
            <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
              $201.95
            </span>
          </div>
          <div className="col-auto d-flex align-items-center ps-2">
            <span className="legend me-2" />
            <span>Remaining</span>
            <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
              $510.88
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
