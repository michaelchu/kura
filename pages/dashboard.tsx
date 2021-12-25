import { useQuery, QueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/Layouts/Layout";
import { OpenPositionsColumns } from "../components/Tables/TableColumns/OpenPositionsColumns";
import { RecentTransColumns } from "../components/Tables/TableColumns/RecentTransColumns";
import { RecentTransListCols } from "../components/Lists/ListColumns/RecentTransListCols";
import { OpenPositionsListCols } from "../components/Lists/ListColumns/OpenPositionsListCols";
import DASHBOARD_QUERY from "../api/queries/Dashboard.graphql";
import GenericReactTable from "../components/Tables/GenericReactTable";
import React from "react";
import _ from "lodash";
import ListGroupStickyTop from "../components/Lists/OpenPositionList/ListGroupStickyTop";
import List from "../components/Lists/List";
import dynamic from "next/dynamic";
import MiniCenteredStatCard from "../components/StatCards/MiniCenteredStatCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const queryClient = new QueryClient();
const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export async function getStaticProps() {
  await queryClient.prefetchQuery("DASHBOARD_QUERY", () => getTrans());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

async function getTrans() {
  return graphQLClient.request(DASHBOARD_QUERY);
}

export default function Dashboard() {
  const { data } = useQuery("DASHBOARD_QUERY", getTrans);

  const grouped_positions = _.groupBy(
    data.open_positions,
    ({ asset_type }) => asset_type
  );
  const options = {
    chart: {
      stacked: true,
      fontFamily: "Rubik, Helvetica, Arial, sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    height: 100,
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
      },
    },
    xaxis: {
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
      data: [440, 550, 410, 670, 220, 430],
    },
    {
      name: "Short Put",
      data: [130, 230, 200, 80, 130, 270],
    },
    {
      name: "Long Stock",
      data: [110, 170, 150, 150, 210, 10],
    },
    {
      name: "Long Call",
      data: [210, 70, 250, 130, 220, 80],
    },
  ];

  const area_series = [
    {
      name: "Current Month",
      data: [31, 40, 28, 51, 42, 109, 100, 125, 145, 154, 264, 654],
    },
    {
      name: "Previous Month",
      data: [11, 32, 45, 62, 74, 82, 97, 167, 187, 193, 235, 264],
    },
  ];

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-deck row-cards">
          <div className="col-6 col-sm-3 col-lg-3">
            <MiniCenteredStatCard
              title={"Total Realized P/L"}
              value={"$5,034"}
              pct_chg={2.65}
            />
          </div>
          <div className="col-6 col-sm-3 col-lg-3">
            <MiniCenteredStatCard
              title={"Win Rate"}
              value={"78%"}
              pct_chg={3.5}
            />
          </div>
          <div className="col-6 col-sm-3 col-lg-3">
            <MiniCenteredStatCard
              title={"Average P/L"}
              value={"$110"}
              pct_chg={1.59}
            />
          </div>
          <div className="col-6 col-sm-3 col-lg-3">
            <MiniCenteredStatCard
              title={"Total Commissions"}
              value={"$343"}
              pct_chg={2}
            />
          </div>
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-body" style={{ position: "relative" }}>
                <h3 className="card-title">Realized P/L - July to December</h3>
                <Chart
                  options={options}
                  series={series}
                  type={"bar"}
                  height="300"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-body" style={{ position: "relative" }}>
                <h3 className="card-title">Current vs. Previous Month P/L</h3>
                <Chart
                  options={{
                    chart: {
                      fontFamily: "Rubik, Helvetica, Arial, sans-serif",
                    },
                    dataLabels: { enabled: false },
                  }}
                  series={area_series}
                  type={"area"}
                  height="300"
                />
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
            <List
              title={"Open Positions"}
              data={data.open_positions}
              columns={OpenPositionsListCols}
            />
          </div>
          <div className="col-12 d-none d-md-block">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recent Transactions</h3>
              </div>
              <GenericReactTable
                title={"Recent Transactions"}
                subProps={RecentTransColumns}
                data={data.trades}
              />
            </div>
          </div>
          <div className="col-12 d-block d-md-none">
            <List
              title={"Recent Transactions"}
              data={data.trades}
              columns={RecentTransListCols}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
