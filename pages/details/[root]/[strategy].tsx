import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../../../components/Layouts/Layout";
import STRATEGY_DETAIL from "../../../api/queries/StrategyDetail.graphql";
import { StrategyDetailColumns } from "../../../components/TableColumns/StrategyDetailColumns";
import Accordion from "../../../components/Accordion";
import GenericReactTable from "../../../components/Tables/GenericReactTable";
import _ from "lodash";
import dayjs from "dayjs";
import ListGroupStickyTop from "../../../components/Lists/ClosedPositionList/ListGroupStickyTop";
import React from "react";
import TransactionTable from "../../../components/Tables/TransactionTable/TransactionTable";
import { TransactionColumns } from "../../../components/TableColumns/TransactionColumns";

const queryClient = new QueryClient();
const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { root: "root", strategy: "strategy" } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  await queryClient.prefetchQuery("strategy_detail", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(STRATEGY_DETAIL);
}

export default function StrategyDetail() {
  const { data } = useQuery("strategy_detail", getTrans);

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block"></div>
        </div>
      </div>
    </Layout>
  );
}
