// @refresh reset
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Button } from "react-bootstrap";

import Layout from "../components/Layout";
import TransactionModal from "../components/Modals/TransactionModal";
import TransactionTable from "../components/TransactionTable/TransactionTable";

import QUERY_TRANS_BY_ACCT from "../graphql/TransByAccountQuery.graphql";

export default function Transactions() {
  const [show, setShow] = useState(false);
  const [trade, setTrade] = useState({});
  const { data, loading, error } = useQuery(QUERY_TRANS_BY_ACCT);

  const handleClose = () => {
    setShow(false);
    setTrade({});
  };
  const handleShow = (row) => {
    setShow(true);
    setTrade(row);
  };

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

  const formattedCols = ["price", "commission", "amount_with_comm"];
  const hiddenCols = ["id"];

  if (loading) {
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
              <Button variant={"primary"} onClick={handleShow}>
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <TransactionTable
          cols={cols}
          rows={data ? data.transactions_by_account : []}
          title={"Transactions"}
          formattedCols={formattedCols}
          hiddenCols={hiddenCols}
          onClick={handleShow}
        />
      </div>

      <TransactionModal show={show} trade={trade} handleClose={handleClose} />
    </Layout>
  );
}
