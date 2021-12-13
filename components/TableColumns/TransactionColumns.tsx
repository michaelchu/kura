import accounting from "accounting";

export const TransactionColumns = [
  {
    Header: "Trade Date",
    accessor: "trade_date",
  },
  {
    Header: "Symbol",
    accessor: "symbol",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Action",
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
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Fee",
    accessor: "fee",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Strategy",
    accessor: "strategyByStrategy.display",
  },
  {
    Header: "Asset Type",
    accessor: "asset_type",
    Cell: ({ value }) => {
      if (value == "stock") {
        return <span className="badge bg-purple-lt">{value}</span>;
      } else {
        return <span className="badge bg-azure-lt">{value}</span>;
      }
    },
  },
  {
    Header: "Account",
    accessor: "account.name",
  },
];
