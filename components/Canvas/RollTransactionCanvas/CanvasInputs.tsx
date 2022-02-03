import React, { useEffect, useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { strategies } from "../../Helpers";
import dayjs from "dayjs";

export default function CanvasInputs({
  accounts,
  setCache,
  transaction,
  toggleAction,
  convertAction,
}) {
  let closingTrans = { ...transaction };
  closingTrans["action"] = toggleAction(closingTrans["quantity"]);
  closingTrans["quantity"] = closingTrans["quantity"] * -1;

  let openingTrans = { ...transaction };
  openingTrans["action"] = convertAction(openingTrans["quantity"]);

  const [transactions, setTransactions] = useState([
    closingTrans,
    openingTrans,
  ]);
  const [tradeDate, setTradeDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  useEffect(() => {
    const filtered_trans = transactions.map((transaction) => {
      const {
        __typename,
        avgPrice,
        bookCost,
        daysFromExpiration,
        daysToExpiration,
        root,
        strategy,
        tradingAccountName,
        ...rest
      } = transaction;
      return rest;
    });
    setCache({
      transactions: filtered_trans,
      tradeDate,
      root: transaction.symbol.split(" ")[0],
      tradingAccountId: transaction.tradingAccountId,
      strategyId: transaction.strategyId,
    });
  }, [transactions]);

  return (
    <>
      <CommonInputs
        accounts={accounts}
        strategies={strategies}
        transactions={transactions}
        setTransactions={setTransactions}
        tradeDate={tradeDate}
        setTradeDate={setTradeDate}
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
