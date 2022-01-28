import React, { useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { formatSymbol, strategies } from "../Helpers";

export default function CanvasInputs({ accounts, commonCache, strategyCache }) {
  const [legs, setLegs] = useState([
    { assetType: "stock", action: "BUY", quantity: "1" },
    { assetType: "option", action: "SELL" },
    { assetType: "stock", action: "BUY" },
    { assetType: "option", action: "SELL" },
  ]);

  const [root, setRoot] = useState("");
  const [, setTradingAccount] = useState(accounts[0].value);
  const [, setStrategy] = useState(strategies[0].value);
  const [, setTradeDate] = useState("");

  let handleReset = (i, assetType) => {
    let newLegs = [...legs];
    newLegs[i] = { assetType, action: "BUY", quantity: "1" };
    setLegs(newLegs);
  };

  let handleChange = (i, key, val) => {
    let newLegs = [...legs];
    let leg = newLegs[i];

    leg[key] = val;

    if (key == "expiration" || key == "strike" || key == "optionType") {
      leg["symbol"] = formatSymbol(
        root,
        leg["expiration"],
        leg["strike"],
        leg["optionType"]
      );
    }
    setLegs(newLegs);
  };

  let addLegs = () => {
    setLegs([...legs, { assetType: "stock", action: "BUY", quantity: "1" }]);
  };

  let handleDelete = (i) => {
    let newLegs = [...legs];
    newLegs.splice(i, 1);
    setLegs(newLegs);
  };

  let popLegs = () => {
    let newLegs = [...legs];
    newLegs = newLegs.slice(0, -1);
    setLegs(newLegs);
  };

  return (
    <>
      <CommonInputs
        accounts={accounts}
        strategies={strategies}
        setRoot={setRoot}
        setTradingAccount={setTradingAccount}
        setStrategy={setStrategy}
        setTradeDate={setTradeDate}
        legs={legs}
        addLegs={addLegs}
        popLegs={popLegs}
      />
      <div className="mt-2">
        <div className="dropdown-divider" />
      </div>
      {legs.map((element, i) => (
        <StrategyInputs
          index={i}
          element={element}
          handleDelete={handleDelete}
          handleChange={handleChange}
          handleReset={handleReset}
        />
      ))}
    </>
  );
}
