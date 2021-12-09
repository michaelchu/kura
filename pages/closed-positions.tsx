import React, { useState } from "react";
import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import CLOSED_POSITIONS from "../api/graphql/queries/ClosedPositions.graphql";
import { COLUMNS } from "../components/ClosedPositionTable/Columns";
import ClosedPositionTable from "../components/ClosedPositionTable/ClosedPositionTable";

const queryClient = new QueryClient();
const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  await queryClient.prefetchQuery("closed_positions", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(CLOSED_POSITIONS);
}

export default function ClosedPositions() {
  const { data } = useQuery("closed_positions", getTrans);

  return (
    <Layout>
      <div className="page-header text-black d-print-none">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title">Closed Positions</h2>
          </div>
        </div>
      </div>

      <div className="row row-cards">
        <div className="col-12">
          <ClosedPositionTable cols={COLUMNS} data={data.closed_positions} />
        </div>
      </div>
    </Layout>
  );
}
