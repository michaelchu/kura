import { Button, Offcanvas, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ErrorPage from "../../ErrorPage";
import CanvasInputs from "./CanvasInputs";
import { formatSymbol } from "../../Helpers";
import INSERT_TRANSACTIONS from "../../../api/mutations/InsertTransactions.graphql";
import FETCH_TRANSACTIONS from "../../../api/queries/FetchTransactions.graphql";
import DASHBOARD_QUERY from "../../../api/queries/Dashboard.graphql";
import { btnSubmitClass } from "../../ClassNames";

export default function AddTransactionCanvas({ show, canvasToggle }) {
  const TRADING_ACCOUNTS_QUERY = gql`
    query FetchTradingAccounts {
      tradingAccounts {
        value: id
        label: name
      }
    }
  `;

  const [
    insertMutation,
    { loading: mutationLoading, error: mutationError, reset },
  ] = useMutation(INSERT_TRANSACTIONS, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: () => {
      canvasToggle();
    },
    refetchQueries: [DASHBOARD_QUERY, FETCH_TRANSACTIONS],
    awaitRefetchQueries: true,
  });

  const [cache, setCache] = useState({
    transactions: [],
    root: "",
    tradingAccountId: "",
    tradeDate: "",
    strategyId: "",
  });

  const processCache = ({
    transactions,
    root,
    tradingAccountId,
    tradeDate,
    strategyId,
  }) => {
    const object = transactions.map((t) => {
      const symbol =
        t.assetType == "stock"
          ? root
          : formatSymbol(root, t.expiration, t.strike, t.optionType);
      return {
        ...t,
        ...{
          symbol,
          tradingAccountId,
          tradeDate,
          strategyId,
        },
      };
    });
    return { object };
  };

  const { data, error, loading } = useQuery(TRADING_ACCOUNTS_QUERY);
  if (loading) return null; // consider rendering canvas skeleton during load
  if (error) return <ErrorPage />;

  return (
    <Offcanvas
      show={show}
      onHide={() => canvasToggle()}
      onExited={() => reset()}
      placement="end"
      style={{ width: "400px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Transaction</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {mutationError && (
          <Alert variant="danger">
            There is something wrong, please try again!
          </Alert>
        )}
        <p>
          When entering multi-leg option strategies, if the fee was charged to
          the entire transaction as a whole, enter the amount on any <b>one</b>{" "}
          leg only.
        </p>
        <CanvasInputs setCache={setCache} accounts={data.tradingAccounts} />
      </Offcanvas.Body>
      <div>
        <div className="card-footer">
          <Button
            className={"mt-1 mb-1 " + btnSubmitClass(mutationLoading, "cyan")}
            onClick={(e) => {
              insertMutation({ variables: processCache(cache) }).then();
            }}
          >
            Add Transaction
          </Button>
        </div>
      </div>
    </Offcanvas>
  );
}
