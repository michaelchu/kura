import Select from "../../Select";
import React from "react";

export default function CommonInputs({
  accounts,
  strategies,
  transactions,
  setTransactions,
  tradeDate,
  setTradeDate,
}) {
  let handleChange = (key, val) => {
    const newTransactions = [...transactions];

    const mergedTransactions = newTransactions.map((leg) => {
      const newLeg = {};
      newLeg[key] = val;
      return { ...leg, ...newLeg };
    });
    setTransactions(mergedTransactions);
  };
  return (
    <div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Account</label>
        <div className={"col"}>
          <Select
            name={"roll-accounts-selection"}
            className={"form-select"}
            options={accounts}
            defaultValue={transactions[0].tradingAccountId}
            disabled={true}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Symbol</label>
        <div className={"col"}>
          <input
            type="text"
            className="form-control"
            defaultValue={transactions[0].symbol.split(" ")[0]}
            disabled={true}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Date</label>
        <div className={"col"}>
          <input
            type="date"
            className="form-control"
            defaultValue={tradeDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTradeDate(e.target.value);
              handleChange("tradeDate", e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
