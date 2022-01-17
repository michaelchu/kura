import accounting from "accounting";

export const TransactionsListCols = [
  {
    top: { accessor: "symbol" },
    bottom: {
      accessor: "strategy",
    },
    width: "col-5",
  },
  {
    top: {
      accessor: "action",
      Cell: ({ value }) => {
        if (value == "BTO" || value == "BTC") {
          return <span className="badge bg-green-lt">{value}</span>;
        } else if (value == "STC" || value == "STO") {
          return <span className="badge bg-pink-lt">{value}</span>;
        } else {
          return <span className="badge bg-yellow-lt">{value}</span>;
        }
      },
    },
    bottom: {
      accessor: "quantity",
      Cell: ({ value }) => <div>{value} Qty</div>,
    },
    width: "col-3",
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
