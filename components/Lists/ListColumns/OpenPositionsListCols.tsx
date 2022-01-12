import accounting from "accounting";

export const OpenPositionsListCols = [
  {
    top: { accessor: "symbol" },
    bottom: {
      accessor: "strategy",
      Cell: ({ value, row }) => (
        <div>
          <a href={row.root + "/" + row.strategy}>{value}</a>
        </div>
      ),
    },
    width: "col-8",
  },
  {
    top: {
      accessor: "book_cost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: {
      accessor: "trade_date",
    },
    width: "col-4",
  },
];
