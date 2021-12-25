import accounting from "accounting";

export const ClosedPositionColumns = [
  {
    Header: <div style={{ textAlign: "center" }}>Account</div>,
    accessor: "name",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Symbol</div>,
    accessor: "display",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Strategy</div>,
    accessor: "strategy",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Entry Date</div>,
    accessor: "entry_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Exit Date</div>,
    accessor: "exit_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Days in Trade </div>,
    accessor: "days_in_trade",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "right" }}>Original Cost</div>,
    accessor: "original_cost",
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
    accessor: "exit_cost",
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
    Header: <div style={{ textAlign: "right" }}>Total Fees</div>,
    accessor: "total_fees",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          <span>{accounting.formatMoney(value)}</span>
        </div>
      );
    },
  },
  {
    Header: <div style={{ textAlign: "right" }}>Realized P/L</div>,
    accessor: "realized_pnl",
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
          <div style={{ textAlign: "left" }}>
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
