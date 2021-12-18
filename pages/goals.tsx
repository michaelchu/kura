import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import Accordion from "../components/Accordion";
import GOALS_AND_PROGRESS from "../api/queries/GoalsAndProgress.graphql";
import _ from "lodash";
import React from "react";
import dayjs from "dayjs";
import MonthlyIncomeProgress from "../components/StatCards/ProgressCards/MonthlyIncomeProgress";

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
  const grouped_positions = _.groupBy(data.goals_and_progress, ({ period }) => {
    return dayjs(period).format("MMM YYYY");
  });

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12">
            <Accordion
              title={"Goals"}
              data={grouped_positions}
              subComponent={{
                component: MonthlyIncomeProgress,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
