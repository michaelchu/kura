import React from "react";
import TransactionInput from "../TransactionInput";

export default function StrategyInputs({
  index,
  element,
  transactions,
  setTransactions,
}) {
  let handleReset = (i, assetType, action) => {
    let newTransactions = [...transactions];
    newTransactions[i] = {
      assetType,
      action,
      quantity: 1,
    };
    setTransactions(newTransactions);
  };

  let handleChange = (i, key, val) => {
    let newTransactions = [...transactions];
    newTransactions[i][key] = val;
    setTransactions(newTransactions);
  };

  let handleDelete = (i) => {
    let newTransactions = [...transactions];
    newTransactions.splice(i, 1);
    setTransactions(newTransactions);
  };

  return (
    <div className={"mt-2"}>
      <div className={"d-flex align-items-center justify-content-between"}>
        <h5 className="mt-2">Leg {index + 1}</h5>
        {transactions.length != 1 && (
          <button
            type="button"
            className={"btn-close"}
            onClick={() => handleDelete(index)}
          />
        )}
      </div>
      <TransactionInput
        index={index}
        element={element}
        hideMiscActions={false}
        handleChange={handleChange}
        handleReset={handleReset}
        disableFromFields={false}
        rolling={false}
      />
    </div>
  );
}
