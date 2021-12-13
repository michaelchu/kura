import accounting from "accounting";

export const OpenPositionsColumns = [
  {
    Header: "Trade Date",
    accessor: "trade_date",
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
    Header: "Action",
    accessor: "action",
    Cell: ({ value }) => {
      if (value == "BTO" || value == "BTC") {
        return (
          <div style={{ textAlign: "center" }}>
            {" "}
            <span className="badge bg-green-lt">{value}</span>
          </div>
        );
      } else if (value == "STC" || value == "STO") {
        return (
          <div style={{ textAlign: "center" }}>
            {" "}
            <span className="badge bg-pink-lt">{value}</span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            {" "}
            <span className="badge bg-yellow-lt">{value}</span>
          </div>
        );
      }
    },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Expiration",
    accessor: "expiration",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Option Type",
    accessor: "type",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Strike",
    accessor: "strike",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: "Total Cost",
    accessor: "total_cost",
    Cell: ({ value }) => {
      if (value < 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-success"}>
              {accounting.formatMoney(Math.abs(value))}
              <i> CR</i>
            </span>
          </div>
        );
      } else if (value > 0) {
        return (
          <div style={{ textAlign: "center" }}>
            <span className={"text-danger"}>
              {accounting.formatMoney(value)}
              <i> DR</i>
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ textAlign: "center" }}>
            <span>{accounting.formatMoney(value)}</span>
          </div>
        );
      }
    },
  },
];
