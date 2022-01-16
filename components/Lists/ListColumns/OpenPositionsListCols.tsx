import accounting from "accounting";

export const OpenPositionsListCols = [
  {
    top: { accessor: "symbol" },
    bottom: {
      accessor: "strategy",
    },
    width: "col-8",
  },
  {
    top: {
      accessor: "bookCost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: {
      accessor: "trade_date",
    },
    width: "col-4",
  },
];
