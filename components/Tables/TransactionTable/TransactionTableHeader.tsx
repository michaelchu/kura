import React from "react";
import { IconSearch } from "@tabler/icons";

export default function TransactionTableHeader({
  filter,
  setFilter,
  setTransaction,
  setIsOption,
  addModalToggle,
}) {
  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Transactions</h3>
        <div className="ms-auto text-muted">
          <div className="btn-group w-40" style={{ verticalAlign: "top" }}>
            <button
              type="button"
              className="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#add-modal"
              onClick={() => {
                setIsOption(true);
                addModalToggle();
                setTransaction({});
              }}
            >
              Add Option
            </button>
            <button
              type="button"
              className="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#add-modal"
              onClick={() => {
                setIsOption(false);
                addModalToggle();
                setTransaction({});
              }}
            >
              Add Stock
            </button>
          </div>
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
}
