import React from "react";
import { optionTypes, assetTypes, formatSymbol } from "../Helpers";
import Select from "../Select";
import { buyBgClass, sellBgClass, ctnBgClass } from "../ClassNames";

export default function StrategyInputs({ index, element, legs, setLegs }) {
  let handleReset = (i, assetType) => {
    let newLegs = [...legs];
    newLegs[i] = { assetType, action: "BUY", quantity: "1" };
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
        <button
          type="button"
          className={"btn-close"}
          onClick={() => handleDelete(index)}
        />
      </div>
      <div
        className={`container ${ctnBgClass(element.action)} border rounded-3`}
      >
        <div className="row mt-3">
          <div className={"col"}>
            <div className={"btn-group w-100"}>
              <button
                type={"button"}
                className={`btn ${buyBgClass(
                  element.action
                )} btn-sm mt-1 btn-pill`}
                onClick={(e) => {
                  handleChange(index, "action", "BUY");
                }}
              >
                Buy
              </button>
              <button
                type={"button"}
                className={`btn ${sellBgClass(
                  element.action
                )} btn-sm mt-1 btn-pill`}
                onClick={() => {
                  handleChange(index, "action", "SELL");
                }}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Asset Type</label>
          <div className="col">
            <Select
              name={"assetType"}
              className={"form-select"}
              defaultValue={element.assetType}
              options={assetTypes}
              onChange={(e) => {
                handleReset(index, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Quantity</label>
          <div className="col">
            <input
              type="number"
              name={"quantity"}
              className="form-control"
              value={element.quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "quantity", e.target.value)
              }
            />
          </div>
        </div>
        {element.assetType == "option" && (
          <>
            <div className="form-group row mt-3">
              <label className="form-label col-4 col-form-label">
                Option Type
              </label>
              <div className="col">
                <Select
                  name={"optionType"}
                  className={"form-select"}
                  options={optionTypes}
                  defaultvalue={"C"}
                  onChange={(e) => {
                    handleChange(index, "optionType", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="form-label col-4 col-form-label">
                Expiration
              </label>
              <div className="col">
                <input
                  type="date"
                  name={"expiration"}
                  className="form-control"
                  value={element.expiration || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(index, "expiration", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="form-label col-4 col-form-label">Strike</label>
              <div className="col">
                <input
                  type="number"
                  name={"strike"}
                  className="form-control"
                  value={element.strike || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, "strike", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
        <div className="form-group row mt-3">
          <label className="form-label col-4 col-form-label">Price</label>
          <div className="col">
            <input
              type="number"
              name={"price"}
              className="form-control"
              value={element.price || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "price", e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-group row mt-3 mb-3">
          <label className="form-label col-4 col-form-label">Fee</label>
          <div className="col">
            <input
              type="number"
              name={"fee"}
              className="form-control"
              value={element.fee || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "fee", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
