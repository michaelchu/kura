import { buyBgClass, ctnBgClass, sellBgClass } from "../ClassNames";
import Select from "../Select";
import { assetTypes, optionTypes } from "../Helpers";
import React from "react";

export default function TransactionInput({
  index,
  element,
  handleChange,
  handleReset,
}) {
  return (
    <div className={`container ${ctnBgClass(element.action)} border rounded-3`}>
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
            defaultValue={element.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "quantity", Number(e.target.value))
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
                defaultValue={element.optionType}
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
                defaultValue={element.expiration || ""}
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
                defaultValue={element.strike || ""}
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
            defaultValue={element.price || ""}
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
            defaultValue={element.fee || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "fee", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
