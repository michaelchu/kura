import React, { useEffect, useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { strategies } from "../../Helpers";

export default function CanvasInputs({ accounts, setCache }) {
  const [legs, setLegs] = useState([
    {
      assetType: "stock",
      action: "BUY",
      quantity: 1,
      price: "0.00",
      fee: "0.00",
    },
  ]);

  const [root, setRoot] = useState("");
  const [tradingAccountId, setTradingAccountId] = useState("");
  const [tradeDate, setTradeDate] = useState("");
  const [strategyId, setStrategyId] = useState("");

  useEffect(() => {
    setCache({ legs, root, tradingAccountId, tradeDate, strategyId });
  }, [legs]);

  return (
    <>
      <CommonInputs
        accounts={accounts}
        strategies={strategies}
        legs={legs}
        setRoot={setRoot}
        setLegs={setLegs}
        setTradingAccountId={setTradingAccountId}
        setTradeDate={setTradeDate}
        setStrategyId={setStrategyId}
        strategyId={strategyId}
      />
      <div className="mt-2">
        <div className="dropdown-divider" />
      </div>
      {legs.map((element, i) => (
        <StrategyInputs
          index={i}
          element={element}
          legs={legs}
          setLegs={setLegs}
        />
      ))}
    </>
  );
}
