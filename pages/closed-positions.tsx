import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import CLOSED_POSITIONS from "../api/graphql/queries/ClosedPositions.graphql";
import { ClosedPositionColumns } from "../components/TableColumns/ClosedPositionColumns";
import ClosedPositionTable from "../components/Tables/ClosedPositionTable/ClosedPositionTable";

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
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12">
            <ClosedPositionTable
              cols={ClosedPositionColumns}
              data={data.closed_positions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
