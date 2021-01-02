import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const TransactionModal = ({ show, trade, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Tabs defaultActiveKey="stocks" id="transaction-tab">
            <Tab eventKey="stocks" title="Stocks">
              <div className="col-lg-12">
                <div className="mt-3">
                  <label className="form-label">Account</label>
                  <select className="form-select">
                    <option value="1" selected>
                      {trade.account}
                    </option>
                    <option value="2">US TFSA</option>
                    <option value="2">US Margin</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.symbol ? trade.symbol : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Action</label>
                    <select className="form-select">
                      <option value="1" selected>
                        {trade.action}
                      </option>
                      <option value="2">Buy to Close</option>
                      <option value="2">Sell to Open</option>
                      <option value="3">Sell to Close</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="dropdown-divider" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mt-3">
                  <label className="form-label">Trade Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={trade.trade_date ? trade.trade_date : null}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.quantity ? trade.quantity : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.price ? trade.price : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Commission</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.commission ? trade.commission : null}
                      required
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="options" title="Options">
              <div className="col-lg-12">
                <div className="mt-3">
                  <label className="form-label">Account</label>
                  <select className="form-select">
                    <option value="1" selected>
                      {trade.account}
                    </option>
                    <option value="2">US TFSA</option>
                    <option value="2">US Margin</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.symbol ? trade.symbol : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Action</label>
                    <select className="form-select">
                      <option value="1" selected>
                        {trade.action}
                      </option>
                      <option value="2">Buy to Close</option>
                      <option value="2">Sell to Open</option>
                      <option value="3">Sell to Close</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="dropdown-divider" />
              </div>
              <div className="col-lg-12">
                <div className="mt-3">
                  <label className="form-label">Trade Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={trade.trade_date ? trade.trade_date : null}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.quantity ? trade.quantity : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.price ? trade.price : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-3">
                    <label className="form-label">Commission</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.commission ? trade.commission : null}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Strike</label>
                    <input
                      type="text"
                      className="form-control"
                      name="example-text-input"
                      value={trade.strike ? trade.strike : null}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mt-3">
                    <label className="form-label">Expiration</label>
                    <input
                      type="date"
                      className="form-control"
                      value={trade.expiration ? trade.expiration : null}
                    />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </form>
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

export default TransactionModal;
