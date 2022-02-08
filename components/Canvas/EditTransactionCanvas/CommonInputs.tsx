import Select from "../../Select";
import React from "react";

export default function CommonInputs({
  accounts,
  element,
  strategies,
  handleChange,
}) {
  return (
    <div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Account</label>
        <div className={"col"}>
          <Select
            name={"edit-accounts-selection"}
            className={"form-select"}
            options={accounts}
            defaultValue={element.tradingAccountId}
            onChange={(e) => {
              handleChange(1, "tradingAccountId", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Symbol</label>
        <div className={"col"}>
          <input
            type="text"
            className="form-control"
            defaultValue={element.symbol.split(" ")[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(1, "symbol", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Strategy</label>
        <div className={"col"}>
          <Select
            name={"edit-strategy-selection"}
            className={"form-select"}
            defaultValue={element.strategyId}
            options={strategies}
            onChange={(e) => {
              handleChange(1, "strategyId", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Date</label>
        <div className={"col"}>
          <input
            type="date"
            defaultValue={element.tradeDate}
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(1, "tradeDate", e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
