import { Button, Modal } from "react-bootstrap";
import React from "react";
import accounting from "accounting";

export default function OpenPosDetailsModal({ row, show, handleClose }) {
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
          <div className={"col-6 text-body text-end"}>{row.tradingAccountName}</div>

          <div className={"col-6 text-muted"}>
            <h4>Trade Date</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.tradeDate}</div>

          <div className={"col-6 text-muted"}>
            <h4>Strategy</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.strategy}</div>
          <div className={"hr"} />

          <div className={"col-6 text-muted"}>
            <h4>Quantity</h4>
          </div>
          <div className={"col-6 text-body text-end"}>{row.quantity}</div>

          <div className={"col-6 text-muted"}>
            <h4>Price</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {accounting.formatMoney(row.avgPrice)}
          </div>

          <div className={"col-6 text-muted"}>
            <h4>Book Cost</h4>
          </div>
          <div className={"col-6 text-body text-end"}>
            {accounting.formatMoney(row.bookCost)}
          </div>
        </div>
        {row.asset_type == "option" ? (
          <div className={"row mt-2"}>
            <div className={"col-12"}>
              <Button
                className={"btn-yellow w-100"}
                onClick={() => {
                  handleClose();
                }}
              >
                Roll
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Modal.Body>
    </Modal>
  );
}
