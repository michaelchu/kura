import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Layout from "../components/Layouts/Layout";
import TransactionTable from "../components/Tables/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../api/queries/FetchTransactions.graphql";
import { TransactionColumns } from "../components/Tables/TableColumns/TransactionColumns";
import DELETE_TRANSACTION from "../api/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../api/mutations/UpdateTransaction.graphql";
import useToggle from "../hooks/useToggle";
import EditTransactionModal from "../components/Modals/EditTransactionModal";
import CustomToast from "../components/CustomToast";
import dayjs from "dayjs";
import ListGroup from "../components/Lists/ListGroup";
import { TransactionsListCols } from "../components/Lists/ListColumns/TransactionsListCols";
import ErrorPage from "../components/ErrorPage";

export default function Transactions() {
  const { isTrue: isEditModalShowing, toggle: editModalToggle } = useToggle();
  const { isTrue: isFinishedToastShowing, toggle: showFinishedToastToggle } =
    useToggle();
  const { isTrue: isErrorToastShowing, toggle: showErrorToastToggle } =
    useToggle();

  const [transaction, setTransaction] = useState({});

  const [updateMutation, {}] = useMutation(UPDATE_TRANSACTION, {
    onError: (err) => {
      console.log(err);
      showErrorToastToggle();
    },
    onCompleted: () => {
      showFinishedToastToggle();
    },
    refetchQueries: [FETCH_TRANSACTIONS],
    awaitRefetchQueries: true,
  });

  const [deleteMutation, {}] = useMutation(DELETE_TRANSACTION, {
    onError: () => {
      showErrorToastToggle();
    },
    onCompleted: () => {
      showFinishedToastToggle();
    },
    refetchQueries: [FETCH_TRANSACTIONS],
    awaitRefetchQueries: true,
  });

  const { data, loading, error } = useQuery(FETCH_TRANSACTIONS);
  if (loading) return <Layout />;
  if (error) return <ErrorPage />;

  return (
    <Layout>
      <div
        className={"navbar-light sticky-top"}
        style={{
          alignItems: "stretch",
          minHeight: "3.5rem",
        }}
      >
        <div className="container-xl">
          <div className={"d-table pt-3 pb-3"}>
            <h2 className={"d-table-cell align-baseline"}>Transactions</h2>
            <p className={"page-pretitle px-2 d-table-cell align-baseline"}>
              As of {dayjs(new Date()).format("YYYY-MM-DD")}
            </p>
          </div>
        </div>
      </div>
      <div className="container-xl">
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
      </div>

      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.tradingAccounts}
        handleClose={() => editModalToggle()}
        handleCloseAndUpdate={(data) => {
          editModalToggle();
          updateMutation({ variables: data }).then();
        }}
        handleCloseAndDelete={(id) => {
          editModalToggle();
          deleteMutation({ variables: { id: id } }).then();
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
