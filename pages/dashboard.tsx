import { useQuery } from "@apollo/client";
import Layout from "../components/Layouts/Layout";
import { OpenPositionsColumns } from "../components/Tables/TableColumns/OpenPositionsColumns";
import { RecentTransColumns } from "../components/Tables/TableColumns/RecentTransColumns";
import { RecentTransListCols } from "../components/Lists/ListColumns/RecentTransListCols";
import { OpenPositionsListCols } from "../components/Lists/ListColumns/OpenPositionsListCols";
import DASHBOARD_QUERY from "../api/queries/Dashboard.graphql";
import GenericReactTable from "../components/Tables/GenericReactTable";
import React from "react";
import List from "../components/Lists/List";
import StatsBoard from "../components/Dashboard/StatsBoard";
import dynamic from "next/dynamic";
import TransactionDetailsModal from "../components/Modals/TransactionDetailsModal";
import DashboardChart from "../components/Dashboard/DashboardChart";
import OpenPosDetailsModal from "../components/Modals/OpenPosDetailsModal";

export default function Dashboard() {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { totalPnl, totalFees, avgPnl, winRate } = data.dashboardStats;

  return (
    <Layout>
      <div className="page-body">
        <div className="row row-deck row-cards">
          <StatsBoard
            total_fees={totalFees}
            total_pnl={totalPnl}
            avg_pnl={avgPnl}
            win_rate={winRate}
          />

          <DashboardChart data={data} chart={Chart} />

          <div className="col-12 d-none d-md-block">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Open Positions</h3>
              </div>
              <GenericReactTable
                title={"Open Positions"}
                subProps={OpenPositionsColumns}
                data={data.openPositions}
              />
            </div>
          </div>
          <div className="col-12 d-block d-md-none">
            <List
              title={"Open Positions"}
              data={data.openPositions}
              columns={OpenPositionsListCols}
              prefix={"open"}
              modal={OpenPosDetailsModal}
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
                data={data.transactions}
              />
            </div>
          </div>
          <div className="col-12 d-block d-md-none">
            <List
              title={"Recent Transactions"}
              data={data.transactions}
              columns={RecentTransListCols}
              modal={TransactionDetailsModal}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
