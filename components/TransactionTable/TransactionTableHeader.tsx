import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import useModal from "../../hooks/useModal";
import AddTransactionModal from "../../components/Modals/AddTransactionModal";
import ADD_TRANSACTION from "../../api/graphql/mutations/AddTransaction.graphql";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export default function TransactionTableHeader({
  filter,
  setFilter,
  setTransaction,
  accounts,
}) {
  const queryClient = useQueryClient();
  const { isShowing: isAddModalShowing, toggle: addModalToggle } = useModal();
  const [isOption, setIsOption] = useState(false);

  const addTrans = useMutation(
    (variables) => {
      return graphQLClient.request(ADD_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        addModalToggle();
      },
    }
  );

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Transactions</h3>
      </div>
      <div className="card-body border-bottom py-3">
        <div className="d-flex">
          <div className="btn-list">
            <Button
              variant={"primary"}
              onClick={() => {
                setIsOption(true);
                setTransaction({});
                addModalToggle();
              }}
            >
              Add Option
            </Button>
            <Button
              variant={"light"}
              onClick={() => {
                setIsOption(false);
                setTransaction({});
                addModalToggle();
              }}
            >
              Add Stock
            </Button>
          </div>
          <div className="ms-auto text-muted">
            <div className="input-icon ms-2 d-inline-block">
              <input
                type="text"
                className="form-control"
                placeholder="Search…"
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
              />
              <span className="input-icon-addon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <AddTransactionModal
        show={isAddModalShowing}
        accounts={accounts}
        isOption={isOption}
        handleClose={() => {
          addModalToggle();
        }}
        handleCloseAndAdd={(data) => {
          addTrans.mutate(data);
        }}
      />
    </>
  );
}
