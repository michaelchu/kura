import React, { useState, useEffect } from "react";
import Select from "../Select";
import merge from "deepmerge";
import {
  actionTypes,
  optionTypes,
  option_strategies,
  stock_strategies,
  getOptionByValue,
  formatSymbol,
} from "../Helpers";

export default function CanvasInputs({ accounts, handleChange, cache }) {
  const [root, setRoot] = useState("");
  const [strike, setStrike] = useState("");
  const [expiration, setExpiration] = useState("");
  const [optionType, setOptionType] = useState("");

  useEffect(() => {
    handleChange(
      merge(cache, {
        object: { symbol: formatSymbol(root, expiration, strike, optionType) },
      })
    );
  }, [root, strike, expiration, optionType]);

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
            <label className="form-label">Option Type</label>
            <Select
              options={optionTypes}
              name="option-type-selection"
              onChange={(e) => {
                setOptionType(e.target.value);
                handleChange(
                  merge(cache, {
                    object: { optionType: e.target.value },
                  })
                );
              }}
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
      <div className="mt-3">
        <div className="dropdown-divider" />
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="mt-2">
            <label className="form-label">Quantity</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(
                  merge(cache, {
                    object: { quantity: parseInt(e.target.value) },
                  })
                );
              }}
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mt-2">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(
                  merge(cache, {
                    object: { price: parseFloat(e.target.value) },
                  })
                );
              }}
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mt-2">
            <label className="form-label">Fee</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(
                  merge(cache, {
                    object: { fee: parseFloat(e.target.value) },
                  })
                );
              }}
              required
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="mt-2">
            <label className="form-label">Strike</label>
            <input
              type="text"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStrike(e.target.value);
                handleChange(
                  merge(cache, {
                    object: { strike: parseFloat(e.target.value) },
                  })
                );
              }}
              required
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-2">
            <label className="form-label">Expiration</label>
            <input
              type="date"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setExpiration(e.target.value);
                handleChange(
                  merge(cache, {
                    object: { expiration: e.target.value },
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
