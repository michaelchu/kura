import accounting from "accounting";

export const ClosedPositionsListCols = [
  {
    top: { accessor: "display" },
    bottom: {
      accessor: "strategy",
    },
    width: "col-6",
  },
  {
    top: {
      accessor: "realized_pnl",
      Cell: ({ value }) => (
        <span className={value < 0 ? "text-success" : "text-danger"}>
          {value < 0
            ? accounting.formatMoney(Math.abs(value))
            : accounting.formatMoney(value * -1)}
        </span>
      ),
    },
    bottom: {
      accessor: "exit_date",
      Cell: ({ value }) => <small>{value}</small>,
    },
    width: "col-6",
  },
];
