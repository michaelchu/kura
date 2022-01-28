import { Button, Offcanvas } from "react-bootstrap";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ErrorPage from "../ErrorPage";
import CanvasInputs from "./CanvasInputs";

export default function AddTransactionCanvas({ show, canvasToggle }) {
  const TRADING_ACCOUNTS_QUERY = gql`
    query FetchTradingAccounts {
      tradingAccounts {
        value: id
        label: name
      }
    }
  `;
  const [commonCache, setCommonCache] = useState({});
  const [strategyCache, setStrategyCache] = useState({ object: [] });

  const mergeCache = () => {};

  const { data, error, loading } = useQuery(TRADING_ACCOUNTS_QUERY);
  if (loading) return null; // consider rendering canvas skeleton during load
  if (error) return <ErrorPage />;

  return (
    <Offcanvas
      show={show}
      onHide={() => canvasToggle()}
      placement="end"
      style={{ width: "400px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Transaction</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>
          When entering multi-leg option strategies, if the fee was charged to
          the entire transaction as a whole, enter the amount on any <b>one</b>{" "}
          leg only.
        </p>
        <CanvasInputs
          commonCache={commonCache}
          strategyCache={strategyCache}
          accounts={data.tradingAccounts}
        />
      </Offcanvas.Body>
      <div>
        <div className="card-footer">
          <Button
            className={"mt-1 mb-1 w-100"}
            as="input"
            variant="cyan"
            onClick={() => {
              mergeCache();
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
