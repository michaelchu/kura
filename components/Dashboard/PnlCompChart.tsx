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
    <div className="card">
      <div className="card-body" style={{ position: "relative" }}>
        <h3 className="card-title">Month Over Month Performance</h3>
        <props.chart
          options={{
            chart: {
              animations: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
              fontFamily: "Rubik, Helvetica, Arial, sans-serif",
            },
            dataLabels: { enabled: false },
            xaxis: {
              labels: { show: true, rotate: 0 },
              tickAmount: 4,
            },
            yaxis: {
              title: {
                text: "Realized P/L",
              },
            },
            colors: ["rgba(128,143,168,0.64)", "rgba(64,175,83,0.87)"],
          }}
          series={formatted_series}
          type={"area"}
          height="300"
        />
      </div>
    </div>
  );
}