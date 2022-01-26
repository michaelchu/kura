import Select from "../Select";
import merge from "deepmerge";
import React from "react";
import { actionTypes, stock_strategies } from "../Helpers";

export default function CommonInputs({
  accounts,
  handleChange,
  cache,
  setRoot,
}) {
  return (
    <div>
      <div className="col-lg-12">
        <div className="mt-2">
          <label className="form-label">Accounts</label>
          <Select
            name={"accounts-selection"}
            options={accounts}
            onChange={(e) => {
              handleChange(
                merge(cache, { object: { tradingAccountId: e.target.value } })
              );
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="mt-2">
            <label className="form-label">Symbol</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRoot(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-2">
            <label className="form-label">Action</label>
            <Select
              options={actionTypes}
              name="action-selection"
              onChange={(e) =>
                handleChange(
                  merge(cache, { object: { action: e.target.value } })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg">
          <div className="mt-2">
            <label className="form-label">Trade Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(
                  merge(cache, { object: { tradeDate: e.target.value } })
                );
              }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-2">
            <label className="form-label">Fees</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              required
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="mt-2">
            <label className="form-label">Strategy</label>
            <Select
              options={stock_strategies}
              name="strategy-selection"
              onChange={(e) =>
                handleChange(
                  merge(cache, { object: { strategyId: e.target.value } })
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
