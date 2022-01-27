import React, { useState } from "react";
import { actionTypes } from "../Helpers";
import Select from "../Select";
import classNames from "classnames";

export default function StrategyInputs(props) {
  const [side, setSide] = useState("BUY");
  const [assetType, setAssetType] = useState("stock");

  const ctnBgClass = classNames({
    "bg-green-lt": side == "BUY",
    "bg-red-lt": side == "SELL",
    "bg-yellow-lt": side != "SELL" && side != "BUY",
  });

  const optionBgClass = classNames({
    "btn-outline-teal": side == "BUY" && assetType != "option",
    "btn-teal": side == "BUY" && assetType == "option",
    "btn-outline-red": side == "SELL" && assetType != "option",
    "btn-red": side == "SELL" && assetType == "option",
  });

  const stockBgClass = classNames({
    "btn-outline-teal": side == "BUY" && assetType != "stock",
    "btn-teal": side == "BUY" && assetType == "stock",
    "btn-outline-red": side == "SELL" && assetType != "stock",
    "btn-red": side == "SELL" && assetType == "stock",
  });

  return (
    <div className={"mt-2"}>
      <div className={"d-flex align-items-center justify-content-between"}>
        <h5 className="mt-2">Leg {props.index}</h5>
        <button type="button" className={"btn-close"} />
      </div>
      <div className={`container ${ctnBgClass} border rounded-3`}>
        {(side == "BUY" || side == "SELL") && (
          <>
            <div className="row mt-3">
              <div className={"col"}>
                <div className={"btn-group w-100"}>
                  <button
                    type={"button"}
                    className={`btn ${optionBgClass} btn-sm mt-1 btn-pill`}
                    onClick={() => {
                      setAssetType("option");
                    }}
                  >
                    Option
                  </button>
                  <button
                    type={"button"}
                    className={`btn ${stockBgClass} btn-sm mt-1 btn-pill`}
                    onClick={() => {
                      setAssetType("stock");
                    }}
                  >
                    Stock
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Expiration</label>
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setExpiration(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Action</label>
          <div className="col">
            <Select
              name={"accounts-selection"}
              className={"form-select"}
              options={actionTypes}
              onChange={(e) => {
                setSide(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Quantity</label>
          <div className="col">
            <input
              type="number"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setQuantity(e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Price</label>
          <div className="col">
            <input
              type="number"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setPrice(e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-group row mt-3 mb-3">
          <label className="form-label col-4 col-form-label">Fee</label>
          <div className="col">
            <input
              type="number"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setFee(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
