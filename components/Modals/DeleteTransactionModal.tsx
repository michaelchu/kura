import { Modal } from "react-bootstrap";
import React from "react";
import { useMutation } from "@apollo/client";
import DELETE_TRANSACTION from "../../api/mutations/DeleteTransaction.graphql";
import DASHBOARD_QUERY from "../../api/queries/Dashboard.graphql";

export default function DeleteTransactionModal({
  show,
  transaction,
  modalToggle,
}) {
  const [
    deleteMutation,
    { loading: deleteMutationLoading, reset: deleteReset },
  ] = useMutation(DELETE_TRANSACTION, {
    onError: (err) => {
      console.log(err);
      deleteReset();
    },
    onCompleted: () => {
      modalToggle();
    },
    refetchQueries: [DASHBOARD_QUERY],
    awaitRefetchQueries: true,
  });

  return (
    <Modal show={show} onHide={modalToggle} size={"sm"} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>This action cannot be undone!</div>
      </Modal.Body>
      <div className={"modal-footer"}>
        <button
          type={"button"}
          className={"btn btn-link, link-secondary me-auto"}
          onClick={() => {
            deleteReset();
            modalToggle();
          }}
        >
          Cancel
        </button>
        <button
          type={"button"}
          className={
            "btn btn-danger " + (deleteMutationLoading ? "btn-loading" : "")
          }
          onClick={() => {
            deleteMutation({
              variables: { id: transaction.id },
            }).then(modalToggle());
          }}
        >
          Delete Transaction
        </button>
      </div>
    </Modal>
  );
}
