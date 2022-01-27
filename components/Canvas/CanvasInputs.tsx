import React, { useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { range } from "underscore";

export default function CanvasInputs({ accounts, commonCache, strategyCache }) {
  const [root, setRoot] = useState("");
  return (
    <>
      <CommonInputs accounts={accounts} cache={commonCache} setRoot={setRoot} />
      <div className="mt-2">
        <div className="dropdown-divider" />
      </div>
      {range(1, 3).map((i) => (
        <StrategyInputs index={i} cache={strategyCache} root={root} />
      ))}
    </>
  );
}
