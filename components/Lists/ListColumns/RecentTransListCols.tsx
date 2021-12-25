import accounting from "accounting";

export const RecentTransListCols = [
  {
    top: { accessor: "symbol" },
    bottom: {
      accessor: "strategy_name",
    },
    width: "col-5",
  },
  {
    top: {
      accessor: "action",
      Cell: ({ value }) => {
        if (value == "BTO" || value == "BTC") {
          return (
            <div>
              <span className="badge bg-green-lt">{value}</span>
            </div>
          );
        } else if (value == "STC" || value == "STO") {
          return (
            <div>
              <span className="badge bg-pink-lt">{value}</span>
            </div>
          );
        } else {
          return (
            <div>
              <span className="badge bg-yellow-lt">{value}</span>
            </div>
          );
        }
      },
    },
    bottom: {
      accessor: "quantity",
      Cell: ({ value }) => {
        return `${value} Qty`;
      },
    },
    width: "col-3",
  },
  {
    top: {
      accessor: "total_cost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: { accessor: "trade_date" },
    width: "col-4",
  },
];
