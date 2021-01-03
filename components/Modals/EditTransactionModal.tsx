import React from "react";
import { Button, Modal } from "react-bootstrap";
import StockTab from "./StockTab";
import OptionTab from "./OptionTab";

const EditTransactionModal = ({ show, trade, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {trade.option_type ? <OptionTab /> : <StockTab />}
      </Modal.Body>
      <Modal.Footer>
        <Button
          as="input"
          type="button"
          variant="secondary"
          onClick={handleClose}
          value="Close"
        />
        <Button
          as="input"
          variant="primary"
          onClick={handleClose}
          type="submit"
          value="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default EditTransactionModal;
