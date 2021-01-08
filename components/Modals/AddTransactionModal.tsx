import React, { useState, useEffect } from "react";
import { Modal, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import TabInputs from "./TabInputs";

const AddTransactionModal = ({
  show,
  accounts,
  handleClose,
  handleCloseAndAdd,
}) => {
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
  const [activeTab, setActiveTab] = useState("stocks");
  const [transaction, setTransaction] = useState(emptyTrans);

  const handleTabChange = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setActiveTab("stocks" ? "options" : "stocks");
    setTransaction(emptyTrans);
  };

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Add Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container
          defaultActiveKey={activeTab}
          onSelect={(e) => handleTabChange()}
        >
          <Nav variant="tabs" className={"flex-row-reverse"}>
            <Nav.Item>
              <Nav.Link eventKey="options">Options</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stocks">Stocks</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey={"stocks"}>
              <TabInputs
                transaction={transaction}
                accounts={accounts}
                handleChange={setTransaction}
                isOption={false}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={"options"}>
              <TabInputs
                transaction={transaction}
                accounts={accounts}
                handleChange={setTransaction}
                isOption={true}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseAndAdd} type="button">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal;
