import accounting from "accounting";

export const RecentTransListCols = [
  {
    top: { accessor: "display" },
    bottom: {
      accessor: "strategy_name",
    },
    width: "col-8",
  },
  {
    top: {
      accessor: "total_cost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: {
      accessor: "trade_date",
    },
    width: "col-4",
  },
];
