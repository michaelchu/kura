import React from "react";
import dynamic from "next/dynamic";

export default function PnlCompChart(props) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const area_series = [
    {
      name: "Current Month",
      data: [31, 40, 28, 51, 42, 109, 100, 125, 145, 154, 264, 654],
    },
    {
      name: "Previous Month",
      data: [453.01, 32, 45, 62, 74, 82, 97, 167, 187, 193, 235, 264],
    },
  ];
  return (
    <div className="col-12 col-sm-6">
      <div className="card">
        <div className="card-body" style={{ position: "relative" }}>
          <h3 className="card-title">Current vs. Previous Month P/L</h3>
          <Chart
            options={{
              chart: {
                animations: {
                  enabled: false,
                },
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
  );
}
