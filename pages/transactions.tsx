import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Layout from "../components/Layouts/Layout";
import TransactionTable from "../components/Tables/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../api/queries/FetchTransactions.graphql";
import { TransactionColumns } from "../components/Tables/TableColumns/TransactionColumns";
import DELETE_TRANSACTION from "../api/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../api/mutations/UpdateTransaction.graphql";
import useModal from "../hooks/useModal";
import EditTransactionModal from "../components/Modals/EditTransactionModal";
import CustomToast from "../components/CustomToast";
import dayjs from "dayjs";
import ListGroup from "../components/Lists/ListGroup";
import { TransactionsListCols } from "../components/Lists/ListColumns/TransactionsListCols";

export default function Transactions() {
  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const { isShowing: isFinishedToastShowing, toggle: showFinishedToastToggle } =
    useModal();
  const { isShowing: isErrorToastShowing, toggle: showErrorToastToggle } =
    useModal();

  const [transaction, setTransaction] = useState({});

  // const deleteTrans = useMutation(
  //   (variables) => {
  //     return graphQLClient.request(DELETE_TRANSACTION, variables);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("fetch_transactions").then(() => {
  //         setTransaction({});
  //         showFinishedToastToggle();
  //       });
  //     },
  //     onError: () => {
  //       showErrorToastToggle();
  //     },
  //   }
  // );

  // const updateTrans = useMutation(
  //   (variables) => {
  //     return graphQLClient.request(UPDATE_TRANSACTION, variables);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient
  //         .invalidateQueries("fetch_transactions")
  //         .then(() => showFinishedToastToggle());
  //     },
  //     onError: () => {
  //       showErrorToastToggle();
  //     },
  //   }
  // );

  const { data, loading, error } = useQuery(FETCH_TRANSACTIONS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block">
            <TransactionTable
              cols={TransactionColumns}
              data={data}
              setTransaction={setTransaction}
              editModalToggle={editModalToggle}
            />
          </div>
          <div className="col-12 d-block d-md-none">
            <ListGroup
              title={"Transactions"}
              data={data.transactions}
              groupFunc={({ tradeDate }) => {
                return dayjs(tradeDate).format("MMM YYYY");
              }}
              columns={TransactionsListCols}
            />
          </div>
        </div>
      </div>

      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.tradingAccounts}
        handleClose={() => editModalToggle()}
        handleCloseAndUpdate={(data) => {
          editModalToggle();
          // updateTrans.mutate(data);
        }}
        handleCloseAndDelete={(id) => {
          editModalToggle();
          // deleteTrans.mutate({ id: id } as any);
        }}
      />

      <CustomToast
        style={{ background: "#2fb344", color: "#fff", border: 0 }}
        onClose={showFinishedToastToggle}
        show={isFinishedToastShowing}
        msg={"Transaction updated!"}
      />

      <CustomToast
        style={{ background: "#d63939", color: "#fff", border: 0 }}
        onClose={showErrorToastToggle}
        show={isErrorToastShowing}
        msg={"Error updating transaction!"}
      />
    </Layout>
  );
}
