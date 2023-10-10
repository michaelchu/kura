import { useQuery } from "@apollo/client";
import Layout from "../components/Layouts/Layout";
import { OpenPositionsColumns } from "../components/Tables/TableColumns/OpenPositionsColumns";
import { RecentTransColumns } from "../components/Tables/TableColumns/RecentTransColumns";
import { RecentTransListCols } from "../components/Lists/ListColumns/RecentTransListCols";
import { OpenPositionsListCols } from "../components/Lists/ListColumns/OpenPositionsListCols";
import DASHBOARD_QUERY from "../api/queries/Dashboard.graphql";
import GenericReactTable from "../components/Tables/GenericReactTable";
import React, { useState } from "react";
import List from "../components/Lists/List";
import StatsBoard from "../components/Dashboard/StatsBoard";
import dynamic from "next/dynamic";
import TransactionDetailsModal from "../components/Modals/TransactionDetailsModal";
import DashboardChart from "../components/Dashboard/DashboardChart";
import OpenPosDetailsModal from "../components/Modals/OpenPosDetailsModal";
import ErrorPage from "../components/ErrorPage";
import dayjs from "dayjs";
import { GlobalContext } from "../contexts/context";
import OpenPositionsTable from "../components/Tables/OpenPositionsTable";
import RollTransactionCanvas from "../components/Canvas/RollTransactionCanvas/RollTransactionCanvas";
import useToggle from "../hooks/useToggle";
import DeleteModal from "../components/Modals/DeleteModal";
import CloseTransactionCanvas from "../components/Canvas/CloseTransactionCanvas/CloseTransactionCanvas";

export default function Dashboard() {
  // const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const { isTrue: isEditCanvasShowing, toggle: editCanvasToggle } = useToggle();
  const { isTrue: isDeleteCanvasShowing, toggle: deleteCanvasToggle } =
    useToggle();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  // if (loading) return <Layout />;
  // if (error) return <ErrorPage />;

  const data = {
    openPositions: [],
    transactions: [],
    dashboardStats: {
      totalPnl: 0,
      totalFees: 0,
      monthlyPnl: 0,
      winRate: 0,
    },
    pnlCompChart: [],
    pnlChart: [],
  }

  const { totalPnl, totalFees, monthlyPnl, winRate } = data.dashboardStats;

  return (
    <Layout>
      <div
        className={"navbar-light sticky-top"}
        style={{
          alignItems: "stretch",
          minHeight: "3.5rem",
        }}
      >
        <div className="container-xl">
          <div className={"d-flex justify-content-between pt-3 pb-3"}>
            <div className={"d-table"}>
              <h2 className={"d-table-cell align-baseline"}>Overview</h2>
              <p className={"header-pretitle px-2 d-table-cell align-baseline"}>
                As of {dayjs(new Date()).format("YYYY-MM-DD")}
              </p>
            </div>
            <GlobalContext.Consumer>
              {({ canvasToggle }) => (
                <a
                  onClick={canvasToggle}
                  className={"btn btn-pill btn-outline-cyan btn-sm"}
                >
                  ADD TRADE
                </a>
              )}
            </GlobalContext.Consumer>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="page-body">
          <div className="row row-deck row-cards">
            <StatsBoard
              total_fees={totalFees}
              total_pnl={totalPnl}
              monthly_pnl={monthlyPnl}
              win_rate={winRate}
            />

            <DashboardChart data={data} chart={Chart} />

            <div className="col-12 d-none d-md-block">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Open Positions</h3>
                </div>
                <OpenPositionsTable
                  cols={OpenPositionsColumns}
                  data={data.openPositions}
                  setSelectedTransaction={setSelectedTransaction}
                  editCanvasToggle={editCanvasToggle}
                  deleteCanvasToggle={deleteCanvasToggle}
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
      </div>
      {/* <RollTransactionCanvas
        canvasToggle={editCanvasToggle}
        show={isEditCanvasShowing}
        transaction={selectedTransaction}
      />
      <CloseTransactionCanvas
        canvasToggle={deleteCanvasToggle}
        show={isDeleteCanvasShowing}
        transaction={selectedTransaction}
      /> */}
    </Layout>
  );
}
