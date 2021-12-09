import React from "react";

const ClosedPositionTableHeader = ({ filter, setFilter }) => (
  <>
    <div className="card-header">
      <h3 className="card-title">Closed Positions</h3>
    </div>
    <div className="card-body border-bottom py-3">
      <div className="d-flex">
        <div className="ms-auto text-muted">
          Search:
          <div className="ms-2 d-inline-block">
            <input
              type="text"
              className="form-control form-control-sm"
              aria-label="Search Closed Positions"
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ClosedPositionTableHeader;
