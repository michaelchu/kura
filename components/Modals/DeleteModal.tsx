import { Button, Modal } from "react-bootstrap";
import React from "react";
import { IconAlertTriangle } from "@tabler/icons";

export default function DeleteModal({ show, transaction, modalToggle }) {
  return (
    <Modal show={show} onHide={modalToggle} size={"sm"} centered>
      <Modal.Body>
        <div className={"modal-status bg-danger"} />
        <div className={"text-center py-4"}>
          <IconAlertTriangle className={"text-danger icon-lg icon mb-2"} />
          <h3>Are you sure?</h3>
          <div className={"text-muted"}>
            Do you really want to remove this transaction? This cannot be
            undone.
          </div>
        </div>
        <div className={"w-100"}>
          <div className={"row"}>
            <div className={"col"}>
              <Button className={"btn w-100"} onClick={modalToggle}>
                Cancel
              </Button>
            </div>
            <div className={"col"}>
              <Button
                className={"btn btn-danger w-100"}
                onClick={() => {
                  console.log(transaction);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
