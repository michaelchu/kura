import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function TransactionModal({
  show,
  handleClose,
  handleCloseAndAdd,
}) {
  return (
    <Modal show={show} onHide={handleClose} size={"lg"} centered>
      <Modal.Header>
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
