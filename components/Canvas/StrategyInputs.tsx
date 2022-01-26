import React from "react";
import { actionTypes } from "../Helpers";
import Select from "../Select";

export default function StrategyInputs(props) {
  return (
    <>
      <label className="form-label col-form-label mt-2">
        Leg {props.index}
      </label>
      <div className="container bg-green-lt border rounded-3">
        <div className="row mt-3">
          <div className={"col"}>
            <div className={"btn-group w-100"}>
              <button
                type={"button"}
                className={"btn btn-outline-teal btn-sm mt-1 btn-pill"}
              >
                Option
              </button>
              <button
                type={"button"}
                className={"btn btn-teal btn-sm mt-1 btn-pill"}
              >
                Stock
              </button>
            </div>
          </div>
        </div>
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
              onChange={(e) => props.setAction(e.target.value)}
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
    </>
  );
}
