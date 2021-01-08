import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import TabInputs from "./TabInputs";

const EditTransactionModal = ({ show, trans, accounts, handleClose }) => {
  const emptyTrans = {
    id: "",
    account_id: "",
    trade_date: "",
    symbol: "",
    action: "",
    quantity: 0,
    price: 0,
    commission: 0,
    option_type: "",
    strike: 0,
    expiration: "",
  };
  const [transaction, setTransaction] = useState(emptyTrans);

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {trans && trans.option_type ? (
          <TabInputs
            transaction={trans}
            accounts={accounts}
            handleChange={setTransaction}
            isOption={true}
          />
        ) : (
          <TabInputs
            transaction={trans}
            accounts={accounts}
            handleChange={setTransaction}
            isOption={false}
          />
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
