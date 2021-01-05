import React from "react";
import ActionSelect from "../Selections/ActionSelect";

const OptionTab = ({ row }) => (
  <div>
    <div className="col-lg-12">
      <div className="mt-2">
        <label className="form-label">Account</label>
        <select className="form-select">
          <option defaultValue={row.account}>{row.account}</option>
          <option value="2">US TFSA</option>
          <option value="2">US Margin</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Symbol</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            defaultValue={row.symbol}
            required
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="mt-2">
          <ActionSelect defaultValue={row.action} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Trade Date</label>
          <input
            type="date"
            className="form-control"
            defaultValue={row.trade_date}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Option Type</label>
          <select className="form-select">
            <option defaultValue={row.option_type}>{row.option_type}</option>
            <option value="C">Call</option>
            <option value="P">Put</option>
          </select>
        </div>
      </div>
    </div>
    <div className="mt-3">
      <div className="dropdown-divider" />
    </div>
    <div className="row">
      <div className="col-lg-4">
        <div className="mt-2">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            defaultValue={row.quantity ? row.quantity : ""}
            required
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mt-2">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            defaultValue={row.price ? row.price : ""}
            required
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mt-2">
          <label className="form-label">Commission</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            defaultValue={row.commission ? row.commission : ""}
            required
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Strike</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            defaultValue={row.strike ? row.strike : ""}
            required
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Expiration</label>
          <input
            type="date"
            className="form-control"
            defaultValue={row.expiration ? row.expiration : ""}
          />
        </div>
      </div>
    </div>
  </div>
);

export default OptionTab;
