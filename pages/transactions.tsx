import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import { endpoint } from "../api";
import useModal from "../hooks/useModal";
import { request } from "graphql-request";
import moment from "moment";
import { Button } from "react-bootstrap";
import { dehydrate } from "react-query/hydration";

import Layout from "../components/Layout";
import AddTransactionModal from "../components/Modals/AddTransactionModal";
import DeleteTransactionModal from "../components/Modals/DeleteTransactionModal";
import EditTransactionModal from "../components/Modals/EditTransactionModal";
import TransactionTable from "../components/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../graphql/api/queries/FetchTransactions.graphql";
import DELETE_TRANSACTION from "../graphql/api/mutations/DeleteTransaction.graphql";
import ADD_TRANSACTION from "../graphql/api/mutations/AddTransaction.graphql";

const queryClient = new QueryClient();

export async function getStaticProps() {
  await queryClient.prefetchQuery("fetch_transactions", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return await request(endpoint, FETCH_TRANSACTIONS);
}

export default function Transactions(props) {
  const queryClient = useQueryClient();
  const emptyTrans = {
    id: "",
    account_id: "",
    trade_date: "",
    symbol: "",
    action: "",
    quantity: 0,
    price: 0,
    commission: 0,
    option_type: "",
    strike: 0,
    expiration: "",
  };
  const { isShowing: isAddModalShowing, toggle: addModalToggle } = useModal();
  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const {
    isShowing: isDeleteModalShowing,
    toggle: deleteModalToggle,
  } = useModal();
  const [transaction, setTransaction] = useState(emptyTrans);

  const formattedCols = ["price", "commission", "amount_with_comm"];
  const hiddenCols = ["id", "account_id"];
  const cols = [
    "Account",
    "Trade Date",
    "Symbol",
    "Action",
    "Quantity",
    "Price",
    "Comm.",
    "Option Type",
    "Strike",
    "Expiration",
    "Amount",
  ];

  const { data } = useQuery("fetch_transactions", getTrans);

  const deleteTrans = useMutation(
    (variables) => {
      return request(endpoint, DELETE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        deleteModalToggle();
        setTransaction(emptyTrans);
      },
    }
  );

  const addTrans = useMutation(
    (variables) => {
      return request(endpoint, ADD_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("add_transactions");
        addModalToggle();
      },
    }
  );

  return (
    <Layout>
      <div className="page-header text-white d-print-none">
        <div className="row align-items-center">
          <div className="col">
            <div className="page-pretitle">As of {moment().format("LLL")}</div>
            <h2 className="page-title">Account Details</h2>
          </div>
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">
              <Button
                variant={"primary"}
                onClick={() => {
                  setTransaction(emptyTrans);
                  addModalToggle();
                }}
              >
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <TransactionTable
          cols={cols}
          rows={data.fetch_transactions}
          title={"Transactions"}
          formattedCols={formattedCols}
          hiddenCols={hiddenCols}
          onEdit={(trans) => {
            delete trans.account;
            setTransaction(trans);
            editModalToggle();
          }}
          onDelete={(trans) => {
            setTransaction(trans);
            deleteModalToggle();
          }}
        />
      </div>

      <AddTransactionModal
        show={isAddModalShowing}
        accounts={data.accounts}
        handleClose={() => {
          addModalToggle();
        }}
        handleCloseAndAdd={(data) => {
          addTrans.mutate(data);
        }}
      />
      <EditTransactionModal
        show={isEditModalShowing}
        trans={transaction}
        accounts={data.accounts}
        handleClose={() => {
          editModalToggle();
          setTransaction(emptyTrans);
        }}
      />
      <DeleteTransactionModal
        show={isDeleteModalShowing}
        trans={transaction}
        handleClose={() => {
          deleteModalToggle();
          setTransaction(emptyTrans);
        }}
        handleCloseAndDelete={(transId) => {
          deleteTrans.mutate({ id: transId } as any);
        }}
      />
    </Layout>
  );
}
