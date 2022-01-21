import accounting from "accounting";

export const ClosedPositionColumns = [
  {
    Header: <div style={{ textAlign: "center" }}>Symbol</div>,
    accessor: "symbol",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Strategy</div>,
    accessor: "strategy",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Entry Date</div>,
    accessor: "entryDate",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Exit Date</div>,
    accessor: "exitDate",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Days in Trade </div>,
    accessor: "daysInTrade",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "right" }}>Entry Cost</div>,
    accessor: "entryCost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
              <sub> CR</sub>
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value)}
              <sub> DR</sub>
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "right" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
  {
    Header: <div style={{ textAlign: "right" }}>Exit Cost</div>,
    accessor: "exitCost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
              <sub> CR</sub>
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value)}
              <sub> DR</sub>
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "right" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
  {
    Header: <div style={{ textAlign: "right" }}>Realized P/L</div>,
    accessor: "realizedPnl",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "right" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value * -1)}
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "right" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
];
