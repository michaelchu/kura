import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Layout from "../../components/Layouts/Layout";
import TransactionTable from "../../components/Tables/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../../api/queries/FetchTransactions.graphql";
import { TransactionColumns } from "../../components/Tables/TableColumns/TransactionColumns";
import useToggle from "../../hooks/useToggle";
import CustomToast from "../../components/CustomToast";
import dayjs from "dayjs";
import ListGroup from "../../components/Lists/ListGroup";
import { TransactionsListCols } from "../../components/Lists/ListColumns/TransactionsListCols";
import ErrorPage from "../../components/ErrorPage";
import EditTransactionCanvas from "../../components/Canvas/EditTransactionCanvas/EditTransactionCanvas";
import { GlobalContext } from "../../contexts/context";
import { IconDownload, IconPlus } from "@tabler/icons";

export default function Overview() {
  const { isTrue: isEditCanvasShowing, toggle: canvasToggle } = useToggle();
  const { isTrue: isFinishedToastShowing, toggle: showFinishedToastToggle } =
    useToggle();
  const { isTrue: isErrorToastShowing, toggle: showErrorToastToggle } =
    useToggle();

  const [transaction, setTransaction] = useState({});

  // const { data, loading, error } = useQuery(FETCH_TRANSACTIONS);
  // if (loading) return <Layout />;
  // if (error) return <ErrorPage />;

  const data = { transactions: [] };

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
          <div className={"d-flex justify-content-between pt-3 pb-3"}>
            <div className={"d-table"}>
              <h2 className={"d-table-cell align-baseline"}>Trade History</h2>
              <p className={"header-pretitle px-2 d-table-cell align-baseline"}>
                As of {dayjs(new Date()).format("YYYY-MM-DD")}
              </p>
            </div>
            <GlobalContext.Consumer>
              {({ canvasToggle }) => (
                <div className={"d-grid gap-2 d-md-flex d-none d-md-block"}>
                  <button
                    type={"button"}
                    onClick={canvasToggle}
                    className={"btn btn-light mr-2"}
                  >
                    <IconDownload />
                    Download CSV
                  </button>
                  <button
                    type={"button"}
                    onClick={canvasToggle}
                    className={"btn btn-cyan ml-2"}
                  >
                    <IconPlus />
                    Add Trade
                  </button>
                </div>
              )}
            </GlobalContext.Consumer>
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
                canvasToggle={canvasToggle}
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

      {/* <EditTransactionCanvas
        canvasToggle={canvasToggle}
        show={isEditCanvasShowing}
        transaction={transaction}
        setTransaction={setTransaction}
      /> */}

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
