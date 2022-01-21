import accounting from "accounting";

export const RecentTransColumns = [
  {
    Header: <div style={{ textAlign: "center" }}>Trade Date</div>,
    accessor: "tradeDate",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Account</div>,
    accessor: "tradingAccountName",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Symbol</div>,
    accessor: "symbol",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Strategy</div>,
    accessor: "strategy",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Action</div>,
    accessor: "action",
    Cell: ({ value }) => {
      if (value == "BTO" || value == "BTC") {
        return (
          <div style={{ textAlign: "center" }}>
            <span className="badge bg-green-lt">{value}</span>
          </div>
        );
      } else if (value == "STC" || value == "STO") {
        return (
          <div style={{ textAlign: "center" }}>
            <span className="badge bg-pink-lt">{value}</span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            <span className="badge bg-yellow-lt">{value}</span>
          </div>
        );
      }
    },
  },
  {
    Header: <div style={{ textAlign: "center" }}>Qty</div>,
    accessor: "quantity",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "right" }}>Price</div>,
    accessor: "price",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          {accounting.formatMoney(value)}
        </div>
      );
    },
  },
  {
    Header: <div style={{ textAlign: "right" }}>Total Cost</div>,
    accessor: "totalCost",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          <span>{accounting.formatMoney(value)}</span>
        </div>
      );
    },
  },
];
