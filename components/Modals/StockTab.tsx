import React from "react";

const StockTab = (trade) => (
  <div>
    <div className="col-lg-12">
      <div className="mt-2">
        <label className="form-label">Account</label>
        <select className="form-select">
          <option defaultValue={trade.account}>{trade.account}</option>
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
            defaultValue={trade.symbol ? trade.symbol : ""}
            required
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="mt-2">
          <label className="form-label">Action</label>
          <select className="form-select">
            <option defaultValue={trade.action}>{trade.action}</option>
            <option value="BTC">BTC</option>
            <option value="STO">STO</option>
            <option value="STC">STC</option>
          </select>
        </div>
      </div>
    </div>
    <div className="col-lg-12">
      <div className="mt-2">
        <label className="form-label">Trade Date</label>
        <input
          type="date"
          className="form-control"
          defaultValue={trade.trade_date ? trade.trade_date : ""}
        />
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
            defaultValue={trade.quantity ? trade.quantity : ""}
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
            defaultValue={trade.price ? trade.price : ""}
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
            defaultValue={trade.commission ? trade.commission : ""}
            required
          />
        </div>
      </div>
    </div>
  </div>
);

export default StockTab;
