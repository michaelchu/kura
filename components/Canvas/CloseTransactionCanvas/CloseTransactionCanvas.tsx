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

export default function CloseTransactionCanvas({
  show,
  canvasToggle,
  transaction,
}) {
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
    {
      loading: insertMutationLoading,
      error: insertMutationError,
      reset: insertReset,
    },
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
    transactions: [{}],
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

  const toggleAction = (quantity) => {
    if (quantity < 0) {
      return "BTC";
    } else if (quantity > 0) {
      return "STC";
    }
  };

  const { data, error, loading } = useQuery(TRADING_ACCOUNTS_QUERY);
  if (loading) return null; // consider rendering canvas skeleton during load
  if (error) return <ErrorPage />;

  return (
    <Offcanvas
      show={show}
      onHide={() => canvasToggle()}
      onExited={() => {
        insertReset();
      }}
      placement="end"
      style={{ width: "400px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Close Transaction</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {insertMutationError && (
          <Alert variant="danger">
            There is something wrong, please try again!
          </Alert>
        )}
        <CanvasInputs
          setCache={setCache}
          transaction={transaction}
          accounts={data.tradingAccounts}
          toggleAction={toggleAction}
        />
      </Offcanvas.Body>
      <div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <div className="col">
                <Button
                  className={
                    "mt-1 mb-1 " +
                    btnSubmitClass(insertMutationLoading, "danger")
                  }
                  as="input"
                  variant="danger"
                  onClick={() => {
                    insertMutation({ variables: processCache(cache) }).then();
                  }}
                  type="submit"
                  value="Close Position"
                  disabled={insertMutationLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
}
