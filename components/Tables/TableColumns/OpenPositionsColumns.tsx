import accounting from "accounting";
import Link from "next/link";

export const OpenPositionsColumns = [
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
    Cell: ({ value, row }) => (
      <div style={{ textAlign: "center" }}>
        <Link href={row.original.root + "/" + row.original.strategyId}>
          <a>{value}</a>
        </Link>
      </div>
    ),
  },
  {
    Header: <div style={{ textAlign: "center" }}>Progress</div>,
    accessor: "daysToExpiration",
    Cell: ({ row }) => {
      if (row.original.assetType == "option") {
        const ratio =
          ((row.original.daysFromExpiration - row.original.daysToExpiration) /
            row.original.daysFromExpiration) *
          100;
        return (
          <div className="progress progress-separated">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: ratio + "%",
                height: "20px",
                background: "#17a2b8",
              }}
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
    accessor: "avgPrice",
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
    accessor: "bookCost",
    Cell: ({ value }) => {
      return (
        <div style={{ textAlign: "right" }}>
          {accounting.formatMoney(value)}
        </div>
      );
    },
  },
];
