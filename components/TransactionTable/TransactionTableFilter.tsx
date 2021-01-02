import React from "react";

const TransactionTableFilter = () => (
  <div className="d-flex">
    <div className="text-muted">
      Show
      <div className="mx-2 d-inline-block">
        <input
          type="text"
          className="form-control form-control-sm"
          value="8"
          size={3}
          aria-label="Transactions count"
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
          aria-label="Search Transaction"
        />
      </div>
    </div>
  </div>
);

export default TransactionTableFilter;
