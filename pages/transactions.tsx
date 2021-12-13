import React from "react";
import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";

import Layout from "../components/Layouts/Layout";
import TransactionTable from "../components/Tables/TransactionTable/TransactionTable";

import FETCH_TRANSACTIONS from "../api/graphql/queries/FetchTransactions.graphql";
import { TransactionColumns } from "../components/TableColumns/TransactionColumns";

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
  const { data } = useQuery("fetch_transactions", getTrans);

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12">
            <TransactionTable cols={TransactionColumns} data={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
