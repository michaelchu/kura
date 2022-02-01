import React from "react";
import CommonInputs from "./CommonInputs";
import TransactionInput from "../TransactionInput";
import { strategies } from "../../Helpers";

export default function CanvasInputs({
  accounts,
  transaction,
  setTransaction,
}) {
  let handleChange = (_index, key, val) => {
    const updates = {};
    updates[key] = val;
    setTransaction({ ...transaction, ...updates });
  };

  let handleReset = (_index, assetType) => {
    setTransaction({ ...transaction, ...{ assetType, optionType: "" } });
  };

  return (
    <>
      <CommonInputs
        accounts={accounts}
        element={transaction}
        strategies={strategies}
        handleChange={handleChange}
      />
      <div className="mt-2">
        <div className="dropdown-divider" />
      </div>
      <TransactionInput
        index={1}
        element={transaction}
        hideMiscActions={false}
        handleChange={handleChange}
        handleReset={handleReset}
        disableFormFields={false}
        rolling={false}
      />
    </>
  );
}
