import accounting from "accounting";
import _ from "lodash";

const columns = [
  {
    top: { accessor: "symbol" },
    bottom: { accessor: "trade_date" },
    width: "col-5",
  },
  {
    top: { accessor: "quantity" },
    bottom: { accessor: "fee" },
    width: "col-3",
  },
  {
    top: {
      accessor: "total_cost",
      Cell: ({ value }) => accounting.formatMoney(value),
    },
    bottom: {
      accessor: "strategy",
      Cell: ({ row }) => {
        return <a href={row.root + "/" + row.strategy}>{row.strategy_name}</a>;
      },
    },
    width: "col-4",
  },
];

const render = (row, renderProps): JSX.Element => {
  const value = row[renderProps.accessor];
  if (renderProps.Cell == "undefined") {
    return <>{value}</>;
  } else {
    return renderProps.Cell({ row, value });
  }
};

export default function ListGroup(props) {
  const grouped_items = _.groupBy(props.data, props.groupFunc);
  Object.entries(grouped_items).map(([heading, rows]: [string, any[]]) => {
    return (
      <>
        <div className="list-group-header sticky-top">{heading}</div>
        {rows.map((row) => {
          return (
            <div className="list-group-item">
              <div className="row">
                {columns.map((col) => {
                  return (
                    <div className={col.width ? col.width : "col-4"}>
                      <div className="text-body">{render(row, col["top"])}</div>
                      <div className="text-muted">
                        {render(row, col["bottom"])}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  });
}
