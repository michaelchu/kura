import Layout from "../components/Layouts/Layout";
import React from "react";
import dayjs from "dayjs";
import { GlobalContext } from "../contexts/context";

export default function Settings() {
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
              <h2 className={"d-table-cell align-baseline"}>
                General Settings
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
