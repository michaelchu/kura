import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import MiniStatCardWithProgressBar from "../components/StatCards/MiniStatCards/MiniStatCardWithProgressBar";
import MiniStatCardWithChart from "../components/StatCards/MiniStatCards/MiniStatCardWithChart";
import MonthlyIncomeProgress from "../components/StatCards/ProgressCards/MonthlyIncomeProgress";
import Accordion from "../components/Accordion/Accordion";
import { OpenPositionsColumns } from "../components/TableColumns/OpenPositionsColumns";
import OPEN_POSITIONS from "../api/graphql/queries/OpenPositions.graphql";
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

export default function Dashboard() {
  const { data } = useQuery("open_positions", getTrans);
  const grouped_positions = _.groupBy(
    data.open_positions,
    ({ strategy, root, name }) => root + " (" + strategy + ") -  " + name
  );

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-deck row-cards">
          <div className="col-sm-6 col-lg-3">
            <MiniStatCardWithProgressBar
              title={"Total Realized P/L"}
              value={"$543.64"}
              progressBarTitle={"Progress towards Goal"}
              pctHeading={-5}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <MiniStatCardWithChart
              title={"Total Commissions"}
              value={183.34}
              pctChange={1.3}
              chartId={"commission-chart"}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <MiniStatCardWithProgressBar
              title={"Win Rate"}
              value={"75%"}
              progressBarTitle={""}
              pctHeading={-5}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <MiniStatCardWithChart
              title={"Avg Returns"}
              value={83.34}
              pctChange={1.3}
              chartId={"commission-chart"}
            />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Income vs Target by Months</h3>
                <div id="monthly-income-chart" className="chart-lg" />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  Most Profitable Strategies of All Time
                </h3>
              </div>
              <table className="table card-table table-vcenter">
                <thead>
                  <tr>
                    <th>Strategy</th>
                    <th colSpan={2}>Total Return</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Covered Call</td>
                    <td>$3,550</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "71.0%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Short Put</td>
                    <td>$1,798</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "35.96%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Bull Call Spread</td>
                    <td>$1,245</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "24.9%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Iron Condor</td>
                    <td>$986</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "19.72%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Call Butterfly</td>
                    <td>$854</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "17.08%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Ratio Spread</td>
                    <td>$804</td>
                    <td className="w-50">
                      <div className="progress progress-xs">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "16.08%" }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12">
            <MonthlyIncomeProgress />
          </div>
          <div className="col-12">
            <Accordion
              title={"Open Positions"}
              cols={OpenPositionsColumns}
              data={grouped_positions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
