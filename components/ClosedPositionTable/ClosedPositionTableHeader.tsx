import React from "react";

const ClosedPositionTableHeader = () => (
  <>
    <div className="card-header">
      <h3 className="card-title">Closed Positions</h3>
    </div>
    <div className="card-body border-bottom py-3">
      <div className="d-flex">
        <div className="text-muted">
          Show
          <div className="mx-2 d-inline-block">
            <input
              type="text"
              className="form-control form-control-sm"
              value={8}
              size={3}
              aria-label="Invoices count"
            />
          </div>
          entries
        </div>
        <div className="ms-auto text-muted">
          Search:
          <div className="ms-2 d-inline-block">
            <input
              type="text"
              className="form-control form-control-sm"
              aria-label="Search invoice"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ClosedPositionTableHeader;
