import accounting from "accounting";

export const RecentTransListCols = [
  {
    top: { accessor: "symbol" },
    bottom: {
      accessor: "strategy",
    },
    width: "col-8",
  },
  {
    top: {
      accessor: "totalCost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: {
      accessor: "tradeDate",
    },
    width: "col-4",
  },
];
