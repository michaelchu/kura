import accounting from "accounting";

export const COLUMNS = [
  {
    Header: "Entry Date",
    accessor: "entry_date",
  },
  {
    Header: "Exit Date",
    accessor: "exit_date",
  },
  {
    Header: "Symbol",
    accessor: "root",
  },
  {
    Header: "Strategy",
    accessor: "strategy",
  },
  {
    Header: "Expiration",
    accessor: "expiration",
  },
  {
    Header: "Original Cost",
    accessor: "original_cost",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Exit Cost",
    accessor: "exit_cost",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Total Fees",
    accessor: "total_fees",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Realized P/L",
    accessor: "realized_pnl",
    Cell: ({ value }) => accounting.formatMoney(value),
  },
  {
    Header: "Days in Trade",
    accessor: "days_in_trade",
  },
  {
    Header: "Account",
    accessor: "name",
  },
];
