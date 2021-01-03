import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteTransactionModal = ({ show, trade, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>If you proceed, you will permanently delete the trade.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          as="input"
          type="button"
          variant="secondary"
          onClick={handleClose}
          value="Cancel"
        />
        <Button
          as="input"
          variant="primary"
          onClick={handleClose}
          type="submit"
          value="Delete"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTransactionModal;
