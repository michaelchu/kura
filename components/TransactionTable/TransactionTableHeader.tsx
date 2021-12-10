import React, { useState } from "react";
import { IconSearch } from "@tabler/icons";
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
        <div className="ms-auto text-muted">
          <div className="btn-group w-40">
            <button
              type="button"
              className="btn btn-lime"
              onClick={() => {
                setIsOption(true);
                setTransaction({});
                addModalToggle();
              }}
            >
              Add Option
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setIsOption(false);
                setTransaction({});
                addModalToggle();
              }}
            >
              Add Stock
            </button>
          </div>
          <div className="input-icon ms-2 d-inline-block">
            <input
              type="text"
              className="form-control"
              placeholder="Search…"
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="input-icon-addon">
              <IconSearch />
            </span>
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
