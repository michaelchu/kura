import React from "react";
import { IconSearch } from "@tabler/icons";

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
            <IconSearch />
          </span>
        </div>
      </div>
    </div>
  </>
);

export default ClosedPositionTableHeader;
