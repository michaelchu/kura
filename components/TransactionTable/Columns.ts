import accounting from "accounting";

export const COLUMNS = [
    {
        Header: "Trade Date",
        accessor: "trade_date"
    },
    { 
        Header: "Symbol",
        accessor: "symbol"
    },
    { 
        Header: "Quantity",
        accessor: "quantity"
    },
    { 
        Header: "Action",
        accessor: "action"
    },
    { 
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => accounting.formatMoney(value) 
    },
    {
        Header: "Fee",
        accessor: "fee",
        Cell: ({ value }) => accounting.formatMoney(value) 
    },
    { 
        Header: "Strategy",
        accessor: "strategyByStrategy.display"
    },
    { 
        Header: "Asset Type",
        accessor: "asset_type"
    },
    {
        Header: "Account",
        accessor: "account.name"
    }
];