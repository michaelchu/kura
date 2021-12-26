import React from "react";
import _ from "lodash";

export default function PnlCompChart(props) {
  const series = _.groupBy(props.data, ({ period }) => period);

  const formatted_series = Object.entries(series).map(([key, rows]) => {
    const legend = _.capitalize(_.startCase(key).toLowerCase());
    const data = rows.map(({ cumulated_pnl }) => cumulated_pnl * -1);
    return { name: legend, data };
  });

  return (
    <div className="col-12 col-sm-6">
      <div className="card">
        <div className="card-body" style={{ position: "relative" }}>
          <h3 className="card-title">Current vs. Previous Month P/L</h3>
          <props.chart
            options={{
              chart: {
                animations: {
                  enabled: false,
                },
                fontFamily: "Rubik, Helvetica, Arial, sans-serif",
              },
              dataLabels: { enabled: false },
              xaxis: {
                labels: { show: true, rotate: 0 },
                tickAmount: 4,
              },
            }}
            series={formatted_series}
            type={"area"}
            height="300"
          />
        </div>
      </div>
    </div>
  );
}
