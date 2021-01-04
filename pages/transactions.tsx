import React, { useState } from "react";
import useTransactions from "../api";
import moment from "moment";
import { Button } from "react-bootstrap";

import Layout from "../components/Layout";
import AddTransactionModal from "../components/Modals/AddTransactionModal";
import DeleteTransactionModal from "../components/Modals/DeleteTransactionModal";
import EditTransactionModal from "../components/Modals/EditTransactionModal";
import TransactionTable from "../components/TransactionTable/TransactionTable";

export default function Transactions() {
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
  const [transaction, setTransaction] = useState(emptyTrans);

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

  // TODO: add variable for user ID to query
  const { data, error, isFetching } = useTransactions();

  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleShowEdit = (row) => {
    setTransaction(row);
    setShowEdit(true);
  };

  const handleShowDelete = (row) => {
    setTransaction(row);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setTransaction(emptyTrans);
  };
  const handleCloseAndDelete = (transId) => {
    setShowDelete(false);
    setTransaction(emptyTrans);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    setTransaction(emptyTrans);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
    setTransaction(emptyTrans);
  };

  if (isFetching) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>Error..</div>;
  }

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
              <Button variant={"primary"} onClick={handleShowAdd}>
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
          onEdit={handleShowEdit}
          onDelete={handleShowDelete}
        />
      </div>

      <AddTransactionModal
        show={showAdd}
        trans={transaction}
        handleClose={handleCloseAdd}
      />
      <EditTransactionModal
        show={showEdit}
        trans={transaction}
        handleClose={handleCloseEdit}
      />
      <DeleteTransactionModal
        show={showDelete}
        trans={transaction}
        handleClose={handleCloseDelete}
        handleCloseAndDelete={handleCloseAndDelete}
      />
    </Layout>
  );
}
