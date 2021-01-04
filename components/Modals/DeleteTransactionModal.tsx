import React from "react";
import { Button, Modal } from "react-bootstrap";
import { DeleteModalProps } from "../../interfaces/app_interfaces";

const DeleteTransactionModal = ({
  show,
  trans,
  handleClose,
  handleCloseAndDelete,
}: DeleteModalProps) => {
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
          variant="danger"
          onClick={() => handleCloseAndDelete(trans.id)}
          type="submit"
          value="Yes, delete all my data"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTransactionModal;
