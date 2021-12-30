import { Modal } from "react-bootstrap";
import React from "react";
import accounting from "accounting";

export default function TransactionDetailsModal({ row, show, handleClose }) {
  const includeBadge = (action: string, action_name: string) => {
    if (action == "BTO" || action == "BTC") {
      return <span className="badge bg-green-lt">{action_name}</span>;
    } else if (action == "STC" || action == "STO") {
      return <span className="badge bg-pink-lt">{action_name}</span>;
    } else {
      return <span className="badge bg-yellow-lt">{action_name}</span>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size={"lg"} centered>
      <Modal.Header closeButton>
        <Modal.Title>{row.display} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={"row"}>
          <div className={"col-6 text-muted"}>
            <h4>Account</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.account_name}</div>

          <div className={"col-6 text-muted"}>
            <h4>Trade Date</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.trade_date}</div>

          <div className={"col-6 text-muted"}>
            <h4>Strategy</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.strategy_name}</div>
          <hr />

          <div className={"col-6 text-muted"}>
            <h4>Action</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {includeBadge(row.action, row.action_name)}
          </div>

          <div className={"col-6 text-muted"}>
            <h4>Price</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {accounting.formatMoney(row.price)}
          </div>

          <div className={"col-6 text-muted"}>
            <h4>Fee</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {accounting.formatMoney(row.fee)}
          </div>

          <div className={"col-6 text-muted"}>
            <h4>Total Cost</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {accounting.formatMoney(row.total_cost)}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
