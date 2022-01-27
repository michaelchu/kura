import Select from "../Select";
import React from "react";
import { strategies } from "../Helpers";

export default function CommonInputs(props) {
  return (
    <div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Accounts</label>
        <div className={"col"}>
          <Select
            name={"accounts-selection"}
            className={"form-select"}
            options={props.accounts}
            onChange={(e) => props.setTradingAccount(e.target.value)}
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
              props.setRoot(e.target.value)
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
            onChange={(e) => props.setStrategy(e.target.value)}
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
              props.setTradeDate(e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
