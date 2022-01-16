import { useQuery } from "@apollo/client";
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

export default function ClosedPositions() {
  const { data, loading, error } = useQuery(CLOSED_POSITIONS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const grouped_positions = _.groupBy(data.closedPositions, ({ exit_date }) => {
    return dayjs(exit_date).format("MMM YYYY");
  });

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
              data={data.closedPositions}
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
