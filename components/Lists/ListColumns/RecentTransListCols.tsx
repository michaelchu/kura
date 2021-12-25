import accounting from "accounting";

export const RecentTransListCols = [
  {
    top: { accessor: "display", Cell: ({ value }) => <small>{value}</small> },
    bottom: {
      accessor: "strategy_name",
      Cell: ({ value }) => <small>{value}</small>,
    },
    width: "col-6",
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
        return <small>{value} Qty</small>;
      },
    },
    width: "col-3",
  },
  {
    top: {
      accessor: "total_cost",
      Cell: ({ value }) => <small>{accounting.formatMoney(value)}</small>,
    },
    bottom: {
      accessor: "trade_date",
      Cell: ({ value }) => <small>{value}</small>,
    },
    width: "col-3",
  },
];
