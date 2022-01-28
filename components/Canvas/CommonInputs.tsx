import Select from "../Select";
import React from "react";

export default function CommonInputs({
  accounts,
  strategies,
  setTradingAccount,
  setRoot,
  setStrategy,
  setTradeDate,
  legs,
  addLegs,
  popLegs,
}) {
  return (
    <div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Accounts</label>
        <div className={"col"}>
          <Select
            name={"accounts-selection"}
            className={"form-select"}
            options={accounts}
            onChange={(e) => setTradingAccount(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Symbol</label>
        <div className={"col"}>
          <input
            type="text"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoot(e.target.value)
            }
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Strategy</label>
        <div className={"col"}>
          <Select
            name={"strategy-selection"}
            className={"form-select"}
            options={strategies}
            onChange={(e) => setStrategy(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Date</label>
        <div className={"col"}>
          <input
            type="date"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTradeDate(e.target.value)
            }
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Legs</label>
        <div className={"col"}>
          <div className={"input-group input-group-sm w-100"}>
            <button
              className={"btn form-control"}
              type={"button"}
              onClick={addLegs}
            >
              +
            </button>
            <input
              type="text"
              className="form-control"
              style={{ textAlign: "center" }}
              value={legs.length}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              readOnly
            />
            <button
              className={"btn form-control"}
              type={"button"}
              onClick={popLegs}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
