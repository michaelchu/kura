import React from "react";
import _ from "lodash";

export default function PnlCompChart(props) {
  const series = _.groupBy(props.data, ({ period }) => period);

  const formatted_series = Object.entries(series).map(([key, rows]) => {
    const legend = _.capitalize(_.startCase(key).toLowerCase());
    const data = rows.map(({ cumulatedPnl }) => cumulatedPnl * -1);
    return { name: legend, data };
  });

  return (
    <div className="card">
      <div className="card-body" style={{ position: "relative" }}>
        <h3 className="card-title">Month Over Month Performance</h3>
        <props.chart
          options={{
            annotations: {
              yaxis: [
                {
                  y: 6500,
                  strokeDashArray: 5,
                  borderColor: "#063349",
                  label: {
                    position: "left",
                    textAnchor: "front",
                    borderColor: "#e9c46a",
                    style: {
                      color: "#063349",
                      background: "#e9c46a",
                    },
                    text: "Income Goal: $6500",
                  },
                },
              ],
            },
            colors: ["#063349", "#2a9d8f"],
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
            stroke: {
              width: [0, 3, 6],
              curve: "smooth",
            },
            xaxis: {
              labels: { show: true, rotate: 0 },
              tickAmount: 4,
            },
            yaxis: {
              title: {
                text: "Realized P/L",
              },
            },
          }}
          series={formatted_series}
          type={"area"}
          height="300"
        />
      </div>
    </div>
  );
}
