import accounting from "accounting";

export const OpenPositionsListCols = [
  {
    top: { accessor: "display", Cell: ({ value }) => <small>{value}</small> },
    bottom: {
      accessor: "strategy_name",
      Cell: ({ value, row }) => (
        <div>
          <a href={row.root + "/" + row.strategy}>
            <small>{value}</small>
          </a>
        </div>
      ),
    },
    width: "col-6",
  },
  {
    top: {
      accessor: "avg_price",
      Cell: ({ value }) => <small>{accounting.formatMoney(value)}</small>,
    },
    bottom: {
      accessor: "quantity",
      Cell: ({ value }) => {
        return <small>{value} Qty</small>;
      },
    },
    width: "col-3",
  },
  {
    top: {
      accessor: "book_cost",
      Cell: ({ value }) => <small>{accounting.formatMoney(value)}</small>,
    },
    bottom: {
      accessor: "trade_date",
      Cell: ({ value }) => <small>{value}</small>,
    },
    width: "col-3",
  },
];
