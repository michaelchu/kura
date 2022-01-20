import React from "react";
import _ from "lodash";

export default function PnlChart(props) {
  const series = _.map(props.data.series, ({ name, data }) => {
    const inverted_data = _.map(data, (val) => val * -1);
    return { name, data: inverted_data };
  });

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
      categories: props.data.categories,
    },
    yaxis: {
      title: {
        text: "Realized P/L",
      },
    },
    theme: {
      palette: "palette5",
    },
  };

  return (
    <div className="card">
      <div className="card-body" style={{ position: "relative" }}>
        <h3 className="card-title">Last 6 Months Realized P/L</h3>
        <props.chart
          options={options}
          series={series}
          type={"bar"}
          height="300"
        />
      </div>
    </div>
  );
}
