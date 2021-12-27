import React from "react";

export default function PnlChart(props) {
  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      stacked: true,
      fontFamily: "Rubik, Helvetica, Arial, sans-serif",
      toolbar: { show: false },
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
  return (
    <div className="col-12 col-sm-6 d-none d-sm-block">
      <div className="card">
        <div className="card-body" style={{ position: "relative" }}>
          <h3 className="card-title">Realized P/L - July to December</h3>
          <props.chart
            options={options}
            series={series}
            type={"bar"}
            height="300"
          />
        </div>
      </div>
    </div>
  );
}
