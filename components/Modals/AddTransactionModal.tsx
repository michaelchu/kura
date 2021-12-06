import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TabInputs from "./TabInputs";
import moment from "moment";
import _ from "lodash";

const AddTransactionModal = ({
  show,
  accounts,
  isOption,
  handleClose,
  handleCloseAndAdd,
}) => {
  const [cache, setCache] = useState({ object: {} });

  return (
    <Modal show={show} onHide={handleClose} size={"sm"} centered>
      <Modal.Header>
        <Modal.Title>
          Add {isOption ? "Option" : "Stock"} Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabInputs
          transaction={cache}
          cache={cache}
          accounts={accounts}
          handleChange={setCache}
          isOption={isOption}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (isOption) {
              // if is option, merge fields to generate option symbol and update cache
              const { object }: any = cache;
              const formatted_exp_date = moment(object.expiration_date).format(
                "YYMMDD"
              );
              const formatted_sym = [
                object.symbol,
                formatted_exp_date,
                object.option_type,
                object.strike,
              ].join("");
              const newCache = _.pick(object, [
                "account_id",
                "quantity",
                "trade_date",
                "action",
                "price",
                "fee",
                "strategy",
              ]);

              handleCloseAndAdd({
                object: _.merge(newCache, {
                  asset_type: "option",
                  symbol: formatted_sym,
                }),
              });
            } else {
              handleCloseAndAdd(
                _.merge(cache, { object: { asset_type: "stock" } })
              );
            }
          }}
          type="button"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal;
