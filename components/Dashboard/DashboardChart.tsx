import PnlCompChart from "./PnlCompChart";
import PnlChart from "./PnlChart";
import style from "./scroll.module.css";
import React from "react";

export default function DashboardChart({ chart, data }) {
  return (
    <>
      <div className="col-12 col-sm-6 d-none d-md-block">
        <PnlCompChart chart={chart} data={data.pnlCompChart} />
      </div>
      <div className="col-12 col-sm-6 d-none d-md-block">
        <PnlCompChart chart={chart} data={data.pnlCompChart} />
        {/* <PnlChart chart={chart} data={data.pnlChart} /> */}
      </div>

      <div className={"d-block d-md-none"}>
        <div className={style.scrolling}>
          <div className="col-12 chart">
            <PnlCompChart chart={chart} data={data.pnlCompChart} />
          </div>
          <div className="col-12 chart">
            {/* <PnlChart chart={chart} data={data.pnlChart} /> */}
            <PnlCompChart chart={chart} data={data.pnlCompChart} />
          </div>
        </div>
      </div>
    </>
  );
}
