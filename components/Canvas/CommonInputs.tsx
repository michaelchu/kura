import Select from "../Select";
import React from "react";

export default function CommonInputs({
  accounts,
  strategies,
  legs,
  setLegs,
  setRoot,
  setTradingAccountId,
  setTradeDate,
  setStrategyId,
}) {
  let addLegs = () => {
    setLegs([
      ...legs,
      {
        assetType: "stock",
        action: "BUY",
        quantity: 1,
        price: "0.00",
        fee: "0.00",
      },
    ]);
  };

  let popLegs = () => {
    let newLegs = [...legs];
    newLegs = newLegs.slice(0, -1);
    setLegs(newLegs);
  };

  let handleChange = (key, val) => {
    const newLegs = [...legs];

    const mergedLegs = newLegs.map((leg) => {
      const newLeg = {};
      newLeg[key] = val;
      return { ...leg, ...newLeg };
    });
    setLegs(mergedLegs);
  };

  return (
    <div>
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Accounts</label>
        <div className={"col"}>
          <Select
            name={"accounts-selection"}
            className={"form-select"}
            options={accounts}
            onChange={(e) => {
              setTradingAccountId(e.target.value);
              handleChange("tradingAccountId", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
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
      <div className="form-group row mb-3">
        <label className="form-label col-3 col-form-label">Strategy</label>
        <div className={"col"}>
          <Select
            name={"strategy-selection"}
            className={"form-select"}
            options={strategies}
            onChange={(e) => {
              setStrategyId(e.target.value);
              handleChange("strategyId", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
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
