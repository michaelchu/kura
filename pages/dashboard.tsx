import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import MiniStatCardWithProgressBar from "../components/StatCards/MiniStatCards/MiniStatCardWithProgressBar";
import MiniStatCardWithChart from "../components/StatCards/MiniStatCards/MiniStatCardWithChart";
import MonthlyIncomeProgress from "../components/StatCards/ProgressCards/MonthlyIncomeProgress";
import { OpenPositionsColumns } from "../components/Tables/TableColumns/OpenPositionsColumns";
import OPEN_POSITIONS from "../api/queries/OpenPositions.graphql";
import GenericReactTable from "../components/Tables/GenericReactTable";
import React from "react";
import _ from "lodash";
import ListGroupStickyTop from "../components/Lists/OpenPositionList/ListGroupStickyTop";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
    ({ asset_type }) => asset_type
  );
  const options = {
    chart: {
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Income",
      },
    },
  };

  const series = [
    {
      name: "Covered Call",
      data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
    },
    {
      name: "Short Put",
      data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43],
    },
    {
      name: "Long Stock",
      data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14],
    },
    {
      name: "Long Call",
      data: [21, 7, 25, 13, 22, 8, 21, 7, 25, 13, 22, 8],
    },
  ];
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
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Income vs Target by Months</h3>
                <Chart options={options} series={series} type={"bar"} />
              </div>
            </div>
          </div>
          <div className="col-12 d-none d-md-block">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Open Positions</h3>
              </div>
              <GenericReactTable
                title={"Open Positions"}
                subProps={OpenPositionsColumns}
                data={data.open_positions}
              />
            </div>
          </div>
          <div className="col-12 d-block d-md-none">
            <ListGroupStickyTop
              title={"Open Positions"}
              data={grouped_positions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
