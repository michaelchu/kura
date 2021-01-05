import React from "react";
import { Button, Modal } from "react-bootstrap";
import StockTab from "./StockTab";
import OptionTab from "./OptionTab";
import { ModalProps } from "../../interfaces/app_interfaces";

const EditTransactionModal = ({ show, row, handleClose }: ModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {row && row.option_type ? (
          <OptionTab row={row} />
        ) : (
          <StockTab row={row} />
        )}
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
