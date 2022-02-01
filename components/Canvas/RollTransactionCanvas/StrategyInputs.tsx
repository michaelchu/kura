import React from "react";
import TransactionInput from "../TransactionInput";

export default function StrategyInputs({
  index,
  element,
  transactions,
  setTransactions,
}) {
  let handleChange = (i, key, val) => {
    let newTransactions = [...transactions];
    newTransactions[i][key] = val;
    setTransactions(newTransactions);
  };
  
  let handleReset = (i, assetType, action) => {
    let newTransactions = [...transactions];
    newTransactions[i] = {
      assetType,
      action,
      quantity: 1,
    };
    setTransactions(newTransactions);
  };

  return (
    <div className={"mt-2"}>
      <div className={"d-flex align-items-center justify-content-between"}>
        <h5 className="mt-2">
          {index % 2 == 0 ? "Closing Transaction" : "Opening Transaction"}
        </h5>
      </div>
      <TransactionInput
        index={index}
        element={element}
        hideMiscActions={index % 2 != 0}
        disableFromFields={index % 2 == 0}
        handleReset={handleReset}
        handleChange={handleChange}
        rolling={true}
      />
    </div>
  );
}
