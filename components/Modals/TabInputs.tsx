import React, { useState, useEffect } from "react";
import Select from "../Select";
import merge from "deepmerge";
import {
  actionTypes,
  optionTypes,
  getOptionByValue,
  strategies,
  formatSymbol,
} from "../Helpers";

export default function TabInputs({
  transaction,
  accounts,
  handleChange,
  cache,
}) {
  const stripSymbol = (symbol) => {
    if (!symbol) return "";
    return symbol.split(" ")[0];
  };

  const [root, setRoot] = useState(stripSymbol(transaction.symbol) || "");
  const [strike, setStrike] = useState(transaction.strike || "");
  const [expiration, setExpiration] = useState(transaction.expiration || "");
  const [optionType, setOptionType] = useState(transaction.optionType || "");

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
            defaultValue={getOptionByValue(
              accounts,
              transaction.tradingAccountId
            )}
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
              defaultValue={stripSymbol(transaction.symbol)}
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
              defaultValue={getOptionByValue(actionTypes, transaction.action)}
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
              defaultValue={transaction.tradeDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(
                  merge(cache, { object: { tradeDate: e.target.value } })
                );
              }}
            />
          </div>
        </div>
        {transaction.assetType == "option" && (
          <div className="col-lg-6">
            <div className="mt-2">
              <label className="form-label">Option Type</label>
              <Select
                options={optionTypes}
                name="option-type-selection"
                defaultValue={getOptionByValue(
                  optionTypes,
                  transaction.optionType
                )}
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
        )}
        <div className="col-lg-12">
          <div className="mt-2">
            <label className="form-label">Strategy</label>
            <Select
              options={strategies}
              name="strategy-selection"
              defaultValue={getOptionByValue(
                strategies,
                transaction.strategyId
              )}
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
              defaultValue={transaction.quantity}
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
              defaultValue={transaction.price}
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
              defaultValue={transaction.fee}
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
      {transaction.assetType == "option" && (
        <div className="row">
          <div className="col-lg-6">
            <div className="mt-2">
              <label className="form-label">Strike</label>
              <input
                type="text"
                className="form-control"
                defaultValue={transaction.strike}
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
                defaultValue={transaction.expiration}
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
      )}
    </div>
  );
}
