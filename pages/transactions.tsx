import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import { endpoint } from "../api";
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
    account: "",
    trade_date: "",
    symbol: "",
    action: "",
    quantity: 0,
    price: 0,
    commission: 0,
    option_type: "",
    strike: 0,
    expiration: "",
    amount: 0,
  };
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [row, setRow] = useState(emptyTrans);

  const formattedCols = ["price", "commission", "amount_with_comm"];
  const hiddenCols = ["id"];
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

  const deleteRow = useMutation(
    (variables) => {
      return request(endpoint, DELETE_TRANSACTION, variables);
    },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("fetch_transactions");
          setShowDelete(false);
          setRow(emptyTrans);
        },
      }
  );

  const handleCloseAndDelete = (transId: string) => {
    deleteRow.mutate({id: transId} as any);
  };

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
                  setRow(emptyTrans);
                  setShowAdd(true);
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
          onEdit={(row) => {
            setRow(row);
            setShowEdit(true);
          }}
          onDelete={(row) => {
            setRow(row);
            setShowDelete(true);
          }}
        />
      </div>

      <AddTransactionModal
        show={showAdd}
        row={row}
        handleClose={() => {
          setShowAdd(false);
        }}
      />
      <EditTransactionModal
        show={showEdit}
        row={row}
        handleClose={() => {
          setShowEdit(false);
          setRow(emptyTrans);
        }}
      />
      <DeleteTransactionModal
        show={showDelete}
        row={row}
        handleClose={() => {
          setShowDelete(false);
          setRow(emptyTrans);
        }}
        handleCloseAndDelete={handleCloseAndDelete}
      />
    </Layout>
  );
}
