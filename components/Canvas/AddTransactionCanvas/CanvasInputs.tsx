import React, { useEffect, useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { strategies } from "../../Helpers";

export default function CanvasInputs({ accounts, setCache }) {
  const [transactions, setTransactions] = useState([
    {
      assetType: "stock",
      action: "BUY",
      quantity: 1,
    },
  ]);

  const [root, setRoot] = useState("");
  const [tradingAccountId, setTradingAccountId] = useState("");
  const [tradeDate, setTradeDate] = useState("");
  const [strategyId, setStrategyId] = useState("");

  useEffect(() => {
    setCache({ transactions, root, tradingAccountId, tradeDate, strategyId });
  }, [transactions]);

  return (
    <>
      <CommonInputs
        accounts={accounts}
        strategies={strategies}
        transactions={transactions}
        setTransactions={setTransactions}
        setRoot={setRoot}
        setTradingAccountId={setTradingAccountId}
        setTradeDate={setTradeDate}
        setStrategyId={setStrategyId}
        strategyId={strategyId}
      />
      <div className="mt-2">
        <div className="dropdown-divider" />
      </div>
      {transactions.map((element, i) => (
        <StrategyInputs
          index={i}
          key={i}
          element={element}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ))}
    </>
  );
}
