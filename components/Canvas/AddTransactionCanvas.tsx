import { Button, Offcanvas } from "react-bootstrap";
import TabInputs from "../Modals/TabInputs";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ErrorPage from "../ErrorPage";

export default function AddTransactionCanvas({ show, canvasToggle }) {
  const TRADING_ACCOUNTS_QUERY = gql`
    query FetchTradingAccounts {
      tradingAccounts {
        value: id
        label: name
      }
    }
  `;
  const [cache, setCache] = useState({ object: {} });
  const { data, error, loading } = useQuery(TRADING_ACCOUNTS_QUERY);
  if (loading) return null; // consider rendering canvas skeleton during load
  if (error) return <ErrorPage />;

  return (
    <Offcanvas show={show} onHide={() => canvasToggle()} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Transaction</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>
          When entering multi-leg option strategies, if the fee was charged to
          the entire transaction as a whole, enter the amount on any <b>one</b>{" "}
          leg only.
        </p>
        <TabInputs
          transaction={{}}
          cache={cache}
          accounts={data.tradingAccounts}
          handleChange={(cache) => {
            setCache({ ...cache });
          }}
        />
      </Offcanvas.Body>
      <div>
        <div className="card-footer col-12">
          <Button
            className={"w-100"}
            as="input"
            variant="primary"
            onClick={() => {
              canvasToggle();
            }}
            type="submit"
            value="Add Transaction"
          />
        </div>
      </div>
    </Offcanvas>
  );
}
