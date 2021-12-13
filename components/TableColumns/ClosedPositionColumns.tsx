import accounting from "accounting";

export const ClosedPositionColumns = [
  {
    Header: "Entry Date",
    accessor: "entry_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Exit Date",
    accessor: "exit_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Strategy",
    accessor: "strategy",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Expiration",
    accessor: "expiration",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Original Cost",
    accessor: "original_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
              <i> CR</i>
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value)}
              <i> DR</i>
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
  {
    Header: "Exit Cost",
    accessor: "exit_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
              <i> CR</i>
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value)}
              <i> DR</i>
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
  {
    Header: "Total Fees",
    accessor: "total_fees",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "center" }}>
          <span className={"text-danger"}>{accounting.formatMoney(value)}</span>
        </div>
      );
    },
  },
  {
    Header: "Realized P/L",
    accessor: "realized_pnl",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value * -1)}
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            {accounting.formatMoney(value)}
          </div>
        );
      }
    },
  },
  {
    Header: "Days in Trade",
    accessor: "days_in_trade",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Account",
    accessor: "name",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
];
