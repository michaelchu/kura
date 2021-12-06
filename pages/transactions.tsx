import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import useModal from "../hooks/useModal";
import { GraphQLClient } from "graphql-request";
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
import UPDATE_TRANSACTION from "../graphql/api/mutations/UpdateTransaction.graphql";

const queryClient = new QueryClient();

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  await queryClient.prefetchQuery("fetch_transactions", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(FETCH_TRANSACTIONS);
}

export default function Transactions(props) {
  const queryClient = useQueryClient();
  const { isShowing: isAddModalShowing, toggle: addModalToggle } = useModal();
  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const {
    isShowing: isDeleteModalShowing,
    toggle: deleteModalToggle,
  } = useModal();

  const [isOption, setIsOption] = useState(false);

  const [transaction, setTransaction] = useState({});

  const formattedCols = ["price", "fee"];
  const hiddenCols = ["id", "account_id"];
  const cols = [
    "Trade Date",
    "Symbol",
    "Quantity",
    "Price",
    "Fee",
    "Asset Type",
    "Action",
  ];

  const deleteTrans = useMutation(
    (variables) => {
      return graphQLClient.request(DELETE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        deleteModalToggle();
        setTransaction({});
      },
    }
  );

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

  const updateTrans = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        editModalToggle();
      },
    }
  );

  const { data } = useQuery("fetch_transactions", getTrans);

  return (
    <Layout>
      <div className="page-header text-white d-print-none">
        <div className="row align-items-center">
          <div className="col">
            <div className="page-pretitle">As of {moment().format("LLL")}</div>
            <h2 className="page-title">Trade History</h2>
          </div>
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">
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
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <TransactionTable
          cols={cols}
          rows={data.transactions}
          formattedCols={formattedCols}
          hiddenCols={hiddenCols}
          onEdit={(trans: object) => {
            setTransaction(trans);
            editModalToggle();
          }}
          onDelete={(trans: object) => {
            setTransaction(trans);
            deleteModalToggle();
          }}
        />
      </div>

      <AddTransactionModal
        show={isAddModalShowing}
        accounts={data.accounts}
        isOption={isOption}
        handleClose={() => {
          addModalToggle();
        }}
        handleCloseAndAdd={(data) => {
          addTrans.mutate(data);
        }}
      />
      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.accounts}
        handleClose={() => {
          editModalToggle();
        }}
        handleCloseAndUpdate={(data) => {
          updateTrans.mutate(data);
        }}
      />
      <DeleteTransactionModal
        show={isDeleteModalShowing}
        trans={transaction}
        handleClose={() => {
          deleteModalToggle();
        }}
        handleCloseAndDelete={(transId) => {
          deleteTrans.mutate({ id: transId } as any);
        }}
      />
    </Layout>
  );
}
