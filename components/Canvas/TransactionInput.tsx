import {
  buyBgClass,
  ctnBgClass,
  sellBgClass,
  asnBgClass,
  expBgClass,
} from "../ClassNames";
import { assetTypes, optionTypes, buyActions, sellActions } from "../Helpers";
import React from "react";
import Select from "../Select";

export default function TransactionInput({
  index,
  element,
  handleChange,
  handleReset,
  hideMiscActions,
  disableFromFields,
  rolling,
}) {
  return (
    <div className={`container ${ctnBgClass(element.action)} border rounded-3`}>
      <div className="row mt-2 mb-3">
        <div className={"col"}>
          <div className={"btn-group w-100"}>
            <button
              type={"button"}
              className={`btn ${buyBgClass(
                element.action
              )} btn-sm mt-1 btn-pill`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleChange(index, "action", "BUY");
              }}
              disabled={
                rolling && sellActions(element.action) && disableFromFields
              }
            >
              Buy
            </button>
            {!hideMiscActions && (
              <>
                <button
                  type={"button"}
                  className={`btn ${asnBgClass(
                    element.action
                  )} btn-sm mt-1 btn-pill`}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleChange(index, "action", "ASN");
                  }}
                >
                  Assign
                </button>
                <button
                  type={"button"}
                  className={`btn ${expBgClass(
                    element.action
                  )} btn-sm mt-1 btn-pill`}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleChange(index, "action", "EXP");
                  }}
                >
                  Expired
                </button>
              </>
            )}
            <button
              type={"button"}
              className={`btn ${sellBgClass(
                element.action
              )} btn-sm mt-1 btn-pill`}
              onClick={() => {
                handleChange(index, "action", "SELL");
              }}
              disabled={
                rolling && buyActions(element.action) && disableFromFields
              }
            >
              Sell
            </button>
          </div>
        </div>
      </div>
      {!disableFromFields && (
        <>
          <div className="form-group row mt-2">
            <label className="form-label col-4 col-form-label">
              Asset Type
            </label>
            <div className={"col"}>
              <Select
                name={"assetType"}
                className={"form-select"}
                defaultValue={element.assetType}
                options={assetTypes}
                onChange={(e) => {
                  handleReset(index, e.target.value, element.action);
                }}
              />
            </div>
          </div>
          {element.assetType == "option" && (
            <div className="form-group row mt-2">
              <label className="form-label col-4 col-form-label">
                Option Type
              </label>
              <div className={"col"}>
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
          )}
        </>
      )}
      <div className="form-group row mt-2">
        <label className="form-label col-4 col-form-label">Quantity</label>
        <div className="col">
          <input
            type="number"
            min={"0"}
            inputMode={"numeric"}
            pattern={"[0-9]*"}
            name={"quantity"}
            className="form-control"
            defaultValue={element.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(index, "quantity", Number(e.target.value));
            }}
          />
        </div>
      </div>
      {element.assetType == "option" && (
        <>
          <div className="form-group row mt-2">
            <label className="form-label col-4 col-form-label">
              Expiration
            </label>
            <div className="col">
              <input
                type="date"
                name={"expiration"}
                className="form-control"
                defaultValue={element.expiration || ""}
                disabled={disableFromFields}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(index, "expiration", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label className="form-label col-4 col-form-label">Strike</label>
            <div className="col">
              <input
                type="number"
                name={"strike"}
                min={"0"}
                inputMode={"decimal"}
                className="form-control"
                disabled={disableFromFields}
                defaultValue={element.strike || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "strike", e.target.value)
                }
              />
            </div>
          </div>
        </>
      )}
      <div className="form-group row mt-2">
        <label className="form-label col-4 col-form-label">Price</label>
        <div className="col">
          <input
            type="number"
            name={"price"}
            min={"0"}
            inputMode={"decimal"}
            className="form-control"
            defaultValue={element.price || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "price", e.target.value)
            }
          />
        </div>
      </div>
      <div className="form-group row mt-2 mb-2">
        <label className="form-label col-4 col-form-label">Fee</label>
        <div className="col">
          <input
            type="number"
            name={"fee"}
            min={"0"}
            inputMode={"decimal"}
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
