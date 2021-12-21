import accounting from "accounting";

export const OpenPositionsColumns = [
  {
    Header: <div style={{ textAlign: "center" }}>Symbol</div>,
    accessor: "symbol",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Account</div>,
    accessor: "name",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Strategy</div>,
    accessor: "strategy",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Asset Type</div>,
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
    Header: <div style={{ textAlign: "center" }}>Quantity</div>,
    accessor: "quantity",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "right" }}>Avg Price</div>,
    accessor: "avg_price",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          {accounting.formatMoney(value)}
        </div>
      );
    },
  },
  {
    Header: <div style={{ textAlign: "right" }}>Book Cost</div>,
    accessor: "book_cost",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          {accounting.formatMoney(value)}
        </div>
      );
    },
  },
];
