import Select from "../../Select";
import React from "react";

export default function CommonInputs({
  accounts,
  strategies,
  transactions,
  setTransactions,
  setRoot,
  setTradingAccountId,
  setTradeDate,
  setStrategyId,
  strategyId,
}) {
  let addTransactions = () => {
    setTransactions([
      ...transactions,
      {
        assetType: "stock",
        action: "BUY",
        quantity: 1,
      },
    ]);
  };

  let popTransaction = () => {
    let newTransactions = [...transactions];
    newTransactions = newTransactions.slice(0, -1);
    setTransactions(newTransactions);
  };

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
            name={"add-accounts-selection"}
            className={"form-select"}
            options={accounts}
            onChange={(e) => {
              setTradingAccountId(e.target.value);
              handleChange("tradingAccountId", e.target.value);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoot(e.target.value);
              handleChange("symbol", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Strategy</label>
        <div className={"col"}>
          <Select
            name={"add-strategy-selection"}
            className={"form-select"}
            options={strategies}
            onChange={(e) => {
              setStrategyId(e.target.value);
              handleChange("strategyId", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-2">
        <label className="form-label col-3 col-form-label">Date</label>
        <div className={"col"}>
          <input
            type="date"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTradeDate(e.target.value);
              handleChange("tradeDate", e.target.value);
            }}
          />
        </div>
      </div>
      {strategyId != "stock" && strategyId != "" && (
        <div className="form-group row mb-3">
          <label className="form-label col-3 col-form-label">Legs</label>
          <div className={"col"}>
            <div className={"input-group input-group-sm w-100"}>
              <button
                className={"btn form-control"}
                type={"button"}
                onClick={addTransactions}
              >
                +
              </button>
              <input
                type="text"
                className="form-control"
                style={{ textAlign: "center" }}
                value={transactions.length}
                readOnly
              />
              <button
                className={"btn form-control"}
                type={"button"}
                onClick={() => {
                  transactions.length > 1 ? popTransaction() : null;
                }}
              >
                -
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
