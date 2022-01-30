import { Button, Offcanvas } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ErrorPage from "../../ErrorPage";
import CanvasInputs from "./CanvasInputs";
import UPDATE_TRANSACTION from "../../../api/mutations/UpdateTransaction.graphql";
import DELETE_TRANSACTION from "../../../api/mutations/DeleteTransaction.graphql";
import FETCH_TRANSACTIONS from "../../../api/queries/FetchTransactions.graphql";
import { formatSymbol } from "../../Helpers";

export default function EditTransactionCanvas({
  transaction,
  setTransaction,
  show,
  canvasToggle,
}) {
  const TRADING_ACCOUNTS_QUERY = gql`
    query FetchTradingAccounts {
      tradingAccounts {
        value: id
        label: name
      }
    }
  `;

  const processCache = ({ id, object }) => {
    const symbol =
      object.assetType == "stock"
        ? object.symbol
        : formatSymbol(
            object.symbol.split(" ")[0],
            object.expiration,
            object.strike,
            object.optionType
          );
    const newObj = { ...object, ...{ symbol } };
    return { id, object: newObj };
  };
  const [editMutation, { loading: editMutationLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      onError: (err) => {
        console.log(err);
      },
      onCompleted: () => {
        canvasToggle();
      },
      refetchQueries: [FETCH_TRANSACTIONS],
      awaitRefetchQueries: true,
    }
  );

  const [deleteMutation, { loading: deleteMutationLoading }] = useMutation(
    DELETE_TRANSACTION,
    {
      onError: (err) => {
        console.log(err);
      },
      onCompleted: () => {
        canvasToggle();
      },
      refetchQueries: [FETCH_TRANSACTIONS],
      awaitRefetchQueries: true,
    }
  );

  const [cache, setCache] = useState({
    id: "",
    object: {},
  });

  useEffect(() => {
    const {
      strategy,
      id,
      totalCost,
      tradingAccountName,
      __typename,
      ...filtered
    } = transaction;
    setCache({ ...cache, ...{ id: transaction.id, object: filtered } });
  }, [transaction]);

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
        <Offcanvas.Title>Edit Transaction</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CanvasInputs
          transaction={transaction}
          setTransaction={setTransaction}
          accounts={data.tradingAccounts}
        />
      </Offcanvas.Body>
      <div>
        <div className="card-footer">
          <Button
            className={
              deleteMutationLoading
                ? "mt-1 mb-1 w-100 btn-loading"
                : "mt-1 mb-1 w-100"
            }
            as="input"
            variant="danger"
            onClick={() => {
              deleteMutation({ variables: { id: transaction.id } }).then();
            }}
            type="submit"
            value="Delete Transaction"
          />
          <Button
            className={
              editMutationLoading
                ? "mt-1 mb-1 w-100 btn-loading"
                : "mt-1 mb-1 w-100"
            }
            as="input"
            variant="cyan"
            onClick={() => {
              const data = processCache(cache);
              editMutation({ variables: data }).then();
            }}
            type="submit"
            value="Edit Transaction"
          />
        </div>
      </div>
    </Offcanvas>
  );
}
