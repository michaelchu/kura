import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import Accordion from "../components/Accordion";
import GOALS_AND_PROGRESS from "../api/graphql/queries/GoalsAndProgress.graphql";
import _ from "lodash";
import { ClosedPositionColumns } from "../components/TableColumns/ClosedPositionColumns";
import GenericReactTable from "../components/Tables/GenericReactTable";
import React from "react";

const queryClient = new QueryClient();
const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  await queryClient.prefetchQuery("goals_and_progress", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(GOALS_AND_PROGRESS);
}

export default function Goals() {
  const { data } = useQuery("goals_and_progress", getTrans);
  const grouped_positions = _.groupBy(
    data.goals_and_progress,
    ({ strategy, root, name }) => root + " (" + strategy + ") -  " + name
  );

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12">
            <Accordion
              title={"Goals"}
              subComponent={
                <GenericReactTable
                  cols={ClosedPositionColumns}
                  data={grouped_positions}
                />
              }
              data={grouped_positions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
