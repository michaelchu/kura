import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import OPEN_POSITIONS from "../api/graphql/queries/OpenPositions.graphql";
import { OpenPositionsColumns } from "../components/TableColumns/OpenPositionsColumns";
import Accordion from "../components/Accordion/Accordion";
import _ from "lodash";

const queryClient = new QueryClient();
const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  await queryClient.prefetchQuery("open_positions", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(OPEN_POSITIONS);
}

export default function OpenPositions() {
  const { data } = useQuery("open_positions", getTrans);

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-cards">
          <div className="col-12">
            <Accordion
              title={"Open Positions"}
              cols={OpenPositionsColumns}
              data={data}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
