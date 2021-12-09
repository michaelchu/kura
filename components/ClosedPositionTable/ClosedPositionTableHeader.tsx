import React from "react";

const ClosedPositionTableHeader = ({ filter, setFilter }) => (
  <>
    <div className="card-header">
      <h3 className="card-title">Closed Positions</h3>
      <div className="ms-auto text-muted">
        <div className="input-icon ms-2 d-inline-block">
          <input
            type="text"
            className="form-control"
            placeholder="Search…"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="input-icon-addon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </>
);

export default ClosedPositionTableHeader;
