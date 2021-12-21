import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../../../components/Layouts/Layout";
import STRATEGY_DETAIL from "../../../api/queries/StrategyDetail.graphql";
import { useRouter } from "next/router";
import { StrategyDetailColumns } from "../../../components/TableColumns/StrategyDetailColumns";
import GenericReactTable from "../../../components/Tables/GenericReactTable";
import React from "react";
import _ from "lodash";

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
  if (router.isFallback) return <div>Loading...</div>;

  // @ts-ignore
  const { root, strategy }: Params = router.query;
  const { data } = useQuery("strategy_detail", () =>
    getTrans({ root: root, strategy: strategy })
  );

  // @ts-ignore
  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block">
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
