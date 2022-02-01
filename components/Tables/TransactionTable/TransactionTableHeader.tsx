import React from "react";
import { IconSearch } from "@tabler/icons";
import { ButtonGroup, Button } from "react-bootstrap";

export default function TransactionTableHeader({ filter, setFilter }) {
  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <div className="text-muted">
          <div className="input-icon">
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
        <ButtonGroup aria-label="Basic example">
          <Button variant="light">Buy Side</Button>
          <Button variant="light">All Trades</Button>
          <Button variant="light">Sell Side</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
