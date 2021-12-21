import React, { useState } from "react";
import {
  useQuery,
  QueryClient,
  useMutation,
  useQueryClient,
} from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";

import Layout from "../components/Layouts/Layout";
import TransactionTable from "../components/Tables/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../api/queries/FetchTransactions.graphql";
import { TransactionColumns } from "../components/Tables/TableColumns/TransactionColumns";
import ADD_TRANSACTION from "../api/mutations/AddTransaction.graphql";
import DELETE_TRANSACTION from "../api/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../api/mutations/UpdateTransaction.graphql";
import useModal from "../hooks/useModal";
import AddTransactionModal from "../components/Modals/AddTransactionModal";
import EditTransactionModal from "../components/Modals/EditTransactionModal";
import CustomToast from "../components/CustomToast";
import ListGroupStickyTop from "../components/Lists/TransactionList/ListGroupStickyTop";
import _ from "lodash";
import dayjs from "dayjs";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("fetch_transactions", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(FETCH_TRANSACTIONS);
}

export default function Transactions() {
  const queryClient = useQueryClient();

  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const { isShowing: isAddModalShowing, toggle: addModalToggle } = useModal();
  const {
    isShowing: isFinishedToastShowing,
    toggle: showFinishedToastToggle,
  } = useModal();
  const {
    isShowing: isErrorToastShowing,
    toggle: showErrorToastToggle,
  } = useModal();

  const [transaction, setTransaction] = useState({});
  const [isOption, setIsOption] = useState(false);

  const addTrans = useMutation(
    (variables) => {
      return graphQLClient.request(ADD_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions").then(() => {
          showFinishedToastToggle();
        });
      },
      onError: () => {
        showErrorToastToggle();
      },
    }
  );
  const deleteTrans = useMutation(
    (variables) => {
      return graphQLClient.request(DELETE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions").then(() => {
          setTransaction({});
          showFinishedToastToggle();
        });
      },
      onError: () => {
        showErrorToastToggle();
      },
    }
  );

  const updateTrans = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries("fetch_transactions")
          .then(() => showFinishedToastToggle());
      },
      onError: () => {
        showErrorToastToggle();
      },
    }
  );

  const { data } = useQuery("fetch_transactions", getTrans);
  const grouped_positions = _.groupBy(
    data.transaction_costs,
    ({ trade_date }) => {
      return dayjs(trade_date).format("MMM YYYY");
    }
  );

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block">
            <TransactionTable
              cols={TransactionColumns}
              data={data}
              setTransaction={setTransaction}
              setIsOption={setIsOption}
              editModalToggle={editModalToggle}
              addModalToggle={addModalToggle}
            />
          </div>
          <div className="col-12 d-block d-md-none">
            <ListGroupStickyTop
              title={"Transactions"}
              data={grouped_positions}
            />
          </div>
        </div>
      </div>

      <AddTransactionModal
        show={isAddModalShowing}
        accounts={data.accounts}
        isOption={isOption}
        handleClose={() => addModalToggle()}
        handleCloseAndAdd={(data) => {
          addModalToggle();
          addTrans.mutate(data);
        }}
      />

      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.accounts}
        handleClose={() => editModalToggle()}
        handleCloseAndUpdate={(data) => {
          editModalToggle();
          updateTrans.mutate(data);
        }}
        handleCloseAndDelete={(id) => {
          editModalToggle();
          deleteTrans.mutate({ id: id } as any);
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
