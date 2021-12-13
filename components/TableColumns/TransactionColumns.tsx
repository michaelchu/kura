import accounting from "accounting";

export const TransactionColumns = [
  {
    Header: "Trade Date",
    accessor: "trade_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Action",
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
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "center" }}>
          {accounting.formatMoney(value)}
        </div>
      );
    },
  },
  {
    Header: "Fee",
    accessor: "fee",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "center" }}>
          <span>{accounting.formatMoney(value)}</span>
        </div>
      );
    },
  },
  {
    Header: "Strategy",
    accessor: "strategyByStrategy.display",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Asset Type",
    accessor: "asset_type",
    Cell: ({ value }) => {
      if (value == "stock") {
        return (
          <div style={{ textAlign: "center" }}>
            <span className="badge bg-purple-lt">{value}</span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            <span className="badge bg-azure-lt">{value}</span>
          </div>
        );
      }
    },
  },
  {
    Header: "Account",
    accessor: "account.name",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
];
