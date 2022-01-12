import accounting from "accounting";

export const OpenPositionsColumns = [
  {
    Header: <div style={{ textAlign: "center" }}>Trade Date</div>,
    accessor: "trade_date",
    Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
  },
  {
    Header: <div style={{ textAlign: "center" }}>Account</div>,
    accessor: "trading_account_name",
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
    Cell: ({ value, row }) => (
      <div style={{ textAlign: "center" }}>
        <a href={row.original.root + "/" + row.original.strategy}>{value}</a>
      </div>
    ),
  },
  {
    Header: <div style={{ textAlign: "center" }}>Progress</div>,
    accessor: "days_to_expiration",
    Cell: ({ row }) => {
      if (row.original.asset_type == "option") {
        const ratio =
          ((row.original.days_from_expiration -
            row.original.days_to_expiration) /
            row.original.days_from_expiration) *
          100;
        return (
          <div className="progress progress-separated">
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: ratio + "%", height: "20px" }}
            />
          </div>
        );
      } else {
        return <></>;
      }
    },
  },
  {
    Header: <div style={{ textAlign: "center" }}>Qty</div>,
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
