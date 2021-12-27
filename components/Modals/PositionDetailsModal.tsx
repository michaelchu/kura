import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
export default function PositionDetailsModal({
  symbol,
  show,
  handleClose,
  handleCloseAndRoll,
}) {
  // const [cache, setCache] = useState({ object: {} });

  return (
    <Modal show={show} onHide={handleClose} size={"lg"} centered>
      <Modal.Header>
        <Modal.Title>{symbol}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{"HI"}</Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="outline-warning"
          onClick={() => {
            // setCache({ object: {} });
            handleCloseAndRoll();
          }}
        >
          Roll
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            // setCache({ object: {} });
            handleClose();
          }}
          type="button"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
