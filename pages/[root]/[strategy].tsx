import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../../components/Layouts/Layout";
import STRATEGY_DETAIL from "../../api/queries/StrategyDetail.graphql";
import { useRouter } from "next/router";
import { StrategyDetailColumns } from "../../components/Tables/TableColumns/StrategyDetailColumns";
import { StrategyDetailSKColumns } from "../../components/Tables/TableColumns/StrategyDetailSkColumns";
import GenericReactTable from "../../components/Tables/GenericReactTable";
import SkeletonTable from "../../components/Tables/SkeletonTable";
import React from "react";
import _ from "lodash";
import accounting from "accounting";
import MiniCenteredStatCard from "../../components/Dashboard/StatCards/MiniCenteredStatCard";

interface Params {
  root: string;
  strategy: string;
}

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

export async function getStaticProps(context) {
  await queryClient.prefetchQuery("strategy_detail", () =>
    getTrans(context.params)
  );
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

async function getTrans(params) {
  return graphQLClient.request(STRATEGY_DETAIL, params);
}

export default function StrategyDetail() {
  const router = useRouter();
  // @ts-ignore
  const { root, strategy }: Params = router.query;
  const { data } = useQuery("strategy_detail", () =>
    getTrans({ root: root, strategy: strategy })
  );

  const total_costs = () => {
    return _.round(
      data.trades.reduce((acc, { total_cost }) => total_cost + acc, 0),
      2
    );
  };
  const total_fees = () => {
    return _.round(
      data.trades.reduce((acc, { fee }) => fee + acc, 0),
      2
    );
  };

  const cost_basis = () => {
    let tc = total_costs();
    if (strategy == "covered_call") {
      const total_quantity = data.trades
        .filter(({ asset_type }) => asset_type == "stock")
        .reduce((acc, { quantity }) => quantity + acc, 0);

      return _.round(tc / total_quantity, 2);
    } else {
      return tc;
    }
  };

  if (router.isFallback)
    return (
      <Layout>
        <div className="page-body">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Strategy Details</h3>
                </div>
                <SkeletonTable columns={StrategyDetailSKColumns} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-6 col-sm-4 col-lg-4">
            <MiniCenteredStatCard
              title={"Current Cost Basis"}
              value={accounting.formatMoney(cost_basis())}
              pct_chg={-2.65}
            />
          </div>
          <div className="col-6 col-sm-4 col-lg-4">
            <MiniCenteredStatCard
              title={"Total Costs"}
              value={accounting.formatMoney(total_costs())}
              pct_chg={-5.25}
            />
          </div>
          <div className="col-sm-4 col-lg-4">
            <MiniCenteredStatCard
              title={"Total Fees"}
              value={accounting.formatMoney(total_fees())}
              pct_chg={4.34}
            />
          </div>
          {/*<div className="col-12">*/}
          {/*  <div className="card">*/}
          {/*    <div className="card-body">*/}
          {/*      <MonthlyIncomeProgress />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  Strategy Details for {root} {"("}
                  {_.startCase(strategy)}
                  {")"}
                </h3>
              </div>
              <GenericReactTable
                subProps={StrategyDetailColumns}
                data={data.trades}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
