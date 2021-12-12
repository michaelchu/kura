import accounting from "accounting";

export const COLUMNS = [
  {
    Header: "Strategy",
    accessor: "strategy",
  },
  {
    Header: "Trade Date",
    accessor: "trade_date",
  },
  {
    Header: "Root",
    accessor: "root",
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
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Expiration",
    accessor: "expiration",
  },
  {
    Header: "Option Type",
    accessor: "type",
  },
  {
    Header: "Strike",
    accessor: "strike",
  },
  {
    Header: "Total Cost",
    accessor: "total_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <span className={"text-success"}>
            {accounting.formatMoney(Math.abs(value))}
            <i> CR</i>
          </span>
        );
      } else if (value > 0) {
        return (
          <span className={"text-danger"}>
            {accounting.formatMoney(value)}
            <i> DR</i>
          </span>
        );
      } else {
        return <span>{accounting.formatMoney(value)}</span>;
      }
    },
  },
  {
    Header: "Account",
    accessor: "name",
  },
];
