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
import DELETE_TRANSACTION_STOCK from "../graphql/api/mutations/DeleteTransactionStock.graphql";
import DELETE_TRANSACTION_OPTION from "../graphql/api/mutations/DeleteTransactionOption.graphql";
import ADD_TRANSACTION_STOCK from "../graphql/api/mutations/AddTransactionStock.graphql";
import ADD_TRANSACTION_OPTION from "../graphql/api/mutations/AddTransactionOption.graphql";
import UPDATE_TRANSACTION_STOCK from "../graphql/api/mutations/UpdateTransactionStock.graphql";
import UPDATE_TRANSACTION_OPTION from "../graphql/api/mutations/UpdateTransactionOption.graphql";

const queryClient = new QueryClient();
const endpoint = "https://profital.hasura.app/v1/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'x-hasura-admin-secret': 'ou44uOYcPnw6olMayMD8PFsGmM6v2QkYlYMQYDLxhsAQvGSjp53oQK4mgJlObQR3',
  },
})

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
    "Fee"
  ];


  const deleteTransStock = useMutation(
    (variables) => {
      return graphQLClient.request(DELETE_TRANSACTION_STOCK, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        deleteModalToggle();
        setTransaction({});
      },
    }
  );

  const deleteTransOption = useMutation(
    (variables) => {
      return graphQLClient.request(DELETE_TRANSACTION_OPTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        deleteModalToggle();
        setTransaction({});
      },
    }
  );

  const addTransStock = useMutation(
    (variables) => {
      return graphQLClient.request(ADD_TRANSACTION_STOCK, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        addModalToggle();
      },
    }
  );

  const addTransOption = useMutation(
    (variables) => {
      return graphQLClient.request(ADD_TRANSACTION_OPTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        addModalToggle();
      },
    }
  );

  const updateTransStock = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION_STOCK, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        editModalToggle();
      },
    }
  );

  const updateTransOption = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION_OPTION, variables);
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
            <h2 className="page-title">Account Details</h2>
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
          rows={data.transactions_stock}
          title={"Transactions"}
          formattedCols={formattedCols}
          hiddenCols={hiddenCols}
          onEdit={(trans) => {
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
        isOption={isOption}
        handleClose={() => {
          addModalToggle();
        }}
        handleCloseAndAdd={(data) => {
          if (isOption) {
            addTransOption.mutate(data);
          } else {
            addTransStock.mutate(data);
          }
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
          if (isOption) {
            updateTransOption.mutate(data);
          } else {
            updateTransStock.mutate(data);
          }
        }}
      />
      <DeleteTransactionModal
        show={isDeleteModalShowing}
        trans={transaction}
        handleClose={() => {
          deleteModalToggle();
        }}
        handleCloseAndDelete={(transId) => {
          if (isOption) {
            deleteTransOption.mutate({ id: transId } as any);
          } else {
            deleteTransStock.mutate({ id: transId } as any);
          }
        }}
      />
    </Layout>
  );
}
