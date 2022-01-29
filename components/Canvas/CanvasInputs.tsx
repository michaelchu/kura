import React, { useEffect, useState } from "react";
import CommonInputs from "./CommonInputs";
import StrategyInputs from "./StrategyInputs";
import { strategies } from "../Helpers";

export default function CanvasInputs({ accounts, setCache }) {
  const [legs, setLegs] = useState([
    { assetType: "stock", action: "BUY", quantity: "1" },
    { assetType: "option", action: "SELL", quantity: "1" },
    { assetType: "stock", action: "BUY", quantity: "1" },
    { assetType: "option", action: "SELL", quantity: "1" },
  ]);

  const [root, setRoot] = useState("");

  useEffect(() => {
    setCache(legs);
  }, [legs]);

  return (
    <>
      <CommonInputs
        accounts={accounts}
        strategies={strategies}
        legs={legs}
        setRoot={setRoot}
        setLegs={setLegs}
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
