import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import CLOSED_POSITIONS from "../api/queries/ClosedPositions.graphql";
import { ClosedPositionColumns } from "../components/Tables/TableColumns/ClosedPositionColumns";
import Accordion from "../components/Accordion";
import GenericReactTable from "../components/Tables/GenericReactTable";
import _ from "lodash";
import dayjs from "dayjs";
import React from "react";
import ListGroup from "../components/Lists/ListGroup";
import { ClosedPositionsListCols } from "../components/Lists/ListColumns/ClosedPositionsListCols";

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
  const grouped_positions = _.groupBy(
    data.closed_positions,
    ({ exit_date }) => {
      return dayjs(exit_date).format("MMM YYYY");
    }
  );

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12 d-none d-md-block">
            <Accordion
              title={"Closed Positions"}
              data={grouped_positions}
              subComponent={{
                component: GenericReactTable,
                subProps: ClosedPositionColumns,
              }}
            />
          </div>
          <div className="col-12 d-block d-md-none">
            <ListGroup
              title={"Closed Positions"}
              data={data.closed_positions}
              groupFunc={({ exit_date }) => {
                return dayjs(exit_date).format("MMM YYYY");
              }}
              columns={ClosedPositionsListCols}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
