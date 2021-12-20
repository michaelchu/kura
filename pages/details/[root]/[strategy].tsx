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
  const res = useQuery("strategy_detail", getTrans);
  console.log(res);
  const grouped_positions = {};
  // const grouped_positions = _.groupBy(res.data.trades, ({ trade_date }) => {
  //   return dayjs(trade_date).format("MMM YYYY");
  // });

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block">
            <Accordion
              title={"Strategy Detail"}
              data={grouped_positions}
              subComponent={{
                component: GenericReactTable,
                subProps: StrategyDetailColumns,
              }}
            />
          </div>
          <div className="col-12 d-block d-md-none">
            <ListGroupStickyTop
              title={"Strategy Detail"}
              data={grouped_positions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
