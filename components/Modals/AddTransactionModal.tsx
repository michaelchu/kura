import React from "react";
import { Modal, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import StockTab from "./StockTab";
import OptionTab from "./OptionTab";

const AddTransactionModal = ({ show, trade, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Add Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey={"stocks"}>
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
              <StockTab trade={trade} />
            </Tab.Pane>
            <Tab.Pane eventKey={"options"}>
              <OptionTab trade={trade} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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

export default AddTransactionModal;
