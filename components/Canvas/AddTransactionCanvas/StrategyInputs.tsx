import React from "react";
import TransactionInput from "../TransactionInput";

export default function StrategyInputs({ index, element, legs, setLegs }) {
  let handleReset = (i, assetType) => {
    let newLegs = [...legs];
    newLegs[i] = {
      assetType,
      action: "BUY",
      quantity: 1,
      price: "0.00",
      fee: "0.00",
    };
    setLegs(newLegs);
  };

  let handleChange = (i, key, val) => {
    let newLegs = [...legs];
    newLegs[i][key] = val;
    setLegs(newLegs);
  };

  let handleDelete = (i) => {
    let newLegs = [...legs];
    newLegs.splice(i, 1);
    setLegs(newLegs);
  };

  return (
    <div className={"mt-2"}>
      <div className={"d-flex align-items-center justify-content-between"}>
        <h5 className="mt-2">Leg {index + 1}</h5>
        {legs.length != 1 && (
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
        handleChange={handleChange}
        handleReset={handleReset}
      />
    </div>
  );
}
