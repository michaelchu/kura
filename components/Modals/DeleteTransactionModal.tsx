import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteTransactionModal = ({
  show,
  trans,
  handleClose,
  handleCloseAndDelete,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>If you proceed, you will permanently delete this transaction.</p>
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
          variant="danger"
          onClick={() => handleCloseAndDelete(trans.id)}
          type="submit"
          value="Yes, delete this transaction"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTransactionModal;
