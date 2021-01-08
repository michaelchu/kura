import React from "react";
import Select from "react-select";

const TabInputs = ({ transaction, accounts, handleChange, isOption }) => {
  const actionTypes = [
    { value: "BTO", label: "Buy to Open" },
    { value: "BTC", label: "Buy to Close" },
    { value: "STO", label: "Sell to Open" },
    { value: "STC", label: "Sell to Close" },
  ];

  const optionTypes = [
    { value: "C", label: "Call" },
    { value: "P", label: "Put" },
  ];

  const getOptionByValue = (
    options: { value: string; label: string }[],
    value: string
  ) => {
    return options.find((opt) => opt.value === value);
  };

  return (
    <div>
      <div className="col-lg-12">
        <div className="mt-2">
          <label className="form-label">Accounts</label>
          <Select
            options={accounts}
            onChange={(e) =>
              handleChange({ ...transaction, account_id: e.value })
            }
            defaultValue={getOptionByValue(accounts, transaction.account_id)}
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
              defaultValue={transaction.symbol}
              onChange={(e) => {
                handleChange({ ...transaction, symbol: e.target.value });
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
              defaultValue={getOptionByValue(actionTypes, transaction.action)}
              onChange={(e) =>
                handleChange({ ...transaction, action: e.value })
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
              defaultValue={transaction.trade_date}
              onChange={(e) => {
                handleChange({ ...transaction, trade_date: e.target.value });
              }}
            />
          </div>
        </div>
        {isOption && (
          <div className="col-lg-6">
            <div className="mt-2">
              <label className="form-label">Option Type</label>
              <Select
                options={optionTypes}
                defaultValue={getOptionByValue(
                  optionTypes,
                  transaction.option_type
                )}
                onChange={(e) =>
                  handleChange({ ...transaction, option_type: e.value })
                }
              />
            </div>
          </div>
        )}
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
              onChange={(e) => {
                handleChange({ ...transaction, quantity: e.target.value });
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
              onChange={(e) => {
                handleChange({ ...transaction, price: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mt-2">
            <label className="form-label">Commission</label>
            <input
              type="text"
              className="form-control"
              defaultValue={transaction.commission}
              onChange={(e) => {
                handleChange({ ...transaction, commission: e.target.value });
              }}
              required
            />
          </div>
        </div>
      </div>
      {isOption && (
        <div className="row">
          <div className="col-lg-6">
            <div className="mt-2">
              <label className="form-label">Strike</label>
              <input
                type="text"
                className="form-control"
                defaultValue={transaction.strike}
                onChange={(e) => {
                  handleChange({ ...transaction, strike: e.target.value });
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
                onChange={(e) => {
                  handleChange({ ...transaction, expiration: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabInputs;
