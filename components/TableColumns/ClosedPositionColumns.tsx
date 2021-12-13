import accounting from "accounting";

export const ClosedPositionColumns = [
  {
    Header: "Entry Date",
    accessor: "entry_date",
  },
  {
    Header: "Exit Date",
    accessor: "exit_date",
  },
  {
    Header: "Symbol",
    accessor: "symbol",
  },
  {
    Header: "Strategy",
    accessor: "strategy",
  },
  {
    Header: "Expiration",
    accessor: "expiration",
  },
  {
    Header: "Original Cost",
    accessor: "original_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <span className={"text-success"}>
            {accounting.formatMoney(Math.abs(value))}
            <i> CR</i>
          </span>
        );
      } else if (value > 0) {
        return (
          <span className={"text-danger"}>
            {accounting.formatMoney(value)}
            <i> DR</i>
          </span>
        );
      } else {
        accounting.formatMoney(value);
      }
    },
  },
  {
    Header: "Exit Cost",
    accessor: "exit_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <span className={"text-success"}>
            {accounting.formatMoney(Math.abs(value))}
            <i> CR</i>
          </span>
        );
      } else if (value > 0) {
        return (
          <span className={"text-danger"}>
            {accounting.formatMoney(value)}
            <i> DR</i>
          </span>
        );
      } else {
        return accounting.formatMoney(value);
      }
    },
  },
  {
    Header: "Total Fees",
    accessor: "total_fees",
    Cell: ({ value }) => {
      return (
        <span className={"text-danger"}>{accounting.formatMoney(value)}</span>
      );
    },
  },
  {
    Header: "Realized P/L",
    accessor: "realized_pnl",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <span className={"text-success"}>
            {accounting.formatMoney(Math.abs(value))}
          </span>
        );
      } else if (value > 0) {
        return (
          <span className={"text-danger"}>
            {accounting.formatMoney(value * -1)}
          </span>
        );
      } else {
        return accounting.formatMoney(value);
      }
    },
  },
  {
    Header: "Days in Trade",
    accessor: "days_in_trade",
  },
  {
    Header: "Account",
    accessor: "name",
  },
];
