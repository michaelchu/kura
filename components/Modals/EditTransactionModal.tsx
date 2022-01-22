import React, { useState } from "react";
import TabInputs from "./TabInputs";
import { Modal, Button } from "react-bootstrap";

export default function EditTransactionModal({
  show,
  selectedTrans,
  accounts,
  handleClose,
  handleCloseAndUpdate,
  handleCloseAndDelete,
}) {
  const [cache, setCache] = useState({ id: selectedTrans.id, object: {} });

  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabInputs
          transaction={selectedTrans}
          cache={cache}
          accounts={accounts}
          handleChange={(cache) => {
            setCache({ ...cache, id: selectedTrans.id });
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          as="input"
          type="button"
          variant="danger"
          onClick={() => {
            handleCloseAndDelete(selectedTrans.id);
          }}
          value="Delete"
        />
        <Button
          as="input"
          variant="primary"
          onClick={() => {
            handleCloseAndUpdate(cache);
          }}
          type="submit"
          value="Save Changes"
        />
      </Modal.Footer>
    </Modal>
  );
}
